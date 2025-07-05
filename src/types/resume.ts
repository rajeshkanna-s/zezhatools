
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  period: string;
  cgpa?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface WebPresence {
  id: string;
  name: string;
  url: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  achievements: string[];
  languages: Language[];
  webPresence: WebPresence[];
}

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "RAJESHKANNA S",
    email: "rajeshkannaprogramm@gmail.com",
    phone: "8667454896",
    linkedin: "linkedin.com/in/rajeshkanna-s",
    portfolio: "rajeshkanna.in"
  },
  summary: "Software professional with 8 years of experience--5 in Full-Stack Development and 3 in Technical Support. Skilled in Java, Spring Boot, Angular, MySQL, and RESTful API development with a focus on secure, optimized systems. Proficient in frontend and backend development, automation, and modern software practices.",
  experience: [
    {
      id: "1",
      company: "KUWY TECHNOLOGY SERVICE PVT LTD",
      jobTitle: "Software Engineer",
      location: "Chennai-India",
      period: "Feb 2021 - Present",
      responsibilities: [
        "API integration with private sector banks to securely share customer KYC data, resulting in an 80% reduction in manual verification efforts.",
        "Integrated 10+ third-party KYC verification APIs (Aadhaar, PAN, etc) using RESTful services, increasing verification accuracy by 90%.",
        "Migrated the entire enterprise application from Java 7 to 8 and Spring 3.x to 5.x, improving application performance by 30%."
      ]
    },
    {
      id: "2",
      company: "BARCLAYS SHARED SERVICES",
      jobTitle: "Technical Support Specialist",
      location: "Chennai-India",
      period: "June 2017 - Sept 2020",
      responsibilities: [
        "Responded to user inquiries and provided technical assistance via email and live chat.",
        "Provided technical support for loan origination and payment processing software.",
        "Documented and tracked user issues in a ticketing system to ensure timely resolution."
      ]
    }
  ],
  education: [
    {
      id: "1",
      institution: "PERI INSTITUTE OF TECHNOLOGY",
      degree: "BE-CSE",
      location: "Chennai-India",
      period: "2014 - 2018",
      cgpa: "7.5/10"
    }
  ],
  skills: [
    "Java 8", "JavaScript", "Spring Boot", "Angular", "HTML", "CSS", 
    "Bootstrap", "JSP", "jQuery", "Microservices (RESTful API)", 
    "MySQL", "Git", "Eclipse", "STS", "Postman", "Jira", "VS Code"
  ],
  achievements: [
    "Earned the STAR PERFORMER award for outstanding support performance.",
    "Received recognition for successfully implementing code migration to ensure compatibility.",
    "Developed, implemented, and defined over 20 business metrics and 30 automation processes."
  ],
  languages: [
    { id: "1", name: "Tamil", level: "Native or Bilingual Proficiency" },
    { id: "2", name: "English", level: "Full Professional Proficiency" }
  ],
  webPresence: [
    { id: "1", name: "Github", url: "https://github.com/rajeshkanna-s" },
    { id: "2", name: "Leetcode", url: "https://leetcode.com/rajeshkann_s" }
  ]
};
