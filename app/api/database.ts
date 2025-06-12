import "reflect-metadata";
import { DataSource } from "typeorm";
import "pg";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["entity/*.entity.ts"],
  synchronize: true,
  logging: false,
  ssl: {
    // <--- THIS IS THE KEY PART FOR SSL/TLS
    rejectUnauthorized: false, // IMPORTANT: Set to true in production if you have the CA cert
  },
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log("Database connected...");
  })
  .catch((error) => console.log(error));
