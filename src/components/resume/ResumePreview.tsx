
import { ResumeData } from '@/types/resume';
import { Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const [fontSize, setFontSize] = useState(12);

  // Calculate content density and adjust font size
  useEffect(() => {
    const calculateContentDensity = () => {
      let contentScore = 0;
      
      // Count experience items and responsibilities
      data.experience.forEach(exp => {
        contentScore += exp.responsibilities.filter(r => r.trim()).length * 2;
        contentScore += 3; // Base score for each experience
      });
      
      // Count education items
      contentScore += data.education.length * 2;
      
      // Count achievements
      contentScore += data.achievements.filter(a => a.trim()).length * 1.5;
      
      // Count skills
      contentScore += data.skills.length * 0.5;
      
      // Count languages and web presence
      contentScore += data.languages.length * 1;
      contentScore += data.webPresence.length * 1;
      
      // Count summary length
      contentScore += Math.ceil(data.summary.length / 100);
      
      // Adjust font size based on content density
      if (contentScore > 40) {
        setFontSize(9);
      } else if (contentScore > 30) {
        setFontSize(10);
      } else if (contentScore > 20) {
        setFontSize(11);
      } else {
        setFontSize(12);
      }
    };

    calculateContentDensity();
  }, [data]);

  const baseFontSize = fontSize;
  const headerFontSize = Math.max(baseFontSize + 8, 18);
  const sectionTitleSize = Math.max(baseFontSize + 2, 13);
  const subTitleSize = Math.max(baseFontSize + 1, 12);

  return (
    <div 
      id="resume-output" 
      className="bg-white w-full max-w-4xl mx-auto p-6 text-gray-800 print:shadow-none overflow-hidden"
      style={{ 
        fontFamily: 'Calibri, Arial, sans-serif',
        fontSize: `${baseFontSize}px`,
        lineHeight: '1.3',
        height: '297mm',
        width: '210mm',
        maxHeight: '297mm',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-3 mb-4 flex-shrink-0">
        <h1 
          className="font-bold text-gray-800 tracking-wide mb-2"
          style={{ fontSize: `${headerFontSize}px` }}
        >
          {data.personal.fullName || "YOUR NAME"}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-gray-600" style={{ fontSize: `${baseFontSize - 1}px` }}>
          {data.personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data.personal.email}
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {data.personal.phone}
            </div>
          )}
          {data.personal.linkedin && (
            <div className="flex items-center gap-1">
              <span>🔗</span>
              {data.personal.linkedin}
            </div>
          )}
          {data.personal.portfolio && (
            <div className="flex items-center gap-1">
              <span>🌐</span>
              {data.personal.portfolio}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 flex-grow overflow-hidden">
        {/* Main Column */}
        <div className="col-span-2 space-y-3 overflow-hidden">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="overflow-hidden">
              <h2 
                className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-2"
                style={{ fontSize: `${sectionTitleSize}px` }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-2">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-2">
                    <div 
                      className="font-semibold text-gray-800"
                      style={{ fontSize: `${subTitleSize}px` }}
                    >
                      {exp.company} | {exp.jobTitle}
                    </div>
                    <div className="flex gap-3 text-gray-600 mb-1" style={{ fontSize: `${baseFontSize - 2}px` }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-2 h-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-2 h-2" />
                        {exp.location}
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5" style={{ fontSize: `${baseFontSize - 1}px` }}>
                      {exp.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                        <li key={index} className="text-gray-700 leading-tight">{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="overflow-hidden">
              <h2 
                className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-2"
                style={{ fontSize: `${sectionTitleSize}px` }}
              >
                EDUCATION
              </h2>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div 
                      className="font-semibold text-gray-800"
                      style={{ fontSize: `${subTitleSize}px` }}
                    >
                      {edu.institution} | {edu.degree}
                    </div>
                    <div className="flex gap-3 text-gray-600" style={{ fontSize: `${baseFontSize - 2}px` }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-2 h-2" />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-2 h-2" />
                        {edu.location}
                      </div>
                      {edu.cgpa && <span>GPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {data.achievements.length > 0 && data.achievements.some(ach => ach.trim()) && (
            <section className="overflow-hidden">
              <h2 
                className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-2"
                style={{ fontSize: `${sectionTitleSize}px` }}
              >
                ACHIEVEMENTS
              </h2>
              <ul className="space-y-1" style={{ fontSize: `${baseFontSize - 1}px` }}>
                {data.achievements.filter(ach => ach.trim()).map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 text-xs">✓</span>
                    <span className="text-gray-700 leading-tight">{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-3 overflow-hidden">
          {/* Summary */}
          {data.summary && (
            <section className="overflow-hidden">
              <h2 
                className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-2"
                style={{ fontSize: `${sectionTitleSize}px` }}
              >
                SUMMARY
              </h2>
              <p 
                className="text-gray-700 leading-tight"
                style={{ fontSize: `${baseFontSize - 1}px` }}
              >
                {data.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="overflow-hidden">
              <h2 
                className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-2"
                style={{ fontSize: `${sectionTitleSize}px` }}
              >
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                    style={{ fontSize: `${baseFontSize - 2}px` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section className="overflow-hidden">
              <h2 
                className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-2"
                style={{ fontSize: `${sectionTitleSize}px` }}
              >
                LANGUAGES
              </h2>
              <div className="space-y-1" style={{ fontSize: `${baseFontSize - 1}px` }}>
                {data.languages.map((language) => (
                  <div key={language.id}>
                    <span className="font-medium text-gray-800">{language.name}</span>
                    <span className="text-gray-600 text-xs ml-2">({language.level})</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Web Presence */}
          {data.webPresence.length > 0 && (
            <section className="overflow-hidden">
              <h2 
                className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-2"
                style={{ fontSize: `${sectionTitleSize}px` }}
              >
                WEB PRESENCE
              </h2>
              <div className="space-y-1" style={{ fontSize: `${baseFontSize - 1}px` }}>
                {data.webPresence.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span>🔗</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
