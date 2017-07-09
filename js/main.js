(function() {

var scene, camera, renderer;
var geometry;
var gouraudSphere, phongSphere;
var lightPosition;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.SphereGeometry( 250, 8, 8 );

    lightPosition = { type: 'v3', value: new THREE.Vector3(0, 0, - 1) };

    var gouraudMaterial = new THREE.ShaderMaterial({
        uniforms: {
            lightPosition: lightPosition,
            offset: { type: 'v3', value: new THREE.Vector3(250, 0, 0) }
        },
        vertexShader: document.getElementById('gouraud-vertex-shader').textContent,
        fragmentShader: document.getElementById('gouraud-fragment-shader').textContent
    });

    gouraudSphere = new THREE.Mesh( geometry, gouraudMaterial );

    scene.add( gouraudSphere );

    var phongMaterial = new THREE.ShaderMaterial({
        uniforms: {
            lightPosition: lightPosition,
            offset: { type: 'v3', value: new THREE.Vector3(250, 0, 0) }
        },
        vertexShader: document.getElementById('phong-vertex-shader').textContent,
        fragmentShader: document.getElementById('phong-fragment-shader').textContent
    });

    phongSphere = new THREE.Mesh( geometry, phongMaterial );

    scene.add( phongSphere );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    document.addEventListener('mousemove', function(event) {
        var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        var mouseY = (event.clientY / window.innerHeight) * 2 - 1;
        lightPosition.value.x = mouseX;
        lightPosition.value.y = - mouseY;
    });

}

function animate() {

    requestAnimationFrame( animate );

    gouraudSphere.rotation.x += 0.003;
    gouraudSphere.rotation.y += 0.003;

    phongSphere.rotation.x += 0.003;
    phongSphere.rotation.y += 0.003;

    renderer.render( scene, camera );

}

})();
