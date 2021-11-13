import { AxiosResponse } from 'axios';
import { useState } from 'react';

interface SearchData<T> {
  handleSearch: (value: string) => Promise<void>;
  values: T | null;
  loading: boolean;
  error: string | null;
}

const useSearch = <T>(fn: (value: string) => Promise<AxiosResponse<T>>): SearchData<T> => {
  const [values, setValues] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string): Promise<void> => {
    setError(null);
    if (!value.trim().length) {
      setValues(null);
      return;
    }

    try {
      setLoading(true);
      const response = await fn(value);

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
