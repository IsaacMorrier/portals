<script lang="ts">
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	let w = {w: 100, h: 100} // window dimensions
	$: c = {x: w.w/2, y: w.h / 2} // window center
	let m = {x: 0, y: 0} // mouse position
	let f = {x: 0, y: 0} // face angle

	function handleMousemove(e) {
		m.x = e.clientX;
		m.y = e.clientY;

		f.x = (m.x - c.x) / c.x;
		f.y = (m.y - c.y) / c.y;
	}
	function handleResize() {
		w.w = window.innerWidth;
		w.h = window.innerHeight;
	}

	onMount(() => {
		w.w = window.innerWidth;
		w.h = window.innerHeight;
		m.x = window.innerWidth / 2;
		m.y = window.innerheight / 2;
		const scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, w.w / w.h, 0.1, 1000 );
		
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( w.w, w.h );
		document.body.appendChild( renderer.domElement );

		var geometry = new THREE.BufferGeometry();
		// create a simple square shape. We duplicate the top left and bottom right
		// vertices because each vertex needs to appear once per triangle.
		var vertices = new Float32Array( [
			-1.0, -1.0,  1.0,
			1.0, -1.0,  1.0,
			1.0,  1.0,  1.0,

			1.0,  1.0,  1.0,
			-1.0,  1.0,  1.0,
			-1.0, -1.0,  1.0
		] );

		// itemSize = 3 because there are 3 values (components) per vertex
		geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
		var material = new THREE.MeshBasicMaterial( { color: 0xffdd99 } );
		var cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		camera.position.z = 5;

		function animate() {
			requestAnimationFrame( animate );
			cube.rotation.x = f.y;
			cube.rotation.y = f.x;
			renderer.render( scene, camera );
		}
		animate();
	});
</script>

<style lang="scss">
	:global(body) {
		margin: 0;
	}
</style>

<svelte:window on:resize={handleResize} />

<svelte:head>
	<title>Portals</title>
</svelte:head>

<svelte:body on:mousemove={handleMousemove} />