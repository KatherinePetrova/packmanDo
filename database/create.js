let mysql = require("mysql");
let util = require("util");

//connection with mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ec03537c",
  insecureAuth: true
});

con.query = util.promisify(con.query);

async function createTables() {
  let database = "labyrinth";

  try {
    await con.query(`CREATE DATABASE ${database}`);
    con.changeUser({ database });
    console.log("Database created successfully!");

    //player table
    await con.query(
      `CREATE TABLE session (id INT AUTO_INCREMENT PRIMARY KEY,  matrix JSON, enemies_count INT DEFAULT 1)`
    );
    console.log("Session table created successfully!");

    await con.query(
      `CREATE TABLE player (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        posX INT, 
        posY INT, 
        speed INT, 
        attack INT,
        attackLimit INT DEFAULT 2,
        attackRange INT,
        health INT, 
        viewFront INT, 
        viewSide INT, 
        viewBack INT)`
    );
    console.log("Player table created successfully!");

    await con.query(
      `CREATE TABLE loot_type (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), amount INT)`
    );
    console.log("loot_type table created successfully!");

    await con.query(
      `CREATE TABLE loot (id INT AUTO_INCREMENT PRIMARY KEY, posX INT, posY INT, loot_type INT REFERENCES loot_type(id))`
    );
    console.log("loot table created successfully!");
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = createTables();
