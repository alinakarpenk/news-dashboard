import { DataTypes } from "sequelize";
import db from "../lib/conf_db";
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
  userId: {
    type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      }
  },
  newsId: {
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
    imestamps: false
}
);

User.hasMany(Comments, { foreignKey: "userId" });
News.hasMany(Comments, { foreignKey: "newsId" });
Comments.belongsTo(User, { foreignKey: "userId" });
Comments.belongsTo(News, { foreignKey: "newsId" });


export default Comments;
