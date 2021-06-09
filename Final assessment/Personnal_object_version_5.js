console.log("helloo I am preinting")

import * as THREE from 'https://unpkg.com/three/build/three.module.js';
// to move the camera
import {OrbitControls} from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';
// to add gravity to the object

//import C from 'https://unpkg.com/cannon-es@0.17.1/dist/cannon-es.js'


// 3D sketch
init();

var scene, camera, renderer, controls, object_Storage;
var name = '';

const object_name = [];
const object_room = [];
const object_number_of_item = [];
const object_link_to_me = [];
const object_category= [];

function init() {
  //put the js file in the canvas
 const canvas = document.querySelector('#c');
 renderer = new THREE.WebGLRenderer({canvas});
//set the color of the background
 renderer.setClearColor(0xf5d5d3);

 window.requestAnimationFrame(animate);

 //camera orbit

 const fov = 75; //field of view
 const aspect = window.innerWidth/window.innerHeight;  // the canvas default -Aspect ratio
 const near = 0.1; //Near clipping pane
 const far = 1000; // Far clipping pane
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

 //camera position
 camera.position.y = 5;
 camera.position.x = -1;
 camera.position.z = 10;




 controls = new OrbitControls(camera, renderer.domElement);

  controls.target.set(4.5, 0, 4.5);

  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;

  controls.enableDamping = true;

  const timeStep = 1 / 60 // seconds
  let lastCallTime


// create a new scene
  scene = new THREE.Scene();


 // light
 const color = 0xFFFFFF;
 const intensity = 1;

 const light = new THREE.AmbientLight(color, 0.7);
 light.position.set(0, 2, 4);
 scene.add(light);

 const light1 = new THREE.DirectionalLight(color, intensity);
 light1.position.set(-1, 2, 4);
 scene.add(light1);



 // Music and sound of the Scene
/*
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
*/
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
//Bedroom
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

  // Make the character move and make the camera follow it

  UserMesh.position.x = 1;
  UserMesh.position.z = 1;
  UserMesh.position.y = 1;

  scene.add(UserMesh);

// OBJECT CREATION
  // Here The object are created

  object_Storage = new THREE.Group();
  let i = 1;

  object_creation()

  async function get_Data(){
    // CSV Data handling
    // take the data from the CSV file and push into the array above
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
   //this class define each object
   constructor(){
     this.i = i;
     this.name = object_name;
     this.room = object_room;
     this.number_of_item = object_number_of_item;
     this.link_to_me = object_link_to_me;
     this.category = object_category;
   }

   position(){
     // give the position to the object depending in what room it is

     this.x_position =  0;
     this.y_position =  0;
     this.z_position =  0;

     if ( (this.room[this.i] === "Bedroom ") || (this.room[this.i] === "Bedroom") || (this.room[this.i] === "bedroom ") || (this.room[this.i] === "bedroom") ){
       this.x_position =  0;
       this.y_position =  1;
       this.z_position =  3;
     }
     if ((this.room[this.i] === "Desk ") || (this.room[this.i] === "Desk") || (this.room[this.i] === "desk ") || (this.room[this.i] === "desk")){
       this.x_position =  2;
       this.y_position =  1;
       this.z_position =  -2;
     }
     if ((this.room[this.i] === "Wardrob ") || (this.room[this.i] === "Wardrob") || (this.room[this.i] === "wardrob ") || (this.room[this.i] === "wardrob")){
       this.x_position =  -5;
       this.y_position =  1;
       this.z_position =  1;
     }
     if ((this.room[this.i] === "Storage ") || (this.room[this.i] === "Storage") || (this.room[this.i] === "storage ") || (this.room[this.i] === "storage")){
       this.x_position =  2;
       this.y_position =  1;
       this.z_position =  5;
     }
     if ((this.room[this.i] === "Bathroom ") || (this.room[this.i] === "Bathroom") || (this.room[this.i] === "bathroom ") || (this.room[this.i] === "bathroom")){
       this.x_position = -5 ;
       this.y_position =  1;
       this.z_position =  -10;
     }
     if ((this.room[this.i] === "Kitchen ") || (this.room[this.i] === "Kitchen") || (this.room[this.i] === "kitchen ") || (this.room[this.i] === "kitchen")){
       this.x_position =  -9.5;
       this.y_position =  1;
       this.z_position =  5;
     }
     if ((this.room[this.i] === "Other ") || (this.room[this.i] === "Other") || (this.room[this.i] === "other ") || (this.room[this.i] === "other")){
       this.x_position =  5;
       this.y_position =  1;
       this.z_position =  4;
     }

   }

   color(){
     // give the object a color in function of my relationship to it
      this.color = "rgb(255,255,255)"

      if (this.link_to_me[this.i] == "1"){
        // my favorite object
        this.color =  "rgb(243,247,0)"
      }
      if (this.link_to_me[this.i] == "2"){
        // object that I need or like a lot
        this.color =  "rgb(247, 157, 0)"
      }
      if (this.link_to_me[this.i] == "3"){
        //object that I need sometimes or I like having them around
        this.color = "rgb(247, 8, 0)"
      }
      if (this.link_to_me[this.i]  == "4"){
        // Object I keep in case
        this.color =  "rgb(0, 247, 58)"
      }
      if (this.link_to_me[this.i]  == "5"){
        // stock of object - I will use it at some point
        this.color = "rgb(0, 235, 247)"
      }
      if (this.link_to_me[this.i]  == "6"){
        // Object I would like to get ride out and are a weight to me
        this.color =  "rgb(0,0,0)"
      }

   }

   creation_of_object(){

     this.color();
     this.position();

     const geometry = new THREE.BoxGeometry(0.2/*radius*/, 0.2/*widthsegment*/, 0.2/*height Segments*/);
     const material = new THREE.MeshLambertMaterial({color : this.color});

     this.Object = new THREE.Mesh(geometry, material);
     this.Object.position.set(this.x_position, this.y_position + (0.2*this.i),this.z_position)

     this.Object.userData.draggable = true;
     this.Object.userData.name = this.name[this.i];
     this.Object.userData.current_Object = this.i;


     console.log(this.Object.userData.name);
   }
  }



  async function object_creation(){
    await get_Data();

    for (i=1; i< object_name.length; i++){
        let Object_creation = new object(i, object_name, object_room, object_number_of_item, object_link_to_me, object_category);

        Object_creation.creation_of_object();

        object_Storage.add(Object_creation.Object);




    }
  }
  scene.add(object_Storage);

}

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selected_Object;


