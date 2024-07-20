import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request,{params}:{params: {id: string}}) {
    const id = params.id;
    try {
     const warehouse = await db.select().from(warehouses).where(eq(warehouses.id,Number(id)));
     if(!warehouse.length)  
         return Response.json({message: "Warehouse not found"},{status: 500});
     return Response.json(warehouse[0],{status: 200});   
    } catch (error) {
        return Response.json({message: "Failed to fetch the warehouse"},{status: 500});
    }
}