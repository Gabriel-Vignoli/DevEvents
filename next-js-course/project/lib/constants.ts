export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: "React Conf 2026",
    image: "/images/event1.png",
    slug: "react-conf-2026",
    location: "Las Vegas, NV",
    date: "2026-10-15",
    time: "9:00 AM",
  },
  {
    title: "JSConf EU 2026",
    image: "/images/event2.png",
    slug: "jsconf-eu-2026",
    location: "Berlin, Germany",
    date: "2026-06-01",
    time: "10:00 AM",
  },
  {
    title: "Google I/O 2026",
    image: "/images/event3.png",
    slug: "google-io-2026",
    location: "Mountain View, CA",
    date: "2026-05-14",
    time: "8:00 AM",
  },
  {
    title: "WWDC 2026",
    image: "/images/event4.png",
    slug: "wwdc-2026",
    location: "Cupertino, CA",
    date: "2026-06-09",
    time: "10:00 AM",
  },
  {
    title: "MLH Hackathon: Localhost",
    image: "/images/event5.png",
    slug: "mlh-hackathon-localhost",
    location: "Online",
    date: "2026-03-20",
    time: "All Day",
  },
  {
    title: "TechCrunch Disrupt 2026",
    image: "/images/event6.png",
    slug: "techcrunch-disrupt-2026",
    location: "San Francisco, CA",
    date: "2026-10-28",
    time: "9:00 AM",
  },
];
