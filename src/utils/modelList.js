import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';

export const initFace = (_this) => {
  const ktx2Loader = new KTX2Loader()
    .setTranscoderPath('basis/')
    .detectSupport(_this.renderer)

  new GLTFLoader()
    .setKTX2Loader(ktx2Loader)
    .setMeshoptDecoder(MeshoptDecoder)
    .setPath("/resources/models/")
    .load("facecap.glb", (gltf) => {
      _this.face = gltf.scene;
      _this.scene.add(_this.face)
      const mesh = gltf.scene.children[0];
      const head = mesh.getObjectByName('mesh_2');
      const influences = head.morphTargetInfluences;
      // head.material = new THREE.MeshNormalMaterial();
      const eye_left = mesh.getObjectByName('mesh_1');
      const eye_right = mesh.getObjectByName('mesh_0');
      // eye_left.material = new THREE.MeshNormalMaterial({})
      // eye_right.material = new THREE.MeshNormalMaterial({})
      const gui = new GUI({ width: 310 });
      gui.close();


      const LightFolder = gui.addFolder('Light')

      const ModelFolder = gui.addFolder('Visibility')

      const HelperFolder = gui.addFolder('Helper')

      const MorphFolder = gui.addFolder('Morph')
      for (const [key, value] of Object.entries(head.morphTargetDictionary)) {
        MorphFolder.add(influences, value, 0, 1, 0.01)
          .name(key.replace('blendShape1.', ''))
          .listen();
      }
    });
};
