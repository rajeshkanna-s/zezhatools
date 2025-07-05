
import { Language, WebPresence } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus } from 'lucide-react';

interface OptionalSectionsFormProps {
  data: {
    summary: string;
    achievements: string[];
    languages: Language[];
    webPresence: WebPresence[];
  };
  onChange: (section: 'summary' | 'achievements' | 'languages' | 'webPresence', data: any) => void;
}

export const OptionalSectionsForm = ({ data, onChange }: OptionalSectionsFormProps) => {
  const addAchievement = () => {
    onChange('achievements', [...data.achievements, '']);
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = data.achievements.map((item, i) => i === index ? value : item);
    onChange('achievements', updated);
  };

  const removeAchievement = (index: number) => {
    onChange('achievements', data.achievements.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      level: ''
    };
    onChange('languages', [...data.languages, newLanguage]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    const updated = data.languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    onChange('languages', updated);
  };

  const removeLanguage = (id: string) => {
    onChange('languages', data.languages.filter(lang => lang.id !== id));
  };

  const addWebPresence = () => {
    const newPresence: WebPresence = {
      id: Date.now().toString(),
      name: '',
      url: ''
    };
    onChange('webPresence', [...data.webPresence, newPresence]);
  };

  const updateWebPresence = (id: string, field: keyof WebPresence, value: string) => {
    const updated = data.webPresence.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange('webPresence', updated);
  };

  const removeWebPresence = (id: string) => {
    onChange('webPresence', data.webPresence.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <div className="w-2 h-6 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full mr-3"></div>
        Additional Sections
      </h3>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="webPresence">Web Presence</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => onChange('summary', e.target.value)}
              placeholder="Write a brief summary of your professional background..."
              rows={4}
              className="mt-1"
            />
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Achievements</Label>
            <Button onClick={addAchievement} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </div>
          <div className="space-y-3">
            {data.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={achievement}
                  onChange={(e) => updateAchievement(index, e.target.value)}
                  placeholder="Describe your achievement..."
                  rows={2}
                  className="flex-1"
                />
                <Button
                  onClick={() => removeAchievement(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Languages</Label>
            <Button onClick={addLanguage} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </div>
          <div className="space-y-3">
            {data.languages.map((language) => (
              <Card key={language.id} className="p-3">
                <div className="flex gap-2">
                  <Input
                    value={language.name}
                    onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                    placeholder="Language name"
                    className="flex-1"
                  />
                  <Input
                    value={language.level}
                    onChange={(e) => updateLanguage(language.id, 'level', e.target.value)}
                    placeholder="Proficiency level"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeLanguage(language.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webPresence" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Web Presence</Label>
            <Button onClick={addWebPresence} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>
          <div className="space-y-3">
            {data.webPresence.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex gap-2">
                  <Input
                    value={item.name}
                    onChange={(e) => updateWebPresence(item.id, 'name', e.target.value)}
                    placeholder="Platform name (e.g., GitHub)"
                    className="flex-1"
                  />
                  <Input
                    value={item.url}
                    onChange={(e) => updateWebPresence(item.id, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeWebPresence(item.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
