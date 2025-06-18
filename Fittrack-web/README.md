# FitTrack Web - Deploy ve Kullanım Rehberi

## 🚀 AWS EC2 Sunucusunda Deploy Adımları

### 1. EC2 Sunucusuna SSH ile Bağlan
```bash
ssh -i "/path/to/FitTrack.pem" ec2-user@<EC2_IP_ADRESİ>
```

### 2. Projeyi GitHub'dan Klonla
```bash
git clone https://github.com/OnrYsr/fitTrack-web.git
cd fitTrack-web
```

### 3. Bağımlılıkları Yükle
```bash
npm install
```

### 4. .env.local Dosyasını Oluştur
```bash
nano .env.local
```
İçerik örneği:
```
NEXT_PUBLIC_API_URL=http://<backend-ip>:3000/api
NEXT_PUBLIC_APP_NAME=FitTrack
```

### 5. Projeyi Build Et ve Başlat
```bash
npm run build
npm start
```

---

## ⚙️ Backend (API) Başlatma
- Backend projesi ayrı bir klasördeyse, aynı şekilde klonla ve başlat:
```bash
git clone <backend-repo-url>
cd fitTrack-backend
npm install
nano .env # MONGODB_URI ve diğer değişkenleri ekle
npm run dev
```

---

## 🌐 Port ve Güvenlik
- EC2 güvenlik grubunda 3000 (backend) ve 3001 (frontend) portlarını açmayı unutma.
- Uygulamaya dışarıdan erişmek için sunucu IP adresini kullanabilirsin.

---

## 🛠️ Sık Karşılaşılan Hatalar ve Çözümleri
- **Port already in use (EADDRINUSE):**
  - Portu kullanan süreci bul: `lsof -i :3000`
  - Süreci öldür: `kill -9 <PID>`
- **MongoDB bağlantı hatası:**
  - `.env` dosyasında `MONGODB_URI` doğru mu?
- **Permission denied (publickey):**
  - SSH anahtar yolunu doğru verdiğinden emin ol.
- **npm install hatası:**
  - Node.js ve npm kurulu mu? Gerekirse `sudo yum install -y nodejs npm` (Amazon Linux) veya `sudo apt install -y nodejs npm` (Ubuntu)

---

## 📋 Notlar
- Tüm işlemleri EC2 sunucusunda yapmalısın.
- Her iki projeyi de ayrı terminalde başlatabilirsin.
- .env ve .env.local dosyalarını sunucuda oluşturmayı unutma.

---

## 📞 Yardım
Herhangi bir adımda takılırsan, hata mesajını veya ekran görüntüsünü paylaşarak destek alabilirsin.

---

**Deploy ve kullanım için bu rehberi takip edebilirsin. Başarılar! 🚀** 