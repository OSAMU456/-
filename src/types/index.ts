// 美丽预约 - Type Definitions

export interface Salon {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: 'low' | 'medium' | 'high' | 'luxury';
  openingHours: OpeningHours;
  location: {
    lat: number;
    lng: number;
    area: string; // 福岡天神、博多等
  };
  amenities: string[]; // WiFi、中文服务、支付宝、微信支付等
  tags: string[]; // 人气店铺、新店开业等
}

export interface OpeningHours {
  monday: TimeSlot | null;
  tuesday: TimeSlot | null;
  wednesday: TimeSlot | null;
  thursday: TimeSlot | null;
  friday: TimeSlot | null;
  saturday: TimeSlot | null;
  sunday: TimeSlot | null;
  holidays: TimeSlot | null;
}

export interface TimeSlot {
  open: string; // "09:00"
  close: string; // "20:00"
}

export interface Stylist {
  id: string;
  salonId: string;
  name: string;
  nameJa: string;
  title: string; // 首席发型师、资深发型师等
  description: string;
  image: string;
  experience: number; // 年数
  specialties: string[]; // 染发、烫发、剪发等
  gallery: string[]; // 作品集照片
  rating: number;
  reviewCount: number;
}

export interface Service {
  id: string;
  salonId: string;
  category: ServiceCategory;
  name: string;
  description: string;
  duration: number; // 分钟
  price: number; // 日元
  priceRmb?: number; // 人民币参考价
  image?: string;
}

export type ServiceCategory = 
  | 'cut' // 剪发
  | 'color' // 染发
  | 'perm' // 烫发
  | 'treatment' // 护理
  | 'styling' // 造型
  | 'spa' // SPA
  | 'other'; // 其他

export interface Style {
  id: string;
  salonId: string;
  stylistId: string;
  title: string;
  description: string;
  images: string[];
  tags: string[]; // 短发、长发、卷发、直发、染发、时尚、优雅等
  services: string[]; // 使用的服务ID
  likes: number;
}

export interface Booking {
  id: string;
  userId: string;
  salonId: string;
  stylistId: string;
  serviceIds: string[];
  date: string; // ISO date string
  time: string; // "10:00"
  status: BookingStatus;
  totalPrice: number;
  totalDuration: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 
  | 'pending' // 待确认
  | 'confirmed' // 已确认
  | 'completed' // 已完成
  | 'cancelled' // 已取消
  | 'no-show'; // 未到店

export interface Review {
  id: string;
  userId: string;
  salonId: string;
  stylistId?: string;
  bookingId: string;
  rating: number; // 1-5
  comment: string;
  images?: string[];
  response?: {
    comment: string;
    createdAt: string;
  };
  likes: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  avatar?: string;
  loginType: 'wechat' | 'weibo' | 'alipay' | 'email';
  favorites: {
    salons: string[];
    stylists: string[];
    styles: string[];
  };
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  area?: string;
  date?: string;
  time?: string;
  service?: ServiceCategory;
  priceRange?: Salon['priceRange'];
  rating?: number; // 最低评分
  amenities?: string[];
  sortBy?: 'rating' | 'price' | 'distance' | 'popularity';
}

export interface AvailableSlot {
  time: string;
  available: boolean;
  stylistId: string;
}
