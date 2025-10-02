// 美丽预约 - Footer Component
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-pink-600 mb-4">美丽预约</h3>
            <p className="text-sm text-gray-600 mb-4">
              专为访日・在日中国人打造的美容室预约平台，让您在日本享受无语言障碍的美容服务。
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-gray-600 hover:text-pink-600">
                  搜索美容室
                </Link>
              </li>
              <li>
                <Link href="/styles" className="text-gray-600 hover:text-pink-600">
                  发型图库
                </Link>
              </li>
              <li>
                <Link href="/areas" className="text-gray-600 hover:text-pink-600">
                  热门地区
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-pink-600">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">帮助中心</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help/booking" className="text-gray-600 hover:text-pink-600">
                  如何预约
                </Link>
              </li>
              <li>
                <Link href="/help/payment" className="text-gray-600 hover:text-pink-600">
                  支付方式
                </Link>
              </li>
              <li>
                <Link href="/help/cancel" className="text-gray-600 hover:text-pink-600">
                  取消政策
                </Link>
              </li>
              <li>
                <Link href="/help/faq" className="text-gray-600 hover:text-pink-600">
                  常见问题
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">联系我们</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>福冈市中央区天神</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-600">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+81-92-xxx-xxxx</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-600">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@meiliyuyue.jp</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 美丽预约 (Beautiful Appointment). All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-pink-600">
                隐私政策
              </Link>
              <Link href="/terms" className="hover:text-pink-600">
                服务条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
