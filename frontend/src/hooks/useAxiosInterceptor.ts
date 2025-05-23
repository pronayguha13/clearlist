import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL
console.log("Base url", baseUrl)
const customInstance = axios.create({
    baseURL: baseUrl

})



export default customInstance;