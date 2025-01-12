export interface DiffSegment {
  text: string;
  type: 'added' | 'removed' | 'unchanged';
}

export const compareTexts = (text1: string, text2: string): DiffSegment[] => {
  if (!text1 && !text2) return [];
  if (!text1) return [{ text: text2, type: 'added' }];
  if (!text2) return [{ text: text1, type: 'removed' }];

  const words1 = text1.split(/(\s+)/);
  const words2 = text2.split(/(\s+)/);
  const result: DiffSegment[] = [];
  
  let i = 0;
  let j = 0;
  
  while (i < words1.length && j < words2.length) {
    if (words1[i] === words2[j]) {
      result.push({ text: words1[i], type: 'unchanged' });
      i++;
      j++;
    } else {
      // Look ahead to find the next matching word
      const nextMatch1 = words2.indexOf(words1[i], j);
      const nextMatch2 = words1.indexOf(words2[j], i);
      
      if (nextMatch1 === -1 || (nextMatch2 !== -1 && nextMatch2 < nextMatch1)) {
        result.push({ text: words1[i], type: 'removed' });
        i++;
      } else {
        result.push({ text: words2[j], type: 'added' });
        j++;
      }
    }
  }
  
  // Add remaining words from text1 as removed
  while (i < words1.length) {
    result.push({ text: words1[i], type: 'removed' });
    i++;
  }
  
  // Add remaining words from text2 as added
  while (j < words2.length) {
    result.push({ text: words2[j], type: 'added' });
    j++;
  }
  
  return result;
};