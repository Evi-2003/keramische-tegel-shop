'use server';
import { redirect } from "next/navigation"
export default async function optionsUrl(connection, path, searchParams, option, value, push){
  const params = new URLSearchParams(searchParams)
  params.set(option, value)
  console.log(push)
  redirect(connection + process.env.NEXT_PUBLIC_DOMAIN + '/' + path + '?' + params, push)
} 