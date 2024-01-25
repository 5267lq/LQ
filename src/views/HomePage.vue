<template>
  <div>
    <!-- <div id="loading">
      <div class="ring" @click.stop="showMainpage(isDone)">
        <div v-show="!isDone">Loading <br /></div>
        <div v-show="isDone" style="color: white; cursor: pointer">enter</div>
        <span></span>
        <div style="color: white">{{ progress }}</div>
      </div>
    </div> -->
    <div id="container"></div>
    <MenuSide ref="menuSide"></MenuSide>
    <div>
      <el-card style="width: 300px" class="label">
        <div v-for="(info, index) in dataInfo" :key="index">
          <div class="title">{{ info.key }}</div>
          <el-divider />
          <div class="content">
            {{ info.value }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import {
  initBaseScene,
  initBaseRenderer,
  initBaseControls,
  initBaseCamera,
} from "@/utils/baseElement";
import { initFace } from "@/utils/modelList";
import MenuSide from "@/components/menuSide.vue";
import { initLight, initRGB, initEXR } from "@/utils/enviromentInit";
import { clickPick } from "../utils/clickPick";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "../utils/stats";

export default {
  components: {
    MenuSide,
  },
  data() {
    return {
      dataInfo: [],
      clock: new THREE.Clock(),
      spriteArr: [],
      isShowScan: false,
    };
  },
  mounted() {
    this.container = document.querySelector("#container");
    this.stats = null;
    this.Newcamera = null;
    this.gui = null;
    this.initThree();
    this.initEnviroment();
    // this.initClickMed();
    this.initModel();
    // this.initSceneElement();
    this.animate();
    window.addEventListener("resize", this.onWindowResize);
  },
  methods: {
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    initThree() {
      // Camera
      initBaseCamera(this);
      // Scene
      initBaseScene(this);
      // Renderer
      initBaseRenderer(this);
      //   controls
      initBaseControls(this);
      initLight(this);
      this.initStats();
      this.initBall();
      //   gui
      this.initGui();
      //   click
    },
    initModel() {
      initFace(this);
      clickPick(this);
    },
    initEnviroment() {
      initRGB(this);
      // initEXR(this);
    },
    initBall() {
      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(
        "images/ouside-afternoon-blurred-hdr.jpg"
      );
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.BallMaterial = material;
      const sphere = new THREE.Mesh(geometry, material);
      sphere.geometry.scale(1, 1, -1);
      this.scene.add(sphere);
    },
    initStats() {
      this.stats = new Stats();
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.left = "0px";
      this.stats.domElement.style.top = "0px";
      document.body.appendChild(this.stats.domElement);
      return this.stats;
    },
    // 初始化控制板
    initGui(status) {
      this.gui = new GUI({ width: 360 });
      this.gui.domElement.classList.add();
      // this.gui.domElement.style.cssText = "position:absolute;top:0;right:0px;";
      const options = {
        Helper: false,
        Fog: false,
        Verctor: false,
        "show model": true,
      };

      const ModelFolder = this.gui.addFolder("Visibility");
      ModelFolder.add(options, "show model").onChange(this.showModel);

      const HelperFolder = this.gui.addFolder("Helper");
      // this.gui.add(this.effectController, "A").name("Selected:").listen();
      HelperFolder.add(options, "Helper").onChange((val) => {
        if (val) {
          this.axes = new THREE.AxesHelper(1);
          this.scene.add(this.axes);
          this.helper = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff);
          this.scene.add(this.helper);
        } else {
          this.scene.remove(this.axes);
          this.scene.remove(this.helper);
        }
      });
    },

    showMainpage(isDone) {
      if (isDone) {
        document.getElementById("loading").style.display = "none";
        this.mapShow = true;
      }
    },

    showModel(visibility) {
      this.face.visible = visibility;
    },

    animate() {
      const delta = this.clock.getDelta();
      this.deltaTime = delta;
      requestAnimationFrame(this.animate);
      this.stats.update();
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      // console.log("=====render draw call", this.renderer.info.render);
    },
  },

  beforeDestroy() {
    this.scene.clear();
    this.stats = null;
    this.camera = null;
    this.gui.domElement.style.cssText = "display:none";
    cancelAnimationFrame(this.animationID);
    this.renderer.forceContextLoss();
    this.renderer.dispose();
    this.renderer.content = null;
    const gl = this.renderer.domElement.getContext("webgl");
    gl && gl.getExtension("WEBGL_lose_context").loseContext();
    this.controls = null;
    this.outlinePass = null;
    this.css2dRender = null;
  },
};
</script>

<style scoped>
#loading {
  background-color: #262626;
  height: 100vh;
  width: 100%;
  position: absolute;
  display: block;
  z-index: 999;
}
#chart1 {
  left: 35px;
  bottom: 30px;
}
#chart2 {
  right: 10px;
  bottom: 30px;
}
.chartLayout {
  width: 500px;
  height: 500px;
  position: absolute;
  bottom: 0;
  display: block;
  border-radius: 10px;
}
.map {
  height: 300px;
  width: 300px;
  position: absolute;
  left: 0;
  top: 0;
}
.showCharts {
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(156, 239, 173, 0.757);
  color: rgb(154, 146, 146);
  position: absolute;
  right: 20px;
  top: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.showManagement {
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(239, 168, 156, 0.757);
  color: rgb(255, 255, 255);
  position: absolute;
  right: 20px;
  top: 140px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.showHallWay {
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(239, 168, 156, 0.757);
  color: rgb(255, 255, 255);
  position: absolute;
  right: 20px;
  top: 230px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.map2 {
  height: 300px;
  width: 300px;
  border: 1px solid black;
  background-color: rgb(28, 154, 188);
  position: absolute;
  left: 0;
  bottom: 310px;
}
.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-family: sans-serif;
  font-size: 20px;
  color: #fff000;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #fff000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 10;
}

.ring:before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #fff000;
  border-right: 3px solid #fff000;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

span {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}

span:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff000;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px #00ddff;
}

@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

.small_map {
  animation: rotateMap 8s linear infinite;
}
@keyframes rotateMap {
  0% {
    transform: rotateZ(0deg);
  }
  25% {
    transform: rotateZ(5deg);
  }
  50% {
    transform: rotateZ(-5deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.blw_dialog {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  background: url(/public/images/bg2.png) center center no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.696);

  z-index: 999;
  opacity: 0;
  transform: scale(0.3);
}
.boxDialog {
  /* background-color: #ffffffa3; */
  /* width: 50rem;
  height: 30rem; */
}
.dialogContent {
  background-color: rgba(143, 185, 255, 0.867);
  width: 60rem;
  height: 35rem;
  border-radius: 15px;
  /* width: 60%;
  height: 60%; */
  /* transform: scale(1.7); */
}
.nav_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  /* background: url(/public/meeting/images/UI/0702/btn.png) center center no-repeat; */
  background-size: contain;
  width: 12rem;
  height: 3.5rem;
  border-radius: 6px;
  background: linear-gradient(180deg, #00bcff 0%, #007aff 100%);
  color: white;
  line-height: 3rem;
  font-size: 1.5rem;
  font-weight: bold;
}
.label {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
}
.label .content {
  display: inline-block;
  font-size: 12px;
}
</style>
../utils/stats