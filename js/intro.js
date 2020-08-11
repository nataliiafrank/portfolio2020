// Code based off the codrops tutorial 
//by Mario Carrillo: https://tympanus.net/codrops/2019/10/10/create-text-in-three-js-with-three-bmfont-text/

global.THREE = require("three");
const THREE = global.THREE;
const OrbitControls = require("three-orbit-controls")(THREE);
const loadFont = require("load-bmfont");
const createGeometry = require("three-bmfont-text");
const MSDFShader = require("three-bmfont-text/shaders/msdf");
const vertexShader = require("../vertex.glsl");
const fragmentShader = require("../fragment.glsl");
const clock = new THREE.Clock();
import { bp } from './utilities';

const sceneContainer = document.querySelector('#scene-container')

// Font assets
const fontFile = require("../fonts/LibreBaskerville-Bold.fnt");
const fontAtlas = require("../fonts/LibreBaskerville-Bold.png");

let container, scene, camera, renderer, mesh;

function init(geometry, texture) {
	container = sceneContainer;
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 
		75, // fov
		container.clientWidth/container.clientHeight, // aspect ratio
		0.1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 200;

	// Renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0xf8f8f8);
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	// Controls
	//const controls = new OrbitControls(camera, renderer.domElement);

	// Load font files to initialize renderer
	loadFont();
		// add a uniform for the amplitude
		uniforms = {
			amplitude: {
				type: 'f', // a float
				value: 0
			}
		};

	// Create material with msdf shader from three-bmfont-text
	const material = new THREE.RawShaderMaterial(MSDFShader({
		vertexShader,
		fragmentShader,
		map: texture,
		side: THREE.DoubleSide,
		transparent: true,
		negate: false,
	}));

	// Create time uniform from default uniforms object
	material.uniforms.time = { type: 'f', value: 0.0 };

	// Create mesh of text
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-120, -30, 0); // Move according to text size

	if(window.innerWidth < bp.tablet) {
		mesh.position.z = -300;
	} else {
		mesh.position.z = 0;
	}

	mesh.rotation.set(Math.PI, -Math.PI/7, 0); // Spin to face correctly
	mesh.name = 'text-mesh';
	scene.add(mesh);
}

function render() {
	// Update time uniform each frame
	const mesh = scene.getObjectByName('text-mesh');
	mesh.material.uniforms.time.value = clock.getElapsedTime();
	mesh.material.uniformsNeedUpdate = true;

	renderer.render( scene, camera );
}

// animation loop
const animate = function () {
	requestAnimationFrame(animate);

	render();
};

const onWindowResize = function() {
	// set the aspect ratio to match the new browser window aspect ratio
	camera.aspect = container.clientWidth / container.clientHeight;

	if(window.innerWidth < bp.tablet) {
		mesh.position.z = -300;
	} else {
		mesh.position.z = 0;
	}
	
	// update the camera's frustum
	camera.updateProjectionMatrix();

	// update the size of the renderer AND the canvas
	renderer.setSize( container.clientWidth, container.clientHeight );
}

// Event listeners
window.addEventListener('resize', onWindowResize);

export const initialize = () => {
	// if(!skillsParent) {
	// 	return;
	// }

	loadFont(fontFile, (err, font) => {
		// Create a geometry of packed bitmap glyphs
		const geometry = createGeometry({
			font,
			text: `Nataliia Frank
				UI Developer`
		});
		
		// Load texture containing font glyphs
		const loader = new THREE.TextureLoader();
		loader.load(fontAtlas, (texture) => {
			// Start and animate renderer
			init(geometry, texture);
			animate();
		});
	});

	// Resize event
	window.addEventListener('resize', onWindowResize);
}