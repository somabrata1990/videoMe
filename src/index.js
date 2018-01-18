import { assert } from "./utils";
import generateLayers from "./layers";
import generateControls from "./controls";
require("./index.scss");

class videoMe {
  constructor(config) {
    try {	
      assert(["src", "container"], config);
      this.container = config.container;
      this.init(config);
    } catch (e) {
      console.log(e.message);
    }
  } 
  init(config) {
    let wrapper = this.container;
    let videoDom = document.createElement("video");
    videoDom.setAttribute("src", config.src);
    videoDom.setAttribute("height", "100%");
    videoDom.setAttribute("width", "100%");
    if (config.autoplay) videoDom.setAttribute("autoplay", "");
    if (config.loop) videoDom.setAttribute("loop", "");
    wrapper.appendChild(videoDom);
    let layers = new generateLayers(config);
    wrapper.appendChild(layers.domNode);
    if (config.showControls !== "hide") {
      if (config.customControls) {
        let controls = new generateControls(config);
        wrapper.appendChild(controls.domNode);
      } else {
        videoDom.setAttribute("controls", "");
      }
    }
  }
}
window.videoMe = videoMe;
