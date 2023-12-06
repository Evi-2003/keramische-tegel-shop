import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFrame } from 'react-three-fiber';
export default function ThreejsProduct({ imageUrl }) {
    const mountRef = useRef(null);
    const cubeRef = useRef(null);

    useEffect(() => {
      let scene, camera, renderer, controls;
      let frameId;


    scene = new THREE.Scene();


    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const aspect = width / height;
    camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 500);
    camera.position.z = 140


    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);


    controls = new OrbitControls(camera, renderer.domElement);

 
    const light1 = new THREE.AmbientLight(0xffffff,1.7);
    light1.position.set(0, 0, 0);
    scene.add(light1);

  
    if (!mountRef.current.firstChild) {
      mountRef.current.appendChild(renderer.domElement);
    } else {
      mountRef.current.replaceChild(renderer.domElement, mountRef.current.firstChild);
    }


    const cubeGeometry = new THREE.BoxGeometry(80, 80, 3);    
    const cubeMaterial = new THREE.MeshPhongMaterial({ shininess: 100 });
    cubeRef.current = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeRef.current);
    let isComponentMounted = true;

    const animate = () => {
        if (!isComponentMounted) return; 
  
        controls.update();
        frameId = requestAnimationFrame(animate);  
  
        if (cubeRef.current) {
            cubeRef.current.rotation.x += 0.0005;
            cubeRef.current.rotation.y += 0.0005;
    
            if (cubeRef.current.rotation.x >= 2 * Math.PI) {
                cubeRef.current.rotation.x = 0;
            }
    
            if (cubeRef.current.rotation.y >= 2 * Math.PI) {
                cubeRef.current.rotation.y = 0;
            }
        }
        
        renderer.render(scene, camera);
      };
  
      animate();
  
      return () => {
        isComponentMounted = false;
        if (frameId !== undefined) {
          cancelAnimationFrame(frameId);
        }

      };
    }, []);
  

    useEffect(() => {
        if (cubeRef.current) {
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(imageUrl, (texture) => {
            cubeRef.current.material.map = texture;
            cubeRef.current.material.needsUpdate = true;
          });
        }
      }, [imageUrl]);

  return <div ref={mountRef} style={{width: '100%', height: '100%'}}></div>;
}
