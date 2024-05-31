import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data from:", url);
    axios
      .get(url)
      .then((response) => {
        // console.log('Data fetched:', response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
};
