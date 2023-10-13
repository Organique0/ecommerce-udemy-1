"use client"

import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGithubPopup, createAuthUserWithEmailAndPassword, signInWithEmailAndPassword } from "@/app/utils/firebase/firebase.utils"
import Button from "../button/Button"
import FormInput from "../form-input/FormInput"
import { useState, FormEvent, ChangeEvent, useEffect, useContext } from "react"
import "./sign-in-form.styles.scss"
import { UserContext } from "@/contexts/user.context"

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [loaded, setLoaded] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    }

    const logGithubUser = async () => {
        await signInWithGithubPopup();
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(email, password);
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
            <div className="sign-in-container">
                <h2>I already have an accout</h2>
                <span>Sign in with your email and password</span>
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
                    <Button type="submit">Sign in</Button>
                    <div className="buttons-container">
                        <Button onClick={logGoogleUser} type="button" buttonType="google">google</Button>
                        <Button onClick={logGithubUser} type="button" buttonType="github">github</Button>
                    </div>
                </form>
            </div>
        )
    )
}

export default SignInForm