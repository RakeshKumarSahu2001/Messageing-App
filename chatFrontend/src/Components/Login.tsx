import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./Input";
import { faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/useAuthStore";

type loginProps={
  name?:string,
  email?:string,
  password:string,
}

function Login() {
  const {register,handleSubmit,formState:{errors}}=useForm();
  const {loginAction}=useAuthStore()

  const onSubmit=async(data:loginProps)=>{
    await loginAction(data)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 l:px- bg-gray-100">
    <div className="sm:mx-auto sm:w-full sm:max-w-md my-10">
      <h2 className="mt-6 text-center font-bold text-gray-900 tracking-tight">Chat App</h2>
    </div>

    <div className="sm:w-full !w-96">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}>

        <Input
          id="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          autoComplete="off"
          required="Email field is required"
          icon={<FontAwesomeIcon icon={faEnvelope} />} />

        <Input
          id="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          autoComplete="off"
          required="Password field is required"
          icon={<FontAwesomeIcon icon={faLock} />} />

        <div>
          <button
            className="btn btn-primary"
          >Primary</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login;