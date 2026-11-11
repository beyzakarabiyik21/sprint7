import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useApp } from "../context/useApp";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import Header from "../components/layout/Header";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useApp();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <Header title="Tüm Etkinlikler" text="Ekim ve kasım aylarında kampüste düzenlenen etkinlikler." />
      <main>
        <EventFilter
          searchText={searchText}
          category={category}
          onSearchChange={setSearchText}
          onCategoryChange={setCategory}
        />

        {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}

        <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
      </main>
    </>
  );
}

export default EventsPage;
