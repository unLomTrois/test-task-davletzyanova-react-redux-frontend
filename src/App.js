import React from "react";
import "./App.css";
import Notes from "./features/notes/Notes";

const App = () => {
  return (
    <div className="App container-md">
      <div className="my-3 mx-auto">
        <Notes />
      </div>
    </div>
  );
}

export default App;
