import { pool } from "./config";

async function createTables() {
  await pool.connect();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      role VARCHAR(10) NOT NULL CHECK (role IN ('admin','customer'))
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(10) NOT NULL CHECK (type IN ('car','bike','van','SUV')),
      registration_number VARCHAR(50) UNIQUE NOT NULL,
      daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(10) NOT NULL CHECK (availability_status IN ('available','booked'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INT REFERENCES users(id),
      vehicle_id INT REFERENCES vehicles(id),
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL,
      total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
      status VARCHAR(10) NOT NULL CHECK (status IN ('active','cancelled','returned')),
      CONSTRAINT rent_end_after_start CHECK (rent_end_date > rent_start_date)
    );
  `);

  console.log("All tables created successfully!");
  await pool.end();
}

createTables().catch(console.error);
