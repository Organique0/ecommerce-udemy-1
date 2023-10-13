"use client"
import SignInForm from "@/components/sign-in-form/SignInForm"
import SignUpForm from "@/components/sign-up-form/SignUpForm"
import "./authentication.styles.scss"
const SignIn = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default SignIn