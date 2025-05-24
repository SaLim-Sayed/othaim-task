"use client";

import { useEffect, useState } from "react";
import {
    Autocomplete,
    AutocompleteItem,
} from "@heroui/react";
import { useApiQuery } from "@/src/hooks/useApiQuery";
import { ProductResponse } from "@/src/@types/product";
import { useRouter } from "next/navigation";

interface Product {
    id: number;
    title: string;
    thumbnail: string;
}

export default function SearchAutocomplete() {
    const [query, setQuery] = useState("");
    const [initialResults, setInitialResults] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchInitialProducts = async () => {
            const res = await fetch("https://dummyjson.com/products?limit=5");
            const data = await res.json();
            setInitialResults(data.products);
        };

        fetchInitialProducts();
    }, []);

    const { data, isLoading: isProductsLoading } = useApiQuery<ProductResponse>({
        key: ["products", "search", query],
        url: `https://dummyjson.com/products/search?q=${query}`,
        enabled: query.length > 1,
    });

    const results: Product[] =
        query.length > 1 ? data?.products ?? [] : initialResults;

    return (
        <div className="max-w-md">
            <Autocomplete
                placeholder="Type to search..."
                inputValue={query}
                onInputChange={(value) => setQuery(value)}
                isLoading={isProductsLoading}
                items={results}
                variant="bordered"
                color="secondary"
                className="bg-white"
                classNames={{
                    listboxWrapper: "w-full",
                    listbox: "w-full",
                }}
                onSelectionChange={(key) => {
                    if (key) {
                        router.push(`/product/${key}`);
                    }
                }}
            >
                {(item) => (
                    <AutocompleteItem key={item.id}>
                        <div className="flex items-center gap-3">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-8 h-8 object-cover rounded"
                            />
                            <span>{item.title}</span>
                        </div>
                    </AutocompleteItem>
                )}
            </Autocomplete>
        </div>
    );
}
