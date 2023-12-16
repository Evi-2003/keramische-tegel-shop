'use client'
import confetti from 'canvas-confetti'
export default function SuccessPage() {
  const main = document.querySelector('h1')
var myConfetti = confetti.create(main, {
  resize: true,
  useWorker: true
});
myConfetti({
  particleCount: 300,
  spread: 320
});
  return (
    <main className="p-5 text-5xl font-semibold text-center h-[60vh] dark:text-slate-100 flex flex-col items-center justify-center gap-y-2">
      <h1>Je bestelling is geplaatst!</h1>
      <h2 className="text-2xl">Bedankt voor je bestelling. Je ontvangt straks een bevestiging.</h2>
      <span className='text-xl'>Vragen over de bestelling? Neem contact op via <a href='tel:0317 765 005' className='hover:scale-95 underline underline-offset-4'>0317 765 005</a></span>
      
    </main>
  )
}
