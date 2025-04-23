import { DataTypes } from "sequelize";
import db from "../lib/conf_db";

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  login:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
    tableName: 'user',
    timestamps: false
}
);

export default User;
