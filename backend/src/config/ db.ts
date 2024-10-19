import sqlite3 from 'sqlite3';
import path from 'path';

// Initialize the database with an absolute path
const dbPath = path.resolve(__dirname, '../../db', 'winedrops.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export default db;
