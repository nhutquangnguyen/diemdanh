'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/auth';
import Header from '@/components/Header';
import { useToast } from '@/components/Toast';

export default function AddStaff() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.id as string;
  const toast = useToast();

  const [user, setUser] = useState<any>(null);
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [hourRate, setHourRate] = useState('25000'); // Default hourly rate

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }
    setUser(currentUser);
    loadStore();
  }

  async function loadStore() {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .single();

      if (error) throw error;
      setStore(data);
    } catch (error) {
      console.error('Error loading store:', error);
      toast.error('Không tìm thấy cửa hàng');
      router.push('/owner');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const trimmedEmail = email.trim().toLowerCase();

      // Step 1: Check if this email exists in our platform by querying a safe table
      // We'll use a database function or check staff/users indirectly
      const { data: existingUsers, error: userCheckError } = await supabase
        .rpc('get_user_by_email', { email_input: trimmedEmail });

      if (userCheckError) {
        // If the RPC doesn't exist, fall back to checking auth metadata
        console.error('RPC error:', userCheckError);
        toast.warning('Email này chưa đăng ký tài khoản trên hệ thống. Vui lòng yêu cầu người này đăng ký tài khoản trước.');
        setLoading(false);
        return;
      }

      if (!existingUsers || existingUsers.length === 0) {
        toast.warning('Email này chưa đăng ký tài khoản trên hệ thống. Vui lòng yêu cầu người này đăng ký tài khoản trước.');
        setLoading(false);
        return;
      }

      const registeredUser = existingUsers[0];

      // Step 2: Check if staff already exists in this store
      const { data: existingStaff } = await supabase
        .from('staff')
        .select('id')
        .eq('email', trimmedEmail)
        .eq('store_id', storeId)
        .single();

      if (existingStaff) {
        toast.warning('Email này đã được thêm vào danh sách nhân viên');
        setLoading(false);
        return;
      }

      // Step 3: Add staff with data from registered user
      const { error } = await supabase
        .from('staff')
        .insert([
          {
            store_id: storeId,
            user_id: registeredUser.id,
            email: trimmedEmail,
            full_name: registeredUser.full_name || trimmedEmail.split('@')[0],
            phone: registeredUser.phone || null,
            hour_rate: parseFloat(hourRate) || 0,
          },
        ]);

      if (error) throw error;

      toast.success('Thêm email thành công!');
      router.push(`/owner/stores/${storeId}`);
    } catch (error: any) {
      console.error('Error adding staff:', error);
      toast.error('Lỗi: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thêm Nhân Viên
            </h2>
            <p className="text-gray-600">
              Chỉ thêm được email đã đăng ký tài khoản trên hệ thống. Những email trong danh sách mới có thể điểm danh.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="nhanvien@example.com"
              />
              <p className="text-sm text-gray-500 mt-1">
                Email phải đã đăng ký tài khoản trên diemdanh.net
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lương Theo Giờ (VNĐ) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="1000"
                value={hourRate}
                onChange={(e) => setHourRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Mức lương theo giờ để tính tổng lương (VD: 25,000 VNĐ/giờ)
              </p>
            </div>

            <div className="flex gap-4">
              <Link href={`/owner/stores/${storeId}`} className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Hủy
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                {loading ? 'Đang thêm...' : 'Thêm Email'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Toast Container */}
      <toast.ToastContainer />
    </div>
  );
}
