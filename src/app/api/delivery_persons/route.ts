import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request){
    const requestData = await req.json();
    let validatedData;
    try {
        validatedData = deliveryPersonSchema.parse(requestData);
    } catch (error) {
        return Response.json({message: error},{status: 400});
    }
    try {
        await db.insert(deliveryPersons).values(validatedData);
        return Response.json({message: "Delivery person created successfully", data: validatedData}, {status: 201});
    } catch (error) {
        return Response.json({message: "Failed to create the delivery person"}, {status: 500});
    }
}

export async function GET(){
    try {
        const allDeliveryPersons = await db.select({id: deliveryPersons.id,name: deliveryPersons.name, phone: deliveryPersons.phone,warehouse: warehouses.name}).from(deliveryPersons).leftJoin(warehouses,eq(deliveryPersons.warehouseId, warehouses.id)).orderBy(desc(deliveryPersons.id));
        return Response.json({message: "Fetched all delivery persons successfully", data: allDeliveryPersons}, {status: 200});
    } catch (error) {
        return Response.json({message: "Failed to fetch the delivery persons"}, {status: 500});
    }
}