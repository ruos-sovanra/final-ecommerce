import {ecommerceApi} from "@/redux/api";

export const uploadApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({

        uploadFile: builder.mutation<any, {file: File}>({
            query: ({file}) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `/files`,
                    method: 'POST',
                    body: formData
                };
            },
        }),

        uploadMultipleFiles: builder.mutation<any, {files: File[]}>({
            query: ({files}) => {
                const formData = new FormData();
                files.forEach((file) => {
                    formData.append('files', file);
                });

                return {
                    url: `/files/multiple`,
                    method: 'POST',
                    body: formData
                };
            },
        }),




    }),
    overrideExisting: false,
});

export const {useUploadFileMutation,useUploadMultipleFilesMutation} = uploadApi;
