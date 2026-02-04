import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/database/event.model";

// GET handler for fetching a single event by slug.
 
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
): Promise<NextResponse> {
  try {
    // Extract and validate the slug parameter
    const { slug } = await params;
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    // Connect to the database
    await connectDB();

    // Query the event by slug
    const event: IEvent | null = await Event.findOne({ slug: slug.trim() });

    // Check if event exists
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Return the event data
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching event by slug:", error);

    // Return a generic error response
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
