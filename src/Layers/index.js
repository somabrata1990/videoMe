require("./index.scss");

export default class generateLayers {
    constructor(config, videoDom) {
        this.layersWrapper = document.createElement("div");
        let startPosterDiv = null, endPosterDiv = null, playIconDiv = null;
        this.layersWrapper.classList = ["layersWrapper"];
        if (config.startPosterImage) {
            startPosterDiv = this.generateStartPosterImageLayer(config.startPosterImage);
            if (config.autoplay) startPosterDiv.classList = ["startPosterLayer hide"];
            this.addLayerToWrapper(startPosterDiv);
            videoDom.addEventListener("playing", function () {
                startPosterDiv.classList = ["startPosterLayer hide"];
            });
            //layersWrapper.appendChild(startPosterDiv);
        }
        if (config.endPosterImage) {
            endPosterDiv = this.generateEndPosterImageLayer(config.endPosterImage);
            endPosterDiv.classList= ["endPosterLayer hide"];
            this.addLayerToWrapper(endPosterDiv);
            videoDom.addEventListener("playing", function () {
                startPosterDiv.classList = ["endPosterLayer hide"];
            });
            videoDom.addEventListener("stop", function () {
                endPosterDiv.classList = ["endPosterLayer"];
            });
            //layersWrapper.appendChild(endPosterDiv);
        }
        if (config.showPlayIcon) {
            playIconDiv = this.generatePlayIconLayer(config.showPlayIcon);
            if (config.autoplay) playIconDiv.classList = ["playIconLayer hide"];
            this.addLayerToWrapper(playIconDiv);
            videoDom.addEventListener("playing", function () {
                playIconDiv.classList = ["playIconLayer hide"];
            });
            videoDom.addEventListener("pause", function () {
                playIconDiv.classList = ["playIconLayer"];
            });
            videoDom.addEventListener("stop", function () {
                endPosterDiv.classList = ["playIconLayer"];
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
        endPosterDiv.classList = ["endPosterLayer"];
        return endPosterDiv;
    }

    generatePlayIconLayer(src) {
        let playIconDiv = document.createElement('div');
        playIconDiv["style"]["background-image"] = "url(" + src + ")";
        playIconDiv.classList = ["playIconLayer"];
        return playIconDiv;
    }
}