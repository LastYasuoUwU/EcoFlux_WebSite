import { useAuth } from '@clerk/react-router';
import { Navigate } from 'react-router';
import React from "react";
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
          style={{ maskImage: 'url(https://res.cloudinary.com/dbhv2ff2q/image/upload/v1745323540/just%20testing/eo6tub43wci8p2aabwcw.svg)', maskRepeat: 'no-repeat', maskPosition: 'center', maskSize: 'contain' }}
        />

        {/* Sparkles after fill */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="sparkle"></div>
        </motion.div>
      </motion.div>
    </div>
  );
}


type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    // return <div>Loading...</div>;
    return <AnimatedLogo/>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;


