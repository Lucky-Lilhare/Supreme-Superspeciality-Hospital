# Security Specification: Supreme Superspeciality Hospital

This document details the Zero-Trust security rules designed for auditing the Firebase state of the Supreme Superspeciality Hospital web portal.

## 1. Data Invariants

1. **User Ownership**: A user document within `/users/{userId}` can only be read, created, or updated by the authenticated user whose `uid` exactly matches `{userId}`.
2. **Booking Containment**: A doctor booking within `/bookings/{bookingId}` is linked to a authenticated user (`userId`).
3. **No Blanket Reads**: Collection-level queries on bookings are strictly constrained: standard users can only retrieve lists filtered to their own `userId`.
4. **Action-Based Updates**: Bookings are immutable after creation, save for the `status` attribute which can be updated to `'Cancelled'` by the booking's owner.
5. **ID Sanitization**: Document ID paths must match alpha-numeric character validation regex patterns (`'^[a-zA-Z0-9_\-]+$'`) and remain bounded in size.

---

## 2. The "Dirty Dozen" Threat Payloads

Here are twelve vector scenarios that MUST be explicitly blocked by our Firestore rules policies:

1. **Identity Spoofing - Profile creation for a different user**: User Alice attempts to insert a profile under `/users/bob` where `request.auth.uid == 'alice'`.
2. **Self-Assigned Admin privileges**: A malicious user attempts to insert a `role: 'admin'` or `isAdmin: true` attribute block into their own user profile.
3. **Ghost Fields Injection**: Sending a user profile document with random untyped fields (e.g. `hasUnlimitedBookings: true`).
4. **Target Id Poisoning**: Injecting a 2MB binary string containing control characters as a `{bookingId}` document ID.
5. **Booking Identity Spoofing**: Bob tries to set up an appointment under `bookings/999` with `userId: 'alice'`.
6. **Relational Read Hijacking**: User Bob tries to single-fetch `bookings/999` (which belongs to Alice) using his auth token.
7. **Query Scraper Bypass**: Alice attempts a list query representing `db.collection('bookings')` without appending a `.where('userId', '==', request.auth.uid)` clause.
8. **Malicious Sibling Mutate**: Charlie attempts to modify the `date` or `doctorId` of Bob's existing booking.
9. **Outcome Bypass After Lock**: Attempting to reverse a cancelled booking status back to 'Scheduled' after it has been cancelled.
10. **Resource Exhaustion Attack (PII)**: Sending an incredibly large patient symptoms string of size 1MB to trigger high storage and indexing fees.
11. **Timestamp Spoofing**: Overwriting historical metrics or timestamps (`createdAt`) to represent arbitrary past values.
12. **Unauthorized Record Purge**: Malicious user Charlie attempts to call `.delete()` on Alice's booking.

---

## 3. Firewall Rules Definition

The code in `/firestore.rules` enforces the above spec natively inside the Cloud security compiler.
