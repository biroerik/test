import { InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import PokemonsOfType from "./PokemonsOfType";

const PokemonTypes = () => {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const fetchPokemonType = async () => {
      try {
        const response = await axios.get("api/pokemonTypes", {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        });
        setPokemonTypes(response.data);
      } catch (error) {
        console.error("There was an error fetching the message!", error);
      }
    };

    fetchPokemonType();
  }, []);

  if (!pokemonTypes) {
    return <CircularProgress />;
  }

  if (selectedType !== "") {
    return <PokemonsOfType type={selectedType} />;
  }

  return (
    <div>
      <h1>Pokemon Types</h1>

      <InputLabel id="pokemonTypeSelect">Types</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="pokemonTypeSelect"
        value={selectedType}
        label="Pokemon Types"
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {pokemonTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default PokemonTypes;
