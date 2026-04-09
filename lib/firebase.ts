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
  DocumentData,
  CollectionReference,
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

export const adminAPI = {
  login: async ({ email, password }: any) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { data: { email: userCredential.user.email, uid: userCredential.user.uid } };
  }
};

export { db, auth };
export default { projectsAPI, adminAPI };
