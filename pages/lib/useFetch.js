import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          url,
          {
            signal: abortController.signal,
          },
          {
            headers: { "Context-Type": "application/x-www-form-urlencoded" },
            withCredentials: true,
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, error, loading };
}
