import { Link } from "react-router";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  const kunye = (
    <aside className="kunye">
      <h2>Etkinlik Künyesi</h2>
      <dl className="kunye-kutusu">
        <dt>Tarih</dt>
        <dd>{formatDate(event.date)}, {event.time}</dd>
        <dt>Yer</dt>
        <dd>{event.location}</dd>
        <dt>Kategori</dt>
        <dd>{event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>{event.capacity} kişi</dd>
      </dl>
    </aside>
  );

  return (
    <div className={event.image ? "detay afisli" : "detay"}>
      <div>
        {event.image ? (
          <figure className="afis-alani">
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        ) : (
          kunye
        )}

        <h2>Açıklama</h2>
        <p className="aciklama">{event.description}</p>

        <div className="islem-butonlari">
          <Link to="/etkinlikler" className="buton">
            ← Listeye dön
          </Link>
          <Link to={`/yonetim/duzenle/${event.id}`} className="buton">
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>

      {event.image && kunye}
    </div>
  );
}

export default EventDetail;
