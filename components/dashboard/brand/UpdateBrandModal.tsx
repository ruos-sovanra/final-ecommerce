'use client';
import {Field, Form, Formik} from "formik";
import {useUpdateProductMutation} from "@/redux/service/product";
import {useUploadFileMutation} from "@/redux/service/upload";
import {ChangeEvent, useEffect, useState} from "react";
import Image from "next/image";
import {MdAddPhotoAlternate} from "react-icons/md";
import {useUpdateCategoryMutation} from "@/redux/service/category";
import {useUpdateBrandMutation} from "@/redux/service/brand";



type FormValues = {
    uuid?: string;
    name: string;
};

type UpdateProductProp = {
    isOpen: boolean;
    onClose: () => void;
    product: FormValues | null;
};




const UpdateBrandModal = ({ isOpen, onClose,product }:UpdateProductProp) => {

    const [initialValues, setInitialValues] = useState<FormValues>({
        name: ''
    });
    const [updateBrand] = useUpdateBrandMutation();

    const uuid = product?.uuid;


    useEffect(() => {
        if (product) {
            setInitialValues({
                name: product.name || ''
            });
        }
    }, [product]);


    const handleSubmit = async (values: FormValues) => {


        try {
            const response = await updateBrand({uuid: uuid ?? '',name: values.name});
            console.log("Response", response);
            onClose();
        }catch (error) {
            console.error(error);
        }


    }



    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Update Category</h2>
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
                                                   className="block text-sm font-medium leading-6 text-gray-900">Category
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

export default UpdateBrandModal;