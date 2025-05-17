import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
        <p className="mt-2 text-base text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-6 flex items-center justify-center space-x-4">
          <Link to="/">
            <Button leftIcon={<Home size={16} />}>
              Go to homepage
            </Button>
          </Link>
          <button onClick={() => window.history.back()} className="text-primary-600 hover:text-primary-700 inline-flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;