/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var CarHistory = sequelize.define("CarHistory", {
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  },{
    timestamps: true
  });

  return CarHistory;
}
