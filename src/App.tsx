import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AdminPage from "./pages/AdminPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/etkinlikler" element={<EventsPage />} />
            <Route path="/etkinlikler/:id" element={<EventDetailPage />} />
            <Route path="/yonetim" element={<AdminPage />} />
            <Route path="/yonetim/ekle" element={<AddEventPage />} />
            <Route path="/yonetim/duzenle/:id" element={<EditEventPage />} />
            <Route path="/giris" element={<LoginPage />} />
            <Route path="/kayit" element={<RegisterPage />} />
            <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
