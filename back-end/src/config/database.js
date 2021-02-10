module.exports = {
    development: {
        username: "root",
        password: "pass123",
        database: "register2",
        host: "127.0.0.1",
        port: "3306",
        dialect: "mysql"
      },
      test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
      },
      production: {
        username: "azure",
        password: "6#vWHD_$",
        database: "prestou-app",
        host: "127.0.0.1",
        port: "55822",
        dialect: "mysql"
      }
};