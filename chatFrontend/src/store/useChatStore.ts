import { create } from "zustand";
import axiosInstance from "../Api/axiosInstance/axios";
import useAuthStore from "./useAuthStore";

type user = {
  id: string;
  email: string;
  name?: string;
  image?: string;
};

type message = {
  _id: string;
  senderId: string;
  recieverId: string;
  text: string;
  createdAt: Date;
};

type selectedUserType = {
  id?: string;
  email?: string;
  name?: string;
  image?: string;
};

type chatSelectorType = {
  message?: string | undefined;
  file?: FileList | undefined;
};

interface messageSlice {
  messages: [message] | [];
  users: [user] | null;
  selectedUser: null | selectedUserType;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessages: ({
    userId,
    data,
  }: {
    userId: string;
    data: chatSelectorType;
  }) => Promise<void>;
  subscribeToMessages:()=>void;
  unsubscribeFromMessages:()=>void;
  setSelectedUser: (data: selectedUserType | null) => Promise<void>;
}

const useChatStore = create<messageSlice>((set,get) => {
  return {
    messages: [],
    users: null,
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
      set({ isUsersLoading: true });
      try {
        const response = await axiosInstance.get("/messages/get-users");
        console.log("response user list :",response)
        set({ users: response.data?.data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isUsersLoading: false });
      }
    },

    getMessages: async (userId) => {
      set({ isMessagesLoading: true });
      console.log("user id :",userId);
      try {
        const response = await axiosInstance.get("/messages/user/" + userId);
        console.log("get message response :", response?.data?.data);
        set({ messages: response?.data?.data });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isMessagesLoading: false });
      }
    },

    sendMessages: async ({ userId, data }) => {
      console.log("data present or not", userId, data);
      try {
        const response = await axiosInstance.post(
          "/messages/send-message/" + userId,
          data
        );
        console.log("send message response :", response.data);
        set({messages:response?.data})
      } catch (error) {
        console.log("send message response :", error);
      }
    },

    subscribeToMessages:()=>{
      const {selectedUser}=get();

      if(!selectedUser) return;

      const {socket}=useAuthStore.getState();

      socket?.on("newMessage",(newMessage)=>{
        set({
          messages:[...get().messages,newMessage]
        })
      })
    },

    unsubscribeFromMessages:()=>{
      const {socket}=useAuthStore.getState();
      socket?.off("newMessage")
    },

    setSelectedUser: async (selecteduser) => {
      set({ selectedUser: selecteduser });
    },
  };
});

export default useChatStore;
