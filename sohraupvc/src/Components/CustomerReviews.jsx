import React from "react";
import "./CustomerReviews.css";

/* =====================================================
   REAL GOOGLE REVIEWS
===================================================== */

const reviews = [
  {
    name: "Gourav Mala",
    initial: "G",
    rating: 5,
    time: "3 months ago",
    review:
      "मैंने हाल में ही Sohra UPVC से डोर और विंडो बनवाये थे क्वालिटी बहुत अच्छी है और एल्युमिनियम और ड्यूमिनियम से काफी बेहतर है। पर्सनलाइज्ड एडवांस टेक्नोलॉजी के लिये आप अपने घर को रेनोवेट करवाना चाहते है तो एक बार इनके ऑफिस में जरूर विजिट करें.......क्योंकि हर बार बार नहीं बनता",
  },
  {
    name: "Bhanupriya Shaktawat",
    initial: "B",
    rating: 5,
    time: "3 weeks ago",
    review:
      "Gud fitting low noice no irritating easy to slide window must try",
  },
];

/* =====================================================
   CUSTOMER REVIEWS COMPONENT
===================================================== */

const CustomerReviews = () => {
  const googleReviewsUrl =
    "https://www.google.com/search?q=sohra+india+upvc+industries+jaggakhedi+reviews";

  return (
    <section className="customer-reviews-section">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="reviews-header">

        <span className="reviews-tag">
          ⭐ CUSTOMER REVIEWS
        </span>

        <h2>
          What Our <span>Customers Say</span>
        </h2>

        <p>
          Our customers trust SOHRA India UPVC Industries for
          quality doors, windows and modern UPVC solutions.
        </p>

      </div>


      {/* =================================================
          GOOGLE RATING CARD
      ================================================= */}

      <div className="google-rating-card">

        <div className="google-rating-left">

          <div className="google-icon">
            G
          </div>

          <div className="google-rating-info">

            <h3>
              Google Reviews
            </h3>

            <div className="google-stars">
              ★★★★★
            </div>

          </div>

        </div>


        <div className="google-rating-right">

          <strong>
            5.0
          </strong>

          <span>
            Customer Rating
          </span>

        </div>

      </div>


      {/* =================================================
          REVIEW CARDS
      ================================================= */}

      <div className="reviews-grid">

        {reviews.map((item, index) => (

          <article
            className="review-card"
            key={index}
          >

            {/* =================================================
                CUSTOMER INFORMATION
            ================================================= */}

            <div className="review-top">

              <div className="customer-avatar">
                {item.initial}
              </div>

              <div className="customer-info">

                <h4>
                  {item.name}
                </h4>

                <div className="review-stars">
                  {"★".repeat(item.rating)}
                </div>

              </div>

              <span className="google-small">
                Google
              </span>

            </div>


            {/* =================================================
                REVIEW DATE
            ================================================= */}

            <div className="review-time">
              {item.time}
            </div>


            {/* =================================================
                REVIEW TEXT
            ================================================= */}

            <p className="review-text">
              "{item.review}"
            </p>


            {/* =================================================
                VERIFIED
            ================================================= */}

            <div className="review-footer">
              <span className="verified-icon">
                ✓
              </span>

              Verified Google Review
            </div>

          </article>

        ))}

      </div>


      {/* =================================================
          GOOGLE REVIEWS BUTTON
      ================================================= */}

      <div className="reviews-button-wrapper">

        <a
          href={googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="google-reviews-button"
        >

          <span>
            View All Reviews on Google
          </span>

          <span className="google-button-arrow">
            ↗
          </span>

        </a>

      </div>

    </section>
  );
};

export default CustomerReviews;