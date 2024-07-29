import express from "express";
import cors from "cors";
import sequelize from "./database";
import Pokemon from "./models/Pokemon";
import User from "./models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

const app = express();
const port = 3001;
const secretKey = "secret_key";

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Username already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (user && (await user.validatePassword(password))) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/api/caugtPokemons", authenticateJWT, async (req, res) => {
  const pokemons = await Pokemon.findAll();
  res.json(pokemons);
});

app.post("/api/catch", authenticateJWT, async (req, res) => {
  const { name } = req.body;
  const caughtPokemon = await Pokemon.create({ name });
  res.json(caughtPokemon);
});

app.post("/api/release", authenticateJWT, async (req, res) => {
  const { name } = req.body;
  const releasedPokemon = await Pokemon.destroy({ where: { name } });
  res.json(releasedPokemon);
});

app.get("/api/pokemonTypes", authenticateJWT, async (req, res) => {
  const types = await axios.get("https://pokeapi.co/api/v2/type");
  const typeNames = types.data.results.map(
    (type: { name: string }) => type.name
  );
  res.json(typeNames);
});

app.post("/api/pokemonsOfType", authenticateJWT, async (req, res) => {
  const { type } = req.body;
  const types = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  const pokemons = types.data.pokemon.map(
    (pokemon: { pokemon: { name: string } }) => pokemon.pokemon.name
  );
  res.json(pokemons);
});

app.post("/api/searchPokemon", authenticateJWT, async (req, res) => {
  const { name } = req.body;
  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonData = {
    // i don't if this the curret picture i need, but i only know so little about pokemon
    picture: pokemon.data.sprites.other.dream_world.front_default,
    name: pokemon.data.name,
    weight: pokemon.data.weight,
    height: pokemon.data.height,
    abilities: pokemon.data.abilities.map(
      (ability: any) => ability.isHidden === "false" && ability.ability.name
    ),
  };
  res.json(pokemonData);
});

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
