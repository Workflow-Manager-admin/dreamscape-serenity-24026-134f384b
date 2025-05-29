import React, { useState, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * Component for users to log their dreams (journal).
 * Renders a calming journal UI, allowing for entry, editing, and submission.
 * Calls onAddDream (prop) to save dream in MainContainer.
 *
 * Props:
 *   - onAddDream: function({text: string, date: string})
 *   - entries: array of saved dream entries (not used directly here)
 */
function DreamLogger({ onAddDream, entries }) {
  // State: dream text, error, and focus
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  // Handler for submission
  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!text.trim()) {
      setError("Please describe your dream.");
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }
    // Upward state: submit to parent/MainContainer
    onAddDream({
      text: text.trim(),
      date: new Date().toISOString(),
    });
    // Clear UI
    setText("");
    setError("");
    // Keep focus for calming journaling
    if (textareaRef.current) textareaRef.current.focus();
  };

  // Gentle fade in for journal, peaceful palette and soft box styles
  return (
    <section className="dream-logger" style={{
      background: "linear-gradient(135deg, #232a4d 0%, #2e1246 100%)",
      borderRadius: "16px",
      boxShadow: "0 7px 32px 0 rgba(80,11,98,0.12)",
      margin: "40px auto",
      maxWidth: "570px",
      padding: "34px 28px 28px 28px",
      position: "relative"
    }}>
      <h2
        style={{
          fontWeight: 700,
          color: "#FFD6A5",
          marginBottom: "0.7em",
          fontSize: "2rem",
          letterSpacing: "1px",
          textShadow: "0 1px 14px #1A1A1A30"
        }}
      >
        Dream Journal
      </h2>
      <div style={{
        color: "var(--text-secondary)",
        fontSize: "1.09rem",
        marginBottom: "1.3em",
        lineHeight: "1.6"
      }}>
        Let your thoughts flow softly.<br />
        <span style={{ color: "#b19bf920" }}>·</span> Capture last night’s adventure or insight.<br />
        <span style={{ color: "#AEE1F9" }}>·</span> Free-write, no judgment. 
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          ref={textareaRef}
          rows={6}
          maxLength={1200}
          style={{
            borderRadius: "11px",
            padding: "17px 13px",
            border: error
              ? "2px solid #E87A41"
              : "1.5px solid var(--border-color)",
            background: "rgba(35,36,77,0.96)",
            fontSize: "1.1rem",
            color: "#fff",
            marginBottom: "0.7em",
            outline: "none",
            resize: "vertical",
            minHeight: 110,
            boxShadow: error
              ? "0 0 0 2px #E87A4140"
              : "0 1px 8px 0 #55555517",
            transition: "box-shadow 0.2s, border 0.2s"
          }}
          aria-label="Write your dream here"
          placeholder="Write your dream here... (e.g. I was drifting above glowing clouds...)"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
        />
        {error && (
          <div style={{ color: "#E87A41", fontSize: "0.97rem", marginBottom: "7px" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-large"
          style={{
            alignSelf: "flex-end",
            marginTop: ".4em",
            minWidth: "110px",
            background: "linear-gradient(90deg,#5de4ee,#fa00d9 80%)",
            color: "#fff",
            fontWeight: 600,
            letterSpacing: "1px",
            border: "none",
            borderRadius: "7px",
            fontSize: "1.08rem",
            boxShadow: "0 2px 14px 0 #5de4ee11",
            transition: "background 0.18s",
            cursor: "pointer"
          }}
        >
          Save Dream
        </button>
        <div style={{
          fontSize: "0.96em",
          color: "var(--text-secondary)",
          marginTop: "6px"
        }}>
          Your dreams are private and stored on this device.
        </div>
      </form>
      {/* Soft visual overlay for dreamy effect */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          zIndex: 0,
          top: "-54px",
          left: "-66px",
          width: "180px",
          height: "140px",
          background: "radial-gradient(at 70% 40%, #aee1f970 0%, transparent 70%)",
          opacity: 0.88,
          filter: "blur(4px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          zIndex: 0,
          bottom: "-42px",
          right: "-50px",
          width: "130px",
          height: "60px",
          background: "radial-gradient(circle at 32% 60%, #fa00d930 0%, transparent 65%)",
          opacity: 0.68,
          filter: "blur(11px)",
          pointerEvents: "none"
        }}
      />
    </section>
  );
}

export default DreamLogger;
