import { ChangeEvent } from "react"
import { GroupContainer, FormInputLabel, FormInputField } from "./form-input.style"

interface FormInputProps {
    label: string,
    type: string,
    required: boolean,
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const FormInput = ({ label, type, ...other }: FormInputProps) => {
    return (
        <GroupContainer >
            <FormInputField type={type} {...other} autoComplete="password" />
            {label &&
                <FormInputLabel shrink={other.value.length ? true : undefined}>
                    {label}
                </FormInputLabel>
            }
        </GroupContainer>
    )
}

export default FormInput