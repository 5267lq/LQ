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
            { key: "name", value: "左眼" },
          ];
          // }
          // });
          showCard(label, x, y);
          break;
        case "mesh_0":
          // _this.trucklist.forEach((e) => {
          //   if (e.name === object_name) {
          _this.dataInfo = [
            { key: "name", value: "右眼" },
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
