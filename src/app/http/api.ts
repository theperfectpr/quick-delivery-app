import { api } from "./client";

export const getAllProducts = async () => {
    const response = await api.get("/products");
    return response.data;//axios adds a data property to the response object with the data from the API
}