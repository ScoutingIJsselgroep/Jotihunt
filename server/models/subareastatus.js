/* eslint-disable */

module.exports =  function (sequelize, DataTypes) {
  var SubareaStatus = sequelize.define("SubareaStatus", {

  });

  SubareaStatus.getLatest = function (callback) {
    sequelize.query("SELECT s1.* "+
    "FROM SubareaStatuses s1 LEFT JOIN SubareaStatuses s2 "+
    "ON (s1.SubareaId = s2.SubareaId AND s1.id < s2.id) "+
    "WHERE s2.id IS NULL;").then(results => callback(results[0]));
  }

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
