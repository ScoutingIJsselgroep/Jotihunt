/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var Car = sequelize.define("Car", {
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  },{
    timestamps: true
  });

  return Car;
}
