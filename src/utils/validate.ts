export type Errors<T extends string> = Partial<Record<T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "E-posta zorunludur.";
  if (!EMAIL_RE.test(email.trim())) return "Geçerli bir e-posta adresi girin.";
}

export function validatePassword(password: string): string | undefined {
  if (!password) return "Şifre zorunludur.";
  if (password.length < 6) return "Şifre en az 6 karakter olmalıdır.";
}

// Hata içermeyen alanları ayıklar; boş nesne = form geçerli
export function cleanErrors<T extends string>(errors: Errors<T>): Errors<T> {
  const result: Errors<T> = {};
  for (const key in errors) {
    if (errors[key]) result[key] = errors[key];
  }
  return result;
}
