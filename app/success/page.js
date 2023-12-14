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
    <main className="p-5 text-5xl font-semibold text-center h-[80vh] flex flex-col items-center justify-center">
      <h1>Yes! Je bestelling is geplaatst!</h1>
      <h2 className="text-2xl">Bedankt voor je bestelling. Je ontvangt straks een bevestiging.</h2>
      
    </main>
  )
}
