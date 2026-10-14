import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────
// Exercise 1.1: interface vs type — identical for objects
// ─────────────────────────────────────────────
interface UserInterface {
  id: number;
  name: string;
  email: string;
}

type UserType = {
  id: number;
  name: string;
  email: string;
};

test('interface and type are interchangeable for object shapes', () => {
  const userInterface: UserInterface = { id: 1, name: 'Ram', email: 'Ram@test.com' };
  const userType: UserType = { id: 2, name: 'Sita', email: 'Sita@test.com' };

  expect(userInterface.id).toBe(1);
  expect(userType.id).toBe(2);
});

// ─────────────────────────────────────────────
// Exercise 1.2: union — must use `type`
// ─────────────────────────────────────────────
type StatusCode = 'started' | 'pending' | 'inprogress';

interface Booking {
  id: number;
  statusCode: StatusCode;   // ✅ interfaces CAN use unions, just can't declare them inline
}

// ❌ This is what an interface CANNOT do:
// interface BrokenBooking {
//   statusCode: 'started' | 'pending';   // syntax error
// }

test('type can represent a union', () => {
  const b1: Booking = { id: 1, statusCode: 'started' };
  const b2: Booking = { id: 2, statusCode: 'pending' };

  expect(b1.statusCode).toBe('started');
  expect(b2.statusCode).toBe('pending');

  // ❌ 'unknown' is not in the StatusCode union
  // const b3: Booking = { id: 3, statusCode: 'unknown' };
});

// ─────────────────────────────────────────────
// Exercise 1.3: intersection — `&` for type, `extends` for interface
// ─────────────────────────────────────────────
type BaseBooking = {
  id: number;
  firstname: string;
};

type WithPayment = {
  totalprice: number;
  depositpaid: boolean;
};

// Extension via `&` in type
type FullBooking = BaseBooking & WithPayment;

test('type represents an intersection via &', () => {
  const booking: FullBooking = {
    id: 1,
    firstname: 'Ram',
    totalprice: 1000,
    depositpaid: true,
  };

  expect(booking.id).toBe(1);
  expect(booking.depositpaid).toBe(true);
});

// Extension via `extends` in interface
interface BaseBookingI {
  id: number;
  firstname: string;
}

interface FullBookingI extends BaseBookingI {
  totalprice: number;
  depositpaid: boolean;
}

test('interface extends produces an intersection', () => {
  const booking: FullBookingI = {
    id: 2,
    firstname: 'Sita',
    totalprice: 2000,
    depositpaid: false,
  };

  expect(booking.totalprice).toBe(2000);
});

// ─────────────────────────────────────────────
// Exercise 1.4: declaration merging — only interfaces
// ─────────────────────────────────────────────
// Two declarations with the same name — TS merges them into one interface
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
  phone: string;
}

// ❌ Type aliases cannot merge — uncomment to see error:
// type User2 = { id: number };
// type User2 = { email: string };  // Duplicate identifier 'User2'

test('declaration merging in interface', () => {
  const u: User = {
    id: 1,
    name: 'Ram',
    email: 'ram@test.com',
    phone: '123',
  };

  expect(u).toEqual({
    id: 1,
    name: 'Ram',
    email: 'ram@test.com',
    phone: '123',
  });
});