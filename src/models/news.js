import { DataTypes } from "sequelize";
import db from "../lib/conf_db";
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
  userId: {
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
    imestamps: false
}
);

User.hasMany(News, { foreignKey: "userId" });
News.belongsTo(User, { foreignKey: "userId" });

export default News;
