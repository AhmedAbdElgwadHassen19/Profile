import { chatFlow } from '@/lib/genkit';
import { appRoute } from '@genkit-ai/next';
import { db } from '@/lib/firebase';
import { chatsAPI } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  // Clone request so we can read body twice
  const cloned = req.clone();

  try {
    // 1. Fetch Gemini API key from Firestore 'config/gemini'
    const ref = doc(db, 'config', 'gemini');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const apiKey = snap.data().apiKey;
      if (apiKey && apiKey.trim() !== '') {
        process.env.GEMINI_API_KEY = apiKey.trim();
      }
    }
  } catch (error) {
    console.error("Failed to load Gemini key from Firestore:", error);
  }

  // 2. Save conversation to Firestore (fire-and-forget)
  try {
    const body = await cloned.json();
    const messages: { role: string; content: string }[] = body?.data?.messages ?? [];

    if (messages.length > 0) {
      // Use a session ID from header or generate one from timestamp
      const sessionId =
        req.headers.get('x-session-id') ||
        `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      // Only save user messages (not the model's welcome message)
      const userMessages = messages.filter((m) => m.role === 'user');
      if (userMessages.length > 0) {
        chatsAPI.saveSession(sessionId, messages).catch((e) =>
          console.error('Failed to save chat session:', e)
        );
      }
    }
  } catch (error) {
    console.error("Failed to save chat to Firestore:", error);
  }

  // 3. Delegate to Genkit appRoute handler with error handling
  try {
    const handler = appRoute(chatFlow);
    return handler(req);
  } catch (error: any) {
    console.error("Genkit API error:", error);
    
    // Handle rate limit errors
    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
};
