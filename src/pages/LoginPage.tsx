import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/useApp";
import { cleanErrors, validateEmail, validatePassword } from "../utils/validate";
import type { Errors } from "../utils/validate";
import Header from "../components/layout/Header";
import FormField from "../components/forms/FormField";

type Field = "email" | "password";

function LoginPage() {
  const { user, login, logout } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors<Field>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = cleanErrors<Field>({
      email: validateEmail(email),
      password: validatePassword(password),
    });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    login(email.trim());
    navigate("/yonetim");
  }

  if (user) {
    return (
      <>
        <Header title="Giriş Yap" />
        <main className="dar">
          <p>
            <strong>{user.email}</strong> olarak giriş yaptınız.
          </p>
          <button type="button" className="buton" onClick={logout}>
            Çıkış yap
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="Giriş Yap" />
      <main className="dar">
        <form className="form" noValidate onSubmit={handleSubmit}>
          <FormField id="email" label="E-posta" error={errors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              aria-invalid={errors.email ? true : undefined}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((er) => ({ ...er, email: undefined }));
              }}
            />
          </FormField>

          <FormField id="password" label="Şifre" error={errors.password}>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              aria-invalid={errors.password ? true : undefined}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((er) => ({ ...er, password: undefined }));
              }}
            />
          </FormField>

          <button type="submit" className="buton">
            Giriş yap
          </button>
        </form>

        <p className="form-linkleri">
          <Link to="/sifremi-unuttum">Şifremi unuttum</Link>
          <Link to="/kayit">Hesabın yok mu? Kayıt ol</Link>
        </p>
      </main>
    </>
  );
}

export default LoginPage;
