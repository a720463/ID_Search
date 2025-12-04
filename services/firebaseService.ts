
import { db } from '../firebaseConfig';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Entry } from '../types';

const COLLECTION_NAME = 'kpRacingTeamEntries'; // Firestore collection name

/**
 * Sets up a real-time listener for entries in Firestore.
 * @param {function(Entry[]): void} callback - A callback function that receives the updated list of entries.
 * @returns {function(): void} An unsubscribe function to stop listening to updates.
 */
export const subscribeToEntries = (callback: (entries: Entry[]) => void) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'asc')); // Order by creation time if available, otherwise by id or a default field.
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const entries: Entry[] = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    } as Entry)); // Cast to Entry, assuming data matches interface
    callback(entries);
  }, (error) => {
    console.error("Error subscribing to entries:", error);
    // Optionally handle error state in the UI
  });

  return unsubscribe;
};

/**
 * Adds a new entry to Firestore.
 * @param {Omit<Entry, 'id'>} entry - The entry data without an ID.
 */
export const addEntry = async (entry: Omit<Entry, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...entry,
      createdAt: new Date(), // Add a timestamp for ordering
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

/**
 * Updates an existing entry in Firestore.
 * @param {Entry} entry - The complete entry object, including its ID.
 */
export const updateEntry = async (entry: Entry): Promise<void> => {
  try {
    const entryRef = doc(db, COLLECTION_NAME, entry.id);
    await updateDoc(entryRef, {
      lineName: entry.lineName,
      gameId: entry.gameId,
    });
    console.log("Document updated with ID: ", entry.id);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

/**
 * Deletes an entry from Firestore.
 * @param {string} id - The ID of the entry to delete.
 */
export const deleteEntry = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};
