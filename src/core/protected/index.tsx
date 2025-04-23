import { useAuth } from '@clerk/react-router';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;