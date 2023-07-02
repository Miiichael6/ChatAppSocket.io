import axios from "axios";

const baseUrl: string = import.meta.env.VITE_API_URL;

const axiosSyncToken = async (enpoint?: string) => {
  // const url = `${baseUrl}/${enpoint}`;

  async function get(end: string) {
    const response = await axios.get(`${baseUrl}/${end}`);
    return response.data;
  }

  async function post(end: string, data: any) {
    const response = await axios.post(`${baseUrl}/${end}`, data);

    return response.data;
  }

  // const response = await axios.get(url);
  // return response.data;

  return {
    get,
    post,
  };
};

export default axiosSyncToken;
