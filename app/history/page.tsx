'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import { CheckIn } from '@/types';
import Header from '@/components/Header';

export default function CheckInHistory() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filterStore, setFilterStore] = useState<string>('all');
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login?returnUrl=/history');
      return;
    }
    setUser(currentUser);
    loadCheckIns(currentUser);
  }

  async function loadCheckIns(currentUser: any) {
    try {
      // Find all staff records for this user (by email)
      const { data: staffRecords, error: staffError } = await supabase
        .from('staff')
        .select('id, store_id, store:stores(*)')
        .eq('email', currentUser.email);

      if (staffError) throw staffError;

      if (!staffRecords || staffRecords.length === 0) {
        setLoading(false);
        return;
      }

      // Get unique stores
      const uniqueStores = Array.from(
        new Map(staffRecords.map((s: any) => [s.store.id, s.store])).values()
      );
      setStores(uniqueStores);

      // Get all staff IDs for this user
      const staffIds = staffRecords.map((s: any) => s.id);

      // Load all check-ins for these staff IDs
      const { data: checkInsData, error: checkInsError } = await supabase
        .from('check_ins')
        .select('*, staff(*), store:stores(*)')
        .in('staff_id', staffIds)
        .order('check_in_time', { ascending: false })
        .limit(100);

      if (checkInsError) throw checkInsError;
      setCheckIns(checkInsData || []);
    } catch (error) {
      console.error('Error loading check-ins:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCheckIns = filterStore === 'all'
    ? checkIns
    : checkIns.filter((c) => c.store_id === filterStore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Lịch Sử Điểm Danh
          </h1>
          <p className="text-gray-600">
            Xem tất cả các lần điểm danh của bạn
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : checkIns.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Chưa có lịch sử điểm danh
            </h3>
            <p className="text-gray-500 mb-6">
              Bạn chưa thực hiện điểm danh lần nào
            </p>
            <Link href="/checkin">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
                Điểm Danh Ngay
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Filter by Store */}
            {stores.length > 1 && (
              <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lọc theo cửa hàng:
                </label>
                <select
                  value={filterStore}
                  onChange={(e) => setFilterStore(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">Tất cả ({checkIns.length})</option>
                  {stores.map((store: any) => (
                    <option key={store.id} value={store.id}>
                      {store.name} ({checkIns.filter((c) => c.store_id === store.id).length})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Check-ins List */}
            <div className="space-y-4">
              {filteredCheckIns.map((checkIn: any) => (
                <div key={checkIn.id} className="bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-start gap-4 mb-3">
                    {/* Selfie */}
                    {checkIn.selfie_url ? (
                      <button
                        onClick={() => setSelectedImage(checkIn.selfie_url)}
                        className="flex-shrink-0 hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={checkIn.selfie_url}
                          alt="Selfie"
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border-2 border-gray-200 hover:border-green-400 cursor-pointer"
                        />
                      </button>
                    ) : (
                      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg bg-gray-300 flex items-center justify-center border-2 border-gray-200">
                        <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">
                            {checkIn.store?.name || 'N/A'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {checkIn.store?.address || 'N/A'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                          checkIn.status === 'checked_out' ? 'bg-green-100 text-green-800' :
                          checkIn.status === 'checked_in' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {checkIn.status === 'checked_out' ? 'Đã check-out' :
                           checkIn.status === 'checked_in' ? 'Đang làm việc' :
                           checkIn.status === 'success' ? 'Đã check-in' : 'N/A'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Thời gian</p>
                          <p className="font-semibold text-gray-800">
                            {new Date(checkIn.check_in_time).toLocaleTimeString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Khoảng cách</p>
                          <p className="font-semibold text-gray-800">
                            {checkIn.distance_meters > 0 ? `${checkIn.distance_meters.toFixed(1)}m` : 'N/A'}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Ngày</p>
                          <p className="font-semibold text-gray-800">
                            {new Date(checkIn.check_in_time).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={selectedImage}
              alt="Full size selfie"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
