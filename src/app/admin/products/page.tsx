"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/app/http/api";
import { Product } from "@/types";
import { columns } from "./columns";
import ProductSheet from "./product-sheet";
import { useNewProduct } from "@/app/store/product/store";

const ProductsPage = () => {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { onOpen } = useNewProduct();
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"} variant={"outline"} onClick={onOpen}>
          Add Product
        </Button>
        <ProductSheet />
      </div>
      <DataTable columns={columns} data={products || []} />
    </>
  );
};

export default ProductsPage;
