
import { Education } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      location: '',
      period: '',
      cgpa: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
          Education
        </h3>
        <Button onClick={addEducation} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((education) => (
          <Card key={education.id} className="p-4 relative border-l-4 border-l-purple-500">
            <Button
              onClick={() => removeEducation(education.id)}
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder="University/College name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder="Bachelor's in Computer Science"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={education.location}
                    onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                    placeholder="City, Country"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Period</Label>
                  <Input
                    value={education.period}
                    onChange={(e) => updateEducation(education.id, 'period', e.target.value)}
                    placeholder="2018 - 2022"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>GPA/CGPA (Optional)</Label>
                  <Input
                    value={education.cgpa || ''}
                    onChange={(e) => updateEducation(education.id, 'cgpa', e.target.value)}
                    placeholder="3.8/4.0"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
