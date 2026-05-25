import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  orderBy,
  query,
  limit,
  DocumentData,
  CollectionReference,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (prevent double initialization in Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const projectsCol = collection(db, 'projects') as CollectionReference<DocumentData>;

export const projectsAPI = {
  getAll: async () => {
    const snap = await getDocs(projectsCol);
    return { data: snap.docs.map(d => ({ _id: d.id, ...d.data() })) };
  },
  getById: async (id: string) => {
    const ref = doc(db, 'projects', id);
    const snap = await getDoc(ref);
    return { data: snap.exists() ? { _id: snap.id, ...snap.data() } : null };
  },
  create: async (data: any) => {
    const ref = await addDoc(projectsCol, { ...data, createdAt: new Date() });
    return { data: { _id: ref.id, ...data } };
  },
  update: async (id: string, data: any) => {
    const ref = doc(db, 'projects', id);
    await updateDoc(ref, data);
    return { data: { _id: id, ...data } };
  },
  delete: async (id: string) => {
    const ref = doc(db, 'projects', id);
    await deleteDoc(ref);
    return { data: null };
  }
};

export const configAPI = {
  getGeminiKey: async () => {
    const ref = doc(db, 'config', 'gemini');
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().apiKey : '';
  },
  setGeminiKey: async (apiKey: string) => {
    const ref = doc(db, 'config', 'gemini');
    await setDoc(ref, { apiKey, updatedAt: new Date() });
    return true;
  }
};

export const adminAPI = {
  login: async ({ email, password }: any) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { data: { email: userCredential.user.email, uid: userCredential.user.uid } };
  }
};

export const chatsAPI = {
  // Save a full conversation session
  saveSession: async (sessionId: string, messages: { role: string; content: string }[]) => {
    const ref = doc(db, 'chats', sessionId);
    await setDoc(ref, {
      sessionId,
      messagesCount: messages.length,
      lastMessage: messages[messages.length - 1]?.content?.slice(0, 100) || '',
      updatedAt: serverTimestamp(),
    }, { merge: true });

    // Save each message in subcollection
    const messagesCol = collection(db, 'chats', sessionId, 'messages');
    for (const msg of messages) {
      await addDoc(messagesCol, {
        role: msg.role,
        content: msg.content,
        timestamp: serverTimestamp(),
      });
    }
  },

  // Get all sessions (for admin view)
  getAllSessions: async () => {
    const q = query(collection(db, 'chats'), orderBy('updatedAt', 'desc'), limit(50));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  // Get messages for a specific session
  getSessionMessages: async (sessionId: string) => {
    const q = query(
      collection(db, 'chats', sessionId, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  // Delete a session and all its messages
  deleteSession: async (sessionId: string) => {
    // Delete all messages in subcollection first
    const messagesSnap = await getDocs(collection(db, 'chats', sessionId, 'messages'));
    const deletions = messagesSnap.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletions);
    // Delete the session document itself
    await deleteDoc(doc(db, 'chats', sessionId));
  },
};

export { db, auth };
export default { projectsAPI, adminAPI, configAPI, chatsAPI };
