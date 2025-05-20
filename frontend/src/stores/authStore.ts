import { authLogin, getRefreshToken } from "@/apis/user";
import { userData } from "@/types/userTypes";
import { create } from "zustand";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthStore {
    loading: boolean;
    error: string | null;
    token: string | null;
    setToken: (token: string | null) => void;
    user: userData | null;
    refreshToken: () => Promise<boolean>
    updateUser: (user: userData) => void;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (data: userData) => Promise<void>;
}
export const useAuthStore = create<AuthStore>()((set) => ({
    loading: false,
    error: null,
    token: null,
    user: null,
    setToken: (token: string | null) => set({ token }),
    updateUser: (user: userData) => set({ user }),
    login: async (email, password) => {
        set({ loading: true, error: null })
        try {
            const res = await authLogin(email, password)
            console.log(res, "login res")
            set({ token: res.accessToken })
            const decodedToken = jwtDecode<JwtPayload & { user: userData }>(res.accessToken);
            const decodedUser = decodedToken.user;
            set({ user: decodedUser })
            set({ loading: false })
            return true
        } catch (err) {
            set({ error: "Invalid credentials", loading: false })
            return false
        }
    },
    signup: async () => { },
    refreshToken: async () => {
        set({ loading: true })
        try {
            const res = await getRefreshToken();
            if(res.status !== 200) {
                set({ error: "Something went wrong", loading: false })
                return false;
            }
            set({ token: res.data.accessToken })
            const decodedToken = jwtDecode<JwtPayload & { user: userData }>(res.data.accessToken);
            const decodedUser = decodedToken.user;
            set({ user: decodedUser })
            set({ loading: false })
            return true;
        } catch (err) {
            set({ error: "Something went wrong", loading: false })
            return false;
        }finally {
            set({ loading: false })
        }
    }
}))