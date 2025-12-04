
import React, { useState, useEffect, useCallback } from 'react';
import { Entry } from './types';
import { subscribeToEntries, addEntry, updateEntry, deleteEntry } from './services/firebaseService'; // Import Firebase service
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  // Subscribe to Firebase entries on initial mount
  useEffect(() => {
    const unsubscribe = subscribeToEntries((fetchedEntries) => {
      setEntries(fetchedEntries);
      setLoading(false); // Data loaded, set loading to false
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  const handleSaveEntry = useCallback(async (entryToSave: Entry) => {
    try {
      if (editingEntry) {
        // Update existing entry in Firebase
        await updateEntry(entryToSave);
        setEditingEntry(null); // Clear editing state
      } else {
        // Add new entry to Firebase
        // Firebase will assign an ID, so we don't need to generate one here
        await addEntry({ lineName: entryToSave.lineName, gameId: entryToSave.gameId });
      }
    } catch (error) {
      console.error("Failed to save entry:", error);
      // Optionally show an error message to the user
    }
  }, [editingEntry]);

  const handleEditEntry = useCallback((id: string) => {
    const entryToEdit = entries.find(entry => entry.id === id);
    if (entryToEdit) {
      setEditingEntry(entryToEdit);
    }
  }, [entries]);

  const handleDeleteEntry = useCallback(async (id: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('確定要刪除這筆資料嗎？')) {
      try {
        await deleteEntry(id); // Delete from Firebase
        if (editingEntry?.id === id) {
          setEditingEntry(null); // Clear editing state if the deleted entry was being edited
        }
      } catch (error) {
        console.error("Failed to delete entry:", error);
        // Optionally show an error message to the user
      }
    }
  }, [editingEntry]);

  const handleCancelEdit = useCallback(() => {
    setEditingEntry(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-indigo-700">
          KP 車隊 ID 申報處
        </h1>

        <EntryForm onSave={handleSaveEntry} editingEntry={editingEntry} onCancelEdit={handleCancelEdit} />

        {loading ? (
          <div className="text-center text-gray-600 text-lg font-medium mt-8">載入中...</div>
        ) : (
          <EntryList entries={entries} onEdit={handleEditEntry} onDelete={handleDeleteEntry} />
        )}
      </div>
    </div>
  );
}

export default App;