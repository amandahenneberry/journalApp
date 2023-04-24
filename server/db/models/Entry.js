const Sequelize = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  date: {
    // type: Sequelize.STRING,
    // allowNull: false
    type: Sequelize.STRING,
   allowNull: false
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
    type: Sequelize.BLOB,
    allowNull: true
  },
}, {timestamps: true})

module.exports = Entry