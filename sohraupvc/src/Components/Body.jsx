import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Body.css";
import UpvcImage from "./logo/upvc.png";
import BrochurePDF from "./logo/sohra-brochure-12-pages.pdf";

// Vimeo video ID
const VIMEO_ID = "1120800744";

// Load Vimeo Player SDK (no npm needed)
const loadVimeoPlayer = () =>
  new Promise((resolve, reject) => {
    if (window.Vimeo?.Player) return resolve(window.Vimeo.Player);
    const s = document.createElement("script");
    s.src = "https://player.vimeo.com/api/player.js";
    s.onload = () => resolve(window.Vimeo.Player);
    s.onerror = () => reject(new Error("Failed to load Vimeo SDK"));
    document.head.appendChild(s);
  });

const Body = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const modalWrapRef = useRef(null);
  const modalPlayerRef = useRef(null);
  const navigate = useNavigate();

  // Prevent scroll when video is open
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  // Build Vimeo player
  useEffect(() => {
    let p;
    (async () => {
      if (!showModal || !modalWrapRef.current) return;
      const VimeoPlayer = await loadVimeoPlayer();

      const modalIframe = document.createElement("iframe");
      modalIframe.setAttribute(
        "src",
        `https://player.vimeo.com/video/${VIMEO_ID}?autoplay=0&title=0&byline=0&portrait=0&controls=0&muted=${isMuted ? 1 : 0}`
      );
      modalIframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
      Object.assign(modalIframe.style, {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "12px",
      });

      modalWrapRef.current.innerHTML = "";
      modalWrapRef.current.appendChild(modalIframe);

      p = new VimeoPlayer(modalIframe);
      modalPlayerRef.current = p;

      try { await p.setMuted(isMuted); } catch {}
      try { await p.setPlaybackRate(speed); } catch {}

      p.on("play", () => setIsPlaying(true));
      p.on("pause", () => setIsPlaying(false));
    })();

    return () => {
      if (p) p.unload().catch(() => {});
    };
  }, [showModal, isMuted, speed]);

  const togglePlay = async () => {
    const p = modalPlayerRef.current;
    if (!p) return;

    try {
      const paused = await p.getPaused();
      paused ? await p.play() : await p.pause();
      setIsPlaying(!paused);
    } catch {}
  };

  const setRate = async (r) => {
    setSpeed(r);
    try { await modalPlayerRef.current?.setPlaybackRate(r); } catch {}
  };

  const toggleMute = async () => {
    try {
      const m = await modalPlayerRef.current?.getMuted();
      await modalPlayerRef.current?.setMuted(!m);
      setIsMuted(!m);
    } catch {}
  };

  const enterFullscreen = () => {
    const el = document.querySelector(".video-content-container");
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el?.requestFullscreen?.();
  };

  return (
    <div className="body-section">
      <div className="body-left">
        <h1 className="body-title">Bringing Comfort and Clarity to Every Space</h1>
        <p className="body-description">
          Sohra UPVC Industries delivers world-class UPVC doors and windows,
          combining durability with elegant design.
        </p>

        <div className="button-row">
          <button
            className="learn-more-btn"
            onClick={() => navigate("/productsredirect")}
          >
            Explore Our Products
          </button>

          <button className="company-story-btn" onClick={() => setShowModal(true)}>
            Discover Our Story
          </button>

          {/* ✅ Only download brochure remains */}
          <a
            className="brochure-download-link"
            href={BrochurePDF}
            download
            target="_blank"
            rel="noreferrer"
          >
            Download Brochure
          </a>
        </div>
      </div>

      <div className="body-right">
        <img src={UpvcImage} alt="UPVC Door and Windows" className="door-window-img" />
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="video-modal" onClick={() => setShowModal(false)}>
          <div className="video-content-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <div className="modal-aspect">
              <div className="modal-player-inner" ref={modalWrapRef} />
            </div>

            <div className="modal-controls">
              <button className="ctl" onClick={togglePlay}>
                {isPlaying ? "Pause" : "Play"}
              </button>

              <div className="divider" />
              <span className="label">Speed</span>
              <button className="ctl" onClick={() => setRate(1)}>1×</button>
              <button className="ctl" onClick={() => setRate(2)}>2×</button>
              <button className="ctl" onClick={() => setRate(3)}>3×</button>

              <div className="divider" />
              <button className="ctl" onClick={toggleMute}>
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <div className="spacer" />
              <button className="ctl highlight" onClick={enterFullscreen}>
                Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
