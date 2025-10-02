// 美丽预约 - Salon Card Component
import Link from 'next/link';
import Image from 'next/image';
import { Salon } from '@/types';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';

interface SalonCardProps {
  salon: Salon;
}

export default function SalonCard({ salon }: SalonCardProps) {
  const priceRangeMap = {
    low: '¥',
    medium: '¥¥',
    high: '¥¥¥',
    luxury: '¥¥¥¥',
  };

  return (
    <Link href={`/salon/${salon.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={salon.images[0]}
            alt={salon.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {salon.tags.length > 0 && (
            <div className="absolute top-2 left-2">
              <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded">
                {salon.tags[0]}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
            {salon.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{salon.nameJa}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{salon.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({salon.reviewCount}条评价)</span>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{salon.location.area}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>{priceRangeMap[salon.priceRange]}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 mt-3">
            {salon.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
