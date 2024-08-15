import {ecommerceApi} from "@/redux/api";
import {any} from "prop-types";


export const orderApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        createOrder: builder.mutation<any, {uuid: string}>({
            query: ({uuid}) => ({
                url: `/orders`,
                method: 'POST',
                body: { uuid }
            }),
        }),

        getOrder: builder.query<any,void>(
            {
                query: () => ({
                    url: `/orders/user`,
                    method: 'GET',
                }),
            }
        ),

        updateOrderQuantity: builder.mutation<any, {uuid:string,quantity: number}>({
            query: ({uuid,quantity}) => ({
                url: `/orders/${uuid}/quantity`,
                method: 'PATCH',
                body: { quantity }
            }),
        }),

        deleteOrder: builder.mutation<any, {uuid: string}>({
            query: ({uuid}) => ({
                url: `/orders/${uuid}`,
                method: 'DELETE',
            }),
        }),




    })
})

export const { useCreateOrderMutation,useUpdateOrderQuantityMutation,useDeleteOrderMutation,useGetOrderQuery} = orderApi;