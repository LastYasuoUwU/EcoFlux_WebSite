import { useAuth } from "@clerk/react-router";
import { Navigate } from "react-router";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./styles.scss";

function AnimatedLogo() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-64 h-64"
      >
        {/* SVG outline that fills up */}
        <motion.img
          src="https://res.cloudinary.com/dbhv2ff2q/image/upload/v1745323540/just%20testing/eo6tub43wci8p2aabwcw.svg"
          alt="Petit Bateau Logo"
          className="absolute w-full h-full"
          initial={{ WebkitMaskSize: "0% 100%" }}
          animate={{ WebkitMaskSize: "100% 100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{
            maskImage:
              "url(https://res.cloudinary.com/dbhv2ff2q/image/upload/v1745323540/just%20testing/eo6tub43wci8p2aabwcw.svg)",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
          }}
        />
      </motion.div>
    </div>
  );
}

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // If auth is loaded and user is signed in, start the timer
    if (isLoaded && isSignedIn) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 6000); //6 seconds

      // Clean up the timer if component unmounts
      return () => clearTimeout(timer);
    }

    // If user is not signed in, no need for loader
    if (isLoaded && !isSignedIn) {
      setShowLoader(false);
    }
  }, [isLoaded, isSignedIn]);

  // Show loader if not loaded or during the 5 second wait period
  if (!isLoaded || showLoader) {
    return <AnimatedLogo />;
  }

  // Redirect if not signed in
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  // User is authenticated and loader time elapsed, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
