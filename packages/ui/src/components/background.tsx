"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.002);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Geometry: Torus Knot
        const tubularSegments = 120;
        const radialSegments = 16;
        const geometry = new THREE.TorusKnotGeometry(9, 2.5, tubularSegments, radialSegments);

        // Material: Wireframe
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x888888,
            emissive: 0x111111,
            metalness: 0.9,
            roughness: 0.1,
            wireframe: true,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
        });

        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        // --- Sparks Effect ---
        const sparkCount = 100;
        const sparkGeo = new THREE.CircleGeometry(0.15, 3);
        sparkGeo.rotateY(-Math.PI / 2);

        const sparkMat = new THREE.MeshBasicMaterial({
            color: 0xd4af37,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8,
            depthTest: false,
        });

        const sparks = new THREE.InstancedMesh(sparkGeo, sparkMat, sparkCount);
        torusKnot.add(sparks);

        // Instance Data
        const dummy = new THREE.Object3D();
        const sparkData: { speed: number; progress: number; pathIndex: number }[] = [];

        for (let i = 0; i < sparkCount; i++) {
            sparkData.push({
                speed: 0.001 + Math.random() * 0.002,
                progress: Math.random(),
                pathIndex: Math.floor(Math.random() * radialSegments),
            });
        }

        const posAttribute = geometry.attributes.position as THREE.BufferAttribute;
        const stride = radialSegments + 1;
        const v1 = new THREE.Vector3();
        const v2 = new THREE.Vector3();

        function updateSparks() {
            sparkData.forEach((spark, i) => {
                spark.progress += spark.speed;
                if (spark.progress >= 1) spark.progress = 0;

                const exactInd = spark.progress * tubularSegments;
                const u = Math.floor(exactInd);
                const nextU = (u + 1) % tubularSegments;
                const v = spark.pathIndex;

                const idx1 = (u * stride + v) * 3;
                const idx2 = (nextU * stride + v) * 3;

                v1.fromArray(posAttribute.array, idx1);
                v2.fromArray(posAttribute.array, idx2);

                v1.lerp(v2, exactInd - u);

                dummy.position.copy(v1);
                dummy.lookAt(v2);
                dummy.updateMatrix();
                sparks.setMatrixAt(i, dummy.matrix);
            });
            sparks.instanceMatrix.needsUpdate = true;
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xd4af37, 2, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xc0c0c0, 2, 50);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);

        // Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let animationFrameId: number;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
            mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            torusKnot.rotation.y += 0.003;
            torusKnot.rotation.x += 0.001;

            targetRotationY = mouseX * 0.5;
            targetRotationX = mouseY * 0.5;

            torusKnot.rotation.y += 0.05 * (targetRotationY - torusKnot.rotation.y);
            torusKnot.rotation.x += 0.05 * (targetRotationX - torusKnot.rotation.x);

            updateSparks();
            renderer.render(scene, camera);
        };

        animate();

        // Fade in
        setTimeout(() => {
            if (container) container.style.opacity = "1";
        }, 500);

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="canvas-container"
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-0 transition-opacity duration-[1500ms] ease-out"
        />
    );
}