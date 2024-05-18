import { useEffect } from 'react';

const useClear = (clearFunction: () => void) => {
  useEffect(() => {
    return () => {
      clearFunction();
    };
  }, []);
};

export { useClear };
