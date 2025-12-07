import { pool } from "../../config";

export const UserService = {
  getAllUsers: async () => {
    const result = await pool.query(
      "SELECT id, name, email, phone, role FROM users"
    );
    return result.rows;
  },

  getUserById: async (id: number) => {
    const result = await pool.query(
      "SELECT id, name, email, phone, role FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  updateUser: async (id: number, payload: any) => {
    const { name, phone } = payload;

    const result = await pool.query(
      "UPDATE users SET name=$1, phone=$2 WHERE id=$3 RETURNING id, name, email, phone, role",
      [name, phone, id]
    );

    return result.rows[0];
  },

  deleteUser: async (id: number) => {
    const booking = await pool.query(
      "SELECT * FROM bookings WHERE customer_id=$1 AND status='active'",
      [id]
    );

    if (booking.rows.length > 0) {
      throw new Error("User cannot be deleted until active booking completed.");
    }

    await pool.query("DELETE FROM users WHERE id=$1", [id]);

    return true;
  },
};
