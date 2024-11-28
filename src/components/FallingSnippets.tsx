import "../styles/falling-snippets.css"; // CSS file for styling
import * as THREE from "three";
import { useEffect, useRef } from "preact/hooks";
import { codeSnippets } from "../data/codeSnippets.ts";

export const FallingSnippets = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current!.appendChild(renderer.domElement);

    // Function to create text textures for code snippets
    const createTextTexture = (code: string, color: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const context = canvas.getContext("2d")!;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color;
      context.font = "18px monospace";
      context.textAlign = "left";
      context.textBaseline = "top";

      const lines = code.split("\n");
      lines.forEach((line, index) => {
        context.fillText(line, 10, 20 + index * 20);
      });

      return new THREE.CanvasTexture(canvas);
    };

    // Create falling sprites with random properties
    const sprites: {
      sprite: THREE.Sprite;
      speed: number;
      isPaused: boolean;
      resumeTimeout?: ReturnType<typeof setTimeout>;
    }[] = [];

    for (let i = 0; i < 25; i++) {
      const code =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const texture = createTextTexture(code, color);

      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      sprite.position.set(
        (Math.random() - 0.5) * 10, // Random X position
        Math.random() * 10 - 5, // Random Y position
        (Math.random() - 0.5) * 5 // Random Z position
      );
      sprite.scale.set(1.5, 1, 1); // Adjust size for readability
      scene.add(sprite);

      const speed = Math.random() * 0.005;

      // Use userData to store custom properties and click handler
      sprite.userData = {
        speed,
        isPaused: false,
        onClick: () => {
          const spriteData = sprites.find((s) => s.sprite === sprite);
          if (spriteData && !spriteData.isPaused) {
            spriteData.isPaused = true;

            // Resume after 3 seconds
            spriteData.resumeTimeout = setTimeout(() => {
              spriteData.isPaused = false;
            }, 3000);
          }
        },
      };

      sprites.push({
        sprite,
        speed,
        isPaused: false,
      });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      sprites.forEach(({ sprite, speed, isPaused }) => {
        if (!isPaused) {
          sprite.position.y -= speed; // Move sprite down
          if (sprite.position.y < -5) {
            sprite.position.y = 5; // Reset sprite to the top
            const newCode =
              codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            sprite.material.map = createTextTexture(
              newCode,
              `hsl(${Math.random() * 360}, 100%, 70%)`
            );
          }
        }
      });

      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Add mouse click detection
    const onMouseClick = (event: MouseEvent) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(
        sprites.map((s) => s.sprite)
      );

      if (intersects.length > 0) {
        const sprite = intersects[0].object;
        if (sprite.userData.onClick) {
          sprite.userData.onClick();
        }
      }
    };

    window.addEventListener("click", onMouseClick);

    // Cleanup on component unmount
    return () => {
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onMouseClick);
      containerRef.current!.removeChild(renderer.domElement);
      sprites.forEach((s) => {
        if (s.resumeTimeout) clearTimeout(s.resumeTimeout);
      });
    };
  }, []);

  // Return the container for Three.js canvas
  return <div ref={containerRef} id="falling-code-canvas"></div>;
};
