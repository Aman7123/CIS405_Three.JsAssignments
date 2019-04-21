function init() {
	var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
	
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    
	var scene = new THREE.Scene();
    
	var ambientLight = new THREE.AmbientLight("#ffffff", 1);
	scene.add(ambientLight);
	
	var x = -20, y = -45;
	var heartShape = new THREE.Shape(); // from three.js docs
	heartShape.moveTo(x + 25, y + 25);
	heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
	heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
	heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
	heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
	heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
	heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

    var geometry = new THREE.ShapeBufferGeometry(heartShape);
	var material = new THREE.MeshBasicMaterial({
		color: 0x6294
	});

	var heart = new THREE.Mesh(geometry, material);
	scene.add(heart);

	
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 200;
	camera.lookAt(scene.position);
	
	var controls = new function () {
		this.scalingMultiplier = 0.01;
		this.beatMultiplier = 1;
	};

	var gui = new dat.GUI();
	gui.add(controls, 'scalingMultiplier', 0.005, 0.02);
	gui.add(controls, 'beatMultiplier', 1, 10);
	
	requestAnimationFrame(render);
	var count = 0;
	function render() {
		//console.log("Count: " + count);
		if(count < 30) {
			heart.scale.x += controls.scalingMultiplier;
			heart.scale.y += controls.scalingMultiplier;
			//console.log("heart scale x: " + heart.scale.x);
			//console.log("heart scale y: " + heart.scale.y);
			count += 1*controls.beatMultiplier;
		}
		if(( count >= 30 ) && ( count < 60 )) {
			heart.scale.x = heart.scale.x - controls.scalingMultiplier;
			heart.scale.y = heart.scale.y - controls.scalingMultiplier;
			//console.log("heart scale x: " + heart.scale.x);
			//console.log("heart scale y: " + heart.scale.y);
			count += 1*controls.beatMultiplier;
		}
		else if (count >= 60) {
			heart.scale.x = 1;
			heart.scale.y = 1;
			count = 0;
		}
		//console.log("count: " + count);
		heart.rotation.z = 3.1;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
    }
}