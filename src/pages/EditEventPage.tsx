import { Link, useNavigate, useParams } from "react-router";
import { useApp } from "../context/useApp";
import { findEventById } from "../utils/filter-events";
import Header from "../components/layout/Header";
import EventForm from "../components/forms/EventForm";

function EditEventPage() {
  const { id = "" } = useParams();
  const { events, updateEvent } = useApp();
  const navigate = useNavigate();
  const event = findEventById(events, id);

  if (!event) {
    return (
      <>
        <Header title="Etkinlik Bulunamadı" />
        <main>
          <p>Güncellenecek etkinlik bulunamadı.</p>
          <Link to="/yonetim" className="buton">
            ← Yönetime dön
          </Link>
        </main>
      </>
    );
  }

  const { id: _id, ...initial } = event;

  return (
    <>
      <Header title={event.title} text={`${event.category} · ${event.location}`} />
      <main className="dar">
        <h2>Etkinlik Güncelle</h2>
        <EventForm
          key={event.id}
          initial={initial}
          submitLabel="Güncelle"
          onSubmit={(data) => {
            updateEvent(event.id, data);
            navigate(`/etkinlikler/${event.id}`);
          }}
        />
      </main>
    </>
  );
}

export default EditEventPage;
