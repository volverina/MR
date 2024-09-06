import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "../assets/harris_cup.mind",
			maxTrack: 2,
		});

		const {renderer, scene, camera} = mindarThree;
		
		const loader = new GLTFLoader();

		const anchor1 = mindarThree.addAnchor(0);
		const anchor2 = mindarThree.addAnchor(1);
		
		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		scene.add(light);
		
		loader.load("../assets/cat1.glb", (gltf) => {
			gltf.scene.scale.set(0.5, 0.5, 0.5);
			gltf.scene.rotation.y = -Math.PI/3;
			anchor1.group.add(gltf.scene);
		});

		loader.load("../assets/cat2.glb", (gltf) => {
			gltf.scene.scale.set(0.5, 0.5, 0.5);
			//gltf.scene.position.set(0, -0.4, 0);
			anchor2.group.add(gltf.scene);
		});

		await mindarThree.start();
		
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	}
	start();
});

