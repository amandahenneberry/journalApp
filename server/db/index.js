//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Entry = require('./models/Entry')

//associations could go here!
User.hasMany(Entry, {as: 'entries', onDelete: 'cascade'})
Entry.belongsTo(User, {foreignKey: 'userId'});

module.exports = {
  db,
  models: {
    User,
    Entry
  },
}
