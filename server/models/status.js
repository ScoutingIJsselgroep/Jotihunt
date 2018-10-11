/* eslint-disable */

module.exports = function (sequelize, DataTypes) {
  const Status = sequelize.define("Status", {
    status: DataTypes.STRING,
    statuscolor: DataTypes.STRING,
    description: DataTypes.STRING
  },{
    timestamps: false
  });

  Status.associate = function(models) {
    Status.hasMany(models.SubareaStatus);
  }

  return Status;
}
