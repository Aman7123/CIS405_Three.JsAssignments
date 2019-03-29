// basic.js
function init() {
    
	console.log("Using THREE.js version: " + THREE.REVISION);

    var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });

    renderer.setClearColor(0x0000ff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // create perspective camera with params: (35, window.innerWidth / window.innerHeight, 0.1, 3000)
	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    
	// create a scene
	var scene = new THREE.Scene();
    
	// create an ambient light with white color and 0.5 intensity & add it to the scene
	var ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
	scene.add(ambientLight);

    
	// https://THREEjs.org/docs/index.html#api/en/lights/PointLight
	// create a pointlight with white color and 0.5 intensity & add it to the scene
	var pointColor = "#ffffff";
	var pointLight = new THREE.PointLight(pointColor, 0.5);
	//scene.add(pointLight);
   

	// create a BoxGeometry with dimensions: 10, 10, 10
	var boxBox = new THREE.BoxGeometry(10, 10, 10);
	// create MeshLambertMaterial with your choice of color
	var cubeMaterial = new THREE.MeshLambertMaterial({
		color: Math.random() * 0xa0ffff
	});
    // create a mesh from your geometry and material
    var myCube = new THREE.Mesh(boxBox, cubeMaterial);

   // add your mesh/cube to the scene
   scene.add(myCube);

    // set pointlight position at 20,30,20 (you can play with position)
	pointLight.position.set(20, 30, 20);
	// add your pointlight to the scene
	scene.add(pointLight);

    // position and point the camera to the center of the scene, try position: 20, 11, 50
	camera.position.x = 20;
	camera.position.y = 11;
	camera.position.z = 50;
	camera.lookAt(scene.position);
   

	var controls = new function () {
		// variable for rotation
		this.isRotating = true;
		
		// variable for position
		this.positionX = 0;
		this.positionY = 0;
		this.positionZ = 0;
		
		// variable for visibility
		this.visible = true;
		
	};
	
	// you are going to animate the box by rotating it in 0.01 steps in the render loop (initially box is rotating)
	// the check box from dat.GUI will stop (uncehcked) or start (checked) the box rotation
	// so you need a control variable that is bound to the checkbox
	var gui = new dat.GUI();
	gui.add(controls, 'isRotating');
	// you will also need to create a dat.GUI folder (dropdown) control that is bound to (see 02-01.js as an example)
	// to the x, y, and z position of the box
	// set range of values for these as: x=-10,20; y=-4,20; z=-10,10
	guiPosition = gui.addFolder('position');
	var Xpos = guiPosition.add(controls, 'positionX', -10, 20);
	var Ypos = guiPosition.add(controls, 'positionY', -4, 20);
	var Zpos = guiPosition.add(controls, 'positionZ', -10, 10);
	// when the user clicks on the contol it opens the THREE slider controls user will interact with
	// these controls are bound to the x,y,z positionof the box
	// any changes should change the position of the box
	Xpos.listen();
	Xpos.onChange(function (value) {
	  myCube.position.x = controls.positionX;
	});

	Ypos.listen();
	Ypos.onChange(function (value) {
	  myCube.position.y = controls.positionY;
	});

	Zpos.listen();
	Zpos.onChange(function (value) {
	  myCube.position.z = controls.positionZ;
	});
	
	// hide or show box
	gui.add(controls, 'visible'); 

    requestAnimationFrame(render);
	// write your render animation function/loop here
    function render() {
		myCube.visible = controls.visible;
		
		scene.traverse(function (a) {
			if (a instanceof THREE.Mesh) {
				if (controls.isRotating) {
					a.rotation.x += 0.01;
					a.rotation.y += 0.01;
					a.rotation.z += 0.01;					
				}
			}
		});
		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
    }
}