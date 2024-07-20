import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(request: Request) {
    const body = await request.json();
    let validatedData;
    try {
        validatedData = warehouseSchema.parse({
            name: body.name,
            pincode: body.pincode,
        });
    } catch (error) {
        return Response.json({message: error},{status: 400});
    }
    try{
        await db.insert(warehouses).values(validatedData);
    }
    catch(error){
        return Response.json({message: "Failed to store the warehouse in the database"},{status: 500});
    }

    return Response.json({message: "Warehouse created successfully", data: validatedData}, {status: 200});
}

export async function GET(){
    try{
        const allWarehouses = await db.select().from(warehouses);
        return Response.json(allWarehouses,{status: 200});
    }
    catch(error){
        return Response.json({message: "Failed to fetch the warehouses"},{status: 500});
    }
}