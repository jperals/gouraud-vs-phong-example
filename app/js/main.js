(function() {

var scene, camera, renderer;
var geometry, material, mesh;
var lightPosition;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.SphereGeometry( 250, 8, 8 );

    lightPosition = { type: 'v3', value: new THREE.Vector3(0, 0, - 1) };

    material = new THREE.ShaderMaterial( {
        uniforms: {
            lightPosition: lightPosition
            },
        vertexShader: document.getElementById('vertex-shader').textContent,
        fragmentShader: document.getElementById('fragment-shader').textContent
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

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

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render( scene, camera );

}

})();
