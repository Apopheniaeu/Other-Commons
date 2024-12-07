import React, { useState, useEffect } from "react";
import "./styles.css";
import pdfFile from "./texts/ISSUE0-TEXT1.pdf";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [textContent, setTextContent] = useState("");

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

  // Fetch text from public folder
  useEffect(() => {
    fetch("/CaptiveEyes.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((text) => {
        // Replace "###" with styled HTML
        const formattedText = text.replace(
          /###(.+?)(?=\n|$)/g,
          '<span class="subtitle">$1</span>'
        );
        setTextContent(formattedText);
      })
      .catch((error) => {
        console.error("Error fetching text:", error);
        setTextContent("Error loading text. Please try again later.");
      });
  }, []);

  const scrollToTop = () => {
    const scrollableElement = document.querySelector(".text-container"); // Target the actual scrollable div
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
    }
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
            <a
              className="share-symbol"
              onClick={() => {
                if (navigator.share) {
                  // Use the native share API if available
                  navigator
                    .share({
                      title: document.title,
                      url: window.location.href,
                    })
                    .catch((error) => console.error("Error sharing:", error));
                } else {
                  // Fallback: Copy URL to clipboard
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      alert("URL copied to clipboard!");
                    })
                    .catch((error) =>
                      console.error("Error copying URL:", error)
                    );
                }
              }}
            >
              /
            </a>

            <a href={pdfFile} download>
              <span role="img" className="download-symbol">
                ↓
              </span>
            </a>
            <div className="author">BENJAMIN REYNOLDS</div>
            <div className="date">JANUARY 2024</div>
            <a className="essay-name">
              Eyes in Capti <br /> tity
            </a>
          </div>
          <p
            className="indented"
            dangerouslySetInnerHTML={{ __html: textContent || "Loading..." }}
          ></p>
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
        </div>
      </div>
    );
  };

  return <Magazine />;
};

export default App;
