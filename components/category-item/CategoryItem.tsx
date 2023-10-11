import "./category-item.styles.scss"
import Image from "next/image";

interface CategoryPageProps {
    category: {
        id: number,
        title: string,
        imageUrl: string
    }
}

const CategoryItem = ({ category }: CategoryPageProps) => {
    return (
        <div className="category-container" key={category.id}>
            <Image
                src={category.imageUrl}
                alt="category-image"
                className="background-image"
                fill
            />
            <div className="category-body-container">
                <h2>{category.title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    )
}

export default CategoryItem

