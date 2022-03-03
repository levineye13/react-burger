import React, { useState, useEffect } from 'react';

export function useFetch(url, { method = 'GET', headers = {} } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, { method, headers });

        if (!res.ok) {
          throw res;
        }

        const { data } = await res.json();

        setData(data);
        setIsSuccess(true);
      } catch (e) {
        if (e instanceof Response) {
          setError({
            statusCode: e.status,
            statusText: e.statusText,
            headers: e.headers,
          });
        } else {
          setError(e);
        }

        setIsSuccess(false);
        console.error(e);
      }
    }

    fetchData();
  }, [url]);

  return {
    data,
    error,
    success: isSuccess,
  };
}
