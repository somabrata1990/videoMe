import eventQueueManager from "./eventQueueManager";

export default class EventBindings {
    constructor(config, videoDom) {
        let EQM = new eventQueueManager();
        EQM.status = "ended";
        EQM.numberOfIterations = 0;
        EQM.currentTime = 0;
        this.bindVideoDomActions(videoDom, config);
        this.registerEvents(videoDom, EQM);
        return EQM;
    }

    bindVideoDomActions(videoDom, config) {
        if (config.clickToPlayPause) {
            videoDom.addEventListener("click", function () {
                if (this.playing)
                    this.pause();
                else
                    this.play();
            });
        }
    }

    registerEvents(videoDom, EQM) {
        videoDom.addEventListener("play", function () {
            EQM.trigger("start");
        });
        videoDom.addEventListener("playing", function () {
            if (EQM.status === "ended") {
                EQM.status = "started";
                EQM.trigger("start");
            } else if (EQM.status === "paused") {
                EQM.status = "playing";
                EQM.trigger("resume");
            } else {
                console.error("playing trigger error:" + this.currentTime + " || status: " + EQM.status);
            }
        });
        videoDom.addEventListener("timeupdate", function () {
            if (EQM.currentTime !== Math.floor(this.currentTime)) {
                EQM.trigger("timeUpdate");
                EQM.currentTime = Math.floor(this.currentTime);
            }
            if (this.currentTime > this.duration - 0.5 && EQM.status !== "ended") {
                if (EQM.status !== "ended") {
                    EQM.status = "ended";
                    EQM.numberOfIterations += 1;
                    EQM.trigger("end");
                }
            }
        });
        videoDom.addEventListener("pause", function () {
            if (EQM.status === "started" || EQM.status === "playing") {
                EQM.status = "paused";
                EQM.trigger("pause");
            } else if (EQM.status === "ended") {
                console.log("pause after ended");
            } else {
                console.error("paused trigger error:" + this.currentTime);
            }
        });
        videoDom.addEventListener("seeked", function () {
            EQM.trigger("seeked");
        });
        videoDom.addEventListener("buffering", function () {
            EQM.trigger("buffering");
        });
        videoDom.addEventListener("ended", function () {
            if (EQM.status !== "ended") {
                EQM.status = "ended";
                EQM.numberOfIterations += 1;
                EQM.trigger("end");
            }
        });
    }
};