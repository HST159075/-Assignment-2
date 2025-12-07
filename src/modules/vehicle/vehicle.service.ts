import { pool } from "../../config";

export const VehicleService = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM vehicles ORDER BY id ASC");
    return result.rows;
  },

  getById: async (id: number) => {
    const result = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  create: async (payload: any) => {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = payload;

    const result = await pool.query(
      `INSERT INTO vehicles 
        (vehicle_name, type, registration_number, daily_rent_price, availability_status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status ?? true,
      ]
    );

    return result.rows[0];
  },

  update: async (id: number, payload: any) => {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = payload;

    const result = await pool.query(
      `UPDATE vehicles
       SET vehicle_name=$1, type=$2, registration_number=$3,
           daily_rent_price=$4, availability_status=$5
       WHERE id=$6
       RETURNING *`,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        id,
      ]
    );

    return result.rows[0];
  },

  delete: async (id: number) => {
    const activeBooking = await pool.query(
      "SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'",
      [id]
    );

    if (activeBooking.rows.length > 0) {
      throw new Error("Vehicle cannot be deleted because it's currently booked.");
    }

    await pool.query("DELETE FROM vehicles WHERE id=$1", [id]);
    return true;
  },
};
