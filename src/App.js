import React, { useState, useEffect } from "react";
import "./styles.css";
import pdfFile from "./texts/ISSUE0-TEXT1.pdf";

const loadTextFile = async () => {
  const response = await fetch("/path/to/your/file.txt");
  const text = await response.text();
  return text.split("###").map((section) => section.trim());
};

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [textSections, setTextSections] = useState([]);

  // Media queries and page content
  const VisualMagazinePage1 = require("./images/VisualMagazine_p1.png");
  const VisualMagazinePage2_3 = require("./images/VisualMagazine_p2-3.png");
  const VisualMagazinePage4_5 = require("./images/VisualMagazine_p4-5.png");
  const VisualMagazinePage6_7 = require("./images/VisualMagazine_p6-7.png");
  const VisualMagazinePage8 = require("./images/VisualMagazine_p8.png");

  const TextMagazinePage1 = require("./images/TextMagazine_LowRes_p1.png");
  const TextMagazinePage2_3 = require("./images/TextMagazine_LowRes_p2-3.png");
  const TextMagazinePage4_5 = require("./images/TextMagazine_LowRes_p4-5.png");
  const TextMagazinePage6_7 = require("./images/TextMagazine_LowRes_p6-7.png");
  const TextMagazinePage8 = require("./images/TextMagazine_LowRes_p8.png");

  const visualMagazinePages = [
    VisualMagazinePage1,
    VisualMagazinePage2_3,
    VisualMagazinePage4_5,
    VisualMagazinePage6_7,
    VisualMagazinePage8,
  ];

  const textMagazinePages = [
    TextMagazinePage1,
    TextMagazinePage2_3,
    TextMagazinePage4_5,
    TextMagazinePage6_7,
    TextMagazinePage8,
  ];

  useEffect(() => {
    const fetchData = async () => {
      const sections = await loadTextFile();
      setTextSections(sections);
    };
    fetchData();
  }, []);

  // Handle resizing for mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobile = window.innerWidth <= 480;
      setIsMobile(isMobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const disableRightClick = (event) => {
    event.preventDefault();
  };

  // Mobile view component
  if (isMobile) {
    return (
      <div className="App">
        <div className="text-container">
          <div>
            <a className="sound-symbol">→</a>
            <a className="share-symbol">/</a>
            <a href={pdfFile} download>
              <span role="img" className="download-symbol">
                ↓
              </span>
            </a>
            <div className="author">BENJAMIN REYNOLDS</div>
            <a className="essay-name">
              Eyes in Capti <br /> tity
            </a>
          </div>
          <a className="subtitle"> Drown </a>
          <p className="indented">
            When we look at our hands they appear 3×10⁻⁹ seconds old. The people
            at the counter over there are 70×10⁻⁹ seconds old. Even though we
            see all of them at once we are seeing a stream of many instants; of
            ages.⁣ Now our senses are forming very close bonds with sources of
            light and sound. Brightly lit surfaces sit only a few centimetres
            away from our retinas, vibrating diaphragms rest on our temporal
            bones if not directly in our ear canals. These are the demands of
            so-called ‘spatial computing’: capable of sensing space itself,
            lenses pointed towards and away from us sense orientations and
            velocities of bodily gestures, durations of time spent in locations
            are triangulated with the tone in our voice and heart pulses read
            from our temples; a space that is simultaneously that of labour and
            of recreation, collapsed into a visual frame that wraps our eyes.
            <br />
            <span className="indented-line" />
            The spatial computer bleeds representations of our physical
            environments and bodies with augmented digital objects, but any
            leaking of light or sound may disrupt this experience. Indeed the
            ‘outside’ is considered a threat to the suspension of reality within
            the spatial computer. The term ‘immersion’ that often accompanies
            this experience is derived from immergere meaning to sink into a
            fluid; a veritable drowning must occur should the media be properly
            experienced. Genuine encounters with others in reality are
            substituted with a recording of the view that our eyes would
            otherwise have, even our own faces which are concurrently engulfed
            by a spatial computer, are substituted with an unmasked facsimile of
            itself. When we surface we find the world parched, our senses
            thirsting for the saturated sunsets and amplified sounds of forest
            floors we encounter when immersed in the spatial computer. Digitised
            drowning is replaced with the sensory barrenness of reality’s
            subtler hues and imperceptible sounds, and we gradually lose the
            ability to appreciate sensations of the real world. Our engagement
            with reality diminishes and real environments attempt to mimic the
            euphoria only experienced when fully immersed in spatial computing.
          </p>
        </div>

        <div className="static-features">
          <button onClick={scrollToTop} className="scroll-button">
            ↑
          </button>
        </div>
      </div>
    );
  }

  // Magazine component for larger screens
  const Magazine = () => {
    const [currentMagazine, setCurrentMagazine] = useState("visual");
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (direction) => {
      if (direction === "previous" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (
        direction === "next" &&
        currentPage < magazines[currentMagazine].pages.length - 1
      ) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handleScreenClick = (event) => {
      const screenWidth = window.innerWidth;
      const clickX = event.clientX;

      if (clickX < screenWidth / 2) {
        handlePageChange("previous");
      } else {
        handlePageChange("next");
      }
    };

    const handleMagazineChange = () => {
      setCurrentPage(0); // Reset current page to 0
      setCurrentMagazine(currentMagazine === "visual" ? "text" : "visual"); // Change the magazine
    };

    const magazines = {
      visual: { pages: visualMagazinePages, currentPage },
      text: { pages: textMagazinePages, currentPage },
    };

    return (
      <div
        className="App"
        onClick={handleScreenClick}
        onContextMenu={disableRightClick}
      >
        <div className="magazine-container">
          <div
            className={`magazine-page ${
              currentMagazine === "visual"
                ? "visual-magazine-page"
                : "text-magazine-page"
            }`}
          >
            <img
              src={magazines[currentMagazine].pages[currentPage]}
              alt={`Page ${currentPage + 1}`}
            />
          </div>
          <div className="toggle-container">
            <label className="toggle-label">
              <input
                type="checkbox"
                className="toggle-input"
                checked={currentMagazine === "text"}
                onChange={handleMagazineChange}
              />
              <span className="toggle-slider">
                {currentMagazine === "visual" ? "📷" : "🅃"}
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  return <Magazine />;
};

export default App;
