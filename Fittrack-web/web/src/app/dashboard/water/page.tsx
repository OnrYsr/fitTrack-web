'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusIcon, TrashIcon, BeakerIcon } from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import api from '@/lib/api';
import { Water } from '@/types';
import { formatDate } from '@/lib/utils';

const waterSchema = z.object({
  amount: z.number().min(1, 'Su miktarı gerekli'),
});

type WaterForm = z.infer<typeof waterSchema>;

export default function WaterPage() {
  const [waterRecords, setWaterRecords] = useState<Water[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaterForm>({
    resolver: zodResolver(waterSchema),
  });

  useEffect(() => {
    fetchWaterRecords();
  }, []);

  const fetchWaterRecords = async () => {
    try {
      const response = await api.get('/water');
      setWaterRecords(response.data || []);
    } catch (error) {
      console.error('Su kayıtları yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: WaterForm) => {
    setSubmitting(true);
    try {
      await api.post('/water', data);
      await fetchWaterRecords();
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Su kaydı eklenirken hata:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteWaterRecord = async (waterId: string) => {
    if (!confirm('Bu su kaydını silmek istediğinizden emin misiniz?')) return;
    
    try {
      await api.delete(`/water/${waterId}`);
      await fetchWaterRecords();
    } catch (error) {
      console.error('Su kaydı silinirken hata:', error);
    }
  };

  const todayWater = waterRecords.filter(water => 
    new Date(water.date).toDateString() === new Date().toDateString()
  );

  const totalToday = todayWater.reduce((sum, water) => sum + water.amount, 0);

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
          <h1 className="text-3xl font-bold text-gray-900">Su Takibi</h1>
          <p className="text-gray-600 mt-2">Günlük su tüketiminizi takip edin</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Su Ekle
        </Button>
      </div>

      {/* Today's Summary */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Bugünkü Su Tüketimi</h3>
            <p className="text-sm text-gray-600">Hedef: 2000 ml</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{totalToday} ml</div>
            <div className="text-sm text-gray-500">
              {Math.round((totalToday / 2000) * 100)}% tamamlandı
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalToday / 2000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* Add Water Form */}
      {showForm && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Su Ekle</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Su Miktarı (ml)"
              type="number"
              placeholder="Örn: 250"
              {...register('amount', { valueAsNumber: true })}
              error={errors.amount?.message}
            />
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

      {/* Quick Add Buttons */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Ekle</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[100, 200, 250, 500].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              onClick={async () => {
                try {
                  await api.post('/water', { amount });
                  await fetchWaterRecords();
                } catch (error) {
                  console.error('Su eklenirken hata:', error);
                }
              }}
            >
              <BeakerIcon className="h-4 w-4 mr-2" />
              {amount} ml
            </Button>
          ))}
        </div>
      </Card>

      {/* Water Records List */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Su Geçmişi</h3>
        {waterRecords.length > 0 ? (
          <div className="space-y-3">
            {waterRecords.map((water) => (
              <div key={water._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <BeakerIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{water.amount} ml</p>
                    <p className="text-sm text-gray-500">{formatDate(water.date)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteWaterRecord(water._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BeakerIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Henüz su kaydı yok</p>
            <p className="text-sm text-gray-400 mt-2">İlk su kaydınızı ekleyerek başlayın</p>
          </div>
        )}
      </Card>
    </div>
  );
} 