import React from 'react';
import './project2.css';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Project2 = () => {
  const particlesInit = useCallback(async engine => {
      console.log(engine);
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      console.log(container);
  }, []);

  return (
      <Particles id="tsparticles" url="http://foo.bar/particles.json" init={particlesInit} loaded={particlesLoaded} />
    );
  }

export default Project2