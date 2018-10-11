/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var Api = sequelize.define("Api", {
    messageId: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING(5000),
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    points: DataTypes.INTEGER
  });

  Api.associate = function (models) {
    Api.belongsTo(models.ApiType, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Api;
}
