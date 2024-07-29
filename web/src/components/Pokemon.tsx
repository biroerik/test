import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CatchOrRelease from "./CatchOrRelease";

interface IProps {
  name: string;
}
const Pokemon = ({ name }: IProps) => {
  const [pokemon, setPokemon] = useState<{
    name: string;
    picture: string;
    weight: number;
    height: number;
    abilities: string[];
  }>();
  useEffect(() => {
    const Pokemon = async () => {
      try {
        const response = await axios.post(
          "api/searchPokemon",
          { name },
          {
            headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
          }
        );
        setPokemon(response.data);
      } catch (error) {
        console.error("There was an error fetching the message!", error);
      }
    };

    Pokemon();
  }, [name]);

  if (!pokemon) {
    return <CircularProgress />;
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={pokemon.picture}
        title={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokemon.weight} kg, {pokemon.height} cm
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {pokemon.abilities.join(", ")}
        </Typography>
      </CardContent>
      <CardActions>
        <CatchOrRelease name={pokemon.name} />
      </CardActions>
    </Card>
  );
};

export default Pokemon;
