import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { load } from "js-yaml";

function App() {
  const ref = useRef();
  const [yaml, setYaml] = useState(null);

  useEffect(() => {
    const getYaml = async () => {
      const response = await fetch("/amr-config/application.yml");
      const text = await response.text();
      const json = await log(text);
      setYaml(json);
    };
    getYaml();
  }, [yaml]);

  const log = (v) => {
    return Promise.resolve(v)
      .then(load)
      .then((t) => JSON.stringify(t, null, 2));
  };

  const handleEditorChange = (value, event) => {
    console.log(event);
    console.log(value);
  };

  const onUpdateYml = (v) => {
    ref.current = v;
    console.log(v);
  };

  const handleSubmit = (v) => {
    console.log(v);
  };

  return (
    <>
      <div className="app-container">
        <div className="editor">
          <Editor
            theme="vs-dark"
            language="yaml"
            defaultValue={yaml}
            onChange={handleEditorChange}
            onMount={(editor) => onUpdateYml(editor)}
          />
        </div>
        <button className="submit-btn" onClick={() => handleSubmit(yaml)}>
          Update
        </button>
      </div>
    </>
  );
}

export default App;
