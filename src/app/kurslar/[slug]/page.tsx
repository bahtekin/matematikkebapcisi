'use client';

import { Metadata } from 'next';
import CourseDetails from '@/components/courses/CourseDetails';
import { getCourseBySlug, getAllCourseSlugs } from '@/lib/courses';

interface PageParams {
  slug: string;
}

// generateMetadata fonksiyonunda async/await ve doğru türlerle çalışıyoruz
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return {
      title: 'Kurs Bulunamadı',
    };
  }

  return {
    title: `${course.title} | Matematik Eğitim Platformu`,
    description: course.description,
  };
}

// Static parametreleri oluştururken doğru yapı
export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs(); // getAllCourseSlugs'ın async olduğunu varsayıyoruz
  return slugs.map((slug: string) => ({
    slug,
  }));
}

// Page bileşeninde doğru tür
export default async function Page({ params }: { params: PageParams }) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Kurs Bulunamadı</h1>
        <p className="text-muted-foreground">
          Aradığınız kurs bulunamadı. Lütfen ana sayfaya dönün.
        </p>
      </div>
    );
  }

  return <CourseDetails course={course} />;
}
