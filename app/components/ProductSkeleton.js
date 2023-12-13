export default function ProductSkeleton() {
  return (
    <article
      className="product-card flex flex-col w-full h-full rounded-2xl text-left transform transition hover:scale-105 animate-pulse"
    >
      <div
        className="product-image flex bg-white w-full h-auto items-center justify-center rounded-lg relative"
      >
        <div className="h-full">

        </div>

        <span
          className="product-price absolute bg-white text-black font-semibold items-center px-2 py-1 rounded-lg bottom-0 right-0 m-4 text-sm"
        >

        </span>

        <span className="product-dimension absolute left-0 bottom-0 m-4 px-2 py-1 rounded-lg bg-white text-black font-semibold text-xs">
         
        </span>
      </div>

      <div className="product-details flex flex-col justify-between border-2 border-solid border-primary border-t-0 px-3 py-2 my-0 rounded-b-lg h-full min-h-[4.5rem] pb-5 md:pb-0">
        <div
          className="text-slate-900 dark:text-slate-100  product-name flex text-xl 2xl:text-lg text-left hover:underline "
        >
          
        </div>
      </div>
    </article>
  );
}
