require("./index.scss");
export default class generateControls{
    constructor(config) {
        this.controlsWrapper = document.createElement("div");
        this.controlsWrapper.classList = ["controlsWrapper"];

        return {
            domNode: this.controlsWrapper
        };
    }

}