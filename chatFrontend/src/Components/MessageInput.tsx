import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegPaperPlane, FaImage,FaXmark  } from "react-icons/fa6";
import useChatStore from "../store/useChatStore";

type chatSelectorType = {
  message?: string | undefined;
  file?: FileList | undefined;
};
function MessageInput() {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<chatSelectorType>();

  const [imagePreview, setImagePreview] = useState<string | null>();
  const fileInputRef=useRef<HTMLInputElement | null>(null);

  const {sendMessages,selectedUser}=useChatStore();

  const onsubmit = (data:chatSelectorType) => {
    console.log("submitting info",data);
    sendMessages({userId:selectedUser?.id,data:data})
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const file = watch("file");

  // Effect to update preview when file changes
  useEffect(() => {
    if (file?.length) {
      const imageUrl = URL.createObjectURL(file[0]);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [file]);

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              // onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <FaXmark className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex items-center gap-2"
      >
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            {...register("message", { required: false })}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("file", { required: false })}
            ref={fileInputRef}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                      ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}

            onClick={openFileDialog}
          >
            <FaImage size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!watch("message")?.trim() && !imagePreview}
        >
          <FaRegPaperPlane size={22} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
