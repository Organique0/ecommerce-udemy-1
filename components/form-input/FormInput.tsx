"use client"
import { ChangeEvent } from "react"
import "./form-input.style.scss"

interface FormInputProps {
    label: string,
    type: string,
    required: boolean,
    name: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const FormInput = ({ label, ...other }: FormInputProps) => {
    return (
        <div className='group'>
            <input className='form-input' {...other} />
            {label &&
                <label className={`${other.value.length ? `shrink` : ``} form-input-label`}>
                    {label}
                </label>
            }
        </div>
    )
}

export default FormInput