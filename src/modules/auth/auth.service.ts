import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../config/index"; 
import dotenv from "dotenv";

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET as string;
const SALT = Number(process.env.BCRYPT_SALT) || 10;

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

interface SigninPayload {
  email: string;
  password: string;
}

export const signup = async (payload: SignupPayload) => {
  const { name, email, password, phone, role } = payload;

  if (!name || !email || !password || !phone || !role) {
    throw new Error("All fields are required");
  }

  const checkQuery = "SELECT * FROM users WHERE email=$1";
  const existingUser = await pool.query(checkQuery, [email]);
  if (existingUser.rows.length) {
    throw new Error("User already exists");
  }

  
  const hashedPassword = await bcrypt.hash(password, SALT);
  const insertQuery = `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role
  `;
  const values = [name, email, hashedPassword, phone, role];

  const result = await pool.query(insertQuery, values);
  return result.rows[0];
};

export const signin = async (payload: SigninPayload) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }




  const query = "SELECT * FROM users WHERE email=$1";
  const userData = await pool.query(query, [email]);
  if (!userData.rows.length) {
    throw new Error("User not found");
  }

  const user = userData.rows[0];

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
