'use client';
import {Disclosure, Tab} from "@headlessui/react";
import {StarIcon} from "@heroicons/react/20/solid";
import {HeartIcon, MinusIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useCreateOrderMutation} from "@/redux/service/order";
import {useAppSelector} from "@/redux/hook";
import {selectProfile} from "@/redux/feature/profile/userSlice";
import {useRouter} from "next/dist/client/components/navigation";

type Product = {
    id: number;
    uuid: string;
    name: string;
    description: string;
    price: number;
    categoryName: string;
    brandName: string;
    image: string | null;
    quantity: number;
}

type Props = {
    uuid: string;
}

const ProductDetail = ({uuid}: Props) => {

    const [products, setProducts] = useState<Product | null >(null);

    const [createOrder] = useCreateOrderMutation();

    const profile = useAppSelector(selectProfile)

    const router = useRouter()

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${uuid}`);
            const data = await res.json();
            console.log(data);
            setProducts(data.payload);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddToCart = async () => {
        if(profile != null){
            try {
                const response = await createOrder({uuid: products?.uuid ?? ''});
            }catch (error) {
                console.error(error);
            }
        }else{
            router.push('/login')
        }
    }



    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                {/* Image gallery */}
                <Tab.Group as="div" className="flex flex-col-reverse">
                    <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                        <Tab.Panel>
                            <img
                                src={products?.image ?? ''}
                                alt={products?.name}
                                className="h-full w-full object-cover object-center sm:rounded-lg"
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                {/* Product info */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{products?.name}</h1>

                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{products?.price}</p>
                    </div>

                    {/* Reviews */}
                    {/*<div className="mt-3">*/}
                    {/*    <h3 className="sr-only">Reviews</h3>*/}
                    {/*    <div className="flex items-center">*/}
                    {/*        <div className="flex items-center">*/}
                    {/*            {[0, 1, 2, 3, 4].map((rating) => (*/}
                    {/*                <StarIcon*/}
                    {/*                    key={rating}*/}
                    {/*                    className={classNames(*/}
                    {/*                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',*/}
                    {/*                        'h-5 w-5 flex-shrink-0'*/}
                    {/*                    )}*/}
                    {/*                    aria-hidden="true"*/}
                    {/*                />*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*        <p className="sr-only">{product.rating} out of 5 stars</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="mt-6">
                        <h3 className="sr-only">Description</h3>

                        <div
                            className="space-y-6 text-base text-gray-700"
                        >
                            <p>{products?.description}</p>
                        </div>
                    </div>

                    <div className="mt-6">

                        <div className="sm:flex-col1 mt-10 flex">
                            <button
                                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                onClick={handleAddToCart}
                            >
                                Add to bag
                            </button>

                            <button
                                type="button"
                                className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true"/>
                                <span className="sr-only">Add to favorites</span>
                            </button>
                        </div>
                    </div>

                    {/*<section aria-labelledby="details-heading" className="mt-12">*/}
                    {/*    <h2 id="details-heading" className="sr-only">*/}
                    {/*        Additional details*/}
                    {/*    </h2>*/}

                    {/*    <div className="divide-y divide-gray-200 border-t">*/}
                    {/*        {product.details.map((detail) => (*/}
                    {/*            <Disclosure as="div" key={detail.name}>*/}
                    {/*                {({open}) => (*/}
                    {/*                    <>*/}
                    {/*                        <h3>*/}
                    {/*                            <Disclosure.Button*/}
                    {/*                                className="group relative flex w-full items-center justify-between py-6 text-left">*/}
                    {/*        <span*/}
                    {/*            className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}*/}
                    {/*        >*/}
                    {/*          {detail.name}*/}
                    {/*        </span>*/}
                    {/*                                <span className="ml-6 flex items-center">*/}
                    {/*          {open ? (*/}
                    {/*              <MinusIcon*/}
                    {/*                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"*/}
                    {/*                  aria-hidden="true"*/}
                    {/*              />*/}
                    {/*          ) : (*/}
                    {/*              <PlusIcon*/}
                    {/*                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"*/}
                    {/*                  aria-hidden="true"*/}
                    {/*              />*/}
                    {/*          )}*/}
                    {/*        </span>*/}
                    {/*                            </Disclosure.Button>*/}
                    {/*                        </h3>*/}
                    {/*                        <Disclosure.Panel as="div" className="prose prose-sm pb-6">*/}
                    {/*                            <ul role="list">*/}
                    {/*                                {detail.items.map((item) => (*/}
                    {/*                                    <li key={item}>{item}</li>*/}
                    {/*                                ))}*/}
                    {/*                            </ul>*/}
                    {/*                        </Disclosure.Panel>*/}
                    {/*                    </>*/}
                    {/*                )}*/}
                    {/*            </Disclosure>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</section>*/}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;