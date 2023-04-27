const Sequelize = require('sequelize')
const db = require('../db')

const ToDoList = db.define('todos', {
    task: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  module.exports = ToDoList;