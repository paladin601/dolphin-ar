import { init_ligths } from './ligths'
import { load_model } from './loader'



var renderer, scene, camera, controls;
var arToolkitSource, arToolkitContext;
var width = window.innerWidth;
var height = window.innerHeight;

export var group = new THREE.Group();
export var line_group = new THREE.Group();

THREEx.ArToolkitContext.baseURL = '../'
export function init_scene() {
    scene = new THREE.Scene();
    window.scene = scene;


    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.gammaOutput = true;
    renderer.setSize(width, height);
    window.renderer = renderer;
    document.body.appendChild(renderer.domElement);

    //camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100000);
    camera = new THREE.Camera();
    window.camera = camera;
    window.scene.add(camera)

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    })
    arToolkitSource.init(function onReady() {
        onResize()
    })
    window.arToolkitSource = arToolkitSource;

    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../public/data/camera_para.dat',
        detectionMode: 'mono',
    })
    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    })
    window.arToolkitContext = arToolkitContext;
    controls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
        type: 'pattern',
        patternUrl: THREEx.ArToolkitContext.baseURL + '../public/data/candy.patt',
        changeMatrixMode: 'cameraTransformMatrix'
    })

    window.controls = controls;

    //controls = new OrbitControls(camera, renderer.domElement);
    //camera.position.set(0, 1000, 2000);
    // controls.maxPolarAngle = 80 * Math.PI / 180;

    window.addEventListener('resize', onResize, false);
    scene.visible = false
    window.scene.add(group);
    window.scene.add(line_group);
    window.arToolkitSource.copyElementSizeTo(window.renderer.domElement)
    init_ligths();
    load_model().then(()=>{      
        $(".loader").css('display','none');
    });

    let size = 1;
    group.scale.set(size, size, size);

    group.position.set(0, 0, 0);
    render();

}

var render = function (time) {

    window.arToolkitContext.update(window.arToolkitSource.domElement)

    scene.visible = camera.visible

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

function onResize() {
    window.arToolkitSource.onResizeElement()
    window.arToolkitSource.copyElementSizeTo(window.renderer.domElement)
    if (window.arToolkitContext.arController !== null) {
        window.arToolkitSource.copyElementSizeTo(window.arToolkitContext.arController.canvas)
    }
}