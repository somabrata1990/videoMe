import playIcon from "../assets/posterplay.png";

export default class generateLayers {
    constructor(config, videoDom) {
        let self = this,
            startPosterDiv = null,
            endPosterDiv = null,
            playIconDiv = null;
        this.layersWrapper = document.createElement("div");
        this.layersWrapper.classList = ["layersWrapper"];
        if (config.startPosterImage) {
            startPosterDiv = this.generateStartPosterImageLayer(config.startPosterImage);
            if (config.autoplay) this.hideTheLayer(startPosterDiv);
            this.addLayerToWrapper(startPosterDiv);
            videoDom.addEventListener("playing", function () {
                self.hideTheLayer(startPosterDiv);
            });
            //layersWrapper.appendChild(startPosterDiv);
        }
        if (config.endPosterImage) {
            endPosterDiv = this.generateEndPosterImageLayer(config.endPosterImage);
            //this.hideTheLayer(endPosterDiv);
            //endPosterDiv.classList = ["endPosterLayer hide"];
            this.addLayerToWrapper(endPosterDiv);
            videoDom.addEventListener("playing", function () {
                self.hideTheLayer(endPosterDiv);
                //endPosterLayer.classList = ["endPosterLayer hide"];
            });
            videoDom.addEventListener("ended", function () {
                self.showTheLayer(endPosterDiv);
                //endPosterDiv.classList = ["endPosterLayer"];
            });
            //layersWrapper.appendChild(endPosterDiv);
        }
        if (config.showPlayIcon) {
            playIconDiv = this.generatePlayIconLayer(playIcon);
            if (config.autoplay) this.hideTheLayer(playIconDiv);
            this.addLayerToWrapper(playIconDiv);
            videoDom.addEventListener("playing", function () {
                self.hideTheLayer(playIconDiv);
                //playIconDiv.classList = ["playIconLayer hide"];
            });
            videoDom.addEventListener("pause", function () {
                self.showTheLayer(playIconDiv);
                //playIconDiv.classList = ["playIconLayer"];
            });
            videoDom.addEventListener("seeking", function () {
                self.hideTheLayer(playIconDiv);
            });
            videoDom.addEventListener("ended", function () {
                self.showTheLayer(playIconDiv);
                //playIconDiv.classList = ["playIconLayer"];
            });
            playIconDiv.addEventListener("click", function () {
                videoDom.play();
            });
            //layersWrapper.appendChild(playIconDiv);
        }
        return {
            domNode: this.layersWrapper,
            startPosterDiv,
            endPosterDiv,
            playIconDiv,
            addCustomLayer: this.addLayerToWrapper
        };
    }

    hideTheLayer(layer) {
        this.layersWrapper.classList.add("hide");
        layer.classList.add("hide");
    }

    showTheLayer(layer) {
        this.layersWrapper.classList.remove("hide");
        layer.classList.remove("hide");
    }

    addLayerToWrapper(layer) {
        this.layersWrapper.appendChild(layer);
    }

    generateStartPosterImageLayer(src) {
        let startPosterDiv = document.createElement('div');
        startPosterDiv.style["background-image"] = "url(" + src + ")";
        startPosterDiv.classList = ["startPosterLayer"];
        return startPosterDiv;
    }

    generateEndPosterImageLayer(src) {
        let endPosterDiv = document.createElement('div');
        endPosterDiv["style"]["background-image"] = "url(" + src + ")";
        endPosterDiv.classList = ["endPosterLayer hide"];
        return endPosterDiv;
    }

    generatePlayIconLayer(src) {
        let playIconDiv = document.createElement('div');
        playIconDiv["style"]["background-image"] = "url(" + src + ")";
        playIconDiv.classList = ["playIconLayer"];
        return playIconDiv;
    }
}