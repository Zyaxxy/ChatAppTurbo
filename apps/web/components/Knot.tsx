'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';



const Hero: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const container = canvasRef.current;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Torus Knot
        const geometry = new THREE.TorusKnotGeometry(9, 2.5, 120, 16);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x999999,
            emissive: 0x111111,
            metalness: 0.9,
            roughness: 0.1,
            wireframe: true,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        // Sparks
        const sparks = new THREE.InstancedMesh(
            new THREE.CircleGeometry(0.15, 3),
            new THREE.MeshBasicMaterial({
                color: 0xD4AF37,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.8,
                depthTest: false,
            }),
            100
        );
        torusKnot.add(sparks);

        const dummy = new THREE.Object3D();
        const sparkData = Array.from({ length: 100 }, () => ({
            speed: 0.001 + Math.random() * 0.002,
            progress: Math.random(),
            pathIndex: Math.floor(Math.random() * 16),
        }));

        const posAttr = geometry.attributes.position;
        const stride = 16 + 1;
        const v1 = new THREE.Vector3();
        const v2 = new THREE.Vector3();

        const updateSparks = () => {
            if (!posAttr) return;
            sparkData.forEach((spark, i) => {
                spark.progress += spark.speed;
                if (spark.progress >= 1) spark.progress = 0;

                const exactInd = spark.progress * 120;
                const u = Math.floor(exactInd);
                const nextU = (u + 1) % 120;
                const v = spark.pathIndex;

                const idx1 = (u * stride + v) * 3;
                const idx2 = (nextU * stride + v) * 3;

                v1.fromArray(posAttr.array, idx1);
                v2.fromArray(posAttr.array, idx2);
                v1.lerp(v2, exactInd - u);

                dummy.position.copy(v1);
                dummy.lookAt(v2);
                dummy.updateMatrix();
                sparks.setMatrixAt(i, dummy.matrix);
            });
            sparks.instanceMatrix.needsUpdate = true;
        };

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const pl1 = new THREE.PointLight(0xD4AF37, 2, 50);
        pl1.position.set(10, 10, 10);
        scene.add(pl1);
        const pl2 = new THREE.PointLight(0xC0C0C0, 2, 50);
        pl2.position.set(-10, -10, 10);
        scene.add(pl2);

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        const targetRotation = { x: 0, y: 0 };
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - windowHalfX) * 0.001;
            mouseY = (e.clientY - windowHalfY) * 0.001;
        };
        document.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            // Scroll Animation Start
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight;
            const progress = Math.min(scrollY / maxScroll, 1);

            // Calculate visible bounds at z=0
            const dist = camera.position.z;
            const vFOV = THREE.MathUtils.degToRad(camera.fov);
            const height = 2 * Math.tan(vFOV / 2) * dist;
            const width = height * camera.aspect;

            // Target Position (Top Left) and Scale
            const targetScale = 0.5;
            const padding = 3;
            const targetX = -width / 2 + 20;
            const targetY = height / 2 - 20;

            const currentX = THREE.MathUtils.lerp(0, targetX, progress);
            const currentY = THREE.MathUtils.lerp(0, targetY, progress);
            const currentScale = THREE.MathUtils.lerp(1, targetScale, progress);

            torusKnot.position.set(currentX, currentY, 0);
            torusKnot.scale.set(currentScale, currentScale, currentScale);
            // Scroll Animation End

            torusKnot.rotation.y += 0.003;
            torusKnot.rotation.x += 0.001;

            targetRotation.y = mouseX * 0.5;
            targetRotation.x = mouseY * 0.5;

            torusKnot.rotation.y += 0.05 * (targetRotation.y - torusKnot.rotation.y);
            torusKnot.rotation.x += 0.05 * (targetRotation.x - torusKnot.rotation.x);

            updateSparks();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onMouseMove);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div className="flex-grow flex flex-col justify-center items-center relative w-full px-6 z-10 pointer-events-none">
            <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1500"></div>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white pointer-events-none">
            </div>
        </div>
    );
};

export default Hero;
