const translations = {
  zh: {
    title: "美丽预约",
    subtitle: "福岡美容室预约平台",
    nav: {
      home: "首页",
      salons: "美容室",
      booking: "预约",
      profile: "个人中心",
      login: "登录",
      register: "注册"
    },
    home: {
      hero: {
        title: "发现福岡最好的美容室",
        subtitle: "专业的美发、美甲、美容服务，为您的旅行增添美丽",
        cta: "立即预约"
      },
      features: {
        title: "为什么选择我们",
        professional: {
          title: "专业技师",
          description: "经验丰富的日本美容师，提供最新的日式美容服务"
        },
        convenient: {
          title: "便捷预约",
          description: "支持微信、微博登录，中文服务，预约简单快捷"
        },
        location: {
          title: "地理位置优越",
          description: "福岡市中心，交通便利，购物旅游两不误"
        }
      }
    }
  },
  ja: {
    title: "美麗預約",
    subtitle: "福岡美容室予約プラットフォーム",
    nav: {
      home: "ホーム",
      salons: "美容室",
      booking: "予約",
      profile: "プロフィール",
      login: "ログイン",
      register: "登録"
    },
    home: {
      hero: {
        title: "福岡最高の美容室を発見",
        subtitle: "プロのヘア、ネイル、美容サービスで旅行に美しさを",
        cta: "今すぐ予約"
      },
      features: {
        title: "なぜ私たちを選ぶのか",
        professional: {
          title: "プロの技術者",
          description: "経験豊富な日本の美容師による最新の日本式美容サービス"
        },
        convenient: {
          title: "便利な予約",
          description: "WeChat、Weiboログイン対応、中国語サービス、簡単予約"
        },
        location: {
          title: "優れた立地",
          description: "福岡市中心部、交通便利、ショッピングと観光の両立"
        }
      }
    }
  },
  en: {
    title: "Beauty Booking",
    subtitle: "Fukuoka Beauty Salon Booking Platform",
    nav: {
      home: "Home",
      salons: "Salons",
      booking: "Booking",
      profile: "Profile",
      login: "Login",
      register: "Register"
    },
    home: {
      hero: {
        title: "Discover Fukuoka's Best Beauty Salons",
        subtitle: "Professional hair, nail, and beauty services to enhance your travel experience",
        cta: "Book Now"
      },
      features: {
        title: "Why Choose Us",
        professional: {
          title: "Professional Stylists",
          description: "Experienced Japanese beauty professionals offering the latest Japanese beauty services"
        },
        convenient: {
          title: "Convenient Booking",
          description: "WeChat and Weibo login support, Chinese service, easy booking"
        },
        location: {
          title: "Prime Location",
          description: "Fukuoka city center, convenient transportation, perfect for shopping and sightseeing"
        }
      }
    }
  }
};

export function getTranslations(locale: string) {
  return translations[locale as keyof typeof translations] || translations.zh;
}

export function useTranslations(locale: string) {
  const t = getTranslations(locale);
  return (key: string) => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = t;
    for (const k of keys) {
      result = result?.[k];
    }
    return result || key;
  };
}