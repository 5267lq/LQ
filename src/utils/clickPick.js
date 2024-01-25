import * as THREE from "three";
export const clickPick = (_this) => {
  const rayCaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let x, y;
  const selectedObjects = [];
  const label = document.querySelector(".label");
  window.addEventListener("click", onMouseClick);
  window.addEventListener("dblclick", onMouseDbClick);
  // 点击卡片的显示位置
  function showCard(element) {
    element.style.display = "block";
    element.style.position = "absolute";
    element.style.left = `260px`;
    element.style.bottom = "450px";
    element.style.fontSize = '10px';
  }

  function onMouseClick(e) {
    if (e.changedTouches) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    const rect = _this.container.getBoundingClientRect(); // 拿到div相对屏幕坐标的偏移量
    /**
     * 当前场景并不是全屏渲染的 所以屏幕坐标转化为世界坐标的公式有所变化
     */
    mouse.x = ((x - rect.left) / this.container.clientWidth) * 2 - 1;
    mouse.y = -((y - rect.top) / this.container.clientHeight) * 2 + 1;
    // 通过摄像机和鼠标位置来更新射线
    rayCaster.setFromCamera(mouse, _this.camera);
    // 第二个参数表示是否检查他的后代
    const intersects = rayCaster.intersectObjects([_this.scene], true);
    if (intersects.length > 0) {
      const object_name = intersects[0].object.name;
      console.log(object_name);
      // 是否显示卡片
      if (
        intersects.length === 0 ||
        object_name === "" ||
        object_name === "line"
      ) {
        label.style.display = "none";
        // _this.click = false;
        return;
      }
      switch (object_name) {
        case "mesh_2":
          // _this.trucklist.forEach((e) => {
          //   if (e.name === object_name) {
          _this.dataInfo = [
            { key: "name", value: "头" },
          ];
          // }
          // });
          showCard(label, x, y);
          break;
        case "mesh_1":
          // _this.trucklist.forEach((e) => {
          //   if (e.name === object_name) {
          _this.dataInfo = [
            { key: "眼整形手术", value: "常见的四种双眼皮形态 开扇形：经典的双眼皮，特点是内窄外宽，双眼皮褶皱线的起点是从内眼角里面发出来，内眼角轻度包裹。 平扇形：是大多数求美者比较喜欢的形状，特点是内窄外宽，和开扇的区别在于双眼皮的褶皱线不是从内眼角里出来而是上面。 新月形：甜美型双眼皮，特点是两头窄、中间宽，因形似弯月而得名，这种眼睛比较显甜美、可爱和幼态。 欧式大平行：适合眉骨高立体脸型，它的眼头和眼尾宽度基本上是持平的，内眼角的赘皮几乎没有，眼间距很近者不适合。" },
          ];
          // }
          // });
          showCard(label, x, y);
          break;
        case "mesh_0":
          // _this.trucklist.forEach((e) => {
          //   if (e.name === object_name) {
          _this.dataInfo = [
            { key: "眼整形手术", value: "右眼" },
          ];
          // }
          // });
          showCard(label, x, y);
          break;
        default:
          // label.style.display = "none";
          selectedObjects.pop();
          break;
      }

      _this.effectController.A = object_name;
      _this.click = true;
    }
  }

  function onMouseDbClick(event) {
    if (event.changedTouches) {
      x = event.changedTouches[0].pageX;
      y = event.changedTouches[0].pageY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }
    event.preventDefault();
    const vector = new THREE.Vector3(); //三维坐标对象
    vector.set(mouse.x, mouse.y, 0.5);
    vector.unproject(_this.camera);
    const rect = _this.container.getBoundingClientRect(); //拿到div相对屏幕坐标的偏移量
    //屏幕坐标转标准设备坐标(世界坐标系) x和y应在-1和1之间
    mouse.x = ((x - rect.left) / this.container.clientWidth) * 2 - 1;
    mouse.y = -((y - rect.top) / this.container.clientHeight) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线 camera表示射线来源的摄像机
    rayCaster.setFromCamera(mouse, _this.camera);

    const intersects = rayCaster.intersectObjects([_this.scene], true);
    if (intersects[0]) {
      const soName = intersects[0].object.name;
      // label.style.display = "none";
    }
  }
};
