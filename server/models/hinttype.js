/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var HintType = sequelize.define("HintType", {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    color: DataTypes.STRING,
  },{
    timestamps: false
  });

  HintType.associate = function(models) {
    HintType.hasMany(models.Hint);
  }

  return HintType;
}
