"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const SALT = Number(process.env.BCRYPT_SALT) || 10;
const signup = async (payload) => {
    const { name, email, password, phone, role } = payload;
    if (!name || !email || !password || !phone || !role) {
        throw new Error("All fields are required");
    }
    const checkQuery = "SELECT * FROM users WHERE email=$1";
    const existingUser = await config_1.pool.query(checkQuery, [email]);
    if (existingUser.rows.length) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, SALT);
    const insertQuery = `
    INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, role
  `;
    const values = [name, email, hashedPassword, phone, role];
    const result = await config_1.pool.query(insertQuery, values);
    return result.rows[0];
};
exports.signup = signup;
const signin = async (payload) => {
    const { email, password } = payload;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const query = "SELECT * FROM users WHERE email=$1";
    const userData = await config_1.pool.query(query, [email]);
    if (!userData.rows.length) {
        throw new Error("User not found");
    }
    const user = userData.rows[0];
    const matched = await bcrypt_1.default.compare(password, user.password);
    if (!matched) {
        throw new Error("Invalid password");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        role: user.role,
        email: user.email,
    }, JWT_SECRET, { expiresIn: "7d" });
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
exports.signin = signin;
