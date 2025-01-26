import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";


interface InputPropsType {
    label: string;
    id: string;
    type?: string;
    required?: string | boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    autoComplete: string;
    validate?:(value:string)=>boolean | string;
    icon?: JSX.Element;
}

function Input({ label, id, type, required, register, errors, disabled, autoComplete,validate,icon }: InputPropsType) {
    return (
        <div>
            <label
                htmlFor={id}
                className={clsx(`input input-bordered flex items-center gap-2 form-input w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:leading-6`,
                    errors[id] && "focus:ring-rose-600",
                    disabled && "opacity-50 cursor-default"
                )}>
                <span>{icon}</span>
                <input
                    type={type}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    {
                    ...register(id, {
                        required:required,
                        validate:validate
                    })
                    }
                    className="grow"
                    placeholder={label} />
            </label>
            {errors[id] && <p className="text-rose-600 mt-2 text-sm">{errors[id]?.message?.toString()}</p>}
        </div>
    )
}

export default Input