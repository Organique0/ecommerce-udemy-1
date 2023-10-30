"use client"
import { BaseButton, ButtonSpinner, GithubSignInButton, GoogleSignInButton, InvertedButton } from "./button.styles.jsx"
export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted",
    github: "github-sign-in",
}

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined,
    children: string,
    isLoading?: boolean,
    buttonType?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.github]: GithubSignInButton,
}[buttonType])


const Button = ({ children, buttonType, isLoading, type, ...other }: ButtonProps) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...other} type={type}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    )
}

export default Button