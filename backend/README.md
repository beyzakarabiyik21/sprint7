# Kampüs Etkinlikleri — Backend

Node + Express + Mongoose ile yazılmış REST API. Veriler MongoDB Atlas'ta tutulur; sunucu kapanıp açılınca POST ile eklenen kayıtlar durur.

Beyza Karabiyik · 2416501003

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # MONGODB_URI'yi kendi adresinle değiştir
npm run seed           # 6 örnek etkinliği veritabanına yazar
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Kontrol için tarayıcıda `http://localhost:3000/health` adresini açın.

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch` ile başlatır, dosya değişince sunucu yeniden başlar |
| `npm start` | Sunucuyu normal başlatır |
| `npm run seed` | Koleksiyonu boşaltır, 6 örnek etkinlik ekler (kaç kez çalışırsa çalışsın 6 kayıt) |

## Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `PORT` | Sunucunun dinlediği port | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi (`/kampus` veritabanı) | — (zorunlu) |

`.env` dosyası GitHub'a gönderilmez. `.env.example` içinde yalnızca yer tutucu (`mongodb://127.0.0.1:27017/kampus`) bulunur; gerçek Atlas adresi ve şifre sadece kendi `.env` dosyanıza yazılır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı (geçersiz biçimli id dahil) · 500 beklenmeyen sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### POST /events gövdesi

Kurallar `src/models/event-model.js` içindeki schema'dadır; uymayan istek `400` döner:

- `title` zorunlu, 3–100 karakter, baş/son boşluk silinir
- `category` zorunlu, yalnızca `Seminer`, `Atölye`, `Söyleşi`, `Yarışma`
- `date` zorunlu
- `capacity` en az `0` (varsayılan `0`), `description` en fazla 500 karakter
- `time`, `location`, `description` gönderilmezse boş metin
- `createdAt` ve `updatedAt` otomatik eklenir (`timestamps`)

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "time": "14:00",
  "location": "SDÜ Mühendislik Fakültesi Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile ilk adımlar.",
  "capacity": 30
}
```

## Postman

`requests/kampus-api.json` dosyası Postman'e içe aktarılabilir (Import → dosyayı seç). Çalıştırmadan önce `npm run seed` yapın. 2. istek listeden bir `_id`'yi `eventId` değişkenine kaydeder, 3. istek onu kullanır. İçinde 6 test isteği vardır:

| # | Postman'deki adı | İstek | Beklenen |
| --- | --- | --- | --- |
| 1 | Health | GET `/health` | 200 · ok + student |
| 2 | Etkinlik listesi | GET `/events` | 200 · 6 kayıt |
| 3 | Tek etkinlik | GET `/events/{{eventId}}` | 200 · aynı `_id` |
| 4 | Olmayan etkinlik (404) | GET `/events/yok` | 404 · error |
| 5 | Etkinlik oluştur (201) | POST `/events` (tam body) | 201 · `_id` + `createdAt` |
| 6 | Eksik veri (400) | POST `/events` (sadece title) | 400 · error |

## Klasör yapısı

```
backend/
  src/
    app.js                         Express uygulaması, middleware, route'ları bağlar
    server.js                      .env'i okur, önce veritabanına bağlanır, sonra portu dinler
    seed.js                        npm run seed: koleksiyonu boşaltıp örnek veriyi ekler
    config/database.js             MongoDB bağlantısı (URI .env'den)
    models/event-model.js          Event schema'sı ve modeli
    data/seed-events.js            6 örnek etkinlik (id yok, MongoDB _id verir)
    routes/event-routes.js         Hangi adres hangi fonksiyona gider
    controllers/event-controller.js Event modeliyle okur/yazar, yanıtı döndürür
  requests/kampus-api.json         Postman koleksiyonu
  .env.example
  .gitignore
  package.json
```
