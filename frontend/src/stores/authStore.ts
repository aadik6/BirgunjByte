import { authLogin } from "@/apis/user";
import { userData } from "@/types/userTypes";
import { create } from "zustand";
import  {jwtDecode, JwtPayload } from "jwt-decode";

interface AuthStore{
    loading:boolean;
    error:string | null;
    token:string | null;
    user:userData | null;
    login:(email:string,password:string)=>Promise<void>;
    signup:(data:userData)=>Promise<void>;
}
export const useAuthStore = create<AuthStore>()((set)=>({
    loading:false,
    error:null,
    token:null,
    user:null,
    login:async(email,password)=>{
        set({loading:true,error:null})
        try{
            const res = await authLogin(email,password)
            console.log(res,"login res")
            set({token:res.accessToken})
            const decodedToken = jwtDecode<JwtPayload & { user: userData }>(res.accessToken);
            const decodedUser = decodedToken.user;
            set({user:decodedUser})
            set({loading:false})
        }catch(err){
            set({error:"Invalid credentials",loading:false})
        }
    },
    signup:async()=>{},
}))