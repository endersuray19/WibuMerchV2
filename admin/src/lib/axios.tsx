import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4000/api"
});
api.interceptors.request.use(
    async (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("admin_token")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
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
                    console.log("Berhasil dapet token= ", token)
                } catch (error) {
                    console.error("Gagal mengambil token dari cookies server:", error);
                }
            }
        return config;
    }
)