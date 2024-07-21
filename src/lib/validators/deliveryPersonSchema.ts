import { z } from "zod";

export const deliveryPersonSchema = z.object({
    name: z.string({message: "Warehouse name should be a string"}),
    phone: z.string({message: "Phone number should be a string"}).length(13,{message: "Phone number should be 13 characters"}),
    warehouseId: z.number({message: "Warehouse id should be a number"}),
})