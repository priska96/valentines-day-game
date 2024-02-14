import { useEffect, useState } from 'react';

export const useAIOpponent = (turn: number) => {
  const [aiChoice, setAIChoice] = useState('');

  useEffect(() => {
    if (turn === 1) {
      const options = ['attack', 'magic', 'attack', 'magic','attack', 'magic','heal'];
      setAIChoice(options[Math.floor(Math.random() * options.length)]);
    }
    return()=>{}
  }, [turn]);

  return aiChoice;
};
