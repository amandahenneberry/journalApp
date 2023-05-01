//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Entry = require('./models/Entry')
const ToDos = require('./models/ToDos')

//associations could go here!
User.hasMany(Entry, {as: 'entries', onDelete: 'cascade'})
Entry.belongsTo(User, {foreignKey: 'userId', as: 'entry'});
User.hasMany(ToDos, {as: 'todos', onDelete: 'cascade'});
ToDos.belongsTo(User, {foreignKey: 'userId', as: 'todos'})

module.exports = {
  db,
  models: {
    User,
    Entry,
    ToDos
  },
}
