import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Pokemon extends Model {
  public id!: number;
  public name!: string;
}

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pokemons",
  }
);

export default Pokemon;
