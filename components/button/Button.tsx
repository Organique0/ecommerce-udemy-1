"use client"
import { BaseButton, GithubSignInButton, GoogleSignInButton, InvertedButton } from "./button.styles"
export const BUTTON_TYPE_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted",
    github: "github-sign-in",
}

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined,
    children: string,
    buttonType?: string,
    other?: Object,
    onClick?: () => void,
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.github]: GithubSignInButton,
}[buttonType])


const Button = ({ children, buttonType, type, ...other }: ButtonProps) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...other} type={type}>
            {children}
        </CustomButton>
    )
}

export default Button