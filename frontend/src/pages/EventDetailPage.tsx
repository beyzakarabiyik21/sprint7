import { Link, useParams } from "react-router";
import { useApp } from "../context/useApp";
import { findEventById } from "../utils/filter-events";
import Header from "../components/layout/Header";
import EventDetail from "../components/events/EventDetail";

function EventDetailPage() {
  const { id = "" } = useParams();
  const { events } = useApp();
  const event = findEventById(events, id);

  if (!event) {
    return (
      <>
        <Header title="Etkinlik Bulunamadı" />
        <main>
          <p>Aradığınız etkinlik silinmiş ya da hiç var olmamış olabilir.</p>
          <Link to="/etkinlikler" className="buton">
            ← Listeye dön
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title={event.title} text={`${event.category} · ${event.location}`} />
      <main>
        <EventDetail event={event} />
      </main>
    </>
  );
}

export default EventDetailPage;
