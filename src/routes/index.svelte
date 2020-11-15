<script lang="ts" type="module">

	import * as THREE from 'three';
	import { onMount } from 'svelte';

	let scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		renderer: THREE.WebGLRenderer,
		width: number,
		height: number,
		y: number,
		art = { width: 100, height: 100},
		meshes: THREE.Mesh<THREE.CircleBufferGeometry,THREE.MeshBasicMaterial>[] = [];

	let canvasTarget = 'container';

	const portals = [
		{
			scale: .2,
			pos: { x: -.65, y: -.75, z: 0 },
			face: { x: 1, y: 0, z: 0 },
			mat: 0x2364AA
		},{
			scale: 0.17,
			pos: { x: .6, y: -.6, z: 0},
			face: { x: 0, y: 1, z: 0 },
			mat: 0x3DA5D9
		},{
			scale: 0.1,
			pos: { x: -.2, y: -.1, z: 0},
			face: { x: 0, y: 0, z: 2 },
			mat: 0x73BFB8
		},{
			scale: 0.15,
			pos: { x: -.65, y: .45, z: 0},
			face: { x: 0, y: 0, z: 0 },
			mat: 0xFEC601
		},{
			scale: 0.24,
			pos: { x: .45, y: .6, z: 0},
			face: { x: 0, y: 0, z: 0 },
			mat: 0xEA7317
		}
	];

	let center = { x: (width / 2), y: (height / 2) };
	let mouse = { x: center.x, y: center.y };

	// $: 	c = {x: art.width / 2, y: art.height / 2}; // center, updates when art width or height changes
	// let face = {x: 0, y: 0}; // face angle
	// $:	{
	// 	f.x = (m.x - c.x) / c.x;
	// 	f.y = (m.y + y - c.y) / c.y;
	// }

	function init() {
		art.width = width;
		art.height = height;

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 50, art.width / art.height, 0.1, 1000 );
		camera.position.z = 8;
		
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( art.width, art.height );
		document.getElementById(canvasTarget).appendChild( renderer.domElement );

		portals.forEach(
			(portal, index) => {
				let geometry = new THREE.CircleBufferGeometry( (portal.scale * art.width / 100), 32, 0, 6);
				let material = new THREE.MeshBasicMaterial( { color: portal.mat } );
				const mesh = new THREE.Mesh( geometry, material );
				mesh.position.x = portal.pos.x * art.width / 210;
				mesh.position.y = portal.pos.y * art.height / -210;
				mesh.position.z = portal.pos.z;
				mesh.rotation.x = portal.face.x;
				mesh.rotation.y = portal.face.y;
				mesh.rotation.z = portal.face.z;
				scene.add( mesh );
				meshes.push( mesh );
			});

		function resize() {
			if (art.width != width || art.height != height) {
				art.width = width;
				art.height = height;
				renderer.setSize( art.width, art.height );
				camera.aspect =  art.width / art.height;
				camera.updateProjectionMatrix();
			}
		}

		function animate() {
			resize();
			requestAnimationFrame( animate );
			// meshes[0].rotation.x = (mouse.y + y - center.y) / center.y;
			// meshes[0].rotation.y = 1.5;
	// 	f.y = (m.y + y - c.y) / c.y;
			// meshes[0].rotation.x = f.y;
			// meshes[0].rotation.y = f.x;
			renderer.render( scene, camera );
		}
		animate();
	}

	onMount(() => {
		init();
	});

	function handleMousemove(e) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

</script>

<style lang="scss" global>
	body {
		margin: 0;
		width: 100%;
		height: 100%;
		background: green;
	}
	#container {
		width: 100vw;
		height: 800px;
		background: blue;
		margin-top: 30vh;
	}
	footer {
		height: 80vh;
	}
</style>

<svelte:head>
	<title>Portals</title>
</svelte:head>

<svelte:window bind:scrollY={y}/>

<div id="container" bind:clientWidth={width} bind:clientHeight={height} on:mousemove={handleMousemove}></div>
<footer></footer>