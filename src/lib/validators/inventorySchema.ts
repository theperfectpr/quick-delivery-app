import { z } from "zod";

export const inventorySchema = z.object({
    sku: z.string({message: "SKU should be a string"}).length(8,{message: "SKU should be 8 characters"}),
    warehouseId: z.number({message: "Warehouse id should be a number"}),
    productId: z.number({message: "Product id should be a number"}),
})