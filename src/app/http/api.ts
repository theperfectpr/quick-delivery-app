import { api } from "./client";

export const getAllProducts = async () => {
    const response = await api.get("/products");
    return response.data;//axios adds a data property to the response object with the data from the API
}

export const createProduct = async (data: FormData) => {
    const response = await api.post("/products", data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}