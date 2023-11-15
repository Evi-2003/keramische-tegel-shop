"use client";
import { usePathname, useSearchParams } from "next/navigation"
import getFilters from "../data/getFilters.tsx"
export default function filterBar(path: string) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname()
  function sendFilters(formdata: FormData) {
    getFilters(formdata, pathname, searchParams)
  }
    return(
      <form action={sendFilters}  className=" flex flex-col text-black space-y-1">
        <span className="text-lg">Afmetingen</span>
        <select name="afmetingen" className="py-1 px-5 shadow-lg">
          <option value="80 x 80 x 2cm">80 x 80 x 2cm</option>
          <option value="80 x 80 x 3cm">80 x 80 x 3cm</option>
        </select>
        <span className="text-lg">Fabrikanten</span>
        <fieldset className="grid items-center">
          <input className="col-start-1" type="checkbox" value="MBI" name="fabrikant"/>
          <label className="w-fit col-start-2" htmlFor="mbi">MBI</label>
          <input className="col-start-1" type="checkbox" value="Gardenlux" name="fabrikant"/>
          <label className="w-fit col-start-2" htmlFor="gardenlux" >Gardenlux</label>
        </fieldset>
        <button type="submit" className="bg-[--primary] rounded-lg text-slate-100 text-lg my-2 py-1 px-5 shadow-sm hover:shadow-lg hover:scale-95">Zoeken</button>
      </form>

    );
}