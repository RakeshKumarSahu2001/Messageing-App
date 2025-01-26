import { create } from 'zustand';
import axiosInstance from '../Api/axiosInstance/axios';


type authUser = {
    id: string,
    email: string
}

type loginProps = {
    name?: string,
    email?: string,
    password: string
}

type userInfoProp = {
    name: string,
    email: string,
    password: string,
    confPassword: string
}

interface AuthSlice {
    authUser: authUser | null;
    isRegistered: boolean;

    // actions
    registerAction: (data:userInfoProp) => void;
    loginAction: (data:loginProps) => void;
    logoutAction: () => void;
}


const useAuthStore = create<AuthSlice>((set) => {
    return {
        authUser: null,
        isRegistered: false,
        isLoggedIn: false,
        // isUpdatedProfile:false,

        // isCheckingAuth:true,

        registerAction: async (data: userInfoProp) => {
            try {
                const response = await axiosInstance.post("users/register", data);

                console.log("response", response)
                if (response?.data?.success) {
                    set({ authUser: response.data, isRegistered: response?.data?.success })
                }
                set({isRegistered:false})
            } catch (error) {
                console.log("zustand error", error);
                set({ authUser: null, isRegistered: false })
            }
        },
        loginAction: async (data: loginProps) => {
            console.log("data on the login props : ",data);
            try {
                const response = await axiosInstance.post("users/login", data);
                console.log("login response ", response);
            } catch (error) {
                console.log(error);
                set({ isLoggedIn: false });
            }
        },

        logoutAction: async () => {
            try {
                const response = await axiosInstance.post("users/logout");

                console.log("logout response :", response);
            } catch (error) {
                console.log("error : ", error);
            }
        }
    }
})

export default useAuthStore;