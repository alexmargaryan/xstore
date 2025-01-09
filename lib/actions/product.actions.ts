"use server";

import { prisma } from "@/db/prisma";
import { Product } from "@prisma/client";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

type ProductType = Omit<Product, "price" | "rating"> & {
  price: string;
  rating: string;
};

export async function getLatestProducts(): Promise<ProductType[]> {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findUnique({
    where: { slug },
  });

  if (!data) return null;

  return convertToPlainObject(data);
}
