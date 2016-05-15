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

    breathInColor = "#24AE60";
    holdColor = "#12A185";
    breathOutColor = "#5498C7";

    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size)) {s = "0" + s;}
        return s;
    }

    function clearActive() {
        $(".breath-in").removeClass("active");
        $(".hold").removeClass("active");
        $(".breath-out").removeClass("active");
        $(".credits").removeClass("breath-in hold breath-out");
    }

    function changeBackground(color) {
        document.body.bgColor = color
    }

    function inhalePeriod() {
        clearActive();
        $(".breath-in").addClass("active");
        $(".credits").addClass("breath-in");
        changeBackground(breathInColor);
        alarmTime.setSeconds((new Date()).getSeconds() + 4);
        state = State.INHALE;
    }

    function holdPeriod() {
        clearActive();
        $(".hold").addClass("active");
        $(".credits").addClass("hold");
        changeBackground(holdColor);
        alarmTime.setSeconds((new Date()).getSeconds() + 7);
        state = State.HOLD;
    }

    function exhalePeriod() {
        clearActive();
        $(".breath-out").addClass("active");
        $(".credits").addClass("breath-out");
        changeBackground(breathOutColor);
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

    // setInterval(timerInterrupt, 15)

    window.requestAnimationFrame(timerInterrupt);


// })();