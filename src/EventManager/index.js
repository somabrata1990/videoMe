import eventQueueManager from "./eventQueueManager";

export default class EventBindings {
    constructor(config, videoDom) {
        let EQM = new eventQueueManager();
        EQM.status = "ended";
        EQM.numberOfIterations = 0;
        this.registerEvents(videoDom, EQM);
        //this.registerActions(config, videoDom);
        return EQM;
    }

    // registerActions(config, videoDom) {
    //     if (config.clickToPlayPause)
    //         videoDom.addEventListener("click", function () {
    //             if (this.pause) this.play();
    //             else this.pause();
    //         });
    // }

    registerEvents(videoDom, EQM) {
        // videoDom.addEventListener("play", function () {
        //     EQM.trigger("start");
        // });
        videoDom.addEventListener("playing", function () {
            if (EQM.status === "ended") {
                EQM.status = "started";
                EQM.trigger("start");
            } else if (EQM.status === "paused") {
                EQM.status = "playing";
                EQM.trigger("resume");
            } else {
                console.log("playing trigger error:" + this.currentTime + " || status: " + EQM.status);
            }
        });
        videoDom.addEventListener("timeupdate", function () {
            if (this.currentTime < 0.5 && EQM.status !== "started") {
                EQM.status = "started";
                EQM.trigger("start");
            }
            if (this.currentTime > this.duration - 0.5 && EQM.status !== "ended") {
                EQM.status = "ended";
                EQM.numberOfIterations += 1;
                EQM.trigger("end");
            }
        });
        videoDom.addEventListener("pause", function () {
            if (EQM.status === "started" || EQM.status === "playing") {
                EQM.status = "paused";
            } else {
                console.log("paused trigger error:" + this.currentTime);
            }
            EQM.trigger("pause");
        });
        videoDom.addEventListener("seeked", function () {
            EQM.trigger("seeked");
        });
        videoDom.addEventListener("buffering", function () {
            EQM.trigger("buffering");
        });
        videoDom.addEventListener("stop", function () {
            EQM.status = "ended";
            EQM.numberOfIterations += 1;
            EQM.trigger("end");
        });
    }
};