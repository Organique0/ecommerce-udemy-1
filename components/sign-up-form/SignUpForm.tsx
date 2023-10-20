"use client"
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "@/app/utils/firebase/firebase.utils"
import FormInput from "../form-input/FormInput"
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button"
import { SignUpContainer } from "./sign-up-form.styles.jsx"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  //TODO: we could show a loader here
  const [loaded, setLoaded] = useState(false);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return
    };
    try {
      const res = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(res?.user, { displayName });
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
      <SignUpContainer>

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

          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign up</Button>
        </form>
      </SignUpContainer>
    )
  )
}

export default SignUpForm