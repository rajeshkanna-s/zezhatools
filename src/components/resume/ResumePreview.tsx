
import { ResumeData } from '@/types/resume';
import { Phone, Mail, Calendar, MapPin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <div 
      id="resume-output" 
      className="bg-white w-full max-w-4xl mx-auto p-8 text-gray-800 shadow-lg print:shadow-none"
      style={{ 
        fontFamily: 'Calibri, "Source Sans Pro", "Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '13px',
        lineHeight: '1.5'
      }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 
          className="font-bold text-gray-800 tracking-wide mb-3"
          style={{ fontSize: '26px' }}
        >
          {data.personal.fullName || "YOUR NAME"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600" style={{ fontSize: '12px' }}>
          {data.personal.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.personal.email}
            </div>
          )}
          {data.personal.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
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

      <div className="grid grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="col-span-2 space-y-4">
          {/* Summary */}
          {data.summary && (
            <section>
              <h2 className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3" style={{ fontSize: '15px' }}>
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3" style={{ fontSize: '15px' }}>
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="font-semibold text-gray-800" style={{ fontSize: '14px' }}>
                      {exp.jobTitle} | {exp.company}
                    </div>
                    <div className="flex gap-4 text-gray-600 mb-2" style={{ fontSize: '11px' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {exp.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                        <li key={index} className="text-gray-700">{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3" style={{ fontSize: '15px' }}>
                EDUCATION
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-gray-800" style={{ fontSize: '14px' }}>
                      {edu.degree} | {edu.institution}
                    </div>
                    <div className="flex gap-4 text-gray-600" style={{ fontSize: '11px' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
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
            <section>
              <h2 className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3" style={{ fontSize: '15px' }}>
                KEY ACHIEVEMENTS
              </h2>
              <ul className="space-y-2">
                {data.achievements.filter(ach => ach.trim()).map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3" style={{ fontSize: '15px' }}>
                CORE SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    style={{ fontSize: '11px' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3" style={{ fontSize: '15px' }}>
                LANGUAGES
              </h2>
              <div className="space-y-2">
                {data.languages.map((language) => (
                  <div key={language.id} className="flex justify-between">
                    <span className="font-medium text-gray-800">{language.name}</span>
                    <span className="text-gray-600" style={{ fontSize: '11px' }}>{language.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Web Presence */}
          {data.webPresence.length > 0 && (
            <section>
              <h2 className="font-bold text-blue-600 border-b border-blue-600 pb-1 mb-3" style={{ fontSize: '15px' }}>
                WEB PRESENCE
              </h2>
              <div className="space-y-2">
                {data.webPresence.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span>🔗</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      style={{ fontSize: '11px' }}
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
