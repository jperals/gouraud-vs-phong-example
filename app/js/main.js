(function() {

var scene, camera, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.SphereGeometry( 500, 16, 16 );

    material = new THREE.ShaderMaterial( {
        uniforms: {
            'lightPosition':	{ type: 'v3', value: new THREE.Vector3(1000, 1000, 1000) }
            },
        vertexShader: document.getElementById('vertex-shader').textContent,
        fragmentShader: document.getElementById('fragment-shader').textContent
    } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}

})();
