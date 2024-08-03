import { z } from "zod";

export const isServer = typeof window === "undefined";

export const productSchema = z.object({
    name: z.string({message: "Product name should be a string"}).min(3, {message: "Product name should be at least 3 character"}),
    description: z.string({message: "Product description should be a string"}).min(8, {message: "Product description should be at least 8 character"}),
    image: z.instanceof( isServer ? File : FileList, {message: `Product image should be a file`}),
    price: z.number({message: "Product price should be a number"}),
})