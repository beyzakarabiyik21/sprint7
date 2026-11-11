import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import { useApp } from "../context/useApp";
import { validateEmail } from "../utils/validate";
import Header from "../components/layout/Header";
import FormField from "../components/forms/FormField";

function ForgotPasswordPage() {
  const { user } = useApp();
  // Giriş yapılmışsa e-posta alanı kullanıcının adresiyle dolu gelir
  const [email, setEmail] = useState(user?.email ?? "");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateEmail(email);
    setError(found);
    setSent(!found);
  }

  return (
    <>
      <Header title="Şifremi Unuttum" />
      <main className="dar">
        <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>

        <form className="form" noValidate onSubmit={handleSubmit}>
          <FormField id="email" label="E-posta" error={error}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              aria-invalid={error ? true : undefined}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(undefined);
                setSent(false);
              }}
            />
          </FormField>

          <button type="submit" className="buton">
            Bağlantı gönder
          </button>
        </form>

        {sent && (
          <p className="mesaj-kutusu basari" role="status">
            {email.trim()} adresine şifre yenileme bağlantısı gönderildi.
          </p>
        )}

        <p className="form-linkleri">
          <Link to="/giris">← Girişe dön</Link>
        </p>
      </main>
    </>
  );
}

export default ForgotPasswordPage;
