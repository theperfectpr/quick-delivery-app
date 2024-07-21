import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request) {
    const requestData = await req.json();
    let validatedData;
    try {
        validatedData = await inventorySchema.parse(requestData);
    } catch (error) {
        return Response.json({message: error},{status: 400});
    }
    try {
        await db.insert(inventories).values(validatedData);
        return Response.json({message: "Inventory created successfully", data: validatedData}, {status: 201});
    } catch (error) {
        return Response.json({message: "Failed to create the inventory"}, {status: 500});
    }
}

export  async function GET(){
    try {
        const allInventories = await db.select({id: inventories.id, sku: inventories.sku, warehouse: warehouses.name, product: products.name}).from(inventories).leftJoin(warehouses,eq(inventories.warehouseId,warehouses.id)).leftJoin(products,eq(inventories.productId,products.id)).orderBy(desc(inventories.id));
        return Response.json({message: "Fetched all inventories successfully", data: allInventories}, {status: 200});
    } catch (error) {
        return Response.json({message: "Failed to fetch the inventories"},{status: 500});
    }
}