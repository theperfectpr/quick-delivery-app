import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";

export async function POST(req: Request) {
    const data = await req.formData();
    let validatedData;
    try {
        validatedData = productSchema.parse({
            name: data.get("name"),
            image: data.get("image"),
            description: data.get("description"),
            price: Number(data.get("price")),
        });
    } catch (error) {
        return Response.json({message: error},{status: 400});
    }
    const fileName = `${Date.now()}.${validatedData.image.name.split(".").slice(-1)}`;
    
    try {
        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public/assets",fileName), buffer);

    } catch (error) {
        return Response.json({message: "Failed to save the file to fs"},{status: 500});
    }
    try {
        await db.insert(products).values({ ...validatedData, image: fileName})
    } catch (error) {
        await unlink(path.join(process.cwd(), "public/assets",fileName));
        return Response.json({message: "Failed to store the product in the database"},{status: 500});
    }
    return Response.json({message: "Product added successfully"}, {status: 201});
}