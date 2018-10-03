/* eslint-disable */

module.exports =  function (sequelize, DataTypes) {
  var SubareaStatus = sequelize.define("SubareaStatus", {

  });

  SubareaStatus.getLatest = function (callback) {
    sequelize.query("SELECT s1.*, Statuses.status, Subareas.name, Subareas.color, Statuses.statuscolor, Subareas.latCenter, Subareas.lonCenter "+
    "FROM Statuses, Subareas, SubareaStatuses s1 LEFT JOIN SubareaStatuses s2 "+
    "ON (s1.SubareaId = s2.SubareaId AND s1.id < s2.id) "+
    "WHERE s2.id IS NULL AND Statuses.id = s1.StatusId AND Subareas.id = s1.SubareaId;").then(results => callback(results[0]));
  };

  SubareaStatus.associate = function (models) {
    SubareaStatus.belongsTo(models.Status, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    SubareaStatus.belongsTo(models.Subarea, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return SubareaStatus;
}
