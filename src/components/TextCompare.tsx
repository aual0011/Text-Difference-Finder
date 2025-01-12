import React, { useState, useEffect } from 'react';
import { compareTexts, DiffSegment } from '../utils/textCompare';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const TextCompare = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [differences, setDifferences] = useState<DiffSegment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const result = compareTexts(text1, text2);
    setDifferences(result);
  }, [text1, text2]);

  const handleClear = () => {
    setText1('');
    setText2('');
    toast({
      title: "Cleared",
      description: "Both text areas have been cleared.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Text Comparison Tool</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Original Text</h2>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter your first text here..."
            className="min-h-[200px] font-mono"
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Modified Text</h2>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter your second text here..."
            className="min-h-[200px] font-mono"
          />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Comparison Result</h2>
          <Button variant="outline" onClick={handleClear}>Clear All</Button>
        </div>
        
        <div className="p-4 bg-muted rounded-lg font-mono whitespace-pre-wrap">
          {differences.map((segment, index) => (
            <span
              key={index}
              className={`highlight-fade ${
                segment.type === 'added'
                  ? 'bg-emerald-100 text-emerald-700'
                  : segment.type === 'removed'
                  ? 'bg-rose-100 text-rose-700'
                  : 'text-slate-700'
              }`}
            >
              {segment.text}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TextCompare;