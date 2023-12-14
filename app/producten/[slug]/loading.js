export default function Loading() {
  return (
    <>
      <section className="w-4/5 lg:w-9/12 2xl:w-4/6 my-5 mx-5 h-screen animate-pulse">
        <article className="flex flex-col md:grid grid-cols-1 h-96 lg:grid-cols-5 w-full lg:p-6 items-center shadow-md hover:shadow-lg border-2 border-solid border-primary rounded-lg dark:text-slate-100 py-5 animate-pulse bg-gradient-to-r from-slate-100 to-sky-100 dark:from-slate-900 dark:to-[--primary]">
          <aside className="row-start-2 grid grid-cols-2 auto-rows-min tempalte-col lg:row-start-1 lg:col-start-3 lg:col-span-3 mx-10 justify-start self-start text-left space-y-1 rounded-lg"></aside>
        </article>

        <section className="dark:text-slate-100 md:space-x-5 w-full flex md:flex-row flex-col">
          <section className="h-86 overflow-auto flex-1 inline-flex items-center shadow-md hover:shadow-lg border-2 border-solid border-primary p-10 rounded-lg mt-5 flex-col justify-items-center md:w-2/3 animate-pulse bg-gradient-to-r from-slate-100 to-sky-100 dark:from-slate-900 dark:to-[--primary]"></section>

          <section className="md:w-1/3 h-96 md:h-auto inline-flex items-center p-10 rounded-lg mt-5 flex-col justify-items-center shadow-md hover:shadow-lg border-2 border-solid border-primary relative animate-pulse bg-gradient-to-r from-slate-100 to-sky-100 dark:from-slate-900 dark:to-[--primary]">

            <article className="h-36 bg-gradient-to-r from-slate-100 to-sky-100 dark:from-slate-900 dark:to-[--primary]"></article>
          </section>
        </section>

        <section className="overflow-auto flex-1 flex items-center p-10 rounded-lg w-full mt-5 flex-col justify-items-center shadow-md hover:shadow-lg border-2 border-solid border-primary animate-pulse bg-gradient-to-r from-slate-100 to-sky-100 dark:from-slate-900 dark:to-[--primary]"></section>
      </section>
    </>
  );
}
