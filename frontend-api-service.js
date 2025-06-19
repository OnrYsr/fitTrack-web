// FitTrack Frontend API Service
// Bu dosya frontend uygulamasında API çağrıları için kullanılacak

const API_BASE_URL = 'http://localhost:3000/api';

class FitTrackAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('fittrack_token');
  }

  // Token'ı güncelle
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('fittrack_token', token);
    } else {
      localStorage.removeItem('fittrack_token');
    }
  }

  // HTTP headers'ı hazırla
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // HTTP isteği gönder
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ===== KİMLİK DOĞRULAMA =====

  // Kullanıcı kaydı
  async register(userData) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Kullanıcı girişi
  async login(credentials) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  // Çıkış
  async logout() {
    const data = await this.request('/logout', {
      method: 'POST',
    });
    
    this.setToken(null);
    return data;
  }

  // Kullanıcı profili
  async getUserProfile() {
    return this.request('/user');
  }

  // Apple ile giriş
  async appleLogin(appleToken) {
    const data = await this.request('/apple-login', {
      method: 'POST',
      body: JSON.stringify({ appleToken }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  // Google ile giriş
  async googleLogin(googleToken) {
    const data = await this.request('/google-login', {
      method: 'POST',
      body: JSON.stringify({ googleToken }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  // Şifremi unuttum
  async forgotPassword(email) {
    return this.request('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // ===== ÖĞÜN YÖNETİMİ =====

  // Tüm öğünleri getir
  async getMeals() {
    return this.request('/meals');
  }

  // Öğün ekle
  async addMeal(mealData) {
    return this.request('/meals', {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  }

  // Öğün sil
  async deleteMeal(mealId) {
    return this.request(`/meals/${mealId}`, {
      method: 'DELETE',
    });
  }

  // ===== SU TAKİBİ =====

  // Tüm su kayıtlarını getir
  async getWaterRecords() {
    return this.request('/water');
  }

  // Su ekle
  async addWater(amount) {
    return this.request('/water', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  // Su kaydını sil
  async deleteWaterRecord(waterId) {
    return this.request(`/water/${waterId}`, {
      method: 'DELETE',
    });
  }

  // ===== HEDEF YÖNETİMİ =====

  // Hedefleri getir
  async getGoals() {
    return this.request('/goals');
  }

  // Hedef oluştur/güncelle
  async setGoal(goalData) {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  }

  // ===== AI ÖZELLİKLERİ =====

  // Öğün analizi
  async analyzeMeal(mealData) {
    return this.request('/ai/analyze-meal', {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  }

  // Günlük özet
  async getDailySummary(date) {
    return this.request('/ai/summary', {
      method: 'POST',
      body: JSON.stringify({ date }),
    });
  }

  // ===== DÖKÜMAN YÖNETİMİ =====

  // Tüm dökümanları getir
  async getDocs() {
    return this.request('/docs');
  }

  // Döküman ekle
  async addDoc(docData) {
    return this.request('/docs', {
      method: 'POST',
      body: JSON.stringify(docData),
    });
  }

  // Tipine göre dökümanları getir
  async getDocsByType(type) {
    return this.request(`/docs/${type}`);
  }

  // ===== TEST =====

  // Test endpointi
  async test() {
    return this.request('/test');
  }
}

// API instance'ını oluştur
const api = new FitTrackAPI();

// ===== KULLANIM ÖRNEKLERİ =====

// React/Vue/Angular gibi framework'lerde kullanım örnekleri:

/*
// 1. Kullanıcı Kaydı ve Giriş
const handleRegister = async () => {
  try {
    await api.register({
      email: 'user@example.com',
      password: '123456',
      name: 'John Doe'
    });
    console.log('Kayıt başarılı!');
  } catch (error) {
    console.error('Kayıt hatası:', error.message);
  }
};

const handleLogin = async () => {
  try {
    const data = await api.login({
      email: 'user@example.com',
      password: '123456'
    });
    console.log('Giriş başarılı!', data.user);
  } catch (error) {
    console.error('Giriş hatası:', error.message);
  }
};

// 2. Öğün Ekleme
const handleAddMeal = async () => {
  try {
    const meal = await api.addMeal({
      name: 'Kahvaltı',
      calories: 450
    });
    console.log('Öğün eklendi:', meal);
  } catch (error) {
    console.error('Öğün ekleme hatası:', error.message);
  }
};

// 3. Su Ekleme
const handleAddWater = async () => {
  try {
    const water = await api.addWater(250);
    console.log('Su eklendi:', water);
  } catch (error) {
    console.error('Su ekleme hatası:', error.message);
  }
};

// 4. Hedef Belirleme
const handleSetGoal = async () => {
  try {
    const goal = await api.setGoal({
      calories: 2000,
      water: 2500
    });
    console.log('Hedef belirlendi:', goal);
  } catch (error) {
    console.error('Hedef belirleme hatası:', error.message);
  }
};

// 5. Günlük Verileri Getirme
const handleGetDailyData = async () => {
  try {
    const [meals, water, goals] = await Promise.all([
      api.getMeals(),
      api.getWaterRecords(),
      api.getGoals()
    ]);
    
    console.log('Günlük veriler:', { meals, water, goals });
  } catch (error) {
    console.error('Veri getirme hatası:', error.message);
  }
};

// 6. AI Özellikleri
const handleAnalyzeMeal = async () => {
  try {
    const analysis = await api.analyzeMeal({
      mealName: 'Tavuk Salata',
      ingredients: ['tavuk', 'marul', 'domates'],
      calories: 350
    });
    console.log('Öğün analizi:', analysis);
  } catch (error) {
    console.error('Analiz hatası:', error.message);
  }
};
*/

// Export API instance
export default api;

// CommonJS için
// module.exports = api; 