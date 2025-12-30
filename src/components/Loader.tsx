import React from 'react';
import { Plane } from 'lucide-react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader-earth">
          <div className="earth-wrapper">
            <div className="earth"></div>
          </div>
          <div className="plane">
            <Plane className="plane-img" size={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

