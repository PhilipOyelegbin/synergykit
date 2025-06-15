"use client";

import { useState, useEffect } from "react";
import AppLayout from "../AppLayout";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ErrorToast, SuccessToast } from "@/app/_components/toast";

function NotesPage() {
  const { data, status } = useSession();
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [sucMessage, setSucMessage] = useState("");

  const handleSaveNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/note`, {
        method: "POST",
        body: JSON.stringify({ userId: data?.user?.id, description: note }),
      });
      if (!response.ok) {
        setErrMessage(response.statusText ?? "Failed to save note");
      } else {
        const result = await response.json();
        setSucMessage(result.message ?? "Note saved successfully");
        setNote("");
      }
    } catch (err) {
      setErrMessage(`${err}` || "Internal server error");
    }
  };

  const handleDeleteSavedNote = async (id: number) => {
    try {
      if (
        window.confirm(
          "Are you sure you want to delete the saved note? This action cannot be undone."
        )
      ) {
        const response = await fetch(`/api/note/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          setErrMessage(response.statusText ?? "Failed to delete note");
        } else {
          const result = await response.json();
          setSucMessage(result.message ?? "Note deleted successfully");
        }
      }
    } catch (err) {
      setErrMessage(err.message ?? "Internal server error");
    }
  };

  useEffect(() => {
    if (status !== "authenticated") {
      redirect("/auth/login");
    }

    if (data?.user?.id) {
      const getUserNotes = async () => {
        try {
          const response = await fetch(`/api/user/${data?.user?.id}`);
          if (!response.ok) {
            setErrMessage(response.statusText ?? "Failed to fetch notes");
          }

          const userNotes = await response.json();
          if (userNotes && userNotes) {
            setSavedNote(userNotes.data.note);
          }
        } catch (error) {
          setErrMessage(error ?? "Internal server error");
        }
      };

      getUserNotes();
    }

    if (errMessage) {
      const timer = setTimeout(() => {
        setErrMessage("");
      }, 10000);

      return () => clearTimeout(timer);
    }

    if (sucMessage) {
      const timer = setTimeout(() => {
        setSucMessage("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [status, data, errMessage, sucMessage]);

  return (
    <AppLayout title="My Notes">
      <div className="space-y-6">
        <form onSubmit={handleSaveNote} className="space-y-4">
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

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              disabled={!note.trim()}
              className="cursor-pointer flex-1 bg-[#3b82f6] text-white px-6 py-3 rounded-md hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition duration-150 ease-in-out font-medium disabled:opacity-50"
            >
              Save note
            </button>
            <button
              type="reset"
              onClick={() => setNote("")}
              className="cursor-pointer flex-1 bg-[#6b7280] text-white px-6 py-3 rounded-md hover:bg-[#1f2937] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f2937] transition duration-150 ease-in-out font-medium"
            >
              Clear Test
            </button>
          </div>
        </form>

        {savedNote && savedNote.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
            {savedNote.map((noteItem, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-3">
                <h3 className="text-xl font-semibold text-[#1f2937] mb-4">
                  {noteItem.description}
                </h3>
                <button
                  className="cursor-pointer flex-1 bg-rose-400 text-white px-6 py-3 rounded-md hover:bg-rose-600 transition duration-150 ease-linear font-medium"
                  onClick={() => handleDeleteSavedNote(noteItem.id)}
                >
                  Trash
                </button>
              </div>
            ))}
          </div>
        )}

        {!savedNote ||
          (savedNote.length <= 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-[#1f2937] p-4 bg-[#f9fafb] rounded-md border border-gray-200">
                No notes saved yet. Start typing above and click {'"'}Save Note
                {'"'}.
              </p>
            </div>
          ))}

        {errMessage && <ErrorToast message={errMessage} />}
        {sucMessage && <SuccessToast message={sucMessage} />}
      </div>
    </AppLayout>
  );
}

export default NotesPage;
