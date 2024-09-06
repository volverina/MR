import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "../assets/harris.mind",
		});

		const {renderer, scene, camera} = mindarThree;
		
		var loader = new THREE.TextureLoader();
		
		const texture1 = loader.load("https://volverina.github.io/MR/mr1_ht01/V20210305LJ-0043-cropped.webp");
		const texture2 = loader.load("https://live.staticflickr.com/65535/53539865552_a0f9703438_z.jpg");
		const texture3 = loader.load("../assets/semerikov.png");

		const geometry = new THREE.PlaneGeometry(1, 1);
		const material = new THREE.MeshBasicMaterial({map: texture1});
		const plane = new THREE.Mesh(geometry, material);
		
		const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
		const cube_material = new THREE.MeshBasicMaterial({map: texture2});
		const cube = new THREE.Mesh(cube_geometry, cube_material);

		cube.position.set(1.5, 0, 0);
		cube.rotation.set(0, Math.PI/4, 0);
		
		const sphere_geometry = new THREE.SphereGeometry( 0.5, 32, 16 ); 
		const sphere_material = new THREE.MeshBasicMaterial( { color: 0xffff00, map: texture3 } ); 
		const sphere = new THREE.Mesh( sphere_geometry, sphere_material );
		
		sphere.position.set(0, 1, 0);

		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(plane);
		anchor.group.add(cube);
		anchor.group.add(sphere);
		
		await mindarThree.start();
		
		var step = 0.01;
		
		renderer.setAnimationLoop(() => {
			plane.position.y+=step;
			if (plane.position.y >=2 || plane.position.y <=-2 )
				step *= -1;
			cube.rotation.x += step;
			cube.rotation.y += 0.5*step;
			cube.rotation.y -= 1.5*step;
			sphere.scale.set(Math.abs(plane.position.y), Math.abs(plane.position.y), Math.abs(plane.position.y));
			renderer.render(scene, camera);
		});
	}
	start();
});

