# Kampüs Etkinlikleri — Backend

Node + Express ile yazılmış REST API. Veriler şimdilik bellekte tutulur (sunucu yeniden başlayınca POST ile eklenenler kaybolur).

Beyza Karabiyik · 2416501003

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Kontrol için tarayıcıda `http://localhost:3000/health` adresini açın.

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch` ile başlatır, dosya değişince sunucu yeniden başlar |
| `npm start` | Sunucuyu normal başlatır |

## Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `PORT` | Sunucunun dinlediği port | `3000` |

`.env` dosyası GitHub'a gönderilmez. Gerekli değişkenler `.env.example` içinde yazılıdır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### POST /events gövdesi

`title`, `category` ve `date` zorunludur. Eksikse `400` döner.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30
}
```

## Postman

`requests/kampus-api.json` dosyası Postman'e içe aktarılabilir (Import → dosyayı seç). İçinde 6 test isteği vardır:

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET `/health` | 200 · ok + student |
| 2 | GET `/events` | 200 · 6 kayıt |
| 3 | GET `/events/event-2` | 200 · event-2 |
| 4 | GET `/events/yok` | 404 · error |
| 5 | POST `/events` (tam body) | 201 · yeni id |
| 6 | POST `/events` (sadece title) | 400 · error |

## Klasör yapısı

```
backend/
  src/
    app.js                         Express uygulaması, middleware, route'ları bağlar
    server.js                      .env'i okur, portu dinler
    routes/event-routes.js         Hangi adres hangi fonksiyona gider
    controllers/event-controller.js İsteği işler, yanıtı döndürür
    data/events.js                 Bellek içi etkinlik dizisi
  requests/kampus-api.json         Postman koleksiyonu
  .env.example
  .gitignore
  package.json
```
