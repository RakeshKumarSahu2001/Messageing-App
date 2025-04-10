import { create } from "zustand";
import axiosInstance from "../Api/axiosInstance/axios";
import {io,Socket } from "socket.io-client";

type authUser = {
  id: string;
  email: string;
  name?: string;
  image?: string;
};

type loginProps = {
  name?: string;
  email?: string;
  password: string;
};

type userInfoProp = {
  name: string;
  email: string;
  password: string;
  confPassword?: string;
};

interface AuthSlice {
  authUser: authUser | null;
  isRegistered: boolean;
  isLoggedIn: boolean;
  isUpdatingUserProfile: boolean;
  socket:null | Socket ;
  onlineUsers:[]
  // updateProfile: null | string;
  // actions
  registerAction: (data: userInfoProp) => Promise<void>;
  loginAction: (data: loginProps) => Promise<void>;
  logoutAction: () => Promise<void>;
  updateUserProfile: () => Promise<void>;
  conectToSocket:()=>void;
  disConectToSocket:()=>void;
}

const useAuthStore = create<AuthSlice>((set,get) => {
  return {
    authUser: null,
    isRegistered: false,
    isLoggedIn: false,

    isUpdatingUserProfile: false,
    socket:null,
    onlineUsers:[],
    // updateProfile: null,

    // isCheckingAuth:true,

    registerAction: async (data: userInfoProp) => {
      try {
        const response = await axiosInstance.post("/users/register", data);

        if (response?.data?.success) {
          set((state) => ({
            authUser: {
              ...state.authUser,
              id: response.data.data.id,
            } as authUser,
            isRegistered: true,
          }));
        }
      } catch (error) {
        set({ authUser: null, isRegistered: false });
      }
    },

    loginAction: async (data: loginProps) => {
      try {
        const response = await axiosInstance.post("/users/login", data);
        if (response?.data?.success) {
          set((state)=>({
            authUser:{...state.authUser,
            id:response?.data?.data?.id,
            email:response?.data?.data?.email,
            name:response?.data?.data?.name
          },
          isLoggedIn: response?.data?.success,
          }))

          get().conectToSocket()
        }
      } catch (error) {
        set({ authUser: null, isLoggedIn: false });
      }
    },

    logoutAction: async () => {
      try {
        await axiosInstance.post("/users/logout");
        get()?.disConectToSocket()
      } catch (error) {
        console.log("error : ", error);
      }
    },

    updateUserProfile: async (data:FormData) => {
      set({ isUpdatingUserProfile: true });

      try {
        const response = await axiosInstance.put("/users/update-profile", data);
        console.log("Profile pic update:", response.data.data);

        if (response?.data?.success) {
          set({ authUser: response?.data?.data });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        set({ isUpdatingUserProfile: false });
      }
    },

    conectToSocket:async()=>{
      const {authUser}=get();
      if(!authUser || get()?.socket?.connected) return;
      const socket=io("http://localhost:8080",{
        query:{
          userId:authUser.id
        }
      });
      socket.connect();
      set({socket:socket});

      socket.on("getOnlineUsers",(userIds)=>{
        set({onlineUsers:userIds})
      })
    },

    disConectToSocket:async()=>{
      console.log(get().socket?.id)
      if(get()?.socket?.connected)get()?.socket?.disconnect();
    },
  };
});

export default useAuthStore;
