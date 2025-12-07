import { pool } from "../../config";

export const BookingService = {
  createBooking: async (payload: any, userId: number) => {
    const { vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicleRes = await pool.query(
      "SELECT * FROM vehicles WHERE id=$1",
      [vehicle_id]
    );
    const vehicle = vehicleRes.rows[0];

    if (!vehicle) throw new Error("Vehicle not found!");
    if (!vehicle.availability_status) throw new Error("Vehicle not available!");

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;

    const total_price = days * Number(vehicle.daily_rent_price);


    const result = await pool.query(
      `INSERT INTO bookings 
       (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
       VALUES ($1, $2, $3, $4, $5, 'active')
       RETURNING *`,
      [userId, vehicle_id, rent_start_date, rent_end_date, total_price]
    );

    await pool.query("UPDATE vehicles SET availability_status=false WHERE id=$1", [
      vehicle_id,
    ]);

    return result.rows[0];
  },

  getAllBookings: async () => {
    const result = await pool.query(
      `SELECT b.*, u.name AS customer_name, v.vehicle_name 
       FROM bookings b
       JOIN users u ON b.customer_id = u.id
       JOIN vehicles v ON b.vehicle_id = v.id`
    );
    return result.rows;
  },

  cancelBooking: async (bookingId: number, userId: number) => {

    const result = await pool.query("SELECT * FROM bookings WHERE id=$1", [
      bookingId,
    ]);
    const booking = result.rows[0];

    if (!booking) throw new Error("Booking not found!");
    if (booking.customer_id !== userId)
      throw new Error("You can cancel only your own booking!");


    const today = new Date();
    const start = new Date(booking.rent_start_date);

    if (today >= start) {
      throw new Error("You cannot cancel after start date!");
    }

    await pool.query(
      "UPDATE bookings SET status='cancelled' WHERE id=$1",
      [bookingId]
    );

    await pool.query(
      "UPDATE vehicles SET availability_status=true WHERE id=$1",
      [booking.vehicle_id]
    );

    return true;
  },

  returnBooking: async (bookingId: number) => {
    const result = await pool.query("SELECT * FROM bookings WHERE id=$1", [
      bookingId,
    ]);
    const booking = result.rows[0];

    if (!booking) throw new Error("Booking not found!");

    await pool.query(
      "UPDATE bookings SET status='returned' WHERE id=$1",
      [bookingId]
    );

    await pool.query(
      "UPDATE vehicles SET availability_status=true WHERE id=$1",
      [booking.vehicle_id]
    );

    return true;
  },
};
