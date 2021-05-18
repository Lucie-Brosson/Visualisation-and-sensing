console.log('it works')

var scene, camera, renderer, cube;

function init() {

  scene = new.THREE.Scne();
  camera = new THREE.PerspectiveCamera(75, 649/450, 0.1, 1000);

}
/*
//import { OrbitControls } from 'Final assessment\js\three\examples\jsm\controls\OrbitControls.js'

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
      const Bedroomgeometry = new THREE.BoxGeometry(1/*boxWidth*/, 0.25/*boxHeight*/, 1/*boxDepth*/);
      const BedroomMesh = new THREE.Mesh(Bedroomgeometry, BedroomMaterial);
      BedroomMesh.position.x = -2;

      scene.add(BedroomMesh);


// Bethroom
      const BathroomMaterial = new THREE.MeshLambertMaterial({
        color : 0xaa8844,
      });
      const Bathroomgeometry = new THREE.BoxGeometry(1/*boxWidth*/, 0.25/*boxHeight*/, 1/*boxDepth*/);
      const BathroomMesh = new THREE.Mesh(Bathroomgeometry, BathroomMaterial);
      BathroomMesh.position.x = 2;

      scene.add(BathroomMesh);


// Kitchen
      const KitchenMaterial = new THREE.MeshLambertMaterial({
        color : 0x8844aa,
      });
      const Kitchengeometry = new THREE.BoxGeometry(1/*boxWidth*/, 0.25/*boxHeight*/, 1/*boxDepth*/);
      const KitchenMesh = new THREE.Mesh(Kitchengeometry, KitchenMaterial);
      KitchenMesh.position.x = 0;

      scene.add(KitchenMesh);





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
