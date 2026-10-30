import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4000/api"
});
api.interceptors.request.use(
    async (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("admin_token")
            if (token) {
                config.headers.token = token;
            }
           
        }
         else {
                try {
                    const { cookies } = await import("next/headers");
                    const cookieStore = await cookies();
                    const token = cookieStore.get("admin_token")?.value;
                    if (token) {
                        config.headers.token = token;
                    }
                    
                } catch (error) {
                    console.error("Gagal mengambil token dari cookies server:", error);
                }
            }
        return config;
    }
);
api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response ** error.response.status === 401){
            if(typeof window !== "undefined"){
                localStorage.removeItem("admin_token");
                console.log("Token kedaluwarsa terdeteksi, token dihapus dari localStorage.");
            }
        }
        return Promise.reject(error)
    }
)