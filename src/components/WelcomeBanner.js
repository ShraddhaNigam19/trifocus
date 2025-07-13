import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/WelcomeBanner.css"; // Import your CSS for styling

const quotes = [
  "Discipline is the bridge between goals and accomplishment.",
  "Small steps every day lead to big changes.",
  "Stay focused. Stay consistent. Stay positive.",
  "Progress, not perfection.",
  "One day or day one. You decide.",
];

// ✅ Update paths to .avif images
const images = ["/images/image4.avif"];

const WelcomeBanner = () => {
  const { user } = useAuth();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(bgInterval);
    };
  }, []);

  return (
    <div
      className="welcome-banner"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${images[bgIndex]})`,
      }}>
      <div className="welcome-content">
        <h2>Hey {user?.displayName || "there"} 👋</h2>
        <p className="quote">"{quotes[quoteIndex]}"</p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
