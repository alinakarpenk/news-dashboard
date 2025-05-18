import { DataTypes } from "sequelize";
import db from "../lib/conf_db.js";
import User from './user.js'
import News from './news.js'

const Comments = db.define("Comments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
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
  news_id: {
    type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: News,
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
    tableName: 'comments',
    timestamps: false
}
);

User.hasMany(Comments, { foreignKey: "user_id" });
News.hasMany(Comments, { foreignKey: "news_id" });
Comments.belongsTo(User, { foreignKey: "user_id" });
Comments.belongsTo(News, { foreignKey: "news_Id" });


export default Comments;
