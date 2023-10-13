"use client"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "@/app/utils/firebase/firebase.utils"
import FormInput from "../form-input/FormInput"
import "./sign-up-form.styles.scss"
import Button from "../button/Button"
import { UserContext } from "@/contexts/user.context"
import { User, UserCredential } from "firebase/auth"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [loaded, setLoaded] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return
    };
    try {
      const res = await createAuthUserWithEmailAndPassword(email, password);
      if (res && res.user !== undefined) {
        await createUserDocumentFromAuth(res.user, { displayName });
        setCurrentUser(res.user);
      }
      resetFormFields();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
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
      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your emal and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
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
          <FormInput
            label="Confirm password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />

          <Button type="submit">Sign up</Button>
        </form>
      </div>
    )
  )
}

export default SignUpForm