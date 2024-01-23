<template>
  <div class="Menu_box">
    <div class="Menu text-white text-left" v-show="isShow">
      <div class="dex_center">
        <div class="head">
          <!-- <div class="line"></div>
          <div class="dex_title text-left cursor-pointer" @click.stop="toMove">
            Panoramic Field of View
          </div> -->
        </div>
      </div>
      <div class="nft_center">
        <div class="head">
          <div class="title">
            <h3>医学美容术前咨询系统</h3>
          </div>
          <div class="line"></div>
          <div class="dex_title cursor-pointer" @click.stop="changeNight">
            背景切换
          </div>
          <div class="line"></div>
          <div class="dex_title cursor-pointer" @click.stop="showStats">
            Stats性能监视器
          </div>
          <div class="line"></div>
          <div class="dex_title cursor-pointer" @click.stop="showStats">
            科普介绍
          </div>
          <div class="line"></div>
          <div class="dex_title cursor-pointer" @click.stop="startRecording">
            开始录制
          </div>
          <div class="line"></div>
          <div class="dex_title cursor-pointer" @click.stop="stopRecording">
            结束录制
          </div>
          <div class="line"></div>
          <div class="dex_title cursor-pointer" @click.stop="ShotScreen">
            截图对比
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="right_btn" @click.stop="isShowArrow" ref="rightBtn">
      <!-- <img :src="publicUrl + 'images/dialog/arrow_right.png'" alt="" /> -->
      {{ content }}
    </div>
  </div>
</template>

<script>
import Gsap from "gsap";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
let mediaRecorder;
let recordedChunks = [];
let showS = true;
export default {
  data() {
    return {
      isShow: true,
      publicUrl: "./public/sps/",
      content: "X",
      flag: true,
      showS,
    };
  },
  methods: {
    showStats() {
      
    },
    startRecording() {
      const stream = this.$parent.renderer.domElement.captureStream(60); // 60fps
      mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

      mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.start();
    },

    stopRecording() {
      mediaRecorder.stop();

      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recording.webm";
      link.click();

      recordedChunks = [];
    },
    ShotScreen() {
      // 渲染场景
      this.$parent.renderer.render(this.$parent.scene, this.$parent.camera);
      // 获取DataURL
      const dataURL = this.$parent.renderer.domElement.toDataURL("image/png");

      // 创建下载链接并点击它
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "screenshot.png";
      link.click();
    },
    showFire() {
      this.$parent.changeMode();
    },
    isShowArrow() {
      this.isShow = !this.isShow;
      if (!this.isShow) {
        this.$refs.rightBtn.style.cssText = "left:0;top:60px";
        this.content = ">";
      } else {
        this.$refs.rightBtn.style.cssText = "left: 256px;top: 40px";
        this.content = "X";
      }
    },
    toMove() {
      this.$parent.showAllScreen();
    },
    changeMirrorStatus() {
      this.$parent.createMirror();
      this.$parent.flag = !this.$parent.flag;
    },
    changeCamera() {
      if (this.flag) {
        Gsap.to(this.$parent.Newcamera.scale, {
          x: 0.05,
          y: 0.05,
          z: 0.05,
          duration: 2,
        });
        Gsap.to(this.$parent.Newcamera.position, {
          y: 13,
          duration: 2,
        });
      } else {
        Gsap.to(this.$parent.Newcamera.scale, {
          x: 0.005,
          y: 0.005,
          z: 0.005,
          duration: 2,
        });
        Gsap.to(this.$parent.Newcamera.position, {
          x: -88.66,
          y: 6,
          z: 87,
          duration: 2,
        });
      }
      this.flag = !this.flag;
    },
    changeNight() {
      if (this.flag) {
        // new RGBELoader().load("../resources/neutral.hdr", (texture) => {
        // this.$parent.scene.background = texture;
        // texture.mapping = THREE.EquirectangularReflectionMapping;
        // this.$parent.scene.environment = texture;
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("images/bg.png");
        this.$parent.BallMaterial.map = texture;
        this.$parent.BallMaterial.needsUpdate = true;
        this.flag = !this.flag;
        // });
      } else {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(
          "images/ouside-afternoon-blurred-hdr.jpg"
        );
        this.$parent.BallMaterial.map = texture;
        this.$parent.BallMaterial.needsUpdate = true;
        this.flag = !this.flag;
      }
    },
    changeBright() {
      this.$parent.renderer.toneMappingExposure = 0.9;
      this.$parent.initEnviroment();
      this.$parent.removeLightCube();
    },
    transToCharacter() {
      Gsap.to(this.$parent.camera.position, {
        x: this.$parent.cubeBody.position.x,
        y: this.$parent.cubeBody.position.y - 1,
        z: this.$parent.cubeBody.position.z + 4,
        duration: 2,
      });

      Gsap.to(this.$parent.controls.target, {
        x: this.$parent.cubeBody.position.x,
        y: this.$parent.cubeBody.position.y,
        z: this.$parent.cubeBody.position.z,
        duration: 2,
        onComplete: () => {
          this.$parent.isShowMap = true;
        },
      });
    },
    showSnow() {
      this.$parent.isShowSnow = !this.$parent.isShowSnow;
    },
  },
};
</script>

<style scoped>
.Menu {
  width: 256px;
  height: 100%;
  background-color: rgba(42, 45, 49, 0.906);
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  font-size: 1rem;
  font-family: "Source Han Sans JP";
}
.line {
  margin: 11px 30px 11px 25px;
  border-bottom: rgba(255, 255, 255, 0.361) dotted 3px;
}
.dex_center {
  margin-top: 61px;
}
.title{
  font-size: 25px;
  padding-bottom: 20px;
}
.dex_title {
  padding-left: 25px;
  cursor: pointer;
  /* position: relative; */
  /* right: 3.5rem; */
}
.right_btn {
  width: 30px;
  height: 40px;
  background-color: rgba(42, 45, 49, 0.906);
  position: absolute;
  left: 256px;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0px 10px 10px 0;
  color: white;
}
</style>
