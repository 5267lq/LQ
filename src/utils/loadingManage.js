import * as THREE from "three";
export const initLoading = (_this) => {
  const manager = new THREE.LoadingManager();
  manager.onLoad = () => {
    console.log("Loading complete!");
  };

  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onError = (url) => {
    console.log("There was an error loading " + url);
  };
  return manager;
};
