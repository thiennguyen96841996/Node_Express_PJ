// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "mysql",
    connection: {
      host: 'db',
      database: "express",
      user: "root",
      password: "rootpw",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      host: 'db',
      database: "express",
      user: "root",
      password: "rootpw",
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: 'db',
      database: "express",
      user: "root",
      password: "rootpw",
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
