'use client';
import AddProductModal from "@/components/dashboard/AddProductModal";
import {useEffect, useState} from "react";
import UpdateProductModal from "@/components/dashboard/UpdateProductModal";
import DeleteProductModal from "@/components/dashboard/DeleteProductModal";


type Product = {
    id: number;
    uuid: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    categoryName: string;
    brandName: string;
    description: string;
}


const ProductsTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = () => {
        setSelectedProduct(null);
        setIsDeleteModalOpen(false);
    }

    const openEditModal = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
    };
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=0&size=100`);
            const data = await res.json();
            setProducts(data.results);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(products);


    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        onClick={openModal}
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add user
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Product Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Category
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Price
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Quantity
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Delete</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                        <div className="flex items-center">
                                            <div className="h-11 w-11 flex-shrink-0">
                                                <img className="h-11 w-11 rounded-full" src={product?.image} alt=""/>
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                                {/*<div className="mt-1 text-gray-500">{person.email}</div>*/}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className="text-gray-900">{product.categoryName}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span
                                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {product.price}
                                            </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{product.quantity}</td>
                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <a
                                            href="#"
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => openEditModal(product)}
                                        >
                                            Edit<span className="sr-only">, {product.name}</span>
                                        </a>
                                    </td>
                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => openDeleteModal(product)}
                                        >
                                            Delete<span className="sr-only">, {product.name}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DeleteProductModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} product={selectedProduct}/>
            <AddProductModal isOpen={isModalOpen} onClose={closeModal}/>
            <UpdateProductModal isOpen={isEditModalOpen} onClose={closeEditModal} product={selectedProduct}/>
        </div>
    );
};

export default ProductsTable;