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
     return data.success ? { data, error: null, isError: false , message:data.message} : { data: null, error: data.error, isError: true,message:data.message }
  } catch (error) {
    return { data: null, error: data.error ? data.error : error , isError: true,message:data.message }; 
  }
};

export const putReq = async (api, body) => {
  try {
    const fullApiUrl = `${PATHS.BASEURL}${api}`;
    const { data } = await axios.put(fullApiUrl, body); 
     return data.success ? { data: data.data, error: null, isError: false , message:data.message} : { data: null, error: data.error, isError: true,message:data.message }
  } catch (error) {
    return { data: null, error: data.error ? data.error : error , isError: true,message:data.message }; 
  }
};


export const getReq = async (api) => {
  try {
    const fullApiUrl = `${PATHS.BASEURL}${api}`;
    const { data } = await axios.get(fullApiUrl);
    return { data: data};
  } catch (error) {
    return { 
      data: null, 
      error: error.response?.data?.error || error.message, 
      isError: true, 
      message: error.response?.data?.message || "An error occurred" 
    }; 
  }
};
