/* eslint-disable */
module.exports = function (sequelize, DataTypes) {
  var Hint = sequelize.define("Hint", {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    rdx: DataTypes.INTEGER,
    rdy: DataTypes.INTEGER,
    address: DataTypes.STRING
  });

  Hint.associate = function (models) {
    Hint.belongsTo(models.Subarea, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Hint.belongsTo(models.HintType, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Hint.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Hint;
}
