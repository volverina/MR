import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "targets.mind",
		});

		const {renderer, scene, camera} = mindarThree;

		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.5});
		const plane = new THREE.Mesh(geometry, material);
		
		const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
		const cube_material = new THREE.MeshBasicMaterial({color: "#0000FF", transparent: true, opacity: 0.7});
		const cube = new THREE.Mesh(cube_geometry, cube_material);

		cube.position.set(1.5, 0, 0);
		cube.rotation.set(0, Math.PI/4, 0);
		
		const sphere_geometry = new THREE.SphereGeometry( 0.5, 32, 16 ); 
		const sphere_material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
		const sphere = new THREE.Mesh( sphere_geometry, sphere_material );
		
		sphere.position.set(0, 1, 0);

		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(plane);
		anchor.group.add(cube);
		anchor.group.add(sphere);
		
		await mindarThree.start();
		
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	}
	start();
});

