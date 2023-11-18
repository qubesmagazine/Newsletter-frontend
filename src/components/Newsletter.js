import React, { useState } from 'react';
import './Newsletter.css';
import mailIcon from '../images/icons8-message-read.gif'; // Update the path to your mail icon

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://newsletter-server-b90g.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Email submitted successfully!');
        setSubscribed(true);
      } else {
        console.error('Failed to submit email. Server returned:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setSubscribed(false);
    setEmail('');
  };

  return (
    <div className="newsletter-container">
      {subscribed ? (
        <div>
          <h2 className="newsletter-title">Thank You for Subscribing!</h2>
          <button onClick={handleGoBack} className="newsletter-button">
            Go Back
          </button>
        </div>
      ) : (
        <>
          <img src={mailIcon} alt="Mail Icon" className="newsletter-icon" />
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <label htmlFor="email" className="newsletter-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
              disabled={loading}
            />
            <button type="submit" className="newsletter-button" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Newsletter;
