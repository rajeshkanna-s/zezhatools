
import { ResumeData } from '@/types/resume';

declare global {
  interface Window {
    html2pdf: any;
  }
}

export const downloadResumePDF = async (resumeData: ResumeData): Promise<void> => {
  // Dynamically import html2pdf
  if (!window.html2pdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    document.head.appendChild(script);
    
    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }

  const element = document.getElementById('resume-output');
  if (!element) {
    throw new Error('Resume element not found');
  }

  const opt = {
    margin: 0,
    filename: `${resumeData.personal.fullName.replace(/\s+/g, '-')}-Resume.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };

  try {
    await window.html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};
