import Link from "next/link"
import "./navigation.styles.scss"
import Image from "next/image"

const NavBar = () => {
    return (
        <div className="navigation">
            <Link className="logo-container" href="/">
                <Image className="logo" src="/logo.svg" alt="logo" fill />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" href="/shop">
                    SHOP
                </Link>
            </div>
        </div>
    )
}

export default NavBar