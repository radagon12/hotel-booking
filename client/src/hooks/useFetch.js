import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // console.log(url)

  url = `/api${url}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(await res.data);

      } catch (e) {
        setError(e);
        console.log(e)
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(await res.data);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
