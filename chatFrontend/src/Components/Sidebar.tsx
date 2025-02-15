import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore"


function Sidebar() {
  const { getUsers, users, setSelectedUser, selectedUser, isUsersLoading } = useAuthStore();

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className="h-full w-20 lg:w-72 border-r border-base-00 flex flex-col transition-all duration-200">
      <div className="border-b border-base-00 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* online filter */}
      </div>
      <div className="overflow-y-auto w-full py-3">
        {
          users.map((user) => {
            return (
              <>
                <button
                  key={users._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-3 flex items-center hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
                >
                  <div className="relative mx-auto lg:mx-0">
                    <img src={user.profilePic} alt={user.name} className="size-12 object-cover rounded-full" />
                    {
                      onlineUsers.includes(user._id) && (
                        <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-22 ring-zinc-900"></span>
                      )
                    }
                  </div>
                  <div className="hidden lg:block text-left min-w-0">
                    <div className="font-medium truncate">
                      {onlineUsers.includes(user._id)?"Online":"Offline"}
                    </div>
                  </div>
                </button>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Sidebar