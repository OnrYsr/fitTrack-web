# FitTrack Backend API Dokümantasyonu

## Genel Bilgiler

- **Base URL:** `http://localhost:3000/api`
- **Content-Type:** `application/json`
- **Authentication:** JWT Bearer Token (header: `Authorization: Bearer <token>`)

---

## Kimlik Doğrulama (Authentication)

### 1. Kullanıcı Kaydı
```http
POST /api/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "123456",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully"
}
```

**Response (400):**
```json
{
  "message": "Email already in use"
}
```

### 2. Kullanıcı Girişi
```http
POST /api/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Response (400):**
```json
{
  "message": "Invalid credentials"
}
```

### 3. Çıkış
```http
POST /api/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### 4. Kullanıcı Profili
```http
GET /api/user
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### 5. Sosyal Giriş (Mock)

#### Apple ile Giriş
```http
POST /api/apple-login
```

**Request Body:**
```json
{
  "appleToken": "apple_auth_token_here"
}
```

#### Google ile Giriş
```http
POST /api/google-login
```

**Request Body:**
```json
{
  "googleToken": "google_auth_token_here"
}
```

### 6. Şifremi Unuttum (Mock)
```http
POST /api/forgot-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "Password reset email sent"
}
```

---

## Öğün Yönetimi (Meals)

### 1. Tüm Öğünleri Getir
```http
GET /api/meals
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "user": "60d21b4667d0d8992e610c85",
    "name": "Kahvaltı",
    "calories": 450,
    "createdAt": "2023-01-01T08:00:00.000Z",
    "updatedAt": "2023-01-01T08:00:00.000Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c86",
    "user": "60d21b4667d0d8992e610c85",
    "name": "Öğle Yemeği",
    "calories": 650,
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z"
  }
]
```

### 2. Öğün Ekle
```http
POST /api/meals
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Akşam Yemeği",
  "calories": 550
}
```

**Response (201):**
```json
{
  "message": "Öğün eklendi",
  "meal": {
    "_id": "60d21b4667d0d8992e610c87",
    "user": "60d21b4667d0d8992e610c85",
    "name": "Akşam Yemeği",
    "calories": 550,
    "createdAt": "2023-01-01T18:00:00.000Z",
    "updatedAt": "2023-01-01T18:00:00.000Z"
  }
}
```

### 3. Öğün Sil
```http
DELETE /api/meals/{mealId}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Öğün silindi"
}
```

---

## Su Takibi (Water)

### 1. Tüm Su Kayıtlarını Getir
```http
GET /api/water
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c88",
    "user": "60d21b4667d0d8992e610c85",
    "amount": 250,
    "createdAt": "2023-01-01T08:00:00.000Z",
    "updatedAt": "2023-01-01T08:00:00.000Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c89",
    "user": "60d21b4667d0d8992e610c85",
    "amount": 300,
    "createdAt": "2023-01-01T10:00:00.000Z",
    "updatedAt": "2023-01-01T10:00:00.000Z"
  }
]
```

### 2. Su Ekle
```http
POST /api/water
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 250
}
```

**Response (201):**
```json
{
  "message": "Su kaydı eklendi",
  "water": {
    "_id": "60d21b4667d0d8992e610c8a",
    "user": "60d21b4667d0d8992e610c85",
    "amount": 250,
    "createdAt": "2023-01-01T14:00:00.000Z",
    "updatedAt": "2023-01-01T14:00:00.000Z"
  }
}
```

### 3. Su Kaydını Sil
```http
DELETE /api/water/{waterId}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Su kaydı silindi"
}
```

---

## Hedef Yönetimi (Goals)

### 1. Hedefleri Getir
```http
GET /api/goals
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c8b",
    "user": "60d21b4667d0d8992e610c85",
    "calories": 2000,
    "water": 2500,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### 2. Hedef Oluştur/Güncelle
```http
POST /api/goals
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "calories": 2000,
  "water": 2500
}
```

