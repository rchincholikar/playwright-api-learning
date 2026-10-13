import { z } from 'zod';

export const BookingDatesSchema = z.object({
  checkin: z.string(),
  checkout: z.string(),
});

export const BookingSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  totalprice: z.number().positive(),
  depositpaid: z.boolean(),
  bookingdates: BookingDatesSchema,
  additionalneeds: z.string().optional(),
});

export const CreateBookingResponseSchema = z.object({
  bookingid: z.number().positive(),
  booking: BookingSchema,
});

export type Booking = z.infer<typeof BookingSchema>;
export type CreateBookingResponse = z.infer<typeof CreateBookingResponseSchema>;