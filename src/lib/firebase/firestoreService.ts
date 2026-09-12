import { db } from './config';
import { collection, doc, setDoc, getDocs, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { GovService, VerifiedApp, SubsidyScheme } from '@/types';
import { OFFICIAL_SERVICES, OFFICIAL_SUBSIDIES, VERIFIED_APPS } from '@/data/pakistanGovData';

/**
 * Seed official services, subsidies, and verified apps into Firestore Cloud
 */
export async function seedFirestoreDatabase(): Promise<void> {
  if (typeof window === 'undefined' || !db) return;

  try {
    // 1. Seed Services
    for (const service of OFFICIAL_SERVICES) {
      const serviceRef = doc(db, 'services', service.id);
      const snap = await getDoc(serviceRef);
      if (!snap.exists()) {
        await setDoc(serviceRef, service);
      }
    }

    // 2. Seed Verified Apps
    for (const app of VERIFIED_APPS) {
      const appRef = doc(db, 'apps', app.id);
      const snap = await getDoc(appRef);
      if (!snap.exists()) {
        await setDoc(appRef, app);
      }
    }

    // 3. Seed Subsidies
    for (const sub of OFFICIAL_SUBSIDIES) {
      const subRef = doc(db, 'subsidies', sub.id);
      const snap = await getDoc(subRef);
      if (!snap.exists()) {
        await setDoc(subRef, sub);
      }
    }
  } catch (err) {
    console.warn('Firestore Cloud seeding info:', err);
  }
}

/**
 * Fetch all verified government services from Firestore Cloud
 */
export async function fetchServicesFromFirestore(): Promise<GovService[]> {
  if (typeof window === 'undefined' || !db) return OFFICIAL_SERVICES;
  try {
    const querySnap = await getDocs(collection(db, 'services'));
    if (!querySnap.empty) {
      const services: GovService[] = [];
      querySnap.forEach((docSnap) => {
        services.push(docSnap.data() as GovService);
      });
      return services;
    }
  } catch (err) {
    console.warn('Firestore fetch services info:', err);
  }
  return OFFICIAL_SERVICES;
}

/**
 * Fetch all verified apps with step-by-step guides from Firestore Cloud
 */
export async function fetchAppsFromFirestore(): Promise<VerifiedApp[]> {
  if (typeof window === 'undefined' || !db) return VERIFIED_APPS;
  try {
    const querySnap = await getDocs(collection(db, 'apps'));
    if (!querySnap.empty) {
      const apps: VerifiedApp[] = [];
      querySnap.forEach((docSnap) => {
        apps.push(docSnap.data() as VerifiedApp);
      });
      return apps;
    }
  } catch (err) {
    console.warn('Firestore fetch apps info:', err);
  }
  return VERIFIED_APPS;
}

/**
 * Fetch subsidy schemes from Firestore Cloud
 */
export async function fetchSubsidiesFromFirestore(): Promise<SubsidyScheme[]> {
  if (typeof window === 'undefined' || !db) return OFFICIAL_SUBSIDIES;
  try {
    const querySnap = await getDocs(collection(db, 'subsidies'));
    if (!querySnap.empty) {
      const subs: SubsidyScheme[] = [];
      querySnap.forEach((docSnap) => {
        subs.push(docSnap.data() as SubsidyScheme);
      });
      return subs;
    }
  } catch (err) {
    console.warn('Firestore fetch subsidies info:', err);
  }
  return OFFICIAL_SUBSIDIES;
}

/**
 * Sync citizen saved application to Firestore Cloud
 */
export async function syncUserSavedApplication(userId: string, schemeId: string, isSaved: boolean): Promise<void> {
  if (typeof window === 'undefined' || !db || !userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      userId,
      updatedAt: new Date().toISOString(),
      savedApplications: isSaved ? arrayUnion(schemeId) : arrayRemove(schemeId)
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore sync user application info:', err);
  }
}