function mouseMove(event){
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function reset_Objects(){
  for (let b = 0; b <  object_Storage.children.length; b++){
    if( object_Storage.children[b].material){
       object_Storage.children[b].material.opacity =  object_Storage.children[b].userData.current_Object == selected_Object ? 0.5 : 1.0;
    }
  }
}

function hover_Objects() {
// update the picking ray with the camera and mouse position
  raycaster.setFromCamera( mouse, camera );
  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects( object_Storage.children );

  for ( let a = 0; a < intersects.length; a ++ ) {
    intersects[ a ].object.material.transparent = true;
    intersects[ a ].object.material.opacity = 0.5;
  }
  renderer.render( scene, camera );
}

function onClick(event){
  raycaster.setFromCamera( mouse, camera );

  let intersects = raycaster.intersectObjects( object_Storage.children );

  if (intersects.length > 0){
    selected_Object = intersects[0].object.userData.current_Object;
    console.log(object_name[selected_Object])
    document.getElementById("paragraph_Object_Name").innerHTML = object_name[selected_Object];

  }

}

window.addEventListener( 'mousemove', mouseMove, false );
window.addEventListener( 'click', onClick );
window.requestAnimationFrame(hover_Objects);

//ANiMATE SCENE

function animate() {
   controls.update();
   renderer.render(scene, camera);
   window.requestAnimationFrame(animate);

   hover_Objects();
   reset_Objects();
}


// SCREEN SIZE HANDLING

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

// render the forms with higher pixel
function render(time) {
time *= 0.001;

if (resizeRendererToDisplaySize(renderer)) {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

renderer.render(scene, camera);
// need this for the scene not to become squished or elongated
requestAnimationFrame(render);

}
requestAnimationFrame(render);
