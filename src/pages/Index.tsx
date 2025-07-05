
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { OptionalSectionsForm } from '@/components/resume/OptionalSectionsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { downloadResumePDF } from '@/utils/pdfGenerator';
import { ResumeData, defaultResumeData } from '@/types/resume';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isDownloading, setIsDownloading] = useState(false);
  const formScrollRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await downloadResumePDF(resumeData);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Synchronized scrolling function
  const handleFormScroll = () => {
    if (formScrollRef.current && previewScrollRef.current) {
      const formElement = formScrollRef.current;
      const previewElement = previewScrollRef.current;
      
      const scrollPercentage = formElement.scrollTop / (formElement.scrollHeight - formElement.clientHeight);
      const targetScrollTop = scrollPercentage * (previewElement.scrollHeight - previewElement.clientHeight);
      
      previewElement.scrollTop = targetScrollTop;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">
            Professional Resume Builder
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Create your perfect resume in minutes
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Form Panel */}
          <ScrollArea 
            className="h-full"
            ref={formScrollRef}
            onScrollCapture={handleFormScroll}
          >
            <div className="space-y-6 pr-4">
              <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <PersonalInfoForm 
                  data={resumeData.personal}
                  onChange={(data) => updateResumeData('personal', data)}
                />
              </Card>

              <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) => updateResumeData('experience', data)}
                />
              </Card>

              <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) => updateResumeData('education', data)}
                />
              </Card>

              <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) => updateResumeData('skills', data)}
                />
              </Card>

              <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <OptionalSectionsForm
                  data={{
                    summary: resumeData.summary,
                    achievements: resumeData.achievements,
                    languages: resumeData.languages,
                    webPresence: resumeData.webPresence
                  }}
                  onChange={(section, data) => updateResumeData(section, data)}
                />
              </Card>
            </div>
          </ScrollArea>

          {/* Resume Preview */}
          <ScrollArea 
            className="h-full"
            ref={previewScrollRef}
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              <ResumePreview data={resumeData} />
            </Card>
          </ScrollArea>
        </div>

        {/* Download Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
