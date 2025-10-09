import React, { useState } from "react";
import "./Contact.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSuccess(true);
      e.target.reset(); // clear form after submit
      setTimeout(() => setSuccess(false), 4000); // hide message after 4 sec
    } else {
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="contact-container">
        <div className="contact-content">
          {/* Left Side */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              <strong>📍 Address:</strong>
              <br />
              Survey No. 487/2 (Near Jaggkhedi Panchayat Bhawan)
              <br />
              Sanjeet Road, Village – Jaggkhedi
              <br />
              District – Mandsaur, Madhya Pradesh
            </p>
            <p>
              <strong>📞 Phone:</strong> +91 7470955631
            </p>
            <p>
              <strong>📧 Email:</strong> info@sohraupvc.com
            </p>

            <div className="map-container">
              <iframe
                title="sohra-map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3641.737331603667!2d75.08762100000001!3d24.110730999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDA2JzM4LjYiTiA3NcKwMDUnMTUuNCJF!5e0!3m2!1sen!2sin!4v1757005025720!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="access_key"
                value="b5a27c27-87b8-4835-993b-38d732bc37e6"
              />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="input-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="input-field"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                className="input-field"
              ></textarea>

              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
              />

              <button type="submit" className="submit-btn">
                Submit Form
              </button>

              {/* ✅ Success Popup Message */}
              {success && (
                <p className="success-message">✅ Message sent successfully!</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
