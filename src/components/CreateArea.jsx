import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevValue) => {
      if (name === "title") {
        return { title: value, content: prevValue.content };
      } else {
        return { title: prevValue.title, content: value };
      }
    });
  }

  function handleClick(event) {
    props.onAdd(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }
  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note.content}
        />
        <button onClick={handleClick}>+</button>
      </form>
    </div>
  );
}

export default CreateArea;
