/* eslint-disable */

module.exports =  function (sequelize, DataTypes) {
  var Subarea = sequelize.define("Subarea", {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  },{
    timestamps: false
  });

  Subarea.associate = function(models) {
    Subarea.hasMany(models.Group);
    Subarea.hasMany(models.Hint);
    Subarea.hasMany(models.SubareaStatus);
  }

  return Subarea;
}
