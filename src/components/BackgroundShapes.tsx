'use client';
import { useEffect } from 'react';

export default function BackgroundShapes() {
  useEffect(() => {
    const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC300', '#A66DD4'];
    const shapes = ['circle', 'square'];
    const numShapes = 20;

    for (let i = 0; i < numShapes; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 80 + 20;
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];

      shape.classList.add('random-shape');
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      shape.style.position = 'fixed';
      shape.style.top = `${Math.random() * (window.innerHeight - size)}px`;
      shape.style.left = `${Math.random() * (window.innerWidth - size)}px`;
      shape.style.borderRadius = shapeType === 'circle' ? '50%' : '0';
      shape.style.zIndex = '0';
      shape.style.opacity = '0.2';

      document.body.appendChild(shape);
    }

    // Optional: Cleanup on unmount to prevent duplicates
    return () => {
      document.querySelectorAll('.random-shape').forEach((el) => el.remove());
    };
  }, []);

  return null;
}