**Response (201):**
```json
{
  "message": "Hedef eklendi",
  "goal": {
    "_id": "60d21b4667d0d8992e610c8c",
    "user": "60d21b4667d0d8992e610c85",
    "calories": 2000,
    "water": 2500,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

---

## AI Özellikleri (Mock)

### 1. Öğün Analizi
```http
POST /api/ai/analyze-meal
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "mealName": "Tavuk Salata",
  "ingredients": ["tavuk", "marul", "domates", "salatalık"],
  "calories": 350
}
```

**Response (200):**
```json
{
  "analysis": {
    "nutritionalValue": "Yüksek protein, düşük karbonhidrat",
    "recommendations": "Protein açısından zengin bir öğün",
    "healthScore": 8.5
  }
}
```

### 2. Günlük Özet
```http
POST /api/ai/summary
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "date": "2023-01-01"
}
```

**Response (200):**
```json
{
  "summary": {
    "totalCalories": 1650,
    "totalWater": 1200,
    "goalProgress": {
      "calories": 82.5,
      "water": 48.0
    },
    "recommendations": "Su alımınızı artırmanız önerilir"
  }
}
```

---

## Döküman Yönetimi (Docs)

### 1. Tüm Dökümanları Getir
```http
GET /api/docs
```

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c8d",
    "type": "help",
    "title": "Nasıl Kullanılır",
    "content": "FitTrack uygulamasını nasıl kullanacağınızı öğrenin...",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c8e",
    "type": "faq",
    "title": "Sık Sorulan Sorular",
    "content": "Kullanıcıların sık sorduğu sorular ve cevapları...",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### 2. Döküman Ekle
```http
POST /api/docs
```

**Request Body:**
```json
{
  "type": "help",
  "title": "Yeni Yardım Dökümanı",
  "content": "Bu yeni bir yardım dökümanıdır..."
}
```

**Response (201):**
```json
{
  "message": "Döküman eklendi",
  "doc": {
    "_id": "60d21b4667d0d8992e610c8f",
    "type": "help",
    "title": "Yeni Yardım Dökümanı",
    "content": "Bu yeni bir yardım dökümanıdır...",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### 3. Tipine Göre Dökümanları Getir
```http
GET /api/docs/{type}
```

**Response (200):**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c8d",
    "type": "help",
    "title": "Nasıl Kullanılır",
    "content": "FitTrack uygulamasını nasıl kullanacağınızı öğrenin...",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

---

## Test Endpointi

### Test
```http
GET /api/test
```

**Response (200):**
```json
{
  "message": "API is working!",
  "timestamp": "2023-01-01T00:00:00.000Z"
}
```

---

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı |
| 201 | Oluşturuldu |
| 400 | Hatalı İstek |
| 401 | Yetkisiz Erişim |
| 404 | Bulunamadı |
| 500 | Sunucu Hatası |

---

## Örnek Kullanım Senaryoları

### 1. Kullanıcı Kaydı ve Giriş
```javascript
// 1. Kayıt ol
const registerResponse = await fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: '123456',
    name: 'John Doe'
  })
});

// 2. Giriş yap
const loginResponse = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: '123456'
  })
});

const { token } = await loginResponse.json();
```

### 2. Öğün Ekleme
```javascript
const addMealResponse = await fetch('/api/meals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Kahvaltı',
    calories: 450
  })
});
```

### 3. Su Ekleme
```javascript
const addWaterResponse = await fetch('/api/water', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    amount: 250
  })
});
```

### 4. Hedef Belirleme
```javascript
const setGoalResponse = await fetch('/api/goals', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    calories: 2000,
    water: 2500
  })
});
```

---

## Veri Modelleri

### User Model
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  password: String (required, hashed),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Meal Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  name: String (required),
  calories: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Water Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  amount: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Goal Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  calories: Number (required),
  water: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Doc Model
```javascript
{
  _id: ObjectId,
  type: String (required),
  title: String (required),
  content: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Swagger Dokümantasyonu

API'nin interaktif dokümantasyonuna erişmek için:
```
http://localhost:3000/api-docs
```

Bu adres üzerinden tüm endpointleri test edebilir ve detaylı dokümantasyona ulaşabilirsiniz. 