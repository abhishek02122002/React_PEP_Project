import { useEffect, useState } from "react";
import Above from "./Components/Above";
import "../src/App.css";


function MobileDisplay() {
  return (
    <div className="mobile-display">
      <div className="creator">
        <p>
          <span title="Connect with me on LinkedIn:">
            <a href="https://www.linkedin.com/in/abhishekkumarsingh17/">LinkedIN</a>
            Meet the creator
          </span>
        </p>
      </div>
      <img src="../public/no-phone.png" alt="No Phone Allowed" />
      <h1>SORRY ! ONLY DESKTOP</h1>
      <p>
        This application is made for students<br /> to not get distracted in the AI world.
      </p>
    </div>
  );
}

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="full">
      {isMobile ? <MobileDisplay /> : <Above />}
    </div>
  );
}
