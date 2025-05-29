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

/**
 * PUBLIC_INTERFACE
 * Main container for Dreamscape Serenity. Holds all core modules.
 * Manages dream entries and shares them with child components.
 */
function MainContainer() {
  // State: An array of dream objects. Each dream should have at least { id, text, date, mood }
  const [dreamEntries, setDreamEntries] = useState([
    // Placeholder: Example dream entry
    // { id: 1, text: "Flying over pastel mountains", date: new Date().toISOString(), mood: "peaceful" }
  ]);

  // Placeholder function for adding dreams (to be implemented)
  const addDream = (dream) => {
    setDreamEntries((prev) => [
      ...prev,
      { ...dream, id: Date.now() }
    ]);
  };

  // Placeholder function for analyzing dreams (visuals/mood)
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
