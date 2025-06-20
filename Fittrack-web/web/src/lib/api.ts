import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class FitTrackAPI {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_URL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('fittrack_token') : null;
  }

  // Token'ı güncelle
  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('fittrack_token', token);
      } else {
        localStorage.removeItem('fittrack_token');
      }
    }
  }

  // HTTP headers'ı hazırla
  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // HTTP isteği gönder
  private async request(endpoint: string, options: any = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await axios(url, config);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      if (error.response?.status === 401) {
        this.setToken(null);
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      throw new Error(error.response?.data?.message || 'Bir hata oluştu');
    }
  }

  // ===== KİMLİK DOĞRULAMA =====

  // Kullanıcı kaydı
  async register(userData: { email: string; password: string; name: string }) {
    return this.request('/register', {
      method: 'POST',
      data: userData,
    });
  }

  // Kullanıcı girişi
  async login(credentials: { email: string; password: string }) {
    const data = await this.request('/login', {
      method: 'POST',
      data: credentials,
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
  async appleLogin(appleToken: string) {
    const data = await this.request('/apple-login', {
      method: 'POST',
      data: { appleToken },
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  // Google ile giriş
  async googleLogin(googleToken: string) {
    const data = await this.request('/google-login', {
      method: 'POST',
      data: { googleToken },
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  // Şifremi unuttum
  async forgotPassword(email: string) {
    return this.request('/forgot-password', {
      method: 'POST',
      data: { email },
    });
  }

  // ===== ÖĞÜN YÖNETİMİ =====

  // Tüm öğünleri getir
  async getMeals() {
    return this.request('/meals');
  }

  // Öğün ekle
  async addMeal(mealData: { name: string; calories: number; date?: string }) {
    return this.request('/meals', {
      method: 'POST',
      data: mealData,
    });
  }

  // Öğün sil
  async deleteMeal(mealId: string) {
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
  async addWater(amount: number) {
    return this.request('/water', {
      method: 'POST',
      data: { amount },
    });
  }

  // Su kaydını sil
  async deleteWaterRecord(waterId: string) {
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
  async setGoal(goalData: { calories?: number; water?: number }) {
    return this.request('/goals', {
      method: 'POST',
      data: goalData,
    });
  }

  // ===== AI ÖZELLİKLERİ =====

  // Öğün analizi
  async analyzeMeal(mealData: { mealName: string; ingredients: string[]; calories: number }) {
    return this.request('/ai/analyze-meal', {
      method: 'POST',
      data: mealData,
    });
  }

  // Günlük özet
  async getDailySummary(date: string) {
    return this.request('/ai/summary', {
      method: 'POST',
      data: { date },
    });
  }

  // ===== DÖKÜMAN YÖNETİMİ =====

  // Tüm dökümanları getir
  async getDocs() {
    return this.request('/docs');
  }

  // Döküman ekle
  async addDoc(docData: { title: string; content: string; type: string }) {
    return this.request('/docs', {
      method: 'POST',
      data: docData,
    });
  }

  // Tipine göre dökümanları getir
  async getDocsByType(type: string) {
    return this.request(`/docs/${type}`);
  }

  // ===== TEST =====

  // Test endpointi
  async test() {
    return this.request('/test');
  }

  // Token kontrolü
  isAuthenticated() {
    return !!this.token;
  }
}

// API instance'ını oluştur
const api = new FitTrackAPI();

export default api; 