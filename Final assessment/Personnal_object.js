console.log("helloo I am preinting")

//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r127/three.module.js';
//import {OrbitControls} from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';


// Annalyse the data and seperates it
// TO do  : create different function depending what I want
// Room -> category -> link to me Attention for the number of object will need to multiply
 /*const loader = new THREE.Fileloader();

 loader.load(
   'Life_data.csv',
   function (data){
     console.log(data)
   },

   function (xhr){
     console.log((xhr.loaded/xhr.total * 100)+ ' % loaded');
   },

   function (err) {
     console.error ('An error happened in the CSV loading');
   }
 );*/
/*
d3.csv("Life_data.csv")
   .then (function (data) {
     let newData = data.map(d => ({
       object : d.objet,
       room : d.Room,
       number_of_item : +d.number,
       link_to_me : +d.Link,
       category : d.Category,
       is_it_decoration : d.is_it_decoration
     }));

     return newData;
   })
   .then(function (data) {
     let sort_link = data.sort((a, b) => d3.ascending(a.link_to_me, b.link_to_me));

     let count_sorted_link = d3.group(sort_link, d => d.link_to_me);

     let test1 = d3.rollup(sort_link, v => v.length, d=> d.link_to_me)

     let test2 = (Array.from(test1))

     console.log (sort_link)
     console.log (count_sorted_link)
     console.log(test1)
     console.log (test2)

    return test2
   })

   .then(function(data){
     console.log(data)
     draw_rect(data)
   })
*/


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
   camera.position.set(5,5,0);

   // Point the camera at a given coordinate
  camera.lookAt(new THREE.Vector3(0,0,0));


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


   // plane - floor
   // TO do {
     // make the plane visible without wireframe

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


// Bethroom
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
