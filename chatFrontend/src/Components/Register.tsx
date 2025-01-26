import { useForm, SubmitHandler } from "react-hook-form"
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../store/useAuthStore";


type inputs={
  name:string,
  email:string,
  password:string,
  confPassword:string
}

function Register() {
  const { register, watch,reset, handleSubmit, formState: { errors } } = useForm<inputs>();

  const {isRegistered,registerAction}=useAuthStore();

  const onSubmit: SubmitHandler<inputs> = async (data) => {
    await registerAction(data);
    reset();
  }
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 l:px- bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md my-10">
        <h2 className="mt-6 text-center font-bold text-gray-900 tracking-tight">Chat App</h2>
      </div>

      <div className="sm:w-full !w-96">
        <form
          action=""
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}>

          <Input
            id="name"
            label="name"
            register={register}
            errors={errors}
            autoComplete="off"
            required="Name field is required"
            icon={<FontAwesomeIcon icon={faUser} />}
             />

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

          <Input
            id="confPassword"
            label="confPassword"
            type="password"
            register={register}
            errors={errors}
            autoComplete="off"
            validate={(value:string)=>value===watch("password") || "Confirm password must be same as password"}
            required="Confirm Password field is required"
            icon={<FontAwesomeIcon icon={faLock} />}
             />
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

export default Register;