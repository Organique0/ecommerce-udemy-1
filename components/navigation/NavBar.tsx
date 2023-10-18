"use client"
import "./navigation.styles.js"
import { UserContext } from "@/contexts/user.context"
import { useContext, useEffect, useState } from "react"
import { signOutUser } from "@/app/utils/firebase/firebase.utils"
import CartIconComponent from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import { CartContext } from "@/contexts/cart.context"
import { Logo, LogoContainer, NavLinkLink, NavLinkSpan, NavLinks, NavigationContainer } from "./navigation.styles.js"

const NavBar = () => {
    const { currentUser } = useContext(UserContext);
    const { cartOpen } = useContext(CartContext);

    const [mounted, setMouted] = useState(false);

    useEffect(() => {
        setMouted(true);
    }, [])


    return (
        mounted ? (
            <NavigationContainer>
                <LogoContainer href="/">
                    <Logo src="/logo.svg" alt="logo" fill />
                </LogoContainer>
                <NavLinks >
                    <NavLinkLink href="/shop">
                        SHOP
                    </NavLinkLink>
                    {currentUser ? (
                        <NavLinkSpan onClick={signOutUser}>SIGN OUT</NavLinkSpan>
                    ) : (
                        <NavLinkLink href="/sign-in">
                            SIGN IN
                        </NavLinkLink>
                    )}
                    <p>user email:{currentUser?.email}</p>
                    <CartIconComponent />
                </NavLinks>
                {cartOpen && <CartDropdown />}
            </NavigationContainer>
        ) : (
            //FIXME: here we could fix this to not make show later (at least visually)...
            <div>
                loading ...
            </div>
        )
    )
}

export default NavBar

