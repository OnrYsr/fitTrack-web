'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TagIcon, FireIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/api';
import { Goal } from '@/types';

const goalSchema = z.object({
  calories: z.number().min(1, 'Kalori hedefi gerekli'),
  water: z.number().min(1, 'Su hedefi gerekli'),
});

type GoalForm = z.infer<typeof goalSchema>;

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await api.get('/goals');
      const goalData = response.data?.[0] || null;
      setGoals(goalData);
      
      // Form değerlerini doldur
      if (goalData) {
        // Form değerlerini set etmek için reset kullanılabilir
      }
    } catch (error) {
      console.error('Hedefler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: GoalForm) => {
    setSubmitting(true);
    try {
      await api.post('/goals', data);
      await fetchGoals();
    } catch (error) {
      console.error('Hedefler güncellenirken hata:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hedefler</h1>
        <p className="text-gray-600 mt-2">Günlük hedeflerinizi belirleyin ve takip edin</p>
      </div>

      {/* Current Goals Display */}
      {goals && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-orange-100 rounded-full mr-3">
                <FireIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Kalori Hedefi</h3>
                <p className="text-sm text-gray-600">Günlük kalori alımı</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600">{goals.calories} kcal</div>
          </Card>

          <Card>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <BeakerIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Su Hedefi</h3>
                <p className="text-sm text-gray-600">Günlük su tüketimi</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600">{goals.water} ml</div>
          </Card>
        </div>
      )}

      {/* Update Goals Form */}
      <Card>
        <div className="flex items-center mb-6">
          <TagIcon className="h-6 w-6 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            {goals ? 'Hedefleri Güncelle' : 'Hedefleri Belirle'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Günlük Kalori Hedefi (kcal)"
                type="number"
                placeholder="Örn: 2000"
                defaultValue={goals?.calories || 2000}
                {...register('calories', { valueAsNumber: true })}
                error={errors.calories?.message}
              />
              <p className="text-sm text-gray-500 mt-1">
                Günlük kalori alım hedefinizi belirleyin
              </p>
            </div>

            <div>
              <Input
                label="Günlük Su Hedefi (ml)"
                type="number"
                placeholder="Örn: 2000"
                defaultValue={goals?.water || 2000}
                {...register('water', { valueAsNumber: true })}
                error={errors.water?.message}
              />
              <p className="text-sm text-gray-500 mt-1">
                Günlük su tüketim hedefinizi belirleyin
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Önerilen Hedefler</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <strong>Kalori:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Kadınlar: 1800-2200 kcal</li>
                  <li>• Erkekler: 2200-2800 kcal</li>
                  <li>• Aktif yaşam: +200-500 kcal</li>
                </ul>
              </div>
              <div>
                <strong>Su:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Genel: 2000-2500 ml</li>
                  <li>• Egzersiz: +500-1000 ml</li>
                  <li>• Sıcak hava: +500 ml</li>
                </ul>
              </div>
            </div>
          </div>

          <Button type="submit" loading={submitting} className="w-full md:w-auto">
            {goals ? 'Hedefleri Güncelle' : 'Hedefleri Kaydet'}
          </Button>
        </form>
      </Card>

      {/* Tips */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hedef Belirleme İpuçları</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Hedeflerinizi yaşınıza, cinsiyetinize ve aktivite seviyenize göre belirleyin.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Küçük ve ulaşılabilir hedeflerle başlayın, zamanla artırın.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Düzenli olarak hedeflerinizi gözden geçirin ve gerekirse güncelleyin.</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Su tüketiminizi gün boyunca eşit olarak dağıtın.</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 