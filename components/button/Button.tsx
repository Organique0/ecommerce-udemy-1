import "./button.styles.scss"

const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
    github: "github-sign-in",
}

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined,
    children: string,
    buttonType?: keyof typeof BUTTON_TYPE_CLASSES,
    other?: Object,
    onClick?: () => void,
}

const Button = ({ children, buttonType, type, ...other }: ButtonProps) => {
    return (
        <button className={`button-container ${buttonType && BUTTON_TYPE_CLASSES[buttonType]}`} {...other} type={type}>
            {children}
        </button>
    )
}

export default Button