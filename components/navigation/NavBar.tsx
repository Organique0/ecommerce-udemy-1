"use client"
import Link from "next/link"
import "./navigation.styles.scss"
import Image from "next/image"
import { UserContext } from "@/contexts/user.context"
import { useContext } from "react"
import { signOutUser } from "@/app/utils/firebase/firebase.utils"

const NavBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleSignOut = async () => {
        await signOutUser();
        setCurrentUser(null);
    }
    return (
        <div className="navigation">
            <Link className="logo-container" href="/">
                <Image className="logo" src="/logo.svg" alt="logo" fill />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" href="/shop">
                    SHOP
                </Link>
                {currentUser ? (
                    <span className="nav-link" onClick={handleSignOut}>SIGN OUT</span>
                ) : (
                    <Link className="nav-link" href="/sign-in">
                        SIGN IN
                    </Link>
                )}
                <p>user email:{currentUser?.email}</p>
            </div>
        </div>
    )
}

export default NavBar