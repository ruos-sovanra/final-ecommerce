'use client';

import { useRouter } from "next/dist/client/components/navigation";
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

const ProductPage = () => {

    const [products, setProducts] = useState<Product[]>([]);


    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=0&size=9`);
            const data = await res.json();
            setProducts(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const router = useRouter();
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                    {products.map((product,index) => (
                        <a key={product.id} className="group text-sm">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center cursor-pointer"
                                    onClick={() => router.push(`/product/${product.uuid}`)}
                                />
                            </div>
                            <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
                            <p className="italic text-gray-500">{product.categoryName}</p>
                            <p className="mt-2 font-medium text-gray-900">{product.price}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage;



