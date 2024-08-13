import {ecommerceApi} from "@/redux/api";


export const categoryApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation<any, {name: string, image: string}>({
            query: ({name, image}) => ({
                url: `/categories`,
                method: 'POST',
                body: { name, image }
            }),
        }),

        updateCategory: builder.mutation<any, {uuid:string,name: string, image: string}>({
            query: ({name, image,uuid}) => ({
                url: `/categories/${uuid}`,
                method: 'PUT',
                body: { name, image }
            }),
        }),

        deleteCategory: builder.mutation<any, {uuid: string}>({
            query: ({uuid}) => ({
                url: `/categories/${uuid}`,
                method: 'DELETE',
            }),
        }),




    })
})

export const { useCreateCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation } = categoryApi;