'use client';

import { useState, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Play, Circle, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { use } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface Props {
  params: {
    slug: string
  }
}

export default function KursIcerik({ params }: Props) {
  const [kurs, setKurs] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    id: number;
    title: string;
    videoUrl: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const playerRef = useRef<any>(null);

  const breadcrumbItems = [
    {
      label: "Kurslar",
      href: "/kurslar"
    },
    {
      label: kurs?.baslik || "Kurs",
      href: `/kurslar/${params.slug}`
    },
    {
      label: "Ders İçeriği"
    }
  ];

  // İlerleme bilgisini getir
  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/kurslar/${params.slug}/ilerleme`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('İlerleme bilgisi alınamadı');
      
      const data = await response.json();
      setProgress(data.ilerlemeYuzdesi);
    } catch (error) {
      console.error('İlerleme bilgisi alma hatası:', error);
    }
  };

  // Video tamamlandığında çağrılacak fonksiyon
  const handleVideoComplete = async () => {
    if (!activeVideo) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // İlerlemeyi kaydet
      const response = await fetch(`/api/kurslar/${params.slug}/ilerleme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          videoId: activeVideo.id
        })
      });

      if (!response.ok) throw new Error('İlerleme kaydedilemedi');

      const data = await response.json();
      setProgress(data.ilerlemeYuzdesi);

      // Bir sonraki videoya geç
      const currentSection = kurs.curriculum.find((section: any) => 
        section.items.some((item: any) => item.id === activeVideo.id)
      );
      
      if (currentSection) {
        const currentIndex = currentSection.items.findIndex((item: any) => item.id === activeVideo.id);
        
        // Aynı bölümde sonraki video
        if (currentIndex < currentSection.items.length - 1) {
          const nextVideo = currentSection.items[currentIndex + 1];
          setActiveVideo({
            id: nextVideo.id,
            title: nextVideo.title,
            videoUrl: nextVideo.videoUrl
          });
        } 
        // Sonraki bölümün ilk videosu
        else {
          const currentSectionIndex = kurs.curriculum.indexOf(currentSection);
          if (currentSectionIndex < kurs.curriculum.length - 1) {
            const nextSection = kurs.curriculum[currentSectionIndex + 1];
            if (nextSection.items.length > 0) {
              const nextVideo = nextSection.items[0];
              setActiveVideo({
                id: nextVideo.id,
                title: nextVideo.title,
                videoUrl: nextVideo.videoUrl
              });
              // Sonraki bölümü otomatik genişlet
              setExpandedSections(new Set(Array.from(expandedSections).concat([currentSectionIndex + 1])));
            }
          }
        }
      }
    } catch (error) {
      console.error('Video tamamlama hatası:', error);
    }
  };

  // Önceki videoya geç
  const handlePreviousVideo = () => {
    if (!activeVideo || !kurs) return;

    const currentSection = kurs.curriculum.find((section: any) => 
      section.items.some((item: any) => item.id === activeVideo.id)
    );
    
    if (currentSection) {
      const currentIndex = currentSection.items.findIndex((item: any) => item.id === activeVideo.id);
      
      // Aynı bölümde önceki video
      if (currentIndex > 0) {
        const previousVideo = currentSection.items[currentIndex - 1];
        setActiveVideo({
          id: previousVideo.id,
          title: previousVideo.title,
          videoUrl: previousVideo.videoUrl
        });
      } 
      // Önceki bölümün son videosu
      else {
        const currentSectionIndex = kurs.curriculum.indexOf(currentSection);
        if (currentSectionIndex > 0) {
          const previousSection = kurs.curriculum[currentSectionIndex - 1];
          if (previousSection.items.length > 0) {
            const previousVideo = previousSection.items[previousSection.items.length - 1];
            setActiveVideo({
              id: previousVideo.id,
              title: previousVideo.title,
              videoUrl: previousVideo.videoUrl
            });
            // Önceki bölümü otomatik genişlet
            setExpandedSections(new Set(Array.from(expandedSections).concat([currentSectionIndex - 1])));
          }
        }
      }
    }
  };

  // Sonraki videoya geç
  const handleNextVideo = () => {
    if (!activeVideo || !kurs) return;

    const currentSection = kurs.curriculum.find((section: any) => 
      section.items.some((item: any) => item.id === activeVideo.id)
    );
    
    if (currentSection) {
      const currentIndex = currentSection.items.findIndex((item: any) => item.id === activeVideo.id);
      
      // Aynı bölümde sonraki video
      if (currentIndex < currentSection.items.length - 1) {
        const nextVideo = currentSection.items[currentIndex + 1];
        setActiveVideo({
          id: nextVideo.id,
          title: nextVideo.title,
          videoUrl: nextVideo.videoUrl
        });
      } 
      // Sonraki bölümün ilk videosu
      else {
        const currentSectionIndex = kurs.curriculum.indexOf(currentSection);
        if (currentSectionIndex < kurs.curriculum.length - 1) {
          const nextSection = kurs.curriculum[currentSectionIndex + 1];
          if (nextSection.items.length > 0) {
            const nextVideo = nextSection.items[0];
            setActiveVideo({
              id: nextVideo.id,
              title: nextVideo.title,
              videoUrl: nextVideo.videoUrl
            });
            // Sonraki bölümü otomatik genişlet
            setExpandedSections(new Set(Array.from(expandedSections).concat([currentSectionIndex + 1])));
          }
        }
      }
    }
  };

  // Önceki video kontrolü
  const hasPreviousVideo = () => {
    if (!activeVideo || !kurs || !currentSection) return false;
    
    const currentIndex = currentSection.items.findIndex(item => item.id === activeVideo.id);
    const currentSectionIndex = kurs.curriculum.findIndex(section => section === currentSection);
    
    // Aynı bölümde önceki video var mı?
    if (currentIndex > 0) return true;
    
    // Önceki bölümde video var mı?
    if (currentSectionIndex > 0) {
      const previousSection = kurs.curriculum[currentSectionIndex - 1];
      return previousSection.items.length > 0;
    }
    
    return false;
  };

  // Sonraki video kontrolü
  const hasNextVideo = () => {
    if (!activeVideo || !kurs || !currentSection) return false;
    
    const currentIndex = currentSection.items.findIndex(item => item.id === activeVideo.id);
    const currentSectionIndex = kurs.curriculum.findIndex(section => section === currentSection);
    
    // Aynı bölümde sonraki video var mı?
    if (currentIndex < currentSection.items.length - 1) return true;
    
    // Sonraki bölümde video var mı?
    if (currentSectionIndex < kurs.curriculum.length - 1) {
      const nextSection = kurs.curriculum[currentSectionIndex + 1];
      return nextSection.items.length > 0;
    }
    
    return false;
  };

  useEffect(() => {
    async function fetchKurs() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Oturum bulunamadı');
        }

        const response = await fetch(`/api/kurslar/${params.slug}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Kurs bilgileri alınamadı');
        }
        const data = await response.json();
        setKurs(data);
        
        // URL'den video ID'sini al
        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('video');
        
        if (videoId) {
          // Belirtilen video ID'sine sahip videoyu bul
          let foundVideo = null;
          for (const section of data.curriculum) {
            const video = section.items.find((item: any) => item.id === parseInt(videoId));
            if (video) {
              foundVideo = video;
              break;
            }
          }
          
          // Eğer video bulunduysa onu aç
          if (foundVideo) {
            setActiveVideo({
              id: foundVideo.id,
              title: foundVideo.title,
              videoUrl: foundVideo.videoUrl
            });
          }
        } else if (data.curriculum && data.curriculum[0] && data.curriculum[0].items[0]) {
          // Video ID belirtilmemişse ilk videoyu aç
          setActiveVideo({
            id: data.curriculum[0].items[0].id,
            title: data.curriculum[0].items[0].title,
            videoUrl: data.curriculum[0].items[0].videoUrl
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchKurs();
  }, [params.slug]);

  useEffect(() => {
    if (playerRef.current?.plyr) {
      playerRef.current.plyr.on('ended', handleVideoComplete);
    }
  }, [playerRef.current]);

  const getVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg shadow">{error}</div>
      </div>
    );
  }

  if (!kurs || !activeVideo) return null;

  const videoId = getVideoId(activeVideo.videoUrl);
  
  // Mevcut bölüm ve indeks bilgilerini hesapla
  const currentSection = kurs.curriculum?.find((section: any) => 
    section.items.some((item: any) => item.id === activeVideo.id)
  );
  const currentIndex = currentSection?.items.findIndex((item: any) => item.id === activeVideo.id) ?? -1;
  const currentSectionIndex = kurs.curriculum?.indexOf(currentSection) ?? -1;

  const plyrProps = {
    source: {
      type: 'video' as const,
      sources: [
        {
          src: videoId,
          provider: 'youtube' as const
        }
      ]
    },
    options: {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        disablekb: 1,
        controls: 0,
        title: 0,
        cc_load_policy: 0,
        fs: 1,
        origin: window.location.origin,
        widget_referrer: window.location.origin,
        enablejsapi: 1
      },
      hideYouTubeDOMError: true,
      tooltips: { controls: false, seek: false },
      listeners: {
        ended: handleVideoComplete
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb 
          items={breadcrumbItems}
          title={kurs?.baslik}
        />
      </div>

      <div className="container mx-auto mt-4">
        <div className="flex">
          {/* Sol Sidebar - Ders Listesi */}
          <div className="w-96 h-[calc(100vh-8rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-800 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Kurs İçeriği</h2>
              <div className="space-y-4">
                {kurs?.curriculum?.map((section: any, sectionIndex: number) => (
                  <div key={sectionIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                    <button
                      onClick={() => {
                        const newExpandedSections = new Set(expandedSections);
                        if (newExpandedSections.has(sectionIndex)) {
                          newExpandedSections.delete(sectionIndex);
                        } else {
                          newExpandedSections.add(sectionIndex);
                        }
                        setExpandedSections(newExpandedSections);
                      }}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {expandedSections.has(sectionIndex) ? (
                          <ChevronDown className="w-5 h-5 text-primary" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-primary" />
                        )}
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                      </div>
                    </button>
                    
                    {expandedSections.has(sectionIndex) && (
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {section.items.map((item: any, itemIndex: number) => (
                          <button
                            key={itemIndex}
                            onClick={() => setActiveVideo({
                              id: item.id,
                              title: item.title,
                              videoUrl: item.videoUrl
                            })}
                            className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-0
                              ${activeVideo?.title === item.title ? 'bg-primary/10 dark:bg-primary/20 hover:bg-primary/10 dark:hover:bg-primary/20' : ''}`}
                          >
                            <div className="shrink-0">
                              {activeVideo?.title === item.title ? (
                                <Play className="w-5 h-5 text-primary" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                              )}
                            </div>
                            <div className="flex flex-col items-start min-w-0">
                              <span className={`text-sm ${activeVideo?.title === item.title ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} truncate w-full`}>
                                {item.title}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {item.hours}sa {item.minutes}dk
                                </span>
                                {item.id === activeVideo?.id && (
                                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ana İçerik - Video Player */}
          <div className="flex-1 h-[calc(100vh-8rem)] overflow-y-auto bg-gray-100 dark:bg-gray-900 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-800 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600">
            {activeVideo ? (
              <div>
                <div className="aspect-video w-full bg-black">
                  <Plyr {...plyrProps} />
                </div>
                <div className="p-8 bg-white dark:bg-gray-800 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">{activeVideo.title}</h2>
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-6">
                    <button 
                      onClick={handlePreviousVideo} 
                      disabled={!hasPreviousVideo()}
                      className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all
                        ${!hasPreviousVideo()
                          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20'
                        }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Önceki Ders
                    </button>

                    <button 
                      onClick={handleNextVideo}
                      disabled={!hasNextVideo()}
                      className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all
                        ${!hasNextVideo()
                          ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20'
                        }`}
                    >
                      Sonraki Ders
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-gray-400 dark:text-gray-600 mb-3">
                    <Play className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Lütfen izlemek istediğiniz dersi seçin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobil İlerleme Çubuğu */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4 lg:hidden">
        <div className="flex items-center justify-between max-w-[2000px] mx-auto">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800 mb-2">
              İlerleme: %{Math.round((progress / (kurs.curriculum?.reduce((acc: number, section: any) => acc + section.items.length, 0) || 1)) * 100)}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.round(
                    (progress / (kurs.curriculum?.reduce((acc: number, section: any) => acc + section.items.length, 0) || 1)) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
          <button
            onClick={() => {}}
            className="ml-6 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors flex items-center gap-2 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            Tamamlandı
          </button>
        </div>
      </div>
    </div>
  );
} 