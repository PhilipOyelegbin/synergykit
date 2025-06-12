"use client";

import { useState, useEffect } from "react";
import AppLayout from "../AppLayout";

const NOTES_STORAGE_KEY = "synergykit-notes";

interface NoteData {
  text: string;
  timestamp: string;
}

function NotesPage() {
  const [note, setNote] = useState("");
  const [savedNoteText, setSavedNoteText] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const storedNoteData = localStorage.getItem(NOTES_STORAGE_KEY);
    if (storedNoteData) {
      try {
        const parsedData: NoteData = JSON.parse(storedNoteData);
        if (parsedData.text) {
          setSavedNoteText(parsedData.text);
          setNote(parsedData.text); // Pre-fill textarea with last saved note
        }
        if (parsedData.timestamp) {
          setLastSaved(new Date(parsedData.timestamp));
        }
      } catch (e) {
        console.error("Failed to parse notes from localStorage", e);
        showMessage("error", "Could not load previously saved note.");
        localStorage.removeItem(NOTES_STORAGE_KEY); // Clear corrupted data
      }
    }
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveNote = () => {
    const timestamp = new Date();
    try {
      const noteData: NoteData = {
        text: note,
        timestamp: timestamp.toISOString(),
      };
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(noteData));
      setSavedNoteText(note);
      setLastSaved(timestamp);
      showMessage("success", "Note saved successfully!");
    } catch (e) {
      console.error("Failed to save note to localStorage", e);
      showMessage("error", "Failed to save note. Storage might be full.");
    }
  };

  const handleClearEditor = () => {
    setNote("");
    // Does not clear the saved note from storage, only the editor
  };

  const handleDeleteSavedNote = () => {
    if (
      window.confirm(
        "Are you sure you want to delete the saved note? This action cannot be undone."
      )
    ) {
      localStorage.removeItem(NOTES_STORAGE_KEY);
      setSavedNoteText("");
      setLastSaved(null);
      setNote(""); // Also clear editor
      showMessage("success", "Saved note deleted.");
    }
  };

  return (
    <AppLayout title="My Notes">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="note-input"
            className="block text-sm font-medium text-[#1f2937] mb-1"
          >
            Write your note:
          </label>
          <textarea
            id="note-input"
            rows={10}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#3b82f6] focus:border-[#3b82f6] sm:text-sm resize-y"
            placeholder="Start typing your thoughts here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            aria-label="Note input area"
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              message.type === "success"
                ? "bg-[#34d399] text-[#059669]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleSaveNote}
            disabled={!note.trim()}
            className="flex-1 bg-[#3b82f6] text-white px-6 py-3 rounded-md hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition duration-150 ease-in-out font-medium disabled:opacity-50"
          >
            Save Note
          </button>
          <button
            onClick={handleClearEditor}
            className="flex-1 bg-[#6b7280] text-white px-6 py-3 rounded-md hover:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f2937] transition duration-150 ease-in-out font-medium"
          >
            Clear Editor
          </button>
        </div>

        {savedNoteText && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-[#1f2937]">
                Last Saved Note
              </h3>
              <button
                onClick={handleDeleteSavedNote}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
                title="Delete saved note"
              >
                Delete Saved Note
              </button>
            </div>
            <div className="p-4 bg-[#f9fafb] rounded-md border border-gray-200">
              <p className="whitespace-pre-wrap text-[#1f2937] break-words">
                {savedNoteText}
              </p>
              {lastSaved && (
                <p className="text-xs text-[#6b7280] mt-3 pt-3 border-t border-gray-300">
                  Saved on: {lastSaved.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}
        {!savedNoteText && (
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-[#1f2937] p-4 bg-[#f9fafb] rounded-md border border-gray-200">
              No notes saved yet. Start typing above and click {'"'}Save Note
              {'"'}.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default NotesPage;
