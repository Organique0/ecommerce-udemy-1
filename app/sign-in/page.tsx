"use client"
import { signInWithGooglePopup } from "../utils/firebase/firebase.utils"

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
    return (
        <div>
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with google</button>
        </div>
    )
}

export default SignIn