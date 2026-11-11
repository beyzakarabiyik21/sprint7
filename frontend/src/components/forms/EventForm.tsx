import { useState } from "react";
import type { FormEvent } from "react";
import type { Category } from "../../types/campus-event";
import type { EventInput } from "../../context/app-context";
import { categories } from "../../data/events";
import { cleanErrors } from "../../utils/validate";
import type { Errors } from "../../utils/validate";
import FormField from "./FormField";

type Field = "title" | "category" | "date" | "time" | "location" | "capacity" | "description";

interface EventFormProps {
  initial?: EventInput;
  submitLabel: string;
  onSubmit: (data: EventInput) => void;
}

const empty = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function EventForm({ initial, submitLabel, onSubmit }: EventFormProps) {
  const [values, setValues] = useState<Record<Field, string>>(
    initial ? { ...initial, capacity: String(initial.capacity) } : empty
  );
  const [errors, setErrors] = useState<Errors<Field>>({});

  function change(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): Errors<Field> {
    const capacity = Number(values.capacity);
    return cleanErrors<Field>({
      title:
        values.title.trim().length < 3 ? "Etkinlik adı en az 3 karakter olmalıdır." : undefined,
      category: !values.category ? "Lütfen bir kategori seçin." : undefined,
      date: !values.date ? "Tarih zorunludur." : undefined,
      time: !values.time ? "Saat zorunludur." : undefined,
      location: !values.location.trim() ? "Yer zorunludur." : undefined,
      capacity:
        !values.capacity || !Number.isInteger(capacity) || capacity < 1
          ? "Kontenjan 1 veya daha büyük bir tam sayı olmalıdır."
          : undefined,
      description:
        values.description.trim().length < 10
          ? "Açıklama en az 10 karakter olmalıdır."
          : undefined,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit({
      ...initial,
      title: values.title.trim(),
      category: values.category as Category,
      date: values.date,
      time: values.time,
      location: values.location.trim(),
      capacity: Number(values.capacity),
      description: values.description.trim(),
    });
  }

  // Her alan için ortak erişilebilirlik özellikleri
  const a11y = (field: Field) => ({
    id: field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-hata` : undefined,
  });

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <FormField id="title" label="Etkinlik Adı" error={errors.title}>
        <input
          type="text"
          maxLength={80}
          value={values.title}
          onChange={(e) => change("title", e.target.value)}
          {...a11y("title")}
        />
      </FormField>

      <FormField id="category" label="Kategori" error={errors.category}>
        <select
          value={values.category}
          onChange={(e) => change("category", e.target.value)}
          {...a11y("category")}
        >
          <option value="">Seçiniz</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="date" label="Tarih" error={errors.date}>
        <input
          type="date"
          value={values.date}
          onChange={(e) => change("date", e.target.value)}
          {...a11y("date")}
        />
      </FormField>

      <FormField id="time" label="Saat" error={errors.time}>
        <input
          type="time"
          value={values.time}
          onChange={(e) => change("time", e.target.value)}
          {...a11y("time")}
        />
      </FormField>

      <FormField id="location" label="Yer" error={errors.location}>
        <input
          type="text"
          value={values.location}
          onChange={(e) => change("location", e.target.value)}
          {...a11y("location")}
        />
      </FormField>

      <FormField id="capacity" label="Kontenjan" error={errors.capacity}>
        <input
          type="number"
          min={1}
          value={values.capacity}
          onChange={(e) => change("capacity", e.target.value)}
          {...a11y("capacity")}
        />
      </FormField>

      <FormField id="description" label="Açıklama" error={errors.description}>
        <textarea
          rows={6}
          value={values.description}
          onChange={(e) => change("description", e.target.value)}
          {...a11y("description")}
        />
      </FormField>

      <button type="submit" className="buton">
        {submitLabel}
      </button>
    </form>
  );
}

export default EventForm;
