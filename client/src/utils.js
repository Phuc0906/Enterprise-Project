import {useEffect} from "react";

export async function urlToBlob(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
}

export async function urlToFile(url, mimeType) {
    const blob = await urlToBlob(url);
    const file = new File([blob], 'image1.png' ,  { type: mimeType });
    return file;
}

export const getAuthHeaders = (authToken: string) => {
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", authToken);
    return headers;
};

export const userNavContent = [
    { name: "Home", page: "/" },
    { name: "Products", page: "/products" }
]

export const shopNavContent = [
    {name: "Dashboard", page: "/shop/dashboard"},
    {name: "Product", page: "/shop/product"}
]
