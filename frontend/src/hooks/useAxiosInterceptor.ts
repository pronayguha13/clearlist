import axios, { AxiosError } from "axios";
const baseUrl = import.meta.env.VITE_API_URL
const customInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': "application/json"
  }
})

customInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
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
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(`${baseUrl}/token/refresh/`, { "refresh": refreshToken });
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
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          window.location.pathname.replace(window.location.pathname, "/login")
        }
      }
      return Promise.reject(error);
    }
  }
);



export default customInstance;
