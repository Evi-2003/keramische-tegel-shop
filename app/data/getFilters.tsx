'use server';
import { redirect } from "next/navigation"

export default async function getFilters(formdata : FormData, path : string, searchParams: string){
    const params = new Map();

    Array.from(formdata.entries()).forEach(([key, value]) => {
        if (params.has(key)) {
            params.set(key, [...params.get(key), value]);
        } else {
            params.set(key, [value]);
        }
    });

    const paramString = Array.from(params.entries())
        .map(([key, values]) => `${key}=${values.map(value => encodeURIComponent(value).replace(/%20/g, '+')).join(',')}`)
        .join('&');
    console.log(paramString)
    redirect(path + '?' + paramString);
}