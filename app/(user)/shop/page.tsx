'use client'

import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";

type Product = {
    name: string;
    image: string;
    id: number;
    uuid: string;
}

const ShopPage = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories?page=0&size=100`);
            const data = await res.json();
            setProducts(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const router = useRouter()
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Collection</h2>
                <p className="mt-4 text-base text-gray-500">
                    Each season, we collaborate with world-class designers to create a collection inspired by the
                    natural world.
                </p>
                <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                    {products.map((category,index) => (
                        <a key={index}  className="group block">
                            <div
                                aria-hidden="true"
                                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover object-center cursor-pointer"
                                    onClick={() => router.push(`/shop/${category.uuid}`)}
                                />
                            </div>
                            <h3 className="mt-4 text-base font-semibold text-gray-900">{category.name}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default ShopPage;

