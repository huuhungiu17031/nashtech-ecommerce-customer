import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

const useFetch = <T>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
): { data: T | undefined; loading: boolean; error: Error | undefined } => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();
  const fetchData = async () => {
    try {
      const response = await fetchFunction();
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  });
  return { data, loading, error };
};

export { useFetch };
