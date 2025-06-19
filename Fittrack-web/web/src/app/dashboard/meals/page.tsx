'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusIcon, TrashIcon, FireIcon } from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/api';
import { Meal } from '@/types';
import { formatDate } from '@/lib/utils';

const mealSchema = z.object({
  name: z.string().min(1, 'Öğün adı gerekli'),
  calories: z.number().min(1, 'Kalori değeri gerekli'),
});

type MealForm = z.infer<typeof mealSchema>;

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MealForm>({
    resolver: zodResolver(mealSchema),
  });

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await api.get('/meals');
      setMeals(response.data || []);
    } catch (error) {
      console.error('Öğünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: MealForm) => {
    setSubmitting(true);
    try {
      await api.post('/meals', data);
      await fetchMeals();
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Öğün eklenirken hata:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMeal = async (mealId: string) => {
    if (!confirm('Bu öğünü silmek istediğinizden emin misiniz?')) return;
    
    try {
      await api.delete(`/meals/${mealId}`);
      await fetchMeals();
    } catch (error) {
      console.error('Öğün silinirken hata:', error);
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Öğünler</h1>
          <p className="text-gray-600 mt-2">Yediğiniz öğünleri takip edin</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Öğün
        </Button>
      </div>

      {/* Add Meal Form */}
      {showForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Yeni Öğün Ekle</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Öğün Adı"
                placeholder="Örn: Kahvaltı, Öğle Yemeği"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Kalori"
                type="number"
                placeholder="Örn: 500"
                {...register('calories', { valueAsNumber: true })}
                error={errors.calories?.message}
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" loading={submitting}>
                Kaydet
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}
              >
                İptal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Meals List */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Öğün Geçmişi</h3>
        {meals.length > 0 ? (
          <div className="space-y-3">
            {meals.map((meal) => (
              <div key={meal._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-full mr-4">
                    <FireIcon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{meal.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(meal.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-orange-600 font-medium">{meal.calories} kcal</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMeal(meal._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FireIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Henüz öğün kaydı yok</p>
            <p className="text-sm text-gray-400 mt-2">İlk öğününüzü ekleyerek başlayın</p>
          </div>
        )}
      </Card>
    </div>
  );
} 