'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-accent/50">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-background border shadow-lg">
          <div className="relative flex flex-col items-center text-center px-4 py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Matematik Öğrenmenin En İyi Yolu
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
              Hemen ücretsiz deneme derslerimize katılın ve matematik öğrenmenin keyfini çıkarın. 
              Size özel hazırlanmış ders programı ve uzman öğretmenlerimizle başarıya ulaşın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/kayit"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-colors"
              >
                Hemen Başla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-primary rounded-xl hover:bg-accent transition-colors"
              >
                Bize Ulaşın
              </Link>
            </div>
          </div>
          
          {/* Dekoratif Elementler */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 