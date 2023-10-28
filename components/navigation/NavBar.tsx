"use client"
import Link from "next/link"
import Image from "next/image"
import { UserContext } from "@/contexts/user.context"
import { useContext } from "react"
//before saga
import { signOutUser } from "@/utils/firebase/firebase.utils"
import CartIconComponent from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import { CartContext } from "@/contexts/cart.context"
import "./navigation.styles.scss"
import { useSelector } from "react-redux"; //hook that you pass the selector function. 
import { selectCurrentUser } from "@/store/user/user.selector"
import { selectCategoriesMap } from "@/store/categories/category.selector"
import { selectIsCartOpen } from "@/store/cart/cart.selector"

//saga
import { useDispatch } from "react-redux";
import { signOutStart } from "../../store/user/user.action";

const NavBar = () => {
    const currentUser = useSelector(selectCurrentUser)
    //const { cartOpen } = useContext(CartContext);
    const cartOpen = useSelector(selectIsCartOpen);

    // INFO: Testing if this Redux thingy is working. I works. But not exactly the way I want. Again, this cannot be used in a server component.
    //const categoriesMap = useSelector(selectCategoriesMap);
    //console.log(categoriesMap.categoriesMap);
    //Object.keys(categoriesMap.categoriesMap).map((title) => { console.log(title) });

    //saga
    const dispatch = useDispatch();
    const signOutUser = () => dispatch(signOutStart());

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
                    <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                ) : (
                    <Link className="nav-link" href="/sign-in">
                        SIGN IN
                    </Link>
                )}
                <p>user email:{currentUser?.email}</p>
                <CartIconComponent />
            </div>
            {cartOpen && <CartDropdown />}
        </div>
    )
}

export default NavBar