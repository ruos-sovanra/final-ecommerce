import {ecommerceApi} from "@/redux/api";


export const productApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation<any, {name: string, description: string, price: number, quantity: number, categoryName: string, brandName: string, image: string}>({
            query: ({name, description, price, quantity, categoryName, brandName, image}) => ({
                url: `/products`,
                method: 'POST',
                body: { name, description, price, quantity, categoryName, brandName, image }
            }),
        }),

        updateProduct: builder.mutation<any, {uuid: string, name: string, description: string, price: number, quantity: number, categoryName: string, brandName: string, image: string}>({
            query: ({uuid, name, description, price, quantity, categoryName, brandName, image}) => ({
                url: `/products/${uuid}`,
                method: 'PUT',
                body: { name, description, price, quantity, categoryName, brandName, image }
            }),
        }),

        deleteProduct: builder.mutation<any, {uuid: string}>({
            query: ({uuid}) => ({
                url: `/products/${uuid}`,
                method: 'DELETE',
            }),
        }),


    })
})

export const { useCreateProductMutation,useUpdateProductMutation,useDeleteProductMutation } = productApi;