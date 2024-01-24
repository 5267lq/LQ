import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// 场景加载
export const initBaseScene = (_this) => {
  _this.scene = new THREE.Scene();
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
  // 远近幅度控制
  _this.controls.minDistance = 2
  _this.controls.maxDistance = 5.5
  // 鼠标左右旋转幅度
  _this.controls.minAzimuthAngle = -Math.PI / 4
  _this.controls.maxAzimuthAngle = Math.PI / 4
  // 鼠标上下转动幅度
  _this.controls.minPolarAngle = Math.PI / 4
  // _this.controls.minPolarAngle = Math.PI / 2
  _this.controls.maxPolarAngle = Math.PI / 2
  // _this.controls.maxPolarAngle = Math.PI / 4
  // 开启阻尼（惯性）
  _this.controls.enableDamping = true;
  _this.controls.dampingFactor = 0.04
  // 禁止平移
  _this.controls.enablePan = false;
};
// 加载摄像机
export const initBaseCamera = (_this) => {
  _this.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // const cameraPerspectiveHelper = new THREE.CameraHelper(_this.camera);
  // _this.scene.add(cameraPerspectiveHelper);
  _this.camera.position.set(0, 0, 2.5);
};
