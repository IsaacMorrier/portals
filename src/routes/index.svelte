<script lang="ts">
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	let w;
	let h;
	let y; // body dimensions and scroll
	let canvasTarget = "container";
	let a = {w: 100, h: 100}; // art dimensions
	$: 	c = {x: a.w / 2, y: a.h / 2}; // center, updates when art width or height changes
	let m = {x: 0, y: 0}; // mouse position
	let f = {x: 0, y: 0}; // face angle
	$:	{
		f.x = (m.x - c.x) / c.x;
		f.y = (m.y + y - c.y) / c.y;
	}

	function handleMousemove(e) {
		m.x = e.clientX;
		m.y = e.clientY;
	}

	function draw() {
		a.w = w;
		a.h = h;
		m.x = a.w / 2;
		m.y = a.h / 2;
		const scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, a.w / a.h, 0.1, 1000 );
		
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( a.w, a.h );
		document.getElementById(canvasTarget).appendChild( renderer.domElement );

		// var geometry = new THREE.BufferGeometry();
		// // create a simple square shape. We duplicate the top left and bottom right
		// // vertices because each vertex needs to appear once per triangle.
		// var vertices = new Float32Array( [
		// 	-1.0, -1.0,  1.0,
		// 	1.0, -1.0,  1.0,
		// 	1.0,  1.0,  1.0,

		// 	1.0,  1.0,  1.0,
		// 	-1.0,  1.0,  1.0,
		// 	-1.0, -1.0,  1.0
		// ] );

		// // itemSize = 3 because there are 3 values (components) per vertex
		// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
		// var material = new THREE.MeshBasicMaterial( { color: 0xffdd99 } );
		// var cube = new THREE.Mesh( geometry, material );
		// scene.add( cube );

		const geometry = new THREE.CircleBufferGeometry( 1, 32 );
		// const p = new THREE.Vector3(1, 0, 0);
		// geometry.position(p);
		const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
		const circle = new THREE.Mesh( geometry, material );
		scene.add( circle );

		camera.position.z = 5;

		function resize() {
		if (a.w != w || a.h != h) {
			a.w = w;
			a.h = h;
			renderer.setSize( a.w, a.h );
			camera.aspect =  a.w / a.h;
			camera.updateProjectionMatrix();
		}
	}

		function animate() {
			resize();
			requestAnimationFrame( animate );
			circle.rotation.x = f.y;
			circle.rotation.y = f.x;
			renderer.render( scene, camera );
		}
		animate();
	}

	onMount(() => {
		draw();
	});

</script>

<style lang="scss" global>
	body {
		margin: 0;
		width: 100%;
		height: 100%;
		background: green;
	}
	#container {
		width: 100%;
		height: 200vh;
		background: blue;
	}
</style>

<svelte:head>
	<title>Portals</title>
</svelte:head>

<svelte:window bind:scrollY={y}/>

<div id="container" bind:clientWidth={w} bind:clientHeight={h} on:mousemove={handleMousemove}></div>