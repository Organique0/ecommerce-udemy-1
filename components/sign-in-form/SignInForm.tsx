"use client"

import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGithubPopup, createAuthUserWithEmailAndPassword, signInWithEmailAndPassword } from "@/utils/firebase/firebase.utils"
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button"
import FormInput from "../form-input/FormInput"
import { useState, FormEvent, ChangeEvent, useEffect, useContext } from "react"
import { SignInContainer } from "./sign-in-form.styles.jsx"

//saga
import { useDispatch } from "react-redux";
import { githubSignInStart, googleSignInStart, emailSignInStart } from "@/store/user/user.action"

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    //saga
    //const dispatch = useDispatch();

    //TODO: we could show a loader here
    const [loaded, setLoaded] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const logGoogleUser = async () => {
        //firebase
        await signInWithGooglePopup();
        //saga
        //dispatch(googleSignInStart());
    }

    const logGithubUser = async () => {
        //firebase
        await signInWithGithubPopup();
        //saga
        //dispatch(githubSignInStart());
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            //firebase
            await signInWithEmailAndPassword(email, password);
            //saga
            //dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error: any) {
            if (error.code === "auth/invalid-email"
                || error.code === "auth/invalid-login-credentials"
                || error.code === "auth/invalid-password") {
                alert("Invalid email or password");
            }
            console.log(error);
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        loaded && (
            <SignInContainer>

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Email"
                        type="text"
                        required
                        onChange={handleChange}
                        name="email"
                        value={email}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={password}
                    />
                    <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign in</Button>
                    <div className="buttons-container">
                        <Button onClick={logGoogleUser} type="button" buttonType={BUTTON_TYPE_CLASSES.google}>google</Button>
                        <Button onClick={logGithubUser} type="button" buttonType={BUTTON_TYPE_CLASSES.github}>github</Button>
                    </div>
                </form>
            </SignInContainer>
        )
    )
}

export default SignInForm