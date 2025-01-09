import { Metadata } from 'next';
import CourseDetails from '@/components/courses/CourseDetails';
import { getCourseBySlug } from '@/lib/courses';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
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
