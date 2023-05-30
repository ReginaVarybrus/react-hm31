// Done

import { useEffect, useState } from "react";
import axios from 'axios';

const HttpFetchEpisodes = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setLoading(true);
    axios.get(url).then((resp) => {
      const episodes = resp.data;
      setData(episodes);
      setLoading(false);
    });
  }, [url]);

  return { data, loading }
}

export default HttpFetchEpisodes;