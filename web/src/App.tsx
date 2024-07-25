import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get("/api/message");
        setMessage(response.data.message);
      } catch (error) {
        console.error("There was an error fetching the message!", error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
};

export default App;
