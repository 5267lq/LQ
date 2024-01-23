import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
export const initLight = (_this) => {
  // if (_this.isShowLight) {
  // 点光源(灯泡)
  const PointLight = new THREE.PointLight(0xffffff, 0);
  // _this.scene.add(PointLight);
  // 环境光
  _this.ambient = new THREE.AmbientLightProbe(0xffffff, 0.5);
  _this.scene.add(_this.ambient);
  // Lights
};

export const initRGB = (_this) => {
  new RGBELoader().load("../resources/Living.hdr", (texture) => {
    // _this.scene.background = texture;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    _this.scene.environment = texture;
  });
};
export const initEXR = (_this) => {
  // if (_this.isShowBg) {
  new EXRLoader().load("../resources/bgskybgsky.exr", (texture) => {
    // _this.scene.background = texture;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    _this.scene.environment = texture;
  });
  // }
};
