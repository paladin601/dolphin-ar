import * as THREE from 'three';

export function init_ligths() {

    let ambientlight = new THREE.AmbientLight( 0xFFFFFF ,3); 
    window.scene.add( ambientlight );

}