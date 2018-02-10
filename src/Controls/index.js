import seekBallIcon from "../assets/sliderBall.png";
import seekLineIcon from "../assets/slide.png";
import playIcon from "../assets/play.png";

export default class generateControls {
    constructor(config) {
        this.controlsWrapper = document.createElement("div");
        this.controlsWrapper.classList = ["controlsWrapper"];
        return {
            domNode: this.controlsWrapper,
            generatePlayIcon: this.generatePlayIcon(playIcon),
            generateTimeIcon: this.generateTimeIcon(),
            generateSeekBar: this.generateSeekBar()
        };
    }

    generatePlayIcon(src) {
        let playIconDiv = document.createElement("div");
        playIconDiv.classList = ["inlineBlock playbtn"];
        playIconDiv.style["background-image"] = "url(" + src + ")";
        this.controlsWrapper.appendChild(playIconDiv);
        return playIconDiv;
    }

    generateTimeIcon() {
        let timeIconDiv = document.createElement("div");
        timeIconDiv.classList = ["inlineBlock time"];
        timeIconDiv.innerHTML = "00:00";
        this.controlsWrapper.appendChild(timeIconDiv);
        return timeIconDiv;
    }

    generateSeekBar() {
        let seekBarWrapper = document.createElement("div");
        let seekBallDiv = document.createElement("div");
        seekBallDiv.style["background-image"] = "url(" + seekBallIcon + ")";
        seekBallDiv.classList = ["inlineBlock iball"];
        seekBarWrapper.appendChild(seekBallDiv);
        let seekLine = document.createElement("div");
        seekLine.style["background-image"] = seekLineIcon;
        seekLine.classList = ["line"];
        seekBarWrapper.appendChild(seekLine);
        seekBarWrapper.classList = ["slider"];
        this.controlsWrapper.appendChild(seekBarWrapper);
        return seekBarWrapper;
    }

}