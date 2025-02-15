import Chat from "../Components/Chat";
import Sidebar from "../Components/Sidebar";
import useChatStore from "../store/useChatStore";

function HomePage() {
  const {selectedUser}=useChatStore();
  return (
    <>
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser?<div>No users has been selected</div>:<Chat />}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage;