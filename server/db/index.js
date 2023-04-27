//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Entry = require('./models/Entry')
const ToDoList = require('./models/ToDoList')

//associations could go here!
User.hasMany(Entry, {as: 'entries', onDelete: 'cascade'})
Entry.belongsTo(User, {foreignKey: 'userId', as: 'entry'});
User.hasOne(ToDoList, {as: 'todos'});
ToDoList.belongsTo(User, {foreignKey: 'userId', as: 'todos'})

module.exports = {
  db,
  models: {
    User,
    Entry,
    ToDoList
  },
}
