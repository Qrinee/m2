import React from 'react';

export default function RateSection() {
  return (
    <div>
      <div
        className="elementor-background-video-container"
        aria-hidden="true"
        data-vimeo-initialized="true"
      >
        <div className="elementor-background-video-embed"></div>
        <iframe
          src="https://player.vimeo.com/video/188654636?muted=1&autoplay=1&loop=1&background=1&app_id=122963"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Raw footage for Lillo Gård - Interior"
          data-ready="true"
          className="elementor-background-video-embed"

        ></iframe>
      </div>

      <h2>Opinie mówią same za siebie</h2>
    </div>
  );
}
