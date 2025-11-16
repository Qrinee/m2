import { useEffect } from "react";

export default function TikTokEmbed({ videoId }) {
  useEffect(() => {
    // jeśli skrypt już istnieje, nie dokładaj drugiego
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
      };
    } else {
      // skrypt już jest → załaduj embed ponownie
      if (window.tiktokEmbedLoad) window.tiktokEmbedLoad();
    }
  }, [videoId]);

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/@m2notarialnie/video/${videoId}?autoplay=0`}
      data-video-id={videoId}
      style={{ maxWidth: "605px", minWidth: "325px" }}
    >
      <section></section>
    </blockquote>
  );
}
