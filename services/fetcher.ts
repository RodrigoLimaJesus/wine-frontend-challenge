import axios from 'axios';
import cache from 'memory-cache';

export default async function fetcher(url: string) {
  const cachedResponse = cache.get(url);

  if (cachedResponse) {
    return cachedResponse;
  } else {
    const hours = 24;
    const { data } = await axios.get(url);

    cache.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
}
