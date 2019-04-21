function init() {
	var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
	
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

	var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
    
	var scene = new THREE.Scene();
    
    var light = new THREE.AmbientLight(0xffffff, 0.5); // white color
    scene.add(light);

    var light1 = new THREE.PointLight(0xffffff, 0.5); // white color
	light1.position.set(20, 30, 20);
    scene.add(light1);
	
	var x = -24, y = -45;
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
	heart.position.set(0, 0, 0);
	//add
	scene.add(heart);
	//Do stuff with the position	
	var origPosition = heart.position.clone();
	heart.origPosition = origPosition;



	//Position Camera to position
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 200;
	camera.lookAt(scene.position);
	
	//var
	var init_time = 600;
	var posSrc = { pos: 1 };
	
	
	var controls = new function () {
		this.heart_rate = 60;
	};

	var gui = new dat.GUI();
	gui.add(controls, 'heart_rate', 60, 170).onChange(function(e) {tweenControl((60*init_time)/controls.heart_rate)});

    function update() {
        console.log(posSrc.pos);
    }
	var count = 0;
	function tweenControl(animation_Time) {
		TWEEN.removeAll;
		var tween = new TWEEN.Tween(posSrc).to({ pos: 1.1 }, animation_Time);
		tween.easing(TWEEN.Easing.Linear.None);
		tween.onComplete(function(e) {console.log("Complete instance #:" + e)});
		tween.onUpdate(update);
		
		var tweenBack = new TWEEN.Tween(posSrc).to({ pos: 1 }, animation_Time);
		tweenBack.easing(TWEEN.Easing.Linear.None);
		
		tweenBack.onComplete(function(e) {console.log("Complete instance #:" + e)});
		tweenBack.onUpdate(update);
		
		tweenBack.chain(tween);
		tween.chain(tweenBack);
		
		tween.start();
	}
	
	tweenControl(init_time);
	render();	
	
	function render() {
		TWEEN.update();
		heart.scale.x = posSrc.pos;
		heart.scale.y = posSrc.pos;
		
		//rotate it
		heart.rotation.z = 3.1;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
    }
}