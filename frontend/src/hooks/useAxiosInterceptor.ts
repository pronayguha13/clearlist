import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
const baseUrl = import.meta.env.VITE_API_URL
console.log("Base url", baseUrl)
const customInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': "application/json"
  }

})

customInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log("Token found")
    config.withCredentials = true;
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}, (error: AxiosError) => {
  return Promise.reject(error)
})


customInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log('🚀 ~ error:', error)
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refeshToken = localStorage.getItem("refreshToken");

      if (refeshToken) {
        try {
          const response = await axios.post(`${baseUrl}/token/refresh/`);
          const newAccessToken = response.data.access;
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`
          };
          return axios(originalRequest)
        } catch (error) {
          //refresh token is also expired,
          //navigate login
        }
      }
      return Promise.reject(error);
    }
  }
);



export default customInstance;
