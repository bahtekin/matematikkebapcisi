'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Search, UserRound, Pencil, KeyRound } from 'lucide-react';
import EditStudentModal from './components/EditStudentModal';

interface Student {
  id: number;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  biyografi: string;
  olusturuldu: string;
}

export default function OgrencilerPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/ogrenciler');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Öğrenciler alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsEditModalOpen(false);
  };

  const handleResetPassword = async (email: string) => {
    if (!confirm('Şifre sıfırlama bağlantısı göndermek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch('/api/ogrenciler/sifre-sifirla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu');
      }

      alert('Şifre sıfırlama bağlantısı öğrencinin e-posta adresine gönderildi');
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error);
      alert(error instanceof Error ? error.message : 'Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu');
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchString = searchTerm.toLowerCase();
    return (
      student.ad.toLowerCase().includes(searchString) ||
      student.soyad.toLowerCase().includes(searchString) ||
      student.email.toLowerCase().includes(searchString) ||
      student.telefon.includes(searchString)
    );
  });

  const getBiography = (biographyString: string) => {
    try {
      const bio = JSON.parse(biographyString);
      return {
        grade: bio.grade === 'mezun' ? 'Mezun' : `${bio.grade}. Sınıf`,
        examType: bio.examType === 'both' ? 'TYT ve AYT' : bio.examType.toUpperCase()
      };
    } catch {
      return { grade: '-', examType: '-' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Öğrenciler</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Öğrenci ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="bg-background rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left font-medium">ID</th>
                <th className="py-3 px-4 text-left font-medium">Ad Soyad</th>
                <th className="py-3 px-4 text-left font-medium">E-posta</th>
                <th className="py-3 px-4 text-left font-medium">Telefon</th>
                <th className="py-3 px-4 text-left font-medium">Sınıf</th>
                <th className="py-3 px-4 text-left font-medium">Hedef Sınav</th>
                <th className="py-3 px-4 text-left font-medium">Kayıt Tarihi</th>
                <th className="py-3 px-4 text-left font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-4 px-4 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <UserRound className="h-8 w-8" />
                      <p>Öğrenci bulunamadı</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const bio = getBiography(student.biyografi);
                  return (
                    <tr key={student.id} className="border-b last:border-b-0 hover:bg-muted/50">
                      <td className="py-3 px-4">{student.id}</td>
                      <td className="py-3 px-4">
                        {student.ad} {student.soyad}
                      </td>
                      <td className="py-3 px-4">{student.email}</td>
                      <td className="py-3 px-4">{student.telefon}</td>
                      <td className="py-3 px-4">{bio.grade}</td>
                      <td className="py-3 px-4">{bio.examType}</td>
                      <td className="py-3 px-4">
                        {format(new Date(student.olusturuldu), 'dd MMMM yyyy', { locale: tr })}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClick(student)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleResetPassword(student.email)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors text-yellow-600"
                            title="Şifre Sıfırlama Bağlantısı Gönder"
                          >
                            <KeyRound className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditStudentModal
        student={selectedStudent}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onUpdate={fetchStudents}
      />
    </div>
  );
} 