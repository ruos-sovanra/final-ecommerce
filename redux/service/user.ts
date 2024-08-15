import {ecommerceApi} from "@/redux/api";
import {any} from "prop-types";


export const userApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        getUser: builder.query<any,void>(
            {
                query: () => ({
                    url: `/users/current`,
                    method: 'GET',
                }),
            }
        ),

    })
})

export const {useGetUserQuery} = userApi;