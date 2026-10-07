"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // Check WebGL availability
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 32;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Soft Ambient Lighting (subtle & non-distracting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 0.7);
    dirLight.position.set(20, 30, 20);
    scene.add(dirLight);

    const goldPointLight = new THREE.PointLight(0xfbbc34, 1.0, 50);
    goldPointLight.position.set(-15, 10, 15);
    scene.add(goldPointLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 0.8, 50);
    cyanPointLight.position.set(15, -10, 10);
    scene.add(cyanPointLight);

    // 5. Very subtle pastel bubble palette (airy & calm)
    const bubbleColors = [
      0xfef08a, // Pale subtle gold
      0xfde68a, // Soft warm honey
      0xbae6fd, // Soft baby sky blue
      0xe0f2fe, // Translucent pearl
      0xdbeafe, // Soft ice blue
      0xf1f5f9, // Very light mist
    ];

    // Reduced count: only 14 on desktop, 7 on mobile for a clean, premium background
    const isMobile = width < 768;
    const bubbleCount = isMobile ? 7 : 14;

    interface BubbleItem {
      mesh: THREE.Mesh;
      baseX: number;
      baseZ: number;
      y: number;
      speedY: number;
      wobbleSpeedX: number;
      wobbleSpeedZ: number;
      wobbleAmpX: number;
      wobbleAmpZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      phase: number;
      radius: number;
    }

    const bubbles: BubbleItem[] = [];
    const bubbleGroup = new THREE.Group();
    scene.add(bubbleGroup);

    // Shared sphere geometry
    const sphereGeom = new THREE.SphereGeometry(1, 32, 32);

    for (let i = 0; i < bubbleCount; i++) {
      const color =
        bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
      // Delicate sizes
      const radius = THREE.MathUtils.randFloat(0.5, 1.6);

      // Glassy, very faint translucent material (opacity 0.12 - 0.22)
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.15,
        metalness: 0.05,
        transmission: 0.85, // Highly translucent
        ior: 1.33,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.12, 0.22), // Low, soft opacity
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        reflectivity: 0.5,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(sphereGeom, material);
      mesh.scale.set(radius, radius, radius);

      // Evenly distribute in 3D space
      const baseX = THREE.MathUtils.randFloat(-22, 22);
      const y = THREE.MathUtils.randFloat(-20, 20);
      const baseZ = THREE.MathUtils.randFloat(-10, 8);

      mesh.position.set(baseX, y, baseZ);
      bubbleGroup.add(mesh);

      bubbles.push({
        mesh,
        baseX,
        baseZ,
        y,
        // Slower, very calm upward drift
        speedY: THREE.MathUtils.randFloat(0.006, 0.016),
        wobbleSpeedX: THREE.MathUtils.randFloat(0.3, 0.8),
        wobbleSpeedZ: THREE.MathUtils.randFloat(0.2, 0.6),
        wobbleAmpX: THREE.MathUtils.randFloat(0.5, 1.5),
        wobbleAmpZ: THREE.MathUtils.randFloat(0.3, 1.0),
        rotSpeedX: THREE.MathUtils.randFloat(0.002, 0.008),
        rotSpeedY: THREE.MathUtils.randFloat(0.002, 0.008),
        phase: Math.random() * Math.PI * 2,
        radius,
      });
    }

    // 6. Interactive Mouse Parallax (very gentle damping)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 8. Gentle Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.02;
      mouseY += (targetMouseY - mouseY) * 0.02;

      // Subtle tilt
      bubbleGroup.rotation.y = mouseX * 0.06;
      bubbleGroup.rotation.x = -mouseY * 0.04;

      // Animate each bubble gently
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        // Calm upward drift
        b.y += b.speedY;

        // Loop back to bottom when floating off top
        if (b.y > 22) {
          b.y = -22;
          b.baseX = THREE.MathUtils.randFloat(-22, 22);
        }

        // Gentle sinusoidal sway
        const swayX =
          Math.sin(elapsedTime * b.wobbleSpeedX + b.phase) * b.wobbleAmpX;
        const swayZ =
          Math.cos(elapsedTime * b.wobbleSpeedZ + b.phase) * b.wobbleAmpZ;

        b.mesh.position.y = b.y;
        b.mesh.position.x = b.baseX + swayX;
        b.mesh.position.z = b.baseZ + swayZ;

        // Gentle rotation
        b.mesh.rotation.x += b.rotSpeedX;
        b.mesh.rotation.y += b.rotSpeedY;

        // Very subtle breath
        const pulse = 1 + Math.sin(elapsedTime * 1.0 + b.phase) * 0.025;
        b.mesh.scale.set(b.radius * pulse, b.radius * pulse, b.radius * pulse);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      bubbles.forEach((b) => {
        if (b.mesh.material instanceof THREE.Material) {
          b.mesh.material.dispose();
        }
      });
      sphereGeom.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="three-bg-canvas-container"
      aria-hidden="true"
    />
  );
}
