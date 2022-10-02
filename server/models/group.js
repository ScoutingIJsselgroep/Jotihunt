/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define("Group", {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    visits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    // points
    hunt_points: DataTypes.INTEGER,
    counter_hunt_points: DataTypes.INTEGER,
    assignment_points: DataTypes.INTEGER,
    hint_points: DataTypes.INTEGER,
    photo_assignment_points: DataTypes.INTEGER,
    penalty_points: DataTypes.INTEGER
  }, {
    timestamps: false
  });

  Group.associate = function (models) {
    Group.belongsTo(models.Subarea, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true,
        defaultValue: 7
      }
    })
  }

  return Group;
}