import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Pokemon extends Model {
  public id!: number;
  public name!: string;
  public owner!: string;
  public weight!: number;
  public height!: number;
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

    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    owner: {
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
