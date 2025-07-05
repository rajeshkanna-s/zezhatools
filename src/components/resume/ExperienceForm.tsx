
import { Experience } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      jobTitle: '',
      location: '',
      period: '',
      responsibilities: ['']
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addResponsibility = (experienceId: string) => {
    const updated = data.map(exp => 
      exp.id === experienceId 
        ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
        : exp
    );
    onChange(updated);
  };

  const updateResponsibility = (experienceId: string, index: number, value: string) => {
    const updated = data.map(exp => 
      exp.id === experienceId 
        ? { 
            ...exp, 
            responsibilities: exp.responsibilities.map((resp, i) => 
              i === index ? value : resp
            )
          }
        : exp
    );
    onChange(updated);
  };

  const removeResponsibility = (experienceId: string, index: number) => {
    const updated = data.map(exp => 
      exp.id === experienceId 
        ? { 
            ...exp, 
            responsibilities: exp.responsibilities.filter((_, i) => i !== index)
          }
        : exp
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></div>
          Experience
        </h3>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((experience, index) => (
          <Card key={experience.id} className="p-4 relative border-l-4 border-l-blue-500">
            <Button
              onClick={() => removeExperience(experience.id)}
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Company name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={experience.jobTitle}
                    onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                    placeholder="Your position"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={experience.location}
                    onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                    placeholder="City, Country"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Period</Label>
                  <Input
                    value={experience.period}
                    onChange={(e) => updateExperience(experience.id, 'period', e.target.value)}
                    placeholder="Jan 2020 - Present"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Responsibilities</Label>
                <div className="space-y-2 mt-1">
                  {experience.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} className="flex gap-2">
                      <Textarea
                        value={resp}
                        onChange={(e) => updateResponsibility(experience.id, respIndex, e.target.value)}
                        placeholder="Describe your responsibility or achievement"
                        rows={2}
                        className="flex-1"
                      />
                      {experience.responsibilities.length > 1 && (
                        <Button
                          onClick={() => removeResponsibility(experience.id, respIndex)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => addResponsibility(experience.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Responsibility
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
