import {
  assert
} from "./utils";
import generateLayers from "./Layers";
import generateControls from "./Controls";
import eventsManager from "./EventManager";
import DEFAULTCONFIG from "./DEFAULTCONFIG";
require("./index.scss");

class videoMe {
  constructor(params) {
    assert(["src", "container"], params);
    var config = Object.assign(DEFAULTCONFIG, params);
    this.container = config.container;
    let libObject = this.init(config);
    return libObject;
  }

  init(config) {
    let wrapper = this.container;
    let videoDom = document.createElement("video");
    let controls = null,
      EM = null;
    wrapper.appendChild(videoDom);

    this.setVideoDomAttributes(videoDom, config);
    this.setVideoDomStyles(videoDom, config);
    if (config.bindEvents) EM = new eventsManager(config, videoDom);

    let layers = new generateLayers(config, videoDom);
    wrapper.appendChild(layers.domNode);

    if (config.showControls && !config.useNativeControls) {

      controls = new generateControls(config);
      wrapper.appendChild(controls.domNode);
    }

    return {
      videoDom,
      layers: layers,
      customControlsLayer: controls,
      eventsManager: EM,
      player: {
        play: function () {
          videoDom.play();
          EM.trigger("userPlayed");
        },
        pause: function () {
          videoDom.pause();
          EM.trigger("userPaused");
        },
        goTo: function (time) {
          videoDom.seek(time);
          EM.trigger("userSeeked");
        },
        setVolume: function (val) {
          videoDom.setVolume(val);
          EM.trigger("userChangedVolume");
        }
      }
    }
  }

  setVideoDomStyles(videoDom, config) {
    if (config.clickToPlayPause) {
      videoDom.style["pointer-events"] = "none";
    }
  }

  setVideoDomAttributes(videoDom, config) {
    videoDom.setAttribute("src", config.src);
    videoDom.setAttribute("height", "100%");
    videoDom.setAttribute("width", "100%");
    if (config.autoplay) videoDom.setAttribute("autoplay", "");
    if (config.loop) videoDom.setAttribute("loop", "");
    if (config.showControls && config.useNativeControls) videoDom.setAttribute("controls", "");
  }

}
window.videoMe = videoMe;