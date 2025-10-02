// 美丽预约 - Mock Data
import { Salon, Stylist, Service, Style, Review } from '@/types';

export const mockSalons: Salon[] = [
  {
    id: '1',
    name: 'Kraemer Paris 福冈',
    nameJa: 'クレーマーパリ福岡',
    description: '来自巴黎的高端美发沙龙，提供国际水准的美发服务。我们的发型师团队拥有丰富的国际经验，精通各种流行发型设计。店内提供中文服务，让您无语言障碍地享受优质美发体验。',
    address: '福冈县福冈市中央区天神2-3-10天神パインクレスト3F',
    phone: '+81-92-xxx-xxxx',
    email: 'info@kraemerparis-fukuoka.jp',
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800',
      'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800',
    ],
    rating: 4.8,
    reviewCount: 156,
    priceRange: 'high',
    openingHours: {
      monday: null,
      tuesday: { open: '10:00', close: '20:00' },
      wednesday: { open: '10:00', close: '20:00' },
      thursday: { open: '10:00', close: '20:00' },
      friday: { open: '10:00', close: '20:00' },
      saturday: { open: '09:00', close: '21:00' },
      sunday: { open: '09:00', close: '21:00' },
      holidays: { open: '09:00', close: '19:00' },
    },
    location: {
      lat: 33.5904,
      lng: 130.3986,
      area: '天神',
    },
    amenities: ['中文服务', 'WiFi', '支付宝', '微信支付', '免费饮料', '杂志', '停车场'],
    tags: ['人气店铺', '高端沙龙', '国际品牌'],
  },
  {
    id: '2',
    name: '东京风格 博多店',
    nameJa: 'トーキョースタイル博多店',
    description: '专注于日式美发的专业沙龙，提供最新的日本流行发型设计。店内氛围温馨舒适，发型师细心专业，深受年轻顾客喜爱。',
    address: '福冈县福冈市博多区博多站前3-25-21',
    phone: '+81-92-xxx-yyyy',
    email: 'info@tokyostyle-hakata.jp',
    images: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800',
      'https://images.unsplash.com/photo-1559599746-48f07d6f3c5e?w=800',
    ],
    rating: 4.6,
    reviewCount: 89,
    priceRange: 'medium',
    openingHours: {
      monday: { open: '10:00', close: '19:00' },
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: null,
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '19:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '09:00', close: '20:00' },
      holidays: { open: '09:00', close: '19:00' },
    },
    location: {
      lat: 33.5897,
      lng: 130.4204,
      area: '博多',
    },
    amenities: ['中文服务', 'WiFi', '支付宝', '微信支付', '免费饮料'],
    tags: ['性价比高', '日式风格', '年轻时尚'],
  },
];

export const mockStylists: Stylist[] = [
  {
    id: '1',
    salonId: '1',
    name: '李美娜',
    nameJa: 'リ ミナ',
    title: '首席发型师',
    description: '拥有15年美发经验的资深发型师，曾在巴黎、东京等地工作。擅长亚洲人发质的染发和造型设计，特别精通韩式、日式流行发型。中文、日语、英语流利。',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
    experience: 15,
    specialties: ['染发', '烫发', '剪发', '造型设计'],
    gallery: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400',
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400',
    ],
    rating: 4.9,
    reviewCount: 78,
  },
  {
    id: '2',
    salonId: '1',
    name: '田中健',
    nameJa: 'タナカ ケン',
    title: '资深发型师',
    description: '日本本土发型师，擅长日式短发和男士发型设计。能够用简单的中文交流，为客户提供贴心服务。',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    experience: 8,
    specialties: ['男士剪发', '短发', '日式造型'],
    gallery: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
    ],
    rating: 4.7,
    reviewCount: 45,
  },
  {
    id: '3',
    salonId: '2',
    name: '王小芳',
    nameJa: 'ワン シャオファン',
    title: '发型师',
    description: '年轻有活力的发型师，紧跟最新流行趋势。擅长为年轻顾客打造个性时尚的发型。',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    experience: 5,
    specialties: ['染发', '烫发', '时尚造型'],
    gallery: [
      'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400',
    ],
    rating: 4.5,
    reviewCount: 32,
  },
];

