import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import "./ModularForBusiness.css";

const ModularForBusiness = ({ cards = defaultCards }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="modular-business">
      <div className="m-container">
        <h2 className="section-titled">Budynki modułowe dla Twojej branży</h2>
        
        <div className="business-grid">
          {cards.map((card, index) => (
            <div 
              key={card.id || index} 
              className="business-card"
              style={{ backgroundImage: `url(${card.image})` }}
            >
              <button 
                className="circular-video-btn"
                onClick={() => openVideo(card.videoId)}
              >
                <div className="circular-text">
                  <svg viewBox="0 0 100 100" width="100" height="100">
                    <defs>
                      <path
                        id={`circlePath-${card.id || index}`}
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text fontSize="12" fill="#d43737ff" fontWeight="bold">
                      <textPath href={`#circlePath-${card.id || index}`} startOffset="0%">
                        OBEJRZYJ VIDEO • OBEJRZYJ VIDEO •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="play-icon-center">
                  <FaPlay className="play-icon" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeVideo}>×</button>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const defaultCards = [
  {
    id: 1,
    title: "Gastronomia",
    image: "gastronomia-bg.jpg",
    videoId: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Handel",
    image: "handel-bg.jpg", 
    videoId: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Biura",
    image: "biura-bg.jpg",
    videoId: "dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Turystyka",
    image: "turystyka-bg.jpg",
    videoId: "dQw4w9WgXcQ"
  },
];

export default ModularForBusiness;