console.log("helloo I am preinting")

import * as THREE from 'https://unpkg.com/three/build/three.module.js';

import {OrbitControls} from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';


 // 3D sketch

 function main() {
   const canvas = document.querySelector('#c');
   const renderer = new THREE.WebGLRenderer({canvas});

 //set the color of the background
   renderer.setClearColor(0xf5d5d3);

   //camera

   const fov = 75; //field of view
   const aspect = window.innerWidth/window.innerHeight;  // the canvas default -Aspect ratio
   const near = 0.1; //Near clipping pane
   const far = 1000; // Far clipping pane
   const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

   //camera position
   camera.position.y = -5;
   camera.position.x = -1;
   camera.position.z = 10;


   var  controls = new OrbitControls(camera, renderer.domElement);

  controls.target.set(4.5, 0, 4.5);

  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;

  controls.enableDamping = true;

  window.requestAnimationFrame(animate);
   // Point the camera at a given coordinate
 // camera.lookAt(new THREE.Vector3(0,0,0));

 function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}


   const scene = new THREE.Scene();

   // light
   const color = 0xFFFFFF;
   const intensity = 1;

   const light = new THREE.AmbientLight(color, 0.7);
   light.position.set(0, 2, 4);
   scene.add(light);

   //var light1 = new THREE.Poin

   const light1 = new THREE.DirectionalLight(color, intensity);
   light1.position.set(-1, 2, 4);
   scene.add(light1);

   // Music and sound of the Scene


   const listener = new THREE.AudioListener();
   camera.add( listener );

   const sound = new THREE.Audio( listener );

   const audioLoader = new THREE.AudioLoader();
   audioLoader.load( './city_sound.wav', function( buffer ) {
  	sound.setBuffer( buffer );
  	sound.setLoop( true );
  	sound.setVolume( 0.05 );
  	sound.play();
   });

   // add music


// From this point the code is generating object (the plan, the delimitation of the ground, ect)

   // plane - floor


   var materialFloor = new THREE.MeshLambertMaterial({
       color:0x44aa88,
       emissive : 0x44aa88,
       wireframe : true

     });

   var PlaneFloorGeometry = new THREE.PlaneGeometry( 100, 100, 100, 100 );
   var FloorMesh = new THREE.Mesh(PlaneFloorGeometry, materialFloor);

   FloorMesh.rotateX(Math.PI/2);
   FloorMesh.position.y = -1;
   scene.add(FloorMesh);

   // Delimitation of the rooms

   const BedroomMaterial = new THREE.MeshLambertMaterial({
     color : 0x44aa88,
   });
   const Bedroomgeometry = new THREE.BoxGeometry(15/*boxWidth*/, 0.25/*boxHeight*/, 10/*boxDepth*/);
   const BedroomMesh = new THREE.Mesh(Bedroomgeometry, BedroomMaterial);
   BedroomMesh.position.x = -2;
   BedroomMesh.position.z = 2;


   scene.add(BedroomMesh);


// Bathroom
   const BathroomMaterial = new THREE.MeshLambertMaterial({
     color : 0xd9ca48,
   });
   const Bathroomgeometry = new THREE.BoxGeometry(7.5/*boxWidth*/, 0.3/*boxHeight*/, 5/*boxDepth*/);
   const BathroomMesh = new THREE.Mesh(Bathroomgeometry, BathroomMaterial);
   BathroomMesh.position.x = -5.75;
   BathroomMesh.position.z = 4.5;

   scene.add(BathroomMesh);


// Kitchen
   const KitchenMaterial = new THREE.MeshLambertMaterial({
     color : 0x8844aa,
   });
   const Kitchengeometry = new THREE.BoxGeometry(8/*boxWidth*/, 0.35/*boxHeight*/, 8/*boxDepth*/);
   const KitchenMesh = new THREE.Mesh(Kitchengeometry, KitchenMaterial);
   KitchenMesh.position.x = -5.25;
   KitchenMesh.position.z = -8;

   scene.add(KitchenMesh);


