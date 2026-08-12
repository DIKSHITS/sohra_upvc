import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Body.css";

// =====================================================
// HERO IMAGES
// =====================================================

import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";

// =====================================================
// BROCHURE
// Change this path if your PDF is located somewhere else
// =====================================================

import BrochurePDF from "./logo/sohra-brochure-12-pages.pdf";

// =====================================================
// VIMEO VIDEO ID
// =====================================================

const VIMEO_ID = "1120800744";

// =====================================================
// HERO SLIDES
// =====================================================

const slides = [
  {
    image: hero1,
    tag: "Premium UPVC Solutions",
    title: (
      <>
        Bringing Comfort
        <br />
        and Clarity to
        <br />
        <span>Every Space</span>
      </>
    ),
    description:
      "Sohra UPVC Industries delivers world-class UPVC doors and windows, combining durability with elegant design.",
  },

  {
    image: hero2,
    tag: "Modern Window Solutions",
    title: (
      <>
        Designed for
        <br />
        Modern
        <br />
        <span>Living</span>
      </>
    ),
    description:
      "Beautiful, energy-efficient UPVC windows designed to bring natural light, comfort and lasting performance.",
  },

  {
    image: hero3,
    tag: "Premium Door Systems",
    title: (
      <>
        Style Meets
        <br />
        Strength in
        <br />
        <span>Every Detail</span>
      </>
    ),
    description:
      "Premium UPVC doors engineered for security, durability and timeless architectural elegance.",
  },
];

// =====================================================
// LOAD VIMEO PLAYER
// =====================================================

const loadVimeoPlayer = () =>
  new Promise((resolve, reject) => {
    // Already loaded
    if (window.Vimeo?.Player) {
      resolve(window.Vimeo.Player);
      return;
    }

    // Check if script is already loading
    const existingScript = document.querySelector(
      'script[src="https://player.vimeo.com/api/player.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.Vimeo?.Player) {
          resolve(window.Vimeo.Player);
        } else {
          reject(new Error("Vimeo Player SDK not available"));
        }
      });

      existingScript.addEventListener("error", () => {
        reject(new Error("Failed to load Vimeo SDK"));
      });

      return;
    }

    // Load Vimeo SDK
    const script = document.createElement("script");

    script.src = "https://player.vimeo.com/api/player.js";

    script.onload = () => {
      if (window.Vimeo?.Player) {
        resolve(window.Vimeo.Player);
      } else {
        reject(new Error("Vimeo Player SDK not available"));
      }
    };

    script.onerror = () => {
      reject(new Error("Failed to load Vimeo SDK"));
    };

    document.head.appendChild(script);
  });

// =====================================================
// BODY COMPONENT
// =====================================================

