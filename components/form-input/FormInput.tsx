import { ChangeEvent, FC, InputHTMLAttributes } from "react"
import { GroupContainer, FormInputLabel, FormInputField } from "./form-input.style"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
}

const FormInput: FC<FormInputProps> = ({ label, type, ...other }) => {
    return (
        <GroupContainer >
            <FormInputField type={type} {...other} autoComplete="password" />
            {label &&
                <FormInputLabel shrink={Boolean(other.value && typeof other.value === "string" && other.value.length)}>
                    {label}
                </FormInputLabel>
            }
        </GroupContainer>
    )
}

export default FormInput