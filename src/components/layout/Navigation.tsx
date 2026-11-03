import { NavLink } from "react-router";
import { useApp } from "../../context/useApp";

const menuItems = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/etkinlikler", label: "Etkinlikler" },
  { to: "/yonetim", label: "Yönetim" },
  { to: "/giris", label: "Giriş" },
];

function Navigation() {
  const { user } = useApp();

  return (
    <nav>
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) => (isActive ? "aktif" : "")}
        >
          {/* Giriş yapılınca "Giriş" yerine kullanıcı adı görünür */}
          {item.to === "/giris" && user ? user.name : item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
