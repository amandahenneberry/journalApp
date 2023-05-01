const Sequelize = require('sequelize')
const db = require('../db')

const ToDos = db.define('todos', {
    taskName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    details: {
      type: Sequelize.STRING
    },
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    }
  });
  
  module.exports = ToDos;