import BookEvent from "@/components/BookEvent";
import Image from "next/image";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetialItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row-gap-2">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetialsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let event

  try {
      const request = await fetch(`${baseUrl}/api/events/${slug}`, {
        next: { revalidate: 60 },
      });

      if (!request.ok) {
        if (request.status === 404) {
          return notFound();
        }
        throw new Error(`Failed to fetch event: ${request.statusText}`);
      }

      const responseData = await request.json();
      event = responseData;

      if (!event) {
        return notFound();
      } 
  } catch (error) {
    console.log("Error fetching event data:", error);
    return notFound();
  }

  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
      organizer,
    },
  } = event;

  if (!description) return notFound();

  const bookings = 10

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* Left Side - Event Content */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          ></Image>

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetialItem
              icon="/icons/calendar.svg"
              alt="Calendar Icon"
              label={date}
            />
            <EventDetialItem
              icon="/icons/clock.svg"
              alt="Clock Icon"
              label={time}
            />
            <EventDetialItem
              icon="/icons/pin.svg"
              alt="Pin Icon"
              label={location}
            />
            <EventDetialItem
              icon="/icons/mode.svg"
              alt="Mode Icon"
              label={mode}
            />
            <EventDetialItem
              icon="/icons/audience.svg"
              alt="Audience Icon"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={JSON.parse(agenda[0])}></EventAgenda>

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={JSON.parse(tags[0])}></EventTags>
        </div>

        {/* Right Side - Booking Form */}
        <aside className="booking">
       <div className="signup-card">
        <h2>Book your Spot</h2>
        {bookings > 0 ? (
          <p className="text-sm">
            Join {bookings} people who have already booked their spot!
          </p>
        ) : (
          <p className="text-sm">Be the first to book your spot!</p>
        )}
        <BookEvent />
       </div>
        </aside>
      </div>
    </section>
  );
};

export default EventDetialsPage;
