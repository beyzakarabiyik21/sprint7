import { Link } from "react-router";
import { useApp } from "../context/useApp";
import Header from "../components/layout/Header";

function NotFoundPage() {
  const { events } = useApp();

  return (
    <>
      <Header title="Sayfa Bulunamadı" text="Aradığınız sayfa mevcut değil (404)." />
      <main>
        <p>Adresi kontrol edin ya da ana sayfaya dönün.</p>
        <p>Sitede şu anda {events.length} etkinlik var.</p>
        <p className="islem-butonlari">
          <Link to="/" className="buton">
            Ana sayfaya dön
          </Link>
          <Link to="/etkinlikler" className="buton">
            Etkinliklere git
          </Link>
        </p>
      </main>
    </>
  );
}

export default NotFoundPage;
