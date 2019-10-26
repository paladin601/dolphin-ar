import  {GLTFLoader} from '../../public/lib/GLTFLoader';
import { group } from './scene';

let loader = new GLTFLoader().setPath( 'public/assets/glb/' );
export function load_model() {
    return new Promise((resolve) => {
        loader.load("delfin.glb", function (mesh) {
            mesh.scene.position.set(0, 0, 0);
            mesh.scene.name = "level 1";            
            group.add(mesh.scene);
            resolve("true");

        });
    })
}


