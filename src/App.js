import React, { useEffect, useState } from "react";
import "./styles.css";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
var noteChanged = false;
function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://9k43gt-5000.csb.app/notes")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);
  useEffect(() => {
    if (noteChanged) {
      fetch("https://9k43gt-5000.csb.app/new-note", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(notes),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [notes]);
  function addToNotes(props) {
    noteChanged = true;
    setNotes((prevValue) => {
      return [...prevValue, props];
    });
  }

  function deleteNote(id) {
    noteChanged = true;
    setNotes((prevValue) => {
      return prevValue.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <CreateArea onAdd={addToNotes} />
      {notes.map((note, index) => {
        return (
          <Note
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
