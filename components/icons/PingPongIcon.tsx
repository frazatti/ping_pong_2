
import React from 'react';

const PingPongIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.25 15.25a3.5 3.5 0 0 0 4.96-4.96L9.8 2.87a4.95 4.95 0 0 0-7 7l9.44 9.44" />
    <path d="M15.5 15.5L18 18" />
    <path d="M2 8.8l4.17-4.17" />
    <path d="m14 18 4.2-4.2" />
    <path d="M10 12 5.8 7.8" />
    <circle cx="18.5" cy="5.5" r="2.5" />
  </svg>
);

export default PingPongIcon;