//pedestal for my favorite object

 const Pedestal1Material = new THREE.MeshLambertMaterial({
   color : 0xf589f3,
 });
 const Pedestal1geometry = new THREE.BoxGeometry(0.75/*boxWidth*/, 3/*boxHeight*/, 0.75/*boxDepth*/);
 const Pedestal1Mesh = new THREE.Mesh(Pedestal1geometry, Pedestal1Material);
 Pedestal1Mesh.position.x = -11;
 Pedestal1Mesh.position.z = 0;

 scene.add(Pedestal1Mesh);

 const Pedestal2Material = new THREE.MeshLambertMaterial({
   color : 0xf589f3,
 });
 const Pedestal2geometry = new THREE.BoxGeometry(0.75/*boxWidth*/, 2.5/*boxHeight*/, 0.75/*boxDepth*/);
 const Pedestal2Mesh = new THREE.Mesh(Pedestal2geometry, Pedestal2Material);
 Pedestal2Mesh.position.x = -11;
 Pedestal2Mesh.position.z = -1;

 scene.add(Pedestal2Mesh);

 const Pedestal3Material = new THREE.MeshLambertMaterial({
   color : 0xf589f3,
 });
 const Pedestal3geometry = new THREE.BoxGeometry(0.75/*boxWidth*/, 2/*boxHeight*/, 0.75/*boxDepth*/);
 const Pedestal3Mesh = new THREE.Mesh(Pedestal3geometry, Pedestal3Material);
 Pedestal3Mesh.position.x = -11;
 Pedestal3Mesh.position.z = 1;

 scene.add(Pedestal3Mesh);


 // User character

 const UserMaterial = new THREE.MeshLambertMaterial({
   color : 0xf589f3,
 });
 const Usergeometry = new THREE.SphereGeometry(0.6/*radius*/, 14/*widthsegment*/, 14/*height Segments*/);
 const UserMesh = new THREE.Mesh(Usergeometry, UserMaterial);

// Make the character move and make the camera fllow it

 UserMesh.position.x = 1;
 UserMesh.position.z = 1;
 UserMesh.position.y = 1;

 scene.add(UserMesh);

// Here The object are created
 // object

 // CSV Data handling

 getData();
 object_creation();


  const object_room = [];
  const object_number_of_item = [];
  const object_link_to_me = [];

  const object_name = [];

  const object_category=[];


 async function getData(){
   const response = await fetch('./test.csv');
   const data = await response.text();

   console.log('get data is working');
   const rows = data.split('\n');

   rows.forEach(item => {
     const columns = item.split(',');
     object_name.push(columns[0]);
     object_room.push(columns[1]);
     object_number_of_item.push(columns[2]);
     object_link_to_me.push(columns[3]);
     object_category.push(columns[4]);

   })
 }

 class object {
   constructor(){
     await getData();

     this.object_name = object_name;
     console.log(this.object_name);
     console.log ('the class is working');

   }
 }

 let Object_creation = new object(object_name[1]);






 //rendering to the size of the client canvas
   function resizeRendererToDisplaySize(renderer) {
     const canvas = renderer.domElement;
     const width = canvas.clientWidth;
     const height = canvas.clientHeight;
     const needResize = canvas.width !== width || canvas.height !== height;
     if (needResize) {
       renderer.setSize(width, height, false);
     }
     return needResize;
   }

   function render(time) {
     time *= 0.001;
 // rendering with higher pixel
     if (resizeRendererToDisplaySize(renderer)) {
       const canvas = renderer.domElement;
       camera.aspect = canvas.clientWidth / canvas.clientHeight;
       camera.updateProjectionMatrix();
     }

     // modify the angle of the camera - doesn't work


 //animation of the cubes
   /*  cubes.forEach((cube, ndx) => {
       const speed = 1 + ndx * .1;
       const rot = time * speed;
       cube.rotation.x = rot;
       cube.rotation.y = rot;
     });
*/
     renderer.render(scene, camera);

     requestAnimationFrame(render);
   }

   requestAnimationFrame(render);
 }



 main();
