'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.posts.belongsTo(models.users);
      models.posts.hasMany(models.likes);
      models.posts.hasMany(models.comments);
      models.posts.belongsToMany(models.tags, { through: 'postTag'}); /** 다대다 관계 */
    }
  }
  posts.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    contents: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
    total_likes: DataTypes.INTEGER,
    address: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};