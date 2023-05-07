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

export const splittingPriceNumber = (price) => {
    let splittingNum = "";
    let countDigit = 0;
    for (let i = price.length - 1; i >= 0; i--) {
        if (countDigit > 2) {
            countDigit = 0;
            splittingNum = ',' + splittingNum;
        }
        splittingNum = price[i] + splittingNum;
        countDigit++;
    }
    return splittingNum;
}
