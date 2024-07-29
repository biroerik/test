import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

interface IProps {
  type: string;
}
const PokemonsOfType = ({ type }: IProps) => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  useEffect(() => {
    const PokemonsOfType = async () => {
      try {
        const response = await axios.post(
          "api/pokemonsOfType",
          { type },
          {
            headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
          }
        );
        setPokemons(response.data);
      } catch (error) {
        console.error("There was an error fetching the message!", error);
      }
    };

    PokemonsOfType();
  }, [type]);

  if (!pokemons) {
    return <CircularProgress />;
  }
  if (selectedPokemon !== "") {
    return <Pokemon name={selectedPokemon} />;
  }
  return (
    <FormControl>
      <FormLabel id="pokemonSelect">Pokemons</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedPokemon}
        onChange={(e) => setSelectedPokemon(e.target.value)}
      >
        {pokemons.map((name) => (
          <FormControlLabel
            key={name}
            value={name}
            control={<Radio />}
            label={name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default PokemonsOfType;
