import { redirect, useSearchParams } from "next/navigation"
export default async function filterBar() {
    const getFilters = async (formData : FormData) => {
        'use server';
        const afmetingen = formData.getAll('afmetingen')
        const params = new URLSearchParams([
          ['afmetingen', afmetingen.join(',')]
        ])
        redirect('/shop?' + params)
    };
    return(
      <form action={getFilters} className="flex flex-col text-black">
        <label htmlFor="afmetingen" className="text-lg">Afmetingen</label>
        <select name="afmetingen" className="py-1 px-5 shadow-lg">
          <option value="80 x 80 x 2cm">80 x 80 x 2cm</option>
          <option value="80 x 80 x 3cm">80 x 80 x 3cm</option>
        </select>
        <button type="submit" className="bg-[--primary] rounded-lg text-slate-100 text-lg my-2 py-1 px-5 shadow-sm hover:shadow-lg hover:scale-95">Zoeken</button>
      </form>

    );
}