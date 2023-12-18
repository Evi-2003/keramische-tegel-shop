"use client";
import Script from "next/script";

export default function HomePage() {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
                <script defer src="https://www.5sterrenspecialist.nl/review-carousel.js" id="5ss-review-carousel-script" data-host="https://www.5sterrenspecialist.nl" data-template="https://www.5sterrenspecialist.nl/widget.html?hash=43db16322af3ee96ea945c67bd694b71&type=review-carousel&webshop-or-regular=regular&orientation=landscape&logo-color=black&background=white&border=1"></script>
              `,
        }}
      />
    </div>
  );
}
