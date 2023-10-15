import ProductCard from "@/components/product-card/product-card.component";
import SHOP_DATA from "../../data/shop-data.json";
import "./shop.styles.scss"
const ShopPage = () => {
    return (
        <div className="products-container">
            {SHOP_DATA.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    )
}

export default ShopPage