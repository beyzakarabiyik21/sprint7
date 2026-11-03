import { useNavigate } from "react-router";
import { useApp } from "../context/useApp";
import Header from "../components/layout/Header";
import EventForm from "../components/forms/EventForm";

function AddEventPage() {
  const { addEvent } = useApp();
  const navigate = useNavigate();

  return (
    <>
      <Header title="Etkinlik Ekle" />
      <main className="dar">
        <EventForm
          submitLabel="Kaydet"
          onSubmit={(data) => {
            addEvent(data);
            navigate("/yonetim");
          }}
        />
      </main>
    </>
  );
}

export default AddEventPage;
