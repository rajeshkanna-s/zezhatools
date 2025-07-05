
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

interface SkillsFormProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
        Technical Skills
      </h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="newSkill">Add Skill</Label>
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter a skill and press Enter"
              className="mt-1"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="px-3 py-1 text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 hover:from-blue-200 hover:to-purple-200"
            >
              {skill}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(skill)}
                className="ml-2 h-auto p-0 text-gray-500 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
