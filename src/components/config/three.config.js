// Configurações para Three.js e @react-three/fiber

export const threeConfig = {
  camera: {
    position: [0, 0, 5],
    fov: 45,
    near: 0.1,
    far: 1000,
  },

  renderer: {
    antialias: true,
    alpha: true,
    shadowMap: {
      enabled: true,
      type: "PCFSoftShadowMap",
    },
  },

  lights: {
    ambient: {
      intensity: 0.5,
      color: "#ffffff",
    },
    directional: {
      position: [5, 5, 5],
      intensity: 1,
      castShadow: true,
      shadow: {
        mapSize: {
          width: 2048,
          height: 2048,
        },
        camera: {
          near: 0.5,
          far: 500,
        },
      },
    },
    point: {
      color: "#b97836",
      intensity: 0.5,
      distance: 100,
      decay: 2,
    },
  },

  materials: {
    default: {
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1,
    },
    glass: {
      metalness: 0,
      roughness: 0,
      transmission: 1,
      transparent: true,
      opacity: 0.5,
    },
    emissive: {
      emissiveIntensity: 0.5,
      toneMapped: false,
    },
  },

  animations: {
    rotation: {
      speed: 0.002,
      axis: "y",
    },
    float: {
      speed: 2,
      rotationIntensity: 0.5,
      floatIntensity: 0.5,
    },
    hover: {
      scale: 1.1,
      duration: 0.3,
    },
  },
};

export default threeConfig;
