import { AxiosResponse } from 'axios';
import { useState } from 'react';

interface SearchData<T> {
  handleSearch: (input: string) => Promise<void>;
  values: T | null;
  loading: boolean;
  error: string | null;
}

const useSearch = <T>(fn: () => Promise<AxiosResponse<T>>): SearchData<T> => {
  const [values, setValues] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (input: string): Promise<void> => {
    if (!input.trim().length) {
      setValues(null);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      const response = await fn();

      setValues(response.data);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSearch, values, error, loading };
};

export default useSearch;
