import { useQuery } from '@tanstack/react-query';
import { PATHS } from '@/constants/pathConstants';
import axios from 'axios';

export const useCatData = (api) => {
  api = PATHS.BASEURL + api;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['cat', api],
    queryFn: async () => {
      const response = await axios.get(api);
      return response.data;
    },
    enabled: !!api,
  });

  return { data, isLoading, refetch };
};




export const postReq = async (api, body) => {
  try {
    const fullApiUrl = `${PATHS.BASEURL}${api}`;
    const { data } = await axios.post(fullApiUrl, body); 
    console.log(data)
     return data.success ? { data, error: null, isError: false , message:data.message} : { data: null, error: data.error, isError: true,message:data.message }
  } catch (error) {
    return { data: null, error: data.error ? data.error : error , isError: true,message:data.message }; 
  }
};
