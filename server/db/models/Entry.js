const Sequelize = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  date: {
    type: Sequelize.STRING
    },
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: true
  },
})

module.exports = Entry