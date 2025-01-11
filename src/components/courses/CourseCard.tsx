import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users } from 'lucide-react';

interface Course {
  id: number;
  baslik: string;
  slug: string;
  aciklama: string;
  fiyat: number;
  resimUrl: string | null;
  kategori: {
    isim: string;
  };
  ogretmen: {
    ad: string;
    soyad: string;
    resimUrl: string | null;
  };
  _count: {
    dersler: number;
    kayitlar: number;
  };
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link 
      href={`/kurslar/${course.slug}`}
      key={course.id}
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-200"
    >
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          {course.resimUrl ? (
            <Image
              src={course.resimUrl.startsWith('/uploads/') ? course.resimUrl : `/uploads/${course.resimUrl}`}
              alt={course.baslik}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={95}
              priority={true}
              className="object-cover w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500">Resim yok</span>
            </div>
          )}
        </div>
        <div className="absolute -bottom-5 right-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-white shadow-md">
            <Image
              src={course.ogretmen.resimUrl?.startsWith('/uploads/') ? course.ogretmen.resimUrl : `/uploads/${course.ogretmen.resimUrl}` || "/placeholders/user.png"}
              alt={`${course.ogretmen.ad} ${course.ogretmen.soyad}`}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-6">
        <div className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">
          {course.kategori.isim}
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem] text-gray-900 dark:text-gray-100">
          {course.baslik}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 px-2">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6v12m-3-3h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{course._count.dersler}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{course._count.dersler * 30}dk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>{course._count.kayitlar}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {course.fiyat === 0 ? 'Ücretsiz' : `₺${course.fiyat}`}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">(4.29)</span>
          </div>
        </div>
      </div>
    </Link>
  );
}