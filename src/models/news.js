import { DataTypes } from "sequelize";
import db from "../lib/conf_db.js";
import User from './user.js'

const News = db.define("News", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
},
{
    tableName: 'news',
    timestamps: false
}
);

User.hasMany(News, { foreignKey: "user_id" });
News.belongsTo(User, { foreignKey: "user_id" });

export default News;
