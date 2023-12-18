import ShoppingCart from "../components/ShoppingCart";
import AfrekenenForm from "../components/AfrekenenForm";
import makeOrder from "../checkout/makeOrder.js";
import { useShoppingCart } from "use-shopping-cart";
import { PageWrapper } from "../components/pageWrapper.tsx";
export const metadata = {
  title: "Winkelmand - Keramische Tegel Shop",
  description: "Winkelmand Keramische Tegel Shop",
};
export default function Winkelmand() {
  return (
    <PageWrapper className="w-4/5 lg:w-2/3 text-3xl text-slate-900 font-bold dark:text-slate-100 m-5 text-center flex space-x-10">
      <section className="w-1/2">
        <ShoppingCart />
      </section>
      <AfrekenenForm />
    </PageWrapper>
  );
}
