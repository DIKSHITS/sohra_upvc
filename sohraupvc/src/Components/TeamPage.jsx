import React from "react";
import "./TeamPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

// =====================================================
// FOUNDER IMAGES — LOCAL IMAGES FOLDER
// =====================================================

import satishMalviya from "../assets/images/satish-malviya.jpg";
import maheshMalviya from "../assets/images/mahesh-malviya.jpg";

// =====================================================
// TEAM MEMBERS
// =====================================================

const teamMembers = [
  {
    name: "Satish Malviya",
    role: "Founder",
    image: satishMalviya,
    bio: "Satish Malviya is the visionary behind our company. With dedication and leadership, he has laid the foundation for delivering top-quality UPVC solutions.",
  },

  {
    name: "Mahesh Malviya",
    role: "Administrative Officer",
    image: maheshMalviya,
    bio: "Mahesh Malviya manages administrative operations efficiently, ensuring smooth workflows and organizational growth.",
  },
];

// =====================================================
// COMPLETED PROJECTS
// External images
// =====================================================

const completedProjects = [
  {
    title: "Modern Apartment Windows",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    description:
      "Installed premium UPVC windows in a 50-unit modern apartment complex.",
  },

  {
    title: "Luxury Villa Doors",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
    description:
      "Designed and fitted UPVC sliding doors for a luxury villa project.",
  },

  {
    title: "Commercial Office Renovation",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
    description:
      "Upgraded an office space with soundproof UPVC windows and doors.",
  },
];

// =====================================================
// TEAM PAGE
// =====================================================

export default function TeamPage({ includeLayout = true }) {
  return (
    <>
      {includeLayout && <Navbar />}

      <main className="team-page">

        {/* =================================================
            OUR TEAM
        ================================================= */}

        <section className="team-section">

          <div className="team-header">

            <h1>Our Team</h1>

            <div className="heading-line"></div>

            <p>
              The people behind Sohra UPVC Industries
            </p>

          </div>


          {/* TEAM MEMBERS */}

          <div className="team-container">

            {teamMembers.map((member, index) => (

              <article
                className="team-card"
                key={index}
              >

                {/* PROFILE IMAGE */}

                <div className="team-image-box">

                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                  />

                </div>


                {/* MEMBER CONTENT */}

                <div className="team-content">

                  <h2>
                    {member.name}
                  </h2>

                  <div className="team-role">
                    {member.role}
                  </div>

                  <p className="team-bio">
                    {member.bio}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =================================================
            COMPLETED PROJECTS
        ================================================= */}

        <section className="projects-section">

          <div className="project-header">

            <h1>
              Completed Projects
            </h1>

            <div className="heading-line"></div>

            <p>
              Some of our successful UPVC installations
            </p>

          </div>


          <div className="project-container">

            {completedProjects.map((project, index) => (

              <article
                className="project-card"
                key={index}
              >

                {/* PROJECT IMAGE */}

                <div className="project-image-box">

                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />

                </div>


                {/* PROJECT CONTENT */}

                <div className="project-content">

                  <h2>
                    {project.title}
                  </h2>

                  <p>
                    {project.description}
                  </p>

                </div>

              </article>

            ))}

          </div>

        </section>

      </main>

      {includeLayout && <Footer />}
    </>
  );
}