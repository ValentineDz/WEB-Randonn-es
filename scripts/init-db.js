import sqlite3 from "sqlite3";
import { open } from "sqlite";

const filename = "database.sqlite";

open({ filename, driver: sqlite3.Database })
  .then((db) => {
    return db.prepare(`
    CREATE TABLE IF NOT EXISTS randonnees (
      id INTEGER PRIMARY KEY,
      nom TEXT,
      description TEXT,
      adresse_depart TEXT
    );
  `);
  })
  .then((statement) => statement.run())
  .catch((error) => {
    console.error("Error creating database", error);
    // Exit with non-zero exit code to indicate failure.
    process.exit(1);
  });
