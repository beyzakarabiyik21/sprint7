import { Link } from "react-router";
import { useApp } from "../context/useApp";
import Header from "../components/layout/Header";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useApp();

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <>
      <Header
        title="Kampüs Etkinlikleri"
        text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      />
      <main>
        <h2>Yaklaşan 2 Etkinlik</h2>
        <EventList events={upcoming} />
        <p className="alt-buton">
          <Link to="/etkinlikler" className="buton">
            Tüm etkinlikleri gör
          </Link>
        </p>
      </main>
    </>
  );
}

export default HomePage;
