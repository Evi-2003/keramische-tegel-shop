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
  // any other options from the global
  // confetti function
});
  return (
    <main className="p-5 text-5xl font-semibold text-center h-[80vh] flex flex-col items-center justify-center">
      <h1>Yes! Je bestelling is geplaatst!</h1>
      <h2 className="text-2xl">Bedankt voor je bestelling. Je ontvangt straks een bevestiging.</h2>
      <iframe className="rounded-lg mt-5" src="https://open.spotify.com/embed/track/3jFnYU30fibZbOE9y4wPQx?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </main>
  )
}
