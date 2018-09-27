/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define("Group", {
    name: DataTypes.STRING,
    town: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    visits: DataTypes.INTEGER,
  },{
    timestamps: false
  });

  Group.associate = function (models) {
    Group.belongsTo(models.Subarea, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Group;
}
