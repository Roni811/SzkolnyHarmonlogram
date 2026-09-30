import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, increment } from "firebase/firestore";

// Konfiguracja Twojego projektu szkolnyharmonlogram
const firebaseConfig = {
  apiKey: "TWÓJ_API_KEY", // Znajdziesz w Ustawieniach Projektu w Firebase Console
  authDomain: "szkolnyharmonlogram.firebaseapp.com",
  projectId: "szkolnyharmonlogram",
  storageBucket: "szkolnyharmonlogram.firebasestorage.app",
  messagingSenderId: "397628657503",
  appId: "TWÓJ_APP_ID" // Znajdziesz w Ustawieniach Projektu
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function inicjalizujLicznik(idElementuHTML) {
  const docRef = doc(db, "statystyki", "glowna");

  try {
    // Zwiększ licznik o 1 (jeśli dokument nie istnieje, zostanie automatycznie utworzony)
    await setDoc(docRef, { wyswietlenia: increment(1) }, { merge: true });

    // Pobierz z bazy aktualną liczbę wyświetleń, aby ją pokazać
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const aktualnaLiczba = docSnap.data().wyswietlenia;
      document.getElementById(idElementuHTML).textContent = aktualnaLiczba;
    }
  } catch (error) {
    console.error("Błąd podczas aktualizacji licznika:", error);
  }
}
