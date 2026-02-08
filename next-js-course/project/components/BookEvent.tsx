"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
   const { success } = await createBooking({ eventId, slug, email });

   e.preventDefault();

   if(success) {
    setSubmited(true);
   } else {
    console.error("Booking failed:");
   }
  }

  return (
    <div id="book-event">
      {submited ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
