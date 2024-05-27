import { useEffect } from 'react';

export const useClear = (clearFunction: () => void) => {
  useEffect(() => {
    return () => {
      clearFunction();
    };
  }, []);
};