function Body() {
  const navigate = useNavigate();

  // =====================================================
  // SLIDER STATE
  // =====================================================

  const [activeSlide, setActiveSlide] = useState(0);

  // =====================================================
  // VIDEO MODAL STATE
  // =====================================================

  const [showModal, setShowModal] = useState(false);

  const [isMuted, setIsMuted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [speed, setSpeed] = useState(1);

  // =====================================================
  // VIDEO REFS
  // =====================================================

  const modalWrapRef = useRef(null);

  const modalPlayerRef = useRef(null);

  // =====================================================
  // AUTOMATIC SLIDER
  // =====================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // =====================================================
  // PREVENT PAGE SCROLL WHEN VIDEO OPEN
  // =====================================================

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    };
  }, [showModal]);

  // =====================================================
  // CREATE VIMEO PLAYER
  // =====================================================

  useEffect(() => {
    let player = null;

    const createPlayer = async () => {
      if (!showModal || !modalWrapRef.current) {
        return;
      }

      try {
        const VimeoPlayer = await loadVimeoPlayer();

        // Clear old iframe
        modalWrapRef.current.innerHTML = "";

        // =================================================
        // CREATE IFRAME
        // =================================================

        const iframe = document.createElement("iframe");

        iframe.src =
          `https://player.vimeo.com/video/${VIMEO_ID}` +
          `?autoplay=0` +
          `&title=0` +
          `&byline=0` +
          `&portrait=0` +
          `&controls=0` +
          `&muted=${isMuted ? 1 : 0}`;

        iframe.setAttribute(
          "allow",
          "autoplay; fullscreen; picture-in-picture"
        );

        iframe.setAttribute("allowfullscreen", "");

        Object.assign(iframe.style, {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "12px",
        });

        modalWrapRef.current.appendChild(iframe);

        // =================================================
        // CREATE PLAYER
        // =================================================

        player = new VimeoPlayer(iframe);

        modalPlayerRef.current = player;

        // =================================================
        // SET MUTE
        // =================================================

        try {
          await player.setMuted(isMuted);
        } catch (error) {
          console.log("Mute setting error:", error);
        }

        // =================================================
        // SET SPEED
        // =================================================

        try {
          await player.setPlaybackRate(speed);
        } catch (error) {
          console.log("Speed setting error:", error);
        }

        // =================================================
        // PLAYER EVENTS
        // =================================================

        player.on("play", () => {
          setIsPlaying(true);
        });

        player.on("pause", () => {
          setIsPlaying(false);
        });

        player.on("ended", () => {
          setIsPlaying(false);
        });
      } catch (error) {
        console.error("Vimeo Error:", error);
      }
    };

    createPlayer();

    // =================================================
    // CLEANUP
    // =================================================

    return () => {
      if (player) {
        player.unload().catch(() => { });
      }

      modalPlayerRef.current = null;
    };
  }, [showModal]);

  // =====================================================
  // NEXT SLIDE
  // =====================================================

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  // =====================================================
  // PREVIOUS SLIDE
  // =====================================================

  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // =====================================================
  // EXPLORE PRODUCTS
  // =====================================================

  const handleExploreProducts = () => {
    navigate("/Productsredirect");
  };

  // =====================================================
  // DISCOVER OUR STORY
  // =====================================================

  const handleDiscoverStory = () => {
    setIsMuted(false);
    setSpeed(1);
    setIsPlaying(false);
    setShowModal(true);
  };

  // =====================================================
  // DOWNLOAD BROCHURE
  // =====================================================

  const handleDownloadBrochure = () => {
    const link = document.createElement("a");

    link.href = BrochurePDF;

    link.download = "Sohra-UPVC-Brochure.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // =====================================================
  // CLOSE VIDEO
  // =====================================================

  const closeVideo = () => {
    setShowModal(false);
    setIsPlaying(false);
  };

  // =====================================================
  // PLAY / PAUSE
  // =====================================================

  const togglePlay = async () => {
    const player = modalPlayerRef.current;

    if (!player) return;

    try {
      const paused = await player.getPaused();

      if (paused) {
        await player.play();
        setIsPlaying(true);
      } else {
        await player.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Play/Pause error:", error);
    }
  };

  // =====================================================
  // PLAYBACK SPEED
  // =====================================================

  const setRate = async (rate) => {
    setSpeed(rate);

    try {
      if (modalPlayerRef.current) {
        await modalPlayerRef.current.setPlaybackRate(rate);
      }
    } catch (error) {
      console.error("Playback speed error:", error);
    }
  };

  // =====================================================
  // MUTE / UNMUTE
  // =====================================================

  const toggleMute = async () => {
    const player = modalPlayerRef.current;

    if (!player) return;

    try {
      const muted = await player.getMuted();

      await player.setMuted(!muted);

      setIsMuted(!muted);
    } catch (error) {
      console.error("Mute error:", error);
    }
  };

  // =====================================================
  // FULLSCREEN
  // =====================================================

  const enterFullscreen = () => {
    const element = document.querySelector(
      ".video-content-container"
    );

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      element?.requestFullscreen?.();
    }
  };

  // =====================================================
  // CURRENT SLIDE
  // =====================================================

  const slide = slides[activeSlide];

  // =====================================================
  // JSX
  // =====================================================

  return (
    <main className="sohra-body">

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="sohra-hero">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="hero-content">

          {/* TAG */}

          <div className="hero-tag">
            <span className="tag-star">✦</span>
            {slide.tag}
          </div>

          {/* TITLE */}

          <h1>{slide.title}</h1>

          {/* DESCRIPTION */}

          <p>{slide.description}</p>

          {/* =================================================
              THREE BUTTONS
          ================================================= */}

          <div className="hero-buttons">

            {/* =================================================
                BUTTON 1
                EXPLORE PRODUCTS
            ================================================= */}

            <button
              type="button"
              className="primary-btn"
              onClick={handleExploreProducts}
            >
              Explore Our Products

              <span className="button-arrow">
                →
              </span>
            </button>

            {/* =================================================
                BUTTON 2
                DISCOVER STORY
            ================================================= */}

            <button
              type="button"
              className="secondary-btn"
              onClick={handleDiscoverStory}
            >
              Discover Our Story

              <span className="button-arrow">
                →
              </span>
            </button>

            {/* =================================================
                BUTTON 3
                DOWNLOAD BROCHURE
            ================================================= */}

            <button
              type="button"
              className="brochure-btn"
              onClick={handleDownloadBrochure}
            >
              Download Brochure

              <span className="button-arrow">
                ↓
              </span>
            </button>

          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="features">

            {/* FEATURE 1 */}

            <div className="feature-item">
              <div className="feature-icon">
                ✓
              </div>

              <div className="feature-content">
                <strong>Durable &</strong>
                <span>Long Lasting</span>
              </div>
            </div>

            {/* FEATURE 2 */}

            <div className="feature-item">
              <div className="feature-icon">
                ♨
              </div>

              <div className="feature-content">
                <strong>Thermal &</strong>
                <span>Sound Insulation</span>
              </div>
            </div>

            {/* FEATURE 3 */}

            <div className="feature-item">
              <div className="feature-icon">
                ◉
              </div>

              <div className="feature-content">
                <strong>Eco-Friendly</strong>
                <span>& Sustainable</span>
              </div>
            </div>

            {/* FEATURE 4 */}

            <div className="feature-item">
              <div className="feature-icon">
                ⚙
              </div>

              <div className="feature-content">
                <strong>Low Maintenance</strong>
                <span>& Easy to Clean</span>
              </div>
            </div>

          </div>
        </div>

        {/* =================================================
            HERO IMAGE
        ================================================= */}

        <div className="hero-image-area">

          <img
            key={slide.image}
            src={slide.image}
            alt={`${slide.tag} - Sohra UPVC Industries`}
            className="hero-image"
          />

          {/* IMAGE OVERLAY */}

          <div className="hero-image-overlay"></div>

          {/* =================================================
              PREVIOUS
          ================================================= */}

          <button
            type="button"
            className="slider-arrow slider-left"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          {/* =================================================
              NEXT
          ================================================= */}

          <button
            type="button"
            className="slider-arrow slider-right"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          {/* =================================================
              SLIDE COUNTER
          ================================================= */}

          <div className="slide-counter">

            <span>
              {String(activeSlide + 1).padStart(2, "0")}
            </span>

            <span className="counter-line"></span>

            <span>
              {String(slides.length).padStart(2, "0")}
            </span>

          </div>

          {/* =================================================
              DOTS
          ================================================= */}

          <div className="slider-dots">

            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                className={`slider-dot ${activeSlide === index ? "active" : ""
                  }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}

          </div>

        </div>
      </section>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="stats-card">

        {/* STAT 1 */}

        <div className="stat-item">

          <div className="stat-icon">
            ◫
          </div>

          <div className="stat-text">
            <strong>10+</strong>
            <span>Years of Experience</span>
          </div>

        </div>

        <div className="stat-divider"></div>

        {/* STAT 2 */}

        <div className="stat-item">

          <div className="stat-icon green">
            ◈
          </div>

          <div className="stat-text">
            <strong>5000+</strong>
            <span>Projects Completed</span>
          </div>

        </div>

        <div className="stat-divider"></div>

        {/* STAT 3 */}

        <div className="stat-item">

          <div className="stat-icon purple">
            ♧
          </div>

          <div className="stat-text">
            <strong>98%</strong>
            <span>Customer Satisfaction</span>
          </div>

        </div>

        <div className="stat-divider"></div>

        {/* STAT 4 */}

        <div className="stat-item">

          <div className="stat-icon yellow">
            ♙
          </div>

          <div className="stat-text">
            <strong>25+</strong>
            <span>Expert Team Members</span>
          </div>

        </div>

      </section>

      {/* =================================================
          VIMEO VIDEO MODAL
      ================================================= */}

      {showModal && (
        <div
          className="video-modal"
          onClick={closeVideo}
        >

          <div
            className="video-content-container"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              className="close-modal-btn"
              onClick={closeVideo}
              aria-label="Close video"
            >
              ✕
            </button>

            {/* VIDEO */}

            <div className="modal-aspect">

              <div
                className="modal-player-inner"
                ref={modalWrapRef}
              ></div>

            </div>

            {/* =================================================
                VIDEO CONTROLS
            ================================================= */}

            <div className="modal-controls">

              {/* PLAY / PAUSE */}

              <button
                type="button"
                className="ctl"
                onClick={togglePlay}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <div className="divider"></div>

              {/* SPEED */}

              <span className="label">
                Speed
              </span>

              <button
                type="button"
                className={`ctl ${speed === 1 ? "selected" : ""
                  }`}
                onClick={() => setRate(1)}
              >
                1×
              </button>

              <button
                type="button"
                className={`ctl ${speed === 2 ? "selected" : ""
                  }`}
                onClick={() => setRate(2)}
              >
                2×
              </button>

              <button
                type="button"
                className={`ctl ${speed === 3 ? "selected" : ""
                  }`}
                onClick={() => setRate(3)}
              >
                3×
              </button>

              <div className="divider"></div>

              {/* MUTE */}

              <button
                type="button"
                className="ctl"
                onClick={toggleMute}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>

              <div className="spacer"></div>

              {/* FULLSCREEN */}

              <button
                type="button"
                className="ctl highlight"
                onClick={enterFullscreen}
              >
                Fullscreen
              </button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}

export default Body;