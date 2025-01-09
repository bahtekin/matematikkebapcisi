import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import PopularCourses from '../components/home/PopularCourses';
import Testimonials from '../components/home/Testimonials';
import Statistics from '../components/home/Statistics';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <PopularCourses />
      <Statistics />
      <Testimonials />
      <CTASection />
    </main>
  );
}
