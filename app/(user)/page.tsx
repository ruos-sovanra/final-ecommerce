
import HeroComponent from "@/components/hero/HeroComponent";
import CategoryComponent from "@/components/category/CategoryComponent";
import FeaturedComponent from "@/components/feature/FeaturedComponent";
import CollectionComponent from "@/components/collection/CollectionComponent";
import ContactComponent from "@/components/feature/ContactComponent";



export default function Example() {

    return (
        <main className="container mx-auto">
            <HeroComponent />
            <CategoryComponent />
            <FeaturedComponent />
            <CollectionComponent />
            <ContactComponent />
        </main>
    )
}