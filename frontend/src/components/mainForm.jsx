"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import styles from "./MainForm.css";

function MainForm() {
  const canvasRef = useRef();
  let rotationDirection = 0.0005; // 초기 회전 방향
  let lastDirectionChangeTime = Date.now();

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //camera.position.set(0, -130, 170);
    camera.position.set(55, 90, 150); // 카메라를 모델 앞쪽에 배치
    camera.lookAt(0, 0, 0); // 카메라가 모델 중심을 바라보도록 설정

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    scene.background = new THREE.Color("#f5cae6");
    const group = new THREE.Group();

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const unrealBloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    //composer.addPass(unrealBloom);
    unrealBloom.renderToScreen = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xe75690, 5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      "/models/candy_cartoon_scene/scene.gltf", // Next.js의 public 디렉토리에 모델을 저장
      (gltf) => {
        gltf.scene.traverse((object) => {
          if (object.isMesh && object.material) {
            object.material.transparent = true;
            object.material.opacity = 1.2;
          }
        });
        gltf.scene.position.set(0, 35, 0); // 모델을 화면 중앙으로 이동
        gltf.scene.scale.set(10, 15, 10); // 모델 크기 조정
        group.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("An error happened", error);
      }
    );
    group.position.set(0, 6, 60);
    scene.add(group);


    // 창 크기 변경 시 리사이즈 이벤트 처리
    const handleResize = () => {
      const container = canvasRef.current.parentElement; // 캔버스의 부모 요소 가져오기
      const width = container.offsetWidth; // 부모 요소의 너비
      const height = container.offsetHeight; // 부모 요소의 높이
    
      // 카메라 종횡비 업데이트
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    
      // 렌더러 크기 업데이트
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
      
    window.addEventListener("resize", handleResize);
    handleResize();
    

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const currentTime = Date.now();
      if (currentTime - lastDirectionChangeTime > 6000) {
        rotationDirection *= -1;
        lastDirectionChangeTime = currentTime;
      }
      controls.update();
      group.rotation.z += rotationDirection;
      composer.render();
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      scene.clear();
      scene.traverse((object) => {
        if (object.isMesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <div className="text-overlay">
        <p>대학생, 직장인을 위한,</p>
        <p>방과후 무용클래스 <span className="/root-color">Rêve</span></p>
        <p className="apply-button">클래스 신청하기</p>
      </div>
    </div>
  );
}


export default MainForm;
