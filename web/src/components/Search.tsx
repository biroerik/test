import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Pokemon from "./Pokemon";
import Cookies from "js-cookie";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [isClicked, setClicked] = useState<boolean>(false);
  const [isShowAll, setShowAll] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<{ name: string }[]>([]);
  const [pokemon, setPokemon] = useState<{
    name: string;
    picture: string;
    weight: number;
    height: number;
    abilities: string[];
  }>();
  const [sort, setSort] = useState<
    | {
        type: "weight" | "height" | undefined;
        order: "asc" | "desc" | undefined;
      }
    | undefined
  >(undefined);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "/api/searchPokemon",
        { name: search },
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
      setClicked(true);
      setPokemon(response.data);
    } catch (error) {
      console.error("There was an error searching!", error);
    }
  };

  const showAll = async () => {
    try {
      const response = await axios.post(
        "/api/caughtPokemons",
        { sort },
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
      setPokemons(response.data);
      setShowAll(true);
    } catch (error) {
      console.error("There was an error searching!", error);
    }
  };
  return (
    <div>
      <h1>Search</h1>

      <Grid container spacing={2} direction={"row"}>
        <Grid item>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="weight"
              control={<Radio />}
              label="Weight"
              onChange={(e) => setSort({ type: "weight", order: sort?.order })}
            />
            <FormControlLabel
              value="height"
              control={<Radio />}
              label="Height"
              onChange={(e) => setSort({ type: "height", order: sort?.order })}
            />
          </RadioGroup>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="desc"
              control={<Radio />}
              label="Descending"
              onChange={(e) => setSort({ type: sort?.type, order: "desc" })}
            />
            <FormControlLabel
              value="asc"
              control={<Radio />}
              label="Ascending"
              onChange={(e) => setSort({ type: sort?.type, order: "asc" })}
            />
          </RadioGroup>
          {isClicked && pokemon && <Pokemon name={pokemon.name} />}
        </Grid>
        <Grid item>
          <Button onClick={showAll}>Show all caught</Button>
          {isShowAll &&
            pokemons.map((pokemon) => <Pokemon name={pokemon.name} />)}
        </Grid>
      </Grid>
    </div>
  );
};

export default Search;
