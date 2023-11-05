"use client"
import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton, ButtonSpinner, GithubSignInButton, GoogleSignInButton, InvertedButton } from "./button.styles"

export enum BUTTON_TYPE_CLASSES {
    base = "base",
    google = "google-sign-in",
    inverted = "inverted",
    github = "github-sign-in",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    //type: "button" | "submit" | "reset" | undefined,
    isLoading?: boolean,
    buttonType?: BUTTON_TYPE_CLASSES,
    // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.github]: GithubSignInButton,
}[buttonType])


const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, type, ...other }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...other} type={type}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    )
}

export default Button