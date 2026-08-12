import React, { useState } from "react";
import "./SuccessfulProjects.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Images
import bg1 from "./logo/bg1.jpg";
import bg2 from "./logo/bg2.jpg";
import bg3 from "./logo/bg3.jpg";
import bg4 from "./logo/bg4.jpg";
import bg5 from "./logo/bg5.jpg";
import bg6 from "./logo/bg6.jpg";

// Videos
import video1 from "./logo/projects/video1.mp4";
import video2 from "./logo/projects/video2.mp4";
import video3 from "./logo/projects/video3.mp4";
import video4 from "./logo/projects/video4.mp4";
import video5 from "./logo/projects/video5.mp4";

const projectImages = [
  {
    id: 1,
    image: bg1,
    title: "Premium Sliding Window Installation",
    // location: "Shillong",
  },
  {
    id: 2,
    image: bg2,
    title: "Designer UPVC Entrance Door",
    // location: "Guwahati",
  },
  {
    id: 3,
    image: bg3,
    title: "Commercial UPVC Door Installation",
    // location: "Tura",
  },
  {
    id: 4,
    image: bg4,
    title: "Modern Bathroom Ventilation Window",
    // location: "Shillong",
  },
  {
    id: 5,
    image: bg5,
    title: "Interior UPVC Door Installation",
    // location: "Silchar",
  },
  {
    id: 6,
    image: bg6,
    title: "Premium Casement Window Installation",
    // location: "Jowai",
  },
];

const projectVideos = [
  {
    id: 1,
    video: video1,
    // title: "Sliding Window Installation",
  },
  {
    id: 2,
    video: video2,
    // title: "Luxury Villa Project",
  },
  {
    id: 3,
    video: video3,
    // title: "Office Interior",
  },
  {
    id: 4,
    video: video4,
    // title: "Office Interior",
  },
  {
    id: 5,
    video: video5,
    // title: "Office Interior",
  },
];

const SuccessfulProjects = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
    <Navbar/>
    <section className="projects-page">

      {/* Hero */}

      <div className="projects-hero">

        <h1>Our Successful Projects</h1>

        <p>
          Explore our completed UPVC Doors & Windows installations
          across Residential, Commercial and Industrial projects.
        </p>

      </div>

      {/* Statistics */}

      <div className="project-stats">

        <div className="stat-card">
          <h2>500+</h2>
          <span>Completed Projects</span>
        </div>

        <div className="stat-card">
          <h2>15+</h2>
          <span>Years Experience</span>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <span>Customer Satisfaction</span>
        </div>

        <div className="stat-card">
          <h2>10+</h2>
          <span>Cities Served</span>
        </div>

      </div>

      {/* Gallery */}

      <div className="gallery-title">
        <h2>Project Gallery</h2>
      </div>

      <div className="gallery-grid">

        {projectImages.map((item) => (

          <div
            key={item.id}
            className="gallery-card"
            onClick={() => setSelectedImage(item.image)}
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <div className="gallery-overlay">

              <h3>{item.title}</h3>

              <p>{item.location}</p>

            </div>

          </div>

        ))}

      </div>

      {/* Videos */}

      <div className="gallery-title">

        <h2>Project Videos</h2>

      </div>

      <div className="video-grid">

        {projectVideos.map((item) => (

          <div
            key={item.id}
            className="video-card"
          >

            <video
              muted
              controls
            >
              <source
                src={item.video}
                type="video/mp4"
              />
            </video>

            <h3>{item.title}</h3>

            <button
              className="watch-btn"
              onClick={() => setSelectedVideo(item.video)}
            >
              Watch Full Screen
            </button>

          </div>

        ))}

      </div>

      {/* Image Popup */}

      {selectedImage && (

        <div
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >

          <img
            src={selectedImage}
            alt=""
          />

        </div>

      )}

      {/* Video Popup */}

      {selectedVideo && (

        <div
          className="video-modal"
          onClick={() => setSelectedVideo(null)}
        >

          <div
            className="video-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </button>

            <video
              controls
              autoPlay
            >
              <source
                src={selectedVideo}
                type="video/mp4"
              />
            </video>

          </div>

        </div>

      )}

    </section>
    <Footer/>
    </>
  );
};

export default SuccessfulProjects;