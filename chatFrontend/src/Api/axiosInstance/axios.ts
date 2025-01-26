import axios from "axios";


const axiosInstance=axios.create({
    baseURL:"http://localhost:8080/api/v1/",
    // headers:{"Authorization":""},
    withCredentials:true
})

export default axiosInstance;