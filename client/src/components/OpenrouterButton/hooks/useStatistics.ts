import { ApiResponse, OpenRouterKeyResponseData, LIMIT_RESET } from 'librechat-data-provider';
import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '~/hooks/AuthContext';
import { useCurrentKey } from '~/Providers';
import { ApiError } from '../utils';

export const useStatistics = () => {
  const { token } = useAuthContext();
  const [statistics, setStatistics] = useState<OpenRouterKeyResponseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string | null, code?: number } | null>(null);
  const { hasCurrentKey } = useCurrentKey();

  const fetchStatistics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/openrouter/balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result: ApiResponse<OpenRouterKeyResponseData> = await response.json();

      if (!response.ok) {
          throw new ApiError(result.error || 'Ошибка API', response.status);
      }

      setStatistics(result.data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError({ message: err.message || 'Произошла неизвестная ошибка', code: err.statusCode });
        setStatistics(null);
      } else {
        setError({ message: 'Произошла неизвестная ошибка' });
        setStatistics(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchStatistics();
    }
  }, [token, fetchStatistics, hasCurrentKey]);

  return {
    statistics,
    isLoading,
    error,
    fetchStatistics,
  };
};