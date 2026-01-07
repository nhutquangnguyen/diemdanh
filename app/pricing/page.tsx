'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Bảng Giá Dự Kiến
            <span className="text-blue-600"> (Sau Beta)</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Không có chi phí ẩn. Không ràng buộc dài hạn. Hủy bất cứ lúc nào.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-lg font-semibold ${!isYearly ? 'text-gray-800' : 'text-gray-500'}`}>
              Thanh toán theo tháng
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isYearly ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isYearly ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-lg font-semibold ${isYearly ? 'text-gray-800' : 'text-gray-500'}`}>
              Thanh toán theo năm
              <span className="ml-2 inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                -20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Cơ Bản</h3>
              {isYearly ? (
                <div>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold text-gray-800">758K</span>
                    <span className="text-gray-500">/năm</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="line-through">948K</span>
                    <span className="ml-2 text-green-600 font-semibold">Tiết kiệm 190K</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">(~63K/tháng)</div>
                </div>
              ) : (
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-bold text-gray-800">79K</span>
                  <span className="text-gray-500">/tháng</span>
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">1 cửa hàng</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">5 nhân viên</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Tất cả tính năng</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Lưu ảnh selfie 1 tháng</span>
              </li>
            </ul>

            <div className="bg-gray-100 rounded-lg p-3 text-center text-sm text-gray-600 mb-6">
              Phù hợp cửa hàng nhỏ
            </div>

            <Link href="/auth/signup">
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all">
                Bắt Đầu Ngay
              </button>
            </Link>
          </div>

          {/* Standard Plan - POPULAR */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all transform scale-105 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
              PHỔ BIẾN NHẤT
            </div>

            <div className="text-center mb-6 text-white">
              <h3 className="text-2xl font-bold mb-4">Tiêu Chuẩn</h3>
              {isYearly ? (
                <div>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold">1,430K</span>
                    <span className="opacity-90">/năm</span>
                  </div>
                  <div className="text-sm opacity-90">
                    <span className="line-through">1,788K</span>
                    <span className="ml-2 font-semibold">Tiết kiệm 358K</span>
                  </div>
                  <div className="text-xs opacity-75 mt-1">(~119K/tháng)</div>
                </div>
              ) : (
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-bold">149K</span>
                  <span className="opacity-90">/tháng</span>
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8 text-white">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Không giới hạn cửa hàng</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>10 nhân viên</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Tất cả tính năng</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Hỗ trợ ưu tiên</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Lưu ảnh selfie 3 tháng</span>
              </li>
            </ul>

            <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center text-sm mb-6">
              Lựa chọn tốt nhất
            </div>

            <Link href="/auth/signup">
              <button className="w-full bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-all shadow-lg">
                Bắt Đầu Ngay
              </button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nhiều Chi Nhánh</h3>
              {isYearly ? (
                <div>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold text-gray-800">2,390K</span>
                    <span className="text-gray-500">/năm</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="line-through">2,988K</span>
                    <span className="ml-2 text-green-600 font-semibold">Tiết kiệm 598K</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">(~199K/tháng)</div>
                </div>
              ) : (
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-5xl font-bold text-gray-800">249K</span>
                  <span className="text-gray-500">/tháng</span>
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Không giới hạn cửa hàng</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">50 nhân viên</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Tất cả tính năng</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Hỗ trợ ưu tiên</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Lưu ảnh selfie 6 tháng</span>
              </li>
            </ul>

            <div className="bg-gray-100 rounded-lg p-3 text-center text-sm text-gray-600 mb-6">
              Cho chuỗi cửa hàng
            </div>

            <Link href="/auth/signup">
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                Bắt Đầu Ngay
              </button>
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            So Sánh Chi Tiết
          </h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-6 font-bold text-gray-800">Tính năng</th>
                    <th className="text-center p-6 font-bold text-gray-800">Cơ Bản</th>
                    <th className="text-center p-6 font-bold text-blue-600 bg-blue-50">Tiêu Chuẩn</th>
                    <th className="text-center p-6 font-bold text-gray-800">Nhiều Chi Nhánh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-6 text-gray-700">Số lượng cửa hàng</td>
                    <td className="p-6 text-center text-gray-600">1</td>
                    <td className="p-6 text-center font-semibold text-blue-600 bg-blue-50">Không giới hạn</td>
                    <td className="p-6 text-center text-gray-600">Không giới hạn</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Số lượng nhân viên</td>
                    <td className="p-6 text-center text-gray-600">5</td>
                    <td className="p-6 text-center font-semibold text-blue-600 bg-blue-50">10</td>
                    <td className="p-6 text-center text-gray-600">50</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Xác thực GPS</td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center bg-blue-50">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Selfie xác thực</td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center bg-blue-50">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Quét mã QR</td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center bg-blue-50">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Hỗ trợ nhiều ca</td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center bg-blue-50">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Báo cáo chi tiết</td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center bg-blue-50">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="p-6 text-center">
                      <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Lưu ảnh selfie</td>
                    <td className="p-6 text-center text-gray-600">1 tháng</td>
                    <td className="p-6 text-center font-semibold text-blue-600 bg-blue-50">3 tháng</td>
                    <td className="p-6 text-center text-gray-600">6 tháng</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Lưu trữ dữ liệu điểm danh</td>
                    <td className="p-6 text-center text-gray-600">Không giới hạn</td>
                    <td className="p-6 text-center font-semibold text-blue-600 bg-blue-50">Không giới hạn</td>
                    <td className="p-6 text-center text-gray-600">Không giới hạn</td>
                  </tr>
                  <tr>
                    <td className="p-6 text-gray-700">Hỗ trợ</td>
                    <td className="p-6 text-center text-gray-600">Email</td>
                    <td className="p-6 text-center font-semibold text-blue-600 bg-blue-50">Ưu tiên</td>
                    <td className="p-6 text-center text-gray-600">Ưu tiên</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Câu Hỏi Về Giá Cả
          </h2>
          <div className="space-y-6">
            <details className="bg-white rounded-xl shadow-lg p-6 group">
              <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                <span>Tôi có phải thanh toán ngay không?</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Không! Bạn được dùng thử miễn phí 7 ngày đầu với đầy đủ tính năng.
                Sau đó mới cần thanh toán nếu muốn tiếp tục sử dụng.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-lg p-6 group">
              <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                <span>Tôi nên chọn gói nào?</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                <strong>Cơ Bản (79K/tháng)</strong> phù hợp với cửa hàng nhỏ (1 cửa hàng, tối đa 5 nhân viên).<br/>
                <strong>Tiêu Chuẩn (149K/tháng)</strong> là lựa chọn tốt nhất cho hầu hết cửa hàng (không giới hạn cửa hàng, tối đa 10 nhân viên).<br/>
                <strong>Nhiều Chi Nhánh (249K/tháng)</strong> dành cho chuỗi cửa hàng lớn (không giới hạn cửa hàng, tối đa 50 nhân viên).
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-lg p-6 group">
              <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                <span>Ảnh selfie được lưu trong bao lâu?</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Tùy theo gói đăng ký:<br/>
                • <strong>Cơ Bản:</strong> Lưu ảnh trong 1 tháng<br/>
                • <strong>Tiêu Chuẩn:</strong> Lưu ảnh trong 3 tháng<br/>
                • <strong>Nhiều Chi Nhánh:</strong> Lưu ảnh trong 6 tháng<br/>
                Dữ liệu điểm danh (giờ vào/ra) được lưu vĩnh viễn cho tất cả các gói.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-lg p-6 group">
              <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                <span>Có giảm giá nếu trả theo năm không?</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Có! Thanh toán theo năm sẽ được giảm ngay 20% so với thanh toán theo tháng:<br/>
                • <strong>Cơ Bản:</strong> 758K/năm (tiết kiệm 190K)<br/>
                • <strong>Tiêu Chuẩn:</strong> 1,430K/năm (tiết kiệm 358K)<br/>
                • <strong>Nhiều Chi Nhánh:</strong> 2,390K/năm (tiết kiệm 598K)<br/>
                Chỉ cần bật nút "Thanh toán theo năm" ở trên để xem giá ưu đãi.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-lg p-6 group">
              <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                <span>Tôi có thể hủy bất cứ lúc nào không?</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Có! Không có ràng buộc dài hạn. Bạn có thể hủy bất cứ lúc nào.
                Dữ liệu điểm danh sẽ được lưu trong 30 ngày sau khi hủy để bạn có thể xuất báo cáo.
              </p>
            </details>

            <details className="bg-white rounded-xl shadow-lg p-6 group">
              <summary className="font-bold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                <span>Phương thức thanh toán nào được hỗ trợ?</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Hiện tại chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng.
              </p>
            </details>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Tham gia hàng trăm cửa hàng đang tiết kiệm thời gian và chi phí với diemdanh.net
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/auth/signup">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-lg font-bold text-xl transition-all shadow-lg">
                Dùng Thử Miễn Phí 7 Ngày
              </button>
            </Link>
            <Link href="/">
              <button className="border-2 border-white hover:bg-white hover:bg-opacity-10 px-10 py-5 rounded-lg font-bold text-xl transition-all">
                Xem Tính Năng
              </button>
            </Link>
          </div>
          <p className="text-sm opacity-75">
            Không cần thẻ tín dụng • Thiết lập trong 5 phút • Hỗ trợ 24/7
          </p>
        </div>
      </main>
    </div>
  );
}
