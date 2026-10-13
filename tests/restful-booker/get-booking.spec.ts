import { test, expect } from '@playwright/test';
import { BookingSchema, CreateBookingResponseSchema } from '../schemas/booking.schema';
import { ApiClient } from '../helpers/api-client';

test('GET /booking/:id - retrieves a booking created moments ago', async ({ request },testInfo) => {
    // ─── Step 1: Create a booking ───
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

    const api =new ApiClient(request,testInfo);
    const createResponse = await api.post('/booking',
        {
            data: requestBody
        });
    expect(createResponse.status()).toBe(200);

    // Validate the create response and extract bookingid
    const created = CreateBookingResponseSchema.parse(await createResponse.json());
    const bookingId = created.bookingid;

    // Sanity: bookingId is a real number
    expect(bookingId).toBeGreaterThan(0);

    // ─── Step 2: Fetch that booking back ───
    const getResponse = await api.get(`/booking/${bookingId}`);

    expect(getResponse.status()).toBe(200);
    expect(getResponse.headers()['content-type']).toContain('application/json');

    // ─── Step 3: Validate the GET response with zod ───
    const fetched = BookingSchema.parse(await getResponse.json());

    // ─── Step 4: Assert the fetched booking matches what we sent ───
    expect(fetched.firstname).toBe(requestBody.firstname);
    expect(fetched.lastname).toBe(requestBody.lastname);
    expect(fetched.totalprice).toBe(requestBody.totalprice);
    expect(fetched.depositpaid).toBe(requestBody.depositpaid);
    expect(fetched.bookingdates.checkin).toBe(requestBody.bookingdates.checkin);
    expect(fetched.bookingdates.checkout).toBe(requestBody.bookingdates.checkout);
    expect(fetched.additionalneeds).toBe(requestBody.additionalneeds);
});