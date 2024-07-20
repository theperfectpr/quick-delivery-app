import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request,{params}:{params: {id: string}}) {
    const id = params.id;
    try{
        const product = await db.select().from(products).where(eq(products.id,Number(id))).limit(1);
        if(!product.length)
            return Response.json({message: "Product not found"},{status: 500});
        return Response.json(product[0], {status: 200});
    }
    catch(error){
        return Response.json({message: "Failed to fetch the product with the given id"},{status: 400});
    }
}