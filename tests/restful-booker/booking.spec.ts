import { test, expect } from '@playwright/test'
import { CreateBookingResponseSchema } from '../schemas/booking.schema';

test('POST /booking - creates a booking successfully', async ({ request }) => {
  const requestBody = {
    firstname: 'ramesh',
    lastname: 'chincholikar',
    totalprice: 11100,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2025-01-05',
    },
    additionalneeds: 'Breakfast',
  };

  const response = await request.post('/booking', { data: requestBody });

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/json');

  const body = CreateBookingResponseSchema.parse(await response.json());

  expect(body.bookingid).toBeGreaterThan(0);
  expect(body.booking.firstname).toBe(requestBody.firstname);
  expect(body.booking.lastname).toBe(requestBody.lastname);
  expect(body.booking.totalprice).toBe(requestBody.totalprice);
});