'use client';

import { Metadata } from 'next';
import CourseDetails from '@/components/courses/CourseDetails';
import { getCourseBySlug, getAllCourseSlugs } from '@/lib/courses';

interface PageParams {
  slug: string;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const course = getCourseBySlug(params.slug);
  
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

export async function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map((slug: string) => ({
    slug: slug,
  }));
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = await params;
  const course = getCourseBySlug(resolvedParams.slug);

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