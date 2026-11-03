import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/useApp";
import { cleanErrors, validateEmail, validatePassword } from "../utils/validate";
import type { Errors } from "../utils/validate";
import Header from "../components/layout/Header";
import FormField from "../components/forms/FormField";

type Field = "name" | "email" | "password" | "password2";

function RegisterPage() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState<Errors<Field>>({});

  function change(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = cleanErrors<Field>({
      name: values.name.trim().length < 3 ? "Ad Soyad en az 3 karakter olmalıdır." : undefined,
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      password2: !values.password2
        ? "Şifre tekrarı zorunludur."
        : values.password2 !== values.password
          ? "Şifreler eşleşmiyor."
          : undefined,
    });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    register(values.name.trim(), values.email.trim());
    navigate("/yonetim");
  }

  const fields: { id: Field; label: string; type: string; autoComplete: string }[] = [
    { id: "name", label: "Ad Soyad", type: "text", autoComplete: "name" },
    { id: "email", label: "E-posta", type: "email", autoComplete: "email" },
    { id: "password", label: "Şifre", type: "password", autoComplete: "new-password" },
    { id: "password2", label: "Şifre (tekrar)", type: "password", autoComplete: "new-password" },
  ];

  return (
    <>
      <Header title="Kayıt Ol" />
      <main className="dar">
        <form className="form" noValidate onSubmit={handleSubmit}>
          {fields.map((f) => (
            <FormField key={f.id} id={f.id} label={f.label} error={errors[f.id]}>
              <input
                id={f.id}
                type={f.type}
                autoComplete={f.autoComplete}
                value={values[f.id]}
                aria-invalid={errors[f.id] ? true : undefined}
                onChange={(e) => change(f.id, e.target.value)}
              />
            </FormField>
          ))}

          <button type="submit" className="buton">
            Kayıt ol
          </button>
        </form>

        <p className="form-linkleri">
          <Link to="/giris">Zaten hesabın var mı? Giriş yap</Link>
        </p>
      </main>
    </>
  );
}

export default RegisterPage;
