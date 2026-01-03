import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
          Hệ Thống Điểm Danh Thông Minh
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
          Giải pháp chấm công hiện đại với QR code, selfie và xác thực vị trí GPS
        </p>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Manage Button */}
          <Link href="/owner">
            <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 sm:hover:-translate-y-2 border-2 border-transparent hover:border-blue-500 cursor-pointer">
              <div className="p-6 sm:p-8 lg:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  Quản Lý
                </h3>
              </div>
            </div>
          </Link>

          {/* Check-in Button */}
          <Link href="/checkin">
            <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 sm:hover:-translate-y-2 border-2 border-transparent hover:border-green-500 cursor-pointer">
              <div className="p-6 sm:p-8 lg:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  Check-in
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          Cách Hoạt Động
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              1. Tạo Sự Kiện
            </h4>
            <p className="text-sm sm:text-base text-gray-600">
              Tạo sự kiện/cửa hàng và nhận mã QR điểm danh ngay lập tức
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              2. Thêm Danh Sách
            </h4>
            <p className="text-sm sm:text-base text-gray-600">
              Thêm email người tham gia. Chỉ người trong danh sách mới điểm danh được
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              3. Quét & Điểm Danh
            </h4>
            <p className="text-sm sm:text-base text-gray-600">
              Người tham gia quét QR, chụp selfie và xác thực vị trí GPS
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          Sẵn Sàng Bắt Đầu?
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Đăng ký miễn phí và tạo sự kiện đầu tiên trong 1 phút
        </p>
        <Link href="/auth/signup">
          <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl active:scale-95">
            Đăng Ký Miễn Phí
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-gray-600">
          <p className="text-xs sm:text-sm">
            © 2026 Diemdanh.net - Giải pháp chấm công thông minh
          </p>
        </div>
      </footer>
    </main>
  );
}
