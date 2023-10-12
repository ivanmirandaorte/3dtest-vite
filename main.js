import * as THREE from 'three'; 
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import earth from '../3dtest-vite/models/earth.glb'

const container = document.querySelector('#threejs-container'); 

// setting up the scene, camera and render
const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer();

/**
 * Lights
 */
const light = new THREE.AmbientLight(0xffffff, 0.5);  // white light
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

/**
 * Orbit Controls 
 */
const controls = new OrbitControls(camera, renderer.domElement); 

/**
 * Loader
 */
const loader = new GLTFLoader(); 
loader.load(earth, (gltf) => {
  gltf.scene.position.set(1, 1, 1);
  gltf.scene.scale.set(.5, .5, .5)
  scene.add(gltf.scene); 
}, undefined, (error) => {
  console.error(error)
})

renderer.setSize(window.innerWidth, window.innerHeight); 
// document.body.appendChild(renderer.domElement);
container.appendChild(renderer.domElement);

// setting up object 1
const geometry = new THREE.BoxGeometry(1,1,1); 
const material = new THREE.MeshBasicMaterial({color:0xff000});
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube); 

camera.position.z = 100;
camera.lookAt(scene.position)

function animate() {
  requestAnimationFrame(animate);

  controls.update(); 

  cube.rotation.x += 0.01; 
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});