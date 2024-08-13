'use client';
import {Field, Form, Formik} from "formik";
import {useUpdateProductMutation} from "@/redux/service/product";
import {useUploadFileMutation} from "@/redux/service/upload";
import {ChangeEvent, useEffect, useState} from "react";
import Image from "next/image";
import {MdAddPhotoAlternate} from "react-icons/md";



type FormValues = {
    uuid?: string;
    name: string;
    description: string;
    categoryName: string;
    brandName: string;
    price: number;
    quantity: number;
    image: string;
};

type UpdateProductProp = {
    isOpen: boolean;
    onClose: () => void;
    product: FormValues | null;
};



type Category = {
    id: string;
    name: string;
}

type Brand = {
    id: string;
    name: string;
}


const UpdateProductModal = ({ isOpen, onClose,product }:UpdateProductProp) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [initialValues, setInitialValues] = useState<FormValues>({
        name: '',
        description: '',
        categoryName: '',
        brandName: '',
        price: 0,
        quantity: 0,
        image: ''
    });
    const [updateProduct] = useUpdateProductMutation();
    const [uploadFile] = useUploadFileMutation();

    const uuid = product?.uuid;


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setFile(file);
            console.log("File", file);

            // Create an object URL for the file
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    }
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories?page=0&size=100`);
            const data = await res.json();
            setCategories(data.results);
            console.log(categories);
            return categories;
        } catch (error) {
            console.error(error);
        }
    }

    const fetchBrands = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`);
            const data = await res.json();
            setBrands(data.payload);
            return categories;
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        fetchProducts();
        fetchBrands();
    }, []);

    useEffect(() => {
        if (product) {
            setInitialValues({
                name: product.name || '',
                description: product.description || '',
                categoryName: product.categoryName || '',
                brandName: product.brandName || '',
                price: product.price || 0,
                quantity: product.quantity || 0,
                image: product.image || ''
            });
        }
    }, [product]);


    const handleSubmit = async (values: FormValues) => {
        let res;
        if (file !== null) {
            res = await uploadFile({file});
        }
        const images = res?.data?.payload?.fullUrl;

        try {
            const response = await updateProduct({uuid: uuid ?? '',name: values.name, description: values.description, price: values.price, quantity: values.quantity, categoryName: values.categoryName, brandName: values.brandName, image: images});
            console.log("Response", response);
            onClose();
        }catch (error) {
            console.error(error);
        }

        console.log("Upload file response", res);

    }



    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add User</h2>
                <div className="container mx-auto">
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {({setFieldValue}) => (
                            <Form>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <div className="col-span-full">
                                            <label htmlFor="name"
                                                   className="block text-sm font-medium leading-6 text-gray-900">Product
                                                Name</label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="description"
                                                   className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                            <div className="mt-2">
                                                <Field
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="categoryName"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                                <div className="mt-2">
                                                    <Field
                                                        as="select"
                                                        id="categoryName"
                                                        name="categoryName"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option value="">Select a category</option>
                                                        {categories.map((category,index) => (
                                                            <option key={index} value={category.name}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="brandName"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Brand</label>
                                                <div className="mt-2">
                                                    <Field
                                                        as="select"
                                                        id="brandName"
                                                        name="brandName"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option value="">Select a brand</option>
                                                        {brands.map((brand,index) => (
                                                            <option key={index} value={brand.name}>
                                                                {brand.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="price"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                                <div className="mt-2">
                                                    <Field
                                                        type="number"
                                                        name="price"
                                                        id="price"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="quantity"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                                                <div className="mt-2">
                                                    <Field
                                                        type="number"
                                                        name="quantity"
                                                        id="quantity"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-1 md:col-span-2 col-span-2">
                                            <div className="grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                                                <label
                                                    htmlFor="cover-photo"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Cover photo
                                                </label>
                                                {!previewImage && (
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="mt-2 flex justify-center rounded-md border border-dashed border-cblack-50 px-6 py-6 cursor-pointer"
                                                    >
                                                        <div className="text-center text-cblack-80 text-xs">
                                                            {/* Icon and text indicating to upload a file */}
                                                            <div className="mt-3 flex flex-col leading-4">
                                                                <MdAddPhotoAlternate
                                                                    className="mx-auto h-12 w-12 text-gray-300"
                                                                    aria-hidden="true"
                                                                />
                                                                <span>Upload a file</span>
                                                                <p className="pl-1">or drag and drop</p>
                                                                <p>PNG, JPG, GIF up to 10MB</p>
                                                            </div>
                                                        </div>
                                                        {/* Hidden file input */}
                                                        <Field
                                                            id="file-upload"
                                                            name="poster"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                        />
                                                    </label>
                                                )}
                                                {previewImage && (
                                                    <div
                                                        className="mt-2 flex justify-center rounded-md border border-dashed border-cblack-50 p-2">
                                                        <Image
                                                            width={100}
                                                            height={200}
                                                            src={previewImage}
                                                            alt="Preview"
                                                            className="w-40 h-40 object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button"
                                            onClick={onClose}
                                            className="text-sm font-semibold leading-6 text-gray-900">Cancel
                                    </button>
                                    <button type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;