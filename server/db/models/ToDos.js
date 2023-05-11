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
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
  
  module.exports = ToDos;