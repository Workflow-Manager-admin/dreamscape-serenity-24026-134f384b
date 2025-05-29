import React, { useState, useEffect, createContext, useContext } from "react";
import DreamLogger from "./DreamLogger";
import DreamVisuals from "./DreamVisuals";
import MoodSummary from "./MoodSummary";
import DreamArchive from "./DreamArchive";

/**
 * DreamContext for future extensibility (when using useContext across tree).
 * This exports a context and a hook.
 */
const DreamContext = createContext();

// Key for localStorage persistence
const LOCAL_STORAGE_KEY = "dreamscape_serenity.dreams";

/**
 * Load dream entries from localStorage
 * @returns {Array} Array of dream entries or empty array if none found.
 */
function loadDreamEntriesFromStorage() {
  try {
    const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    console.warn("Failed to load dream entries:", e);
    return [];
  }
}

/**
 * Save dream entries to localStorage
 * @param {Array} dreams
 */
function saveDreamEntriesToStorage(dreams) {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dreams));
  } catch (e) {
    console.warn("Failed to save dream entries:", e);
  }
}

/**
 * PUBLIC_INTERFACE
 * Main container for Dreamscape Serenity. Holds all core modules.
 * Manages dream entries and shares them with child components.
 */
function MainContainer() {
  // State: Initialize from localStorage if exists
  const [dreamEntries, setDreamEntries] = useState(() => loadDreamEntriesFromStorage());

  // Save dream entries whenever they change
  useEffect(() => {
    saveDreamEntriesToStorage(dreamEntries);
  }, [dreamEntries]);

  // PUBLIC_INTERFACE
  /** Add a new dream to the list and persist */
  const addDream = (dream) => {
    setDreamEntries((prev) => [
      ...prev,
      { ...dream, id: Date.now() }
    ]);
  };

  // Placeholder function for analyzing dreams (visuals/mood)
  // PUBLIC_INTERFACE
  const analyzeDreamMood = (dreamText) => {
    // TODO: analyze dream content and return a probable mood string (e.g. "peaceful", "anxious")
    return "peaceful";
  };

  // Placeholder context value structure
  const contextValue = {
    dreamEntries,
    addDream,
    analyzeDreamMood,
  };

  // Example prop interfaces for subcomponents (replace with real logic later):
  // DreamLogger: onAddDream(dream), entries
  // DreamVisuals: entries or last entry
  // MoodSummary: entries
  // DreamArchive: entries

  return (
    <DreamContext.Provider value={contextValue}>
      <div className="main-container">
        <h2>MainContainer</h2>
        {/* Pass handlers and props down as needed */}
        <DreamLogger
          onAddDream={addDream}
          entries={dreamEntries}
        />
        <DreamVisuals
          latestDream={dreamEntries[dreamEntries.length - 1] || null}
        />
        <MoodSummary
          entries={dreamEntries}
        />
        <DreamArchive
          entries={dreamEntries}
        />
      </div>
    </DreamContext.Provider>
  );
}

// PUBLIC_INTERFACE
/** Hook to access Dream Context in any child component */
export function useDreamContext() {
  return useContext(DreamContext);
}

export default MainContainer;
