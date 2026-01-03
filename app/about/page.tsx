import Link from 'next/link';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Giới Thiệu Về Diemdanh.net
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Giải pháp chấm công thông minh cho doanh nghiệp hiện đại
          </p>
        </div>

        {/* What is it */}
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Diemdanh.net Là Gì?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Diemdanh.net là hệ thống điểm danh thông minh được thiết kế đặc biệt cho các doanh nghiệp nhỏ và vừa tại Việt Nam.
            Chúng tôi giúp bạn quản lý chấm công nhân viên một cách hiện đại, chính xác và tiện lợi.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Với công nghệ QR code kết hợp xác thực vị trí GPS và selfie, Diemdanh.net đảm bảo rằng nhân viên của bạn
            thực sự có mặt tại địa điểm làm việc khi điểm danh.
          </p>
        </section>

        {/* How it works */}
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Cách Hoạt Động
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Tạo Cửa Hàng/Sự Kiện
                </h3>
                <p className="text-gray-700">
                  Người quản lý tạo cửa hàng hoặc sự kiện, thiết lập vị trí GPS và bán kính cho phép.
                  Hệ thống sẽ tự động tạo mã QR điểm danh duy nhất.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Thêm Danh Sách Nhân Viên
                </h3>
                <p className="text-gray-700">
                  Quản lý thêm email của nhân viên vào danh sách. Chỉ những người trong danh sách
                  mới có thể điểm danh tại cửa hàng/sự kiện đó.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Quét QR & Điểm Danh
                </h3>
                <p className="text-gray-700">
                  Nhân viên quét mã QR bằng điện thoại, chụp selfie và hệ thống tự động xác thực vị trí GPS.
                  Mọi lần quét đều được lưu lại với thông tin đầy đủ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Tính Năng Nổi Bật
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-800">Quét QR Code</h3>
                <p className="text-sm text-gray-600">Điểm danh nhanh chóng bằng mã QR</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-800">Xác Thực GPS</h3>
                <p className="text-sm text-gray-600">Đảm bảo nhân viên có mặt tại địa điểm</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-800">Chụp Selfie</h3>
                <p className="text-sm text-gray-600">Xác nhận danh tính khi điểm danh</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-800">Lịch Sử Chi Tiết</h3>
                <p className="text-sm text-gray-600">Lưu trữ tất cả lần điểm danh</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-800">Tính Giờ Làm</h3>
                <p className="text-sm text-gray-600">Tự động tính thời gian làm việc</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-800">Dễ Sử Dụng</h3>
                <p className="text-sm text-gray-600">Giao diện đơn giản, thân thiện</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Tại Sao Chọn Diemdanh.net?
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🚀 Miễn Phí & Dễ Dàng
              </h3>
              <p className="text-gray-700">
                Đăng ký miễn phí, không cần cài đặt phức tạp. Tạo cửa hàng và bắt đầu sử dụng ngay trong 1 phút.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🎯 Chính Xác & Tin Cậy
              </h3>
              <p className="text-gray-700">
                Kết hợp GPS, QR code và selfie để đảm bảo thông tin điểm danh chính xác tuyệt đối.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📱 Tối Ưu Cho Mobile
              </h3>
              <p className="text-gray-700">
                Giao diện thân thiện với di động, nhân viên có thể điểm danh dễ dàng bằng smartphone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🇻🇳 Thiết Kế Cho Việt Nam
              </h3>
              <p className="text-gray-700">
                100% tiếng Việt, phù hợp với văn hóa làm việc và nhu cầu của doanh nghiệp Việt Nam.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/auth/signup">
            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl active:scale-95">
              Bắt Đầu Sử Dụng Ngay
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            Hoặc{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              quay lại trang chủ
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
