import * as THREE from 'three';

//scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//general cube material, wireframe and geometry
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const _cubeWireframe = new THREE.EdgesGeometry(cubeGeometry);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    specular: 0x555555,
    shininess: 50,
    normalScale: 0,
});

//array of cubes and their wireframes
var cubes = new Array(5); 
var wireframes = new Array(5);
for (let i = 0; i < 5; i++) {
    cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
    wireframes[i] = new THREE.LineSegments(_cubeWireframe);

    cubes[i].position.set(-5 + 5*i, 0, 0 + -5*i);
    wireframes[i].position.set(-5 + 5*i, 0, 0 + -5*i);
}
for (let i = 0; i < 5; i++) {
    scene.add(cubes[i]);
    scene.add(wireframes[i]);
}

//directional light
const light = new THREE.DirectionalLight(0x888888, 0.35);
light.castShadow = true;
light.position.set(0, 0, 10);
light.lookAt(0,0,0);
scene.add(light);

//main loop
function animate() {
    requestAnimationFrame(function () {
        animate();
    });

    for (let i = 0; i < 5; i++) {
        cubes[i].rotation.x += 0.01;
        cubes[i].rotation.y += 0.01;
        wireframes[i].rotation.x += 0.01;
        wireframes[i].rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
animate();
