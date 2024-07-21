import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request,{params}:{params: {id: string}}) {
    const id = params.id;
    try {
        const deliveryPerson = await db.select({id: deliveryPersons.id,name: deliveryPersons.name, phone: deliveryPersons.phone,warehouse: warehouses.name}).from(deliveryPersons).where(eq(deliveryPersons.id, Number(id))).leftJoin(warehouses,eq(deliveryPersons.warehouseId,warehouses.id)); 
        if(!deliveryPerson.length)
            return Response.json({message: `Delivery person not found with given id: ${id}`},{status: 500});
        return Response.json(deliveryPerson[0], {status: 200});
    } catch (error) {
        return Response.json({message: "Failed to fetch the warehouse"},{status: 500});
    }

}