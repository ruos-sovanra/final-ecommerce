'use client';
import {CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon} from '@heroicons/react/20/solid'
import Link from "next/link";
import {useDeleteOrderMutation, useGetOrderQuery, useUpdateOrderQuantityMutation} from "@/redux/service/order";
import {useEffect, useState} from "react";
import {useDeleteBrandMutation} from "@/redux/service/brand";

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
};

type Order = {
    id: number;
    uuid: string;
    status: string;
    addressId: number | null;
    quantity: number;
    totalPrice: number;
    OrderDetailNumber: number | null;
    product: Product;
    userName: string;
};

const CartPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const {data, error,refetch, isLoading, isSuccess} = useGetOrderQuery();
    const [updateOrderQuantity] = useUpdateOrderQuantityMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    const handleUpdateQuantity = async (uuid: string, quantity: number) => {

        try {
            const response = await updateOrderQuantity({ uuid, quantity });

            if(response) {
                refetch();
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteOrder = async (uuid: string) => {
        try {
            const response = await deleteOrder({ uuid });
            if(response) {
                refetch();
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if(data){
            setOrders(data.results);
        }
    }, [data]);

    const sub_totalPrice = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    const shipping = 5;

    const tax = Math.round(sub_totalPrice * 0.07);

    const total = sub_totalPrice + shipping + tax;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {orders.map((product, productIdx) => (
                                <li key={productIdx} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={product.product.image}
                                            alt={product.product.name}
                                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a
                                                            className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.product.name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                {/*<div className="mt-1 flex text-sm">*/}
                                                {/*    <p className="text-gray-500">{product.color}</p>*/}
                                                {/*    {product.size ? (*/}
                                                {/*        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>*/}
                                                {/*    ) : null}*/}
                                                {/*</div>*/}
                                                <p className="mt-1 text-sm font-medium text-gray-900">$ {product.product.price}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                                                    Quantity, {product.product.name}
                                                </label>
                                                <select
                                                    id={`quantity-${productIdx}`}
                                                    name={`quantity-${productIdx}`}
                                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                    onChange={(e) => handleUpdateQuantity(product.uuid, parseInt(e.target.value))}
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>
                                                    <option value={7}>7</option>
                                                    <option value={8}>8</option>
                                                </select>

                                                <div className="absolute right-0 top-0">
                                                    <button type="button"
                                                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">Remove</span>
                                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" onClick={()=>handleDeleteOrder(product.uuid)}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/*<p className="mt-4 flex space-x-2 text-sm text-gray-700">*/}
                                        {/*    {product.inStock ? (*/}
                                        {/*        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500"*/}
                                        {/*                   aria-hidden="true"/>*/}
                                        {/*    ) : (*/}
                                        {/*        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300"*/}
                                        {/*                   aria-hidden="true"/>*/}
                                        {/*    )}*/}
                                        {/*    <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>*/}
                                        {/*</p>*/}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">$ {sub_totalPrice}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true"/>
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">${shipping}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true"/>
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">${tax}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${total}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Link href={'/checkout'}
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </Link>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
}

export default CartPage;


