/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var ApiType = sequelize.define("ApiType", {
    name: DataTypes.STRING
  },{
    timestamps: false
  });

  ApiType.associate = function(models) {
    ApiType.hasMany(models.Api);
  }

  return ApiType;
}
