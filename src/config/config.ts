module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "bingo_reunion",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "username",
    password: "password",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "username",
    password: "password",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
