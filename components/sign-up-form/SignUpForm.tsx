"use client"
import { ChangeEvent, FormEvent, useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "@/app/utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import "./sign-up-form.styles.scss"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return
    };
    try {
      //FIXME:figure out types
      const { user }: any = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
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

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your emal and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={() => handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="text"
          required
          onChange={() => handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="text"
          required
          onChange={() => handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm password"
          type="text"
          required
          onChange={() => handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default SignUpForm