'use server';
import { redirect } from "next/navigation"
export default async function optionsUrl(path, searchParams, option, value){
  console.log(path)
  const params = new URLSearchParams(searchParams)
  params.set(option, value)
    redirect(path + '?' + params)
  }