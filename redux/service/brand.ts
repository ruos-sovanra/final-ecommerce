import {ecommerceApi} from "@/redux/api";


export const brandApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        createBrand: builder.mutation<any, {name: string}>({
            query: ({name}) => ({
                url: `/brands`,
                method: 'POST',
                body: { name }
            }),
        }),

        updateBrand: builder.mutation<any, {uuid:string,name: string}>({
            query: ({name,uuid}) => ({
                url: `/brands/${uuid}`,
                method: 'PUT',
                body: { name }
            }),
        }),

        deleteBrand: builder.mutation<any, {uuid: string}>({
            query: ({uuid}) => ({
                url: `/brands/${uuid}`,
                method: 'DELETE',
            }),
        }),




    })
})

export const { useCreateBrandMutation,useUpdateBrandMutation,useDeleteBrandMutation} = brandApi;