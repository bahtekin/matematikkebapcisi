'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Clock, Users, BookOpen, Play, Lock, CheckCircle2, FileText, ChevronDown } from 'lucide-react';
import { Course } from '@/lib/courses';

interface CourseDetailsProps {
  course: Course;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const [selectedSection, setSelectedSection] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-accent/50">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Sol Kısım - Video ve Kurs Bilgileri */}
            <div className="space-y-6">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors">
                    <Play className="w-8 h-8" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-primary-foreground">
                  {course.tag}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{course.students} öğrenci</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessons} ders</span>
                </div>
              </div>
            </div>

            {/* Sağ Kısım - Kayıt Kartı */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-background rounded-xl border shadow-lg p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{course.price}</span>
                  </div>

                  <button 
                    onClick={() => setIsEnrolled(true)}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                  >
                    {isEnrolled ? 'Kursa Git' : 'Şimdi Kaydol'}
                  </button>

                  <div className="space-y-4">
                    <h4 className="font-medium">Bu kursta:</h4>
                    <ul className="space-y-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik Bölümü */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Sol Kısım - Müfredat ve Detaylar */}
          <div className="lg:col-span-2 space-y-12">
            {/* Müfredat */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Müfredat</h2>
              <div className="space-y-4">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={section.id} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setSelectedSection(selectedSection === sectionIndex ? -1 : sectionIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-accent/50 hover:bg-accent/70 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{section.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {section.items.length} ders
                        </span>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform duration-200 ${
                          selectedSection === sectionIndex ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>

                    {selectedSection === sectionIndex && (
                      <div className="divide-y">
                        {section.items.map((item) => (
                          <div
                            key={item.id}
                            className="px-6 py-4 flex items-center gap-4 hover:bg-accent/30 transition-colors"
                          >
                            {item.type === 'video' && <Play className="w-5 h-5" />}
                            {item.type === 'quiz' && <FileText className="w-5 h-5" />}
                            {item.type === 'practice' && <BookOpen className="w-5 h-5" />}
                            
                            <div className="flex-1">
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.duration}</p>
                            </div>

                            {item.isLocked && !isEnrolled && (
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            )}
                            {item.isCompleted && (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gereksinimler */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Gereksinimler</h2>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sağ Kısım - Eğitmen Bilgileri */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Eğitmen</h2>
            <div className="bg-background rounded-xl border p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Image
                  src={course.instructor_details.avatar}
                  alt={course.instructor_details.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium text-lg">{course.instructor_details.name}</h3>
                  <p className="text-sm text-muted-foreground">Matematik Eğitmeni</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-2xl font-bold">{course.instructor_details.students}</p>
                  <p className="text-sm text-muted-foreground">Öğrenci</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-2xl font-bold">{course.instructor_details.courses}</p>
                  <p className="text-sm text-muted-foreground">Kurs</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-2xl font-bold">{course.instructor_details.rating}</p>
                  <p className="text-sm text-muted-foreground">Puan</p>
                </div>
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-2xl font-bold">{course.instructor_details.reviews}</p>
                  <p className="text-sm text-muted-foreground">Değerlendirme</p>
                </div>
              </div>

              <p className="text-sm">{course.instructor_details.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 