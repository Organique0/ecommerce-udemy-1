"use client"
import { ChangeEvent } from "react"
import "./form-input.style.js"
import { GroupContainer, FormInputLabel, FormInputField } from "./form-input.style.js"

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
            <FormInputField type={type} {...other} />
            {label &&
                <FormInputLabel className={`${other.value.length ? `shrink` : ``}`}>
                    {label}
                </FormInputLabel>
            }
        </GroupContainer>
    )
}

export default FormInput