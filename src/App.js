import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const API = "/api/files";

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await axios.post(`${API}/upload`, formData);
    load();
  };

  const load = async () => {
    const res = await axios.get(API);
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
      <h3>Files</h3>
      <ul>
        {data.map((f) => (
          <li key={f.id}>
            <a href={f.fileUrl} target="_blank" rel="noreferrer">
              {f.fileName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;