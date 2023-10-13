"use client"
import { createUserDocumentFromAuth, signInWithGithubPopup, signInWithGooglePopup } from "../utils/firebase/firebase.utils"
import SignUpForm from "@/components/sign-up-form/SignUpForm"
const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const logGithubUser = async () => {
        const { user } = await signInWithGithubPopup();
        await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>sign in page</h1>
            <SignUpForm />
            <button onClick={logGoogleUser}>Sign in with google</button>
            <button onClick={logGithubUser}>Sign in with github</button>
        </div>
    )
}

export default SignIn