export const mockServices: Service[] = [
  // Kraemer Paris 福冈
  {
    id: '1',
    salonId: '1',
    category: 'cut',
    name: '精剪造型（女士）',
    description: '包含洗发、精细剪发和吹风造型',
    duration: 60,
    price: 8800,
    priceRmb: 440,
  },
  {
    id: '2',
    salonId: '1',
    category: 'cut',
    name: '精剪造型（男士）',
    description: '包含洗发、精细剪发和吹风造型',
    duration: 45,
    price: 6600,
    priceRmb: 330,
  },
  {
    id: '3',
    salonId: '1',
    category: 'color',
    name: '全头染发',
    description: '使用欧洲进口染发剂，温和不伤发',
    duration: 120,
    price: 15400,
    priceRmb: 770,
  },
  {
    id: '4',
    salonId: '1',
    category: 'color',
    name: '挑染/渐变色',
    description: '时尚挑染或渐变色设计',
    duration: 150,
    price: 19800,
    priceRmb: 990,
  },
  {
    id: '5',
    salonId: '1',
    category: 'perm',
    name: '数码烫',
    description: '使用最新数码烫技术，持久自然',
    duration: 180,
    price: 17600,
    priceRmb: 880,
  },
  {
    id: '6',
    salonId: '1',
    category: 'treatment',
    name: '深层护理',
    description: '修复受损发质，恢复光泽',
    duration: 45,
    price: 5500,
    priceRmb: 275,
  },
  // 东京风格 博多店
  {
    id: '7',
    salonId: '2',
    category: 'cut',
    name: '剪发造型（女士）',
    description: '包含洗发、剪发和吹风',
    duration: 60,
    price: 5500,
    priceRmb: 275,
  },
  {
    id: '8',
    salonId: '2',
    category: 'cut',
    name: '剪发造型（男士）',
    description: '包含洗发、剪发和吹风',
    duration: 45,
    price: 4400,
    priceRmb: 220,
  },
  {
    id: '9',
    salonId: '2',
    category: 'color',
    name: '染发套餐',
    description: '全头染发+护理',
    duration: 150,
    price: 11000,
    priceRmb: 550,
  },
  {
    id: '10',
    salonId: '2',
    category: 'perm',
    name: '冷烫',
    description: '自然卷度，轻松打理',
    duration: 150,
    price: 12100,
    priceRmb: 605,
  },
];

export const mockStyles: Style[] = [
  {
    id: '1',
    salonId: '1',
    stylistId: '1',
    title: '韩式空气刘海中长发',
    description: '轻盈的空气刘海搭配自然卷度，修饰脸型显年轻',
    images: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600',
    ],
    tags: ['中长发', '空气刘海', '韩式', '自然', '显年轻'],
    services: ['1', '5', '6'],
    likes: 245,
  },
  {
    id: '2',
    salonId: '1',
    stylistId: '1',
    title: '渐变奶茶色长发',
    description: '从深棕色到奶茶色的自然渐变，时尚又温柔',
    images: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600',
    ],
    tags: ['长发', '染发', '渐变色', '奶茶色', '温柔'],
    services: ['1', '4', '6'],
    likes: 312,
  },
  {
    id: '3',
    salonId: '1',
    stylistId: '2',
    title: '日系男士短发',
    description: '清爽利落的日式短发，适合商务或休闲场合',
    images: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600',
    ],
    tags: ['男士', '短发', '日式', '清爽', '利落'],
    services: ['2'],
    likes: 156,
  },
  {
    id: '4',
    salonId: '2',
    stylistId: '3',
    title: '短发LOB头',
    description: '时尚短发LOB，干练又不失女人味',
    images: [
      'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600',
    ],
    tags: ['短发', 'LOB', '时尚', '干练', '个性'],
    services: ['7'],
    likes: 189,
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    salonId: '1',
    stylistId: '1',
    bookingId: 'booking1',
    rating: 5,
    comment: '李老师的技术真的太棒了！完全理解我想要的发型，剪出来的效果比我预期的还要好。店里环境也很舒适，服务非常周到。强烈推荐给大家！',
    images: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400',
    ],
    response: {
      comment: '非常感谢您的好评！很高兴您满意我们的服务，期待您的再次光临！',
      createdAt: '2025-09-15T14:30:00Z',
    },
    likes: 23,
    createdAt: '2025-09-15T10:20:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    salonId: '1',
    stylistId: '1',
    bookingId: 'booking2',
    rating: 5,
    comment: '第一次在日本剪头发，本来还担心语言不通，没想到李老师中文说得特别好！染的颜色也很自然，朋友都说很好看。下次还会再来！',
    likes: 18,
    createdAt: '2025-09-10T15:45:00Z',
  },
  {
    id: '3',
    userId: 'user3',
    salonId: '1',
    stylistId: '2',
    bookingId: 'booking3',
    rating: 4,
    comment: '田中老师剪的男士短发很专业，虽然中文不太流利但态度很好，会用翻译软件交流。整体体验不错！',
    likes: 12,
    createdAt: '2025-09-08T11:15:00Z',
  },
  {
    id: '4',
    userId: 'user4',
    salonId: '2',
    stylistId: '3',
    bookingId: 'booking4',
    rating: 5,
    comment: '王老师很年轻但技术很好！给我推荐的发色特别适合我，而且价格也比较实惠。会推荐给朋友的！',
    likes: 15,
    createdAt: '2025-09-20T16:30:00Z',
  },
];

// Helper function to get data by ID
export function getSalonById(id: string): Salon | undefined {
  return mockSalons.find(salon => salon.id === id);
}

export function getStylistsBySalonId(salonId: string): Stylist[] {
  return mockStylists.filter(stylist => stylist.salonId === salonId);
}

export function getServicesBySalonId(salonId: string): Service[] {
  return mockServices.filter(service => service.salonId === salonId);
}

export function getStylesBySalonId(salonId: string): Style[] {
  return mockStyles.filter(style => style.salonId === salonId);
}

export function getReviewsBySalonId(salonId: string): Review[] {
  return mockReviews.filter(review => review.salonId === salonId);
}

export function getStylistById(id: string): Stylist | undefined {
  return mockStylists.find(stylist => stylist.id === id);
}

export function getServiceById(id: string): Service | undefined {
  return mockServices.find(service => service.id === id);
}
