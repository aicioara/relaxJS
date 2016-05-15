/**
 * Written by Andrei Cioara <http://andrei.cioara/me>
 *
 * Based on the 4-7-8 Rule I got from here
 *
 * http://www.medicaldaily.com/life-hack-sleep-4-7-8-breathing-exercise-will-supposedly-put-you-sleep-just-60-332122
 */

// (function() {

    var State = {
        INHALE: 0,
        HOLD: 1,
        EXHALE: 2
    }

    var alarmTime = new Date();
    var intervalHandler;
    var state = State.EXHALE;

    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size)) {s = "0" + s;}
        return s;
    }

    function changeBackground(color) {
        document.body.bgColor = color
    }

    function inhalePeriod() {
        changeBackground("#049246");
        alarmTime.setSeconds((new Date()).getSeconds() + 4);
        state = State.INHALE;
    }

    function holdPeriod() {
        changeBackground("#1B76BC");
        alarmTime.setSeconds((new Date()).getSeconds() + 7);
        state = State.HOLD;
    }

    function exhalePeriod() {
        changeBackground("#035096");
        alarmTime.setSeconds((new Date()).getSeconds() + 8);
        state = State.EXHALE;
    }

    function changeState() {
        switch (state) {
            case State.INHALE: holdPeriod(); break;
            case State.HOLD: exhalePeriod(); break;
            case State.EXHALE: inhalePeriod(); break;
        }
    }


    function timerInterrupt() {
        var currTime = new Date();

        if (currTime >= alarmTime) {
            changeState();
        }

        var timeLeft = Math.max(alarmTime - currTime, 0);

        var secondsLeft = Math.floor(timeLeft / 1000);
        var minutesLeft = Math.floor(secondsLeft / 60);
        var secondsLeft = secondsLeft % 60 + 1;

        var timeString = "" + minutesLeft.pad(2) + ":" + secondsLeft.pad(2);

        document.getElementById("clock").innerHTML = timeString;

        window.requestAnimationFrame(timerInterrupt);
    }

    window.requestAnimationFrame(timerInterrupt);


// })();