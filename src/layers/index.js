export default class generateLayers{
    constructor(config) {
        this.layersWrapper = document.createElement("div");
        let startPosterDiv = null, endPosterDiv = null, playIconDiv = null;
        this.layersWrapper.classList = ["layersWrapper"];
        if(config.startPosterImage) {
            startPosterDiv = this.generateStartPosterImageLayer(config.startPosterImage);
            this.addLayerTowrapper(startPosterDiv);
            //layersWrapper.appendChild(startPosterDiv);
        }
        if(config.endPosterImage) {
            endPosterDiv = this.generateEndPosterImageLayer(config.endPosterImage);
            this.addLayerTowrapper(endPosterDiv);
            //layersWrapper.appendChild(endPosterDiv);
        }
        if(config.showPlayIcon) {
            playIconDiv = this.generatePlayIconLayer(config.showPlayIcon);
            this.addLayerTowrapper(playIconDiv);
            //layersWrapper.appendChild(playIconDiv);
        }
        return {
            domNode: this.layersWrapper,
            startPosterDiv,
            endPosterDiv,
            playIconDiv,
            addCustomLayer: this.addLayerTowrapper
        };
    }

    addLayerTowrapper(layer){
        this.layersWrapper.appendChild(layer);
    }

    generateStartPosterImageLayer(src) {
        let startPosterDiv = document.createElement('div');
        startPosterDiv.style["background-image"] = "url("+src+")";
        startPosterDiv.classList = ["startPoster"];
        return startPosterDiv;
    }

    generateEndPosterImageLayer(src) {
        let endPosterDiv = document.createElement('div');
        endPosterDiv["style"]["background-image"] = "url("+src+")";
        endPosterDiv.classList = ["endPoster"];
        return endPosterDiv;
    }

    generatePlayIconLayer(src){
        let playIconDiv = document.createElement('div');
        playIconDiv["style"]["background-image"] = "url("+src+")";
        playIconDiv.classList = ["playIconLayer"];
        return playIconDiv;
    }
}