'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  BeakerIcon, 
  FireIcon
} from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import api from '@/lib/api';
import { Meal, Water, Goal } from '@/types';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [waterRecords, setWaterRecords] = useState<Water[]>([]);
  const [goals, setGoals] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [mealsRes, waterRes, goalsRes] = await Promise.all([
          api.get('/meals'),
          api.get('/water'),
          api.get('/goals')
        ]);

        setMeals(mealsRes.data || []);
        setWaterRecords(waterRes.data || []);
        setGoals(goalsRes.data?.[0] || null);
      } catch (error) {
        console.error('Dashboard veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const todayMeals = meals.filter(meal => 
    new Date(meal.date).toDateString() === new Date().toDateString()
  );

  const todayWater = waterRecords.filter(water => 
    new Date(water.date).toDateString() === new Date().toDateString()
  );

  const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalWater = todayWater.reduce((sum, water) => sum + water.amount, 0);

  const stats = [
    {
      name: 'Bugünkü Kalori',
      value: totalCalories,
      target: goals?.calories || 2000,
      icon: FireIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'Bugünkü Su (ml)',
      value: totalWater,
      target: goals?.water || 2000,
      icon: BeakerIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Bugünkü Öğün',
      value: todayMeals.length,
      target: 3,
      icon: CalendarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bugünkü sağlık durumunuzu takip edin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const percentage = Math.min((stat.value / stat.target) * 100, 100);
          
          return (
            <Card key={stat.name} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      / {stat.target}
                    </span>
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>İlerleme</span>
                  <span>{Math.round(percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${stat.bgColor.replace('bg-', 'bg-').replace('-100', '-500')}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Öğünler</h3>
          {todayMeals.length > 0 ? (
            <div className="space-y-3">
              {todayMeals.slice(0, 5).map((meal) => (
                <div key={meal._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{meal.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(meal.date)}</p>
                  </div>
                  <div className="flex items-center text-orange-600">
                    <FireIcon className="h-4 w-4 mr-1" />
                    <span className="font-medium">{meal.calories} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Henüz öğün kaydı yok</p>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Su Takibi</h3>
          {todayWater.length > 0 ? (
            <div className="space-y-3">
              {todayWater.slice(0, 5).map((water) => (
                <div key={water._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <BeakerIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{water.amount} ml</p>
                      <p className="text-sm text-gray-500">{formatDate(water.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Henüz su kaydı yok</p>
          )}
        </Card>
      </div>
    </div>
  );
} 