// src/YouTubePlayer.jsx
import { useEffect, useRef } from "react";

function YouTubePlayer({ videoId, autoplay = false }) {
  const playerRef = useRef(null);

  // If no videoId, show fallback
  if (!videoId) {
    return (
      <div className="video-thumb">
        Video not available
      </div>
    );
  }

  useEffect(() => {
    // Wait for YouTube API to be loaded
    if (!window.YT || !videoId) return;

    // Create new YouTube player
    const player = new window.YT.Player(playerRef.current, {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: {
        rel: 0,           // Don't show related videos at end
        autoplay: autoplay ? 1 : 0, // Autoplay if needed
        modestbranding: 1, // Hide YouTube logo
        showinfo: 0,       // Hide video title and uploader
        controls: 1,       // Show player controls
        disablekb: 0,      // Allow keyboard controls
        playsinline: 1,    // Play inline on mobile
      },
      events: {
        onReady: (event) => {
          if (autoplay) {
            event.target.playVideo();
          }
        },
        onError: (event) => {
          console.error("YouTube Player Error:", event.data);
        },
      },
    });
  }, [videoId, autoplay]);

  return (
    <div
      ref={playerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
}

export default YouTubePlayer;