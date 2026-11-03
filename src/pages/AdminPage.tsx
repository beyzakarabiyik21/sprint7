import { Link } from "react-router";
import { useApp } from "../context/useApp";
import { formatDate } from "../utils/format-date";
import Header from "../components/layout/Header";

function AdminPage() {
  const { events, deleteEvent } = useApp();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <>
      <Header title="Etkinlik Yönetimi" />
      <main>
        <p>
          <Link to="/yonetim/ekle" className="buton">
            + Yeni etkinlik
          </Link>
        </p>

        {events.length === 0 ? (
          <p className="sonuc">Henüz etkinlik yok.</p>
        ) : (
          <div className="tablo-kapsayici">
            <table className="yonetim-tablosu">
              <thead>
                <tr>
                  <th>Etkinlik</th>
                  <th>Tarih</th>
                  <th>Kategori</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{formatDate(event.date)}</td>
                    <td>{event.category}</td>
                    <td className="islem-butonlari">
                      <Link to={`/yonetim/duzenle/${event.id}`} className="buton">
                        Düzenle
                      </Link>
                      <button
                        type="button"
                        className="buton tehlike"
                        onClick={() => handleDelete(event.id, event.title)}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}

export default AdminPage;
