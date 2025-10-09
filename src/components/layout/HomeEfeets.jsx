import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useRef } from 'react';
import './HomeEffects.css';

const HomeLayout = ({ children }) => {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
        lerp: 0.05,
        multiplier: 1.2,
        touchMultiplier: 2,
      }}
      watch={[]}
      containerRef={containerRef}
    >
       <main data-scroll-container ref={containerRef}>
        {children}
      </main>
    </LocomotiveScrollProvider>
  );
};

export default HomeLayout;
//npm install @react-three/fiber @react-three/drei three --legacy-peer-deps e  npm install framer-motion react-locomotive-scroll locomotive-scroll --legacy-peer-deps