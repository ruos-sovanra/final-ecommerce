'use client';
import {useEffect, useState} from "react";

type Product = {
    id: number;
    uuid: string;
    name: string;
    description: string;
    price: number;
    categoryName: string;
    brandName: string;
    image: string;
}

const CollectionComponent = () => {

    const [products, setProducts] = useState<Product[]>([]);


    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=0&size=3`);
            const data = await res.json();
            setProducts(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section
            aria-labelledby="collection-heading"
            className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
        >
            <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                Shop by Collection
            </h2>
            <p className="mt-4 text-base text-gray-500">
                Each season, we collaborate with world-class designers to create a collection inspired by the natural
                world.
            </p>

            <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                {products.map((product,index) => (
                    <a key={index} className="group block">
                        <div
                            aria-hidden="true"
                            className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-gray-900">{product.name}</h3>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-3">{product.description}</p>
                    </a>
                ))}
            </div>
        </section>
    )
}

export default CollectionComponent;