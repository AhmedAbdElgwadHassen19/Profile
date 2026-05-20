import { chatFlow } from '@/lib/genkit';
import { appRoute } from '@genkit-ai/next';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
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

  // 2. Delegate to Genkit appRoute handler (which expects NextRequest)
  const handler = appRoute(chatFlow);
  return handler(req);
};
