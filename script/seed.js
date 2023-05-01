'use strict'

const {db, models: {User, Entry, ToDos} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  // Creating Entries

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
 

  // Creating Entries
  const entries = await Promise.all([
    Entry.create({ date: '03/11/2023', title: 'Title test 1 CODY', content: 'content test', userId: 1}),
    Entry.create({ date: '04/20/2023', title: 'MMURPHY test', content: 'content test', userId: 2}),
    Entry.create({ date: '05/01/2023', title: 'Title test 2 CODY', content: 'content test', userId: 1}),
    Entry.create({ date: '02/22/2023', title: '2nd MURPHY test', content: 'content test', userId: 2})

  ])

  const  todos = await Promise.all([
    ToDos.create({ taskName: 'walk dog', details: '20 min',  userId: 1}),
    ToDos.create({ taskName: 'walk cat', details: '5  min',  userId: 1}),
    ToDos.create({ taskName: 'call  doctor', details: 'make appointment...',  userId: 2}),
    ToDos.create({ taskName: 'do the dishes', details: '20 min',  userId: 2}),
  ])

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }, entries: {
      cody1: entries[0],
      murphy1: entries[1],
      cody2: entries[2],
      murphy2: entries[3]
    },
    todos : {
      cody1: todos[0],
      murphy1: todos[1],
      cody2: todos[2],
      murphy2: todos[3]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
