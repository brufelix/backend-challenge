export const envs = {
  port: process.env.PORT || 3333,
  database: {
    host: process.env.DATABASE_HOST,
    databaseName: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    port: process.env.DATABASE_PORT || 5432,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_VALIDITY_DURATION_IN_DAYS,
  },
};
