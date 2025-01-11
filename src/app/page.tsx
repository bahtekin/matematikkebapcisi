import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import PopularCourses from '../components/home/PopularCourses';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import BrowseCategories from '@/components/home/BrowseCategories';
import AboutUs from '@/components/home/AboutUs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <PopularCourses />
      <BrowseCategories />
      <AboutUs />
      <Testimonials />
      <CTASection />
    </main>
  );
}
