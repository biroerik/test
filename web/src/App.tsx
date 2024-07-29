import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Cookies from "js-cookie";
import PokemonTypes from "./components/PokemonTypes";
import { Button } from "@mui/material";
import Search from "./components/Search";

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | undefined>(Cookies.get("jwt"));

  const handleRegister = async () => {
    try {
      await axios.post("/api/register", { username, password });
      handleLogin(); // Automatically log in after registration
    } catch (error) {
      console.error("There was an error registering!", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { username, password });
      setToken(response.data.token);
      Cookies.set("jwt", response.data.token);
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };
  const handleLogout = () => {
    setToken(undefined);
    Cookies.remove("jwt");
  };

  return (
    <div className="App">
      <header className="App-header">
        {token ? (
          <>
            <Search />
            <hr style={{ width: "100%" }} />
            <PokemonTypes />
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </header>
    </div>
  );
};

export default App;
