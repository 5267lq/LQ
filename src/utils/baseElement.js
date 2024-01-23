import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// 场景加载
export const initBaseScene = (_this) => {
  _this.scene = new THREE.Scene();
  const helper = new THREE.AxesHelper(1);
  _this.scene.add(helper);
  // this.scene.fog = new THREE.Fog(0xeeeeee, 0, 500);
};
// 渲染器加载
export const initBaseRenderer = (_this) => {
  _this.renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
  });
  _this.renderer.setSize(window.innerWidth, window.innerHeight);
  _this.renderer.shadowMap.enabled = true;
  _this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  _this.renderer.outputEncoding = THREE.sRGBEncoding;
  _this.renderer.toneMapping = THREE.LinearToneMapping;
  _this.renderer.toneMappingExposure = 0.9;
  _this.renderer.render(_this.scene, _this.camera);
  _this.container.appendChild(_this.renderer.domElement);
  console.log("=====rendererInfo", _this.renderer);
};
// 加载控制器
export const initBaseControls = (_this) => {
  //   controls
  _this.controls = new OrbitControls(_this.camera, _this.renderer.domElement);
  _this.controls.enableDamping = true;
  _this.controls.enablePan = false;
  console.log('=====controls');
};
// 加载摄像机
export const initBaseCamera = (_this) => {
  _this.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  // const cameraPerspectiveHelper = new THREE.CameraHelper(_this.camera);
  // _this.scene.add(cameraPerspectiveHelper);
  _this.camera.position.set(0, 0, 5);
};
// 加载GUI
export const initGui = (_this) => {
  _this.gui = new GUI();
  _this.gui.domElement.classList.add();
  _this.gui.domElement.style.cssText = "position:absolute;top:0;right:0px;";
  _this.gui.add(_this.effectController, "A").name("Selected:").listen();
};
