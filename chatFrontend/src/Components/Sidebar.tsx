import { useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";

function Sidebar() {
  // const { getUsers, users, setSelectedUser, selectedUser, isUsersLoading } = useAuthStore();
  const { getUsers, users, setSelectedUser } = useChatStore();
  const {onlineUsers}=useAuthStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="h-full w-20 lg:w-72 border-r border-base-00 flex flex-col transition-all duration-200">
      <div className="border-b border-base-00 w-full p-5">
        <div className="flex items-center gap-2">
          <FaUser className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* online filter */}
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users?.map((user) => {
          return (
            <>
              <button
                key={user?._id}
                onClick={() => {
                  setSelectedUser({
                    id:user?._id,
                    email: user?.email,
                    image: user?.image,
                    name: user?.name,
                  });
                }}
                className={`w-full p-3 flex items-center hover:bg-base-300 transition-colors`}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user?.image}
                    alt={user?.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {
                      onlineUsers.includes(user?._id) && (
                        <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-22 ring-zinc-900"></span>
                      )
                    }
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">
                    {/* {onlineUsers.includes(user?._id)?"Online":"Offline"} */}
                  </div>
                </div>
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
