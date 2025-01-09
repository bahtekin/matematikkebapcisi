interface Curriculum {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'practice';
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface CurriculumSection {
  id: number;
  title: string;
  items: Curriculum[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  image: string;
  price: string;
  tag: string;
  level: string;
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: CurriculumSection[];
  instructor_details: {
    name: string;
    avatar: string;
    bio: string;
    rating: number;
    reviews: number;
    students: number;
    courses: number;
  };
}

const courses: Course[] = [
  {
    id: 1,
    slug: 'tyt-matematik-sifirdan-zirveye',
    title: "TYT Matematik Sıfırdan Zirveye",
    instructor: "Dr. Ahmet Yılmaz",
    rating: 4.9,
    students: 1234,
    duration: "40 saat",
    lessons: 120,
    image: "/courses/tyt-mat.png",
    price: "₺299",
    tag: "TYT",
    level: "Başlangıç",
    description: "TYT matematikte sıfırdan zirveye çıkmanızı sağlayacak kapsamlı eğitim serisi.",
    whatYouWillLearn: [
      "Temel matematik kavramlarını sağlam bir şekilde öğreneceksiniz",
      "TYT sınavında çıkan tüm konu başlıklarını detaylı işleyeceğiz",
      "Bol soru çözümü ile konuları pekiştireceksiniz",
      "Sınav stratejileri ve zaman yönetimini öğreneceksiniz"
    ],
    requirements: [
      "Herhangi bir ön bilgi gerekmiyor",
      "Düzenli çalışma disiplini",
      "İnternet bağlantısı ve bir bilgisayar/tablet"
    ],
    curriculum: [
      {
        id: 1,
        title: "Temel Kavramlar",
        items: [
          {
            id: 1,
            title: "Sayılar ve Sayı Sistemleri",
            duration: "45 dk",
            type: "video"
          },
          {
            id: 2,
            title: "Bölünebilme Kuralları",
            duration: "30 dk",
            type: "video"
          },
          {
            id: 3,
            title: "EBOB-EKOK",
            duration: "40 dk",
            type: "video"
          },
          {
            id: 4,
            title: "Konu Tarama Testi",
            duration: "30 dk",
            type: "quiz",
            isLocked: true
          }
        ]
      },
      {
        id: 2,
        title: "Sayı Basamakları",
        items: [
          {
            id: 5,
            title: "Basamak Kavramı",
            duration: "35 dk",
            type: "video"
          },
          {
            id: 6,
            title: "Basamak Problemleri",
            duration: "45 dk",
            type: "video",
            isLocked: true
          },
          {
            id: 7,
            title: "Uygulama Soruları",
            duration: "50 dk",
            type: "practice",
            isLocked: true
          }
        ]
      }
    ],
    instructor_details: {
      name: "Dr. Ahmet Yılmaz",
      avatar: "/instructors/ahmet-yilmaz.jpg",
      bio: "15 yıllık eğitim deneyimi ile binlerce öğrencinin matematik yolculuğuna rehberlik ettim. İstanbul Üniversitesi Matematik Bölümü mezunuyum ve aynı üniversitede doktoramı tamamladım.",
      rating: 4.9,
      reviews: 2150,
      students: 15000,
      courses: 8
    }
  }
];

export function getAllCourseSlugs(): string[] {
  return courses.map(course => course.slug);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug);
}

export function getAllCourses(): Course[] {
  return courses;
} 