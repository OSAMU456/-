import { useState, useEffect } from 'react';
import { Spreadsheet } from '@/lib/db';

export function useSpreadsheets() {
  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpreadsheets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/spreadsheets');
      if (!response.ok) {
        throw new Error('Failed to fetch spreadsheets');
      }
      const data = await response.json();
      setSpreadsheets(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addSpreadsheet = async (spreadsheetId: string) => {
    try {
      const response = await fetch('/api/spreadsheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadsheetId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add spreadsheet');
      }
      
      const newSpreadsheet = await response.json();
      setSpreadsheets(prev => [...prev, newSpreadsheet]);
      return newSpreadsheet;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      throw new Error(message);
    }
  };

  useEffect(() => {
    fetchSpreadsheets();
  }, []);

  return {
    spreadsheets,
    loading,
    error,
    addSpreadsheet,
    refetch: fetchSpreadsheets,
  };
}