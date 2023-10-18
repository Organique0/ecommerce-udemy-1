import SignInForm from "@/components/sign-in-form/SignInForm";
import SignUpForm from "@/components/sign-up-form/SignUpForm";
import "./authentication.styles.scss";

const SignIn = () => {
    return (
        <div className="authentication-container">
            <div>
                <h2>I already have an accout</h2>
                <span>Sign in with your email and password</span>
                <SignInForm />
            </div>
            <div>
                <h2>Don't have an account?</h2>
                <span>Sign up with your emal and password</span>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignIn