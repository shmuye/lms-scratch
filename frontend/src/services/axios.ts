import { useNavigate } from 'react-router-dom'
import axios, 
{
  AxiosInstance,
  AxiosResponse,
  AxiosError

} from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const api: AxiosInstance = axios.create({

    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
   
})

// request interceptors

api.interceptors.request.use(

    (config) => {
       return config
    },

    (error) => {
        Promise.reject(error)
    }
)

// Response Interceptors

api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
        if(error.response?.status === 401){

            const navigate = useNavigate()
            navigate('/login')
            
        }

        return  Promise.reject(error)
    }

)



export default api