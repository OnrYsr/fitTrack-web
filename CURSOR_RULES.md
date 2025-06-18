# FitTrack Backend - Cursor Rules

## 1. Model-Controller-Route Ayrımı
- Her veri tipi için ayrı bir Mongoose Modeli oluştur.
- İş mantığı controller dosyalarında, HTTP endpoint tanımları route dosyalarında olmalı.

## 2. MongoDB ile Kalıcı Veri
- Tüm CRUD işlemleri doğrudan MongoDB'ye yapılacak.
- Mock array veya geçici RAM verisi kullanılmayacak.
- Her endpoint, ilgili Mongoose modelini kullanarak veri ekleyecek, güncelleyecek, silecek veya listeleyecek.

## 3. Swagger/OpenAPI Desteği
- Her endpoint için Swagger açıklaması yazılacak.
- Swagger UI'da tüm endpointler ve veri şemaları eksiksiz görünecek.

## 4. Validasyon ve Hata Yönetimi
- Gelen verilerde zorunlu alanlar modelde ve controller'da kontrol edilecek.
- Hatalı isteklerde anlamlı hata mesajları ve uygun HTTP kodları dönecek.

## 5. Test Edilebilirlik
- Her model ve önemli endpoint için unit/integration testleri yazılacak.
- Testler Jest ile çalışacak ve gerçek MongoDB bağlantısı kullanılacak.

## 6. Çevre Değişkenleri ve Güvenlik
- Tüm hassas bilgiler `.env` dosyasında tutulacak.
- Kodda şifre, bağlantı anahtarı gibi bilgiler hardcode edilmeyecek.

## 7. Kod Standartları
- Kodlar ES6+ standartlarında, okunabilir ve modüler olacak.
- Her dosya ve fonksiyon amacına uygun, açıklayıcı isimlerle yazılacak.

## 8. Proje Mimarisi (Örnek Dosya Yapısı)
```
fittrack-backend/
  src/
    models/
    controllers/
    routes/
    ...
  .env
  README.md
  package.json
  ...
```

## 9. Prompt (Kısa Versiyon)
> Her yeni endpoint ve özellik için:
> - Model → Controller → Route ayrımına uy.
> - Tüm veriyi MongoDB'ye kaydet.
> - Swagger/OpenAPI açıklaması ekle.
> - Validasyon ve hata yönetimini unutma.
> - Test yazmayı ihmal etme.
> - Kodun modüler, okunabilir ve güvenli olsun.

## 10. README.md Güncelleme Kuralı
- Proje her GitHub'a atıldığında (commit/push) **README.md dosyası güncellenecek ve en güncel bilgiler burada tutulacak.** 