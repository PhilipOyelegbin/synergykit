import "reflect-metadata";
import { DataSource } from "typeorm";
import "pg";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "dpg-d14ncjruibrs73akv5pg-a.oregon-postgres.render.com",
  port: 5432,
  username: "synergykit_db",
  password: "fJsCCj0HaTtEpKIDIqO6PKKcKKLcAX7N",
  database: "synergykit_db",
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
