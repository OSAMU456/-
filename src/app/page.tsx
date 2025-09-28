import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-600">美丽预约</h1>
              <span className="ml-2 text-sm text-gray-600">Beautiful Appointment</span>
            </div>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700 transition-colors">
              登录
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            在日本寻找完美美容体验
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            专为中国朋友打造的日本美容室预约平台<br />
            语言无障碍，服务有保障
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-full shadow-lg p-2 max-w-2xl mx-auto">
            <div className="flex items-center">
              <div className="flex-1 min-w-0">
                <input 
                  type="text" 
                  placeholder="搜索地点、美容室或服务..." 
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-none focus:outline-none"
                />
              </div>
              <Link 
                href="/search"
                className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors inline-block"
              >
                搜索
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">为什么选择美丽预约？</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗣️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">中文服务</h4>
              <p className="text-gray-600">专业中文客服，支持中文沟通的美容师推荐</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">精准定位</h4>
              <p className="text-gray-600">基于位置的智能推荐，找到最近的优质美容室</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">即时预约</h4>
              <p className="text-gray-600">实时查看空档，一键预约，无需等待</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">热门地区</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['福冈', '东京', '大阪', '京都', '名古屋', '横滨', '神户', '奈良'].map((city) => (
              <Link 
                key={city}
                href={`/search?area=${encodeURIComponent(city)}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center block"
              >
                <span className="font-semibold text-gray-900">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-pink-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">开始您的美丽之旅</h3>
          <p className="text-xl mb-8 opacity-90">立即注册，享受专属优惠</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              用户注册
            </button>
            <Link 
              href="/admin"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors text-center"
            >
              商家入驻
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">美丽预约</h4>
              <p className="text-gray-400">让美丽触手可及</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">用户服务</h5>
              <ul className="space-y-2 text-gray-400">
                <li>如何预约</li>
                <li>服务条款</li>
                <li>隐私政策</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">商家服务</h5>
              <ul className="space-y-2 text-gray-400">
                <li>商家入驻</li>
                <li>管理后台</li>
                <li>营销推广</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">联系我们</h5>
              <ul className="space-y-2 text-gray-400">
                <li>客服热线</li>
                <li>微信客服</li>
                <li>意见反馈</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 美丽预约. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
