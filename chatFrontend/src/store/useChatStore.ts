import { create } from "zustand";
import axiosInstance from "../Api/axiosInstance/axios";


const useChatStore = create((set) => {
    return {
        message: [],
        users: [],
        selectedUser: null,
        isUsersLoading: false,
        isMessagesLoading: false,


        getUsers: async () => {
            set({ isUsersLoading: true });

            try {
                const response = await axiosInstance.get("/messages/users");
                set({ users: response.data });

            } catch (error) {
                console.log(error)
            } finally {
                set({ isUsersLoading: false });
            }
        },
        getMessages: async (userId: string) => {
            set({ isMessagesLoading: true });

            try {
                const response = await axiosInstance.get("/messages/" + userId);
                set({ message: response.data });
            } catch (error) {
                console.log(error)
            } finally {
                set({ isMessagesLoading: false });
            }
        },
        setSelectedUser:async(selecteduser)=>{
            set({selectedUser:selecteduser})
        }
    }
})

export default useChatStore;