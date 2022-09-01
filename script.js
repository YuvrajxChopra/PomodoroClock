var screen = document.getElementById('timerscreen');
var startbtn = document.getElementById('pause-btn');
var resetbtn = document.getElementById('reset-btn');
var splus = document.getElementById('splus-btn');
var sminus = document.getElementById('sminus-btn');
var bplus = document.getElementById('bplus-btn');
var bminus = document.getElementById('bminus-btn');
var timeofsession = document.getElementById('timeofsession');
var timeofbreak = document.getElementById('timeofbreak');


var tempminutes;
var tempseconds;
var tempbreakminutes;
var tempbreakseconds;

var sessiontime = 1;
var breaktime = 1;
var startflag = 0;
var andaflag = 0;
var breakminutes = 0;
var breakseconds = 0;
var minutes = 0;
var seconds = 0;
let timer;
let breaktimer;

splus.addEventListener('click', ()=>{
    if(seconds == 0 && minutes == 0){
        timeofsession.innerHTML = 1 + "mins";
        seconds = 60;
        minutes = 0;
        tempminutes = minutes;
        tempseconds = seconds;
        tempbreakminutes = breakminutes;
        tempbreakseconds = breakseconds;
        return;
    }
    minutes++;
    tempminutes = minutes;
    tempseconds = seconds;
    tempbreakminutes = breakminutes;
    tempbreakseconds = breakseconds;
    timeofsession.innerHTML = (minutes+1) + "mins";
});


sminus.addEventListener('click', ()=>{
    if(minutes == 0)
        return;
    
    //if(minutes == 0 && seconds == 60)
        //timeofsession.innerHTML = 1 + "mins";

    minutes--;
    timeofsession.innerHTML = (minutes+1) + "mins";
});

bplus.addEventListener('click', ()=>{
    if(breakseconds == 0 && breakminutes == 0){
        timeofbreak.innerHTML = 1 + "mins";
        breakseconds = 60;
        breakminutes = 0;
        tempminutes = minutes;
        tempseconds = seconds;
        tempbreakminutes = breakminutes;
        tempbreakseconds = breakseconds;
        return;
    }
    tempminutes = minutes;
    tempseconds = seconds;
    tempbreakminutes = breakminutes;
    tempbreakseconds = breakseconds;
    breakminutes++;
    timeofbreak.innerHTML = (breakminutes+1) + "mins";
});


bminus.addEventListener('click', ()=>{
    if(breakminutes == 0)
        return;
    breakminutes--;
    tempminutes = minutes;
    tempseconds = seconds;
    tempbreakminutes = breakminutes;
    tempbreakseconds = breakseconds;
    timeofbreak.innerHTML = (breakminutes+1) + "mins";
});


startbtn.addEventListener('click', ()=>{
    if(startflag==0){
        if(andaflag == 0){
            timer = setInterval(startTimer, 1000);
        }
        else
            breaktimer = setInterval(startBreakTimer, 1000);
        startbtn.value = "Pause";
        startflag = 1;
    }
    else{
        startbtn.value = "Start";
        startflag = 0;
        clearInterval(timer);
        clearInterval(breaktimer);
    }
});


function startTimer(){
    screen.style.color = "rgb(0, 202, 202)";
    andaflag = 0;
    if(seconds==0 && minutes==0){
        sessiontime++;
        breakminutes = tempbreakminutes;
        breakseconds = tempbreakseconds;
        clearInterval(timer);
        breaktimer = setInterval(startBreakTimer, 1000);
        return;
    }
    if(seconds == 0){
        seconds = 60;
        if(minutes!=0){
            minutes--;
        }
    }
    let output = "";
    if(seconds<=9){
        output = minutes + " : " + "0" + seconds;
    }
    if(minutes<=9){
        output = "0" + minutes + " : " + seconds;
    }
    if(seconds<=9 && minutes<=9){
        output = "0" + minutes + " : " + "0" + seconds;
    }
    if(seconds>9 && minutes>9){
        minutes + " : " + + seconds;
    }
    if(minutes==-1 && seconds==60){
        output = "0" + " : " + "0" + seconds;
    }
    seconds--;
    document.getElementById('sessioninfo').innerHTML = "Session " + sessiontime;
    screen.innerHTML = output;
};




function startBreakTimer(){
    screen.style.color="orangered";
    andaflag = 1;
    if(breakseconds==0&&breakminutes==0){
        breaktime++;
        seconds = tempseconds;
        minutes = tempminutes;
        clearInterval(breaktimer);
        timer = setInterval(startTimer, 1000);
        return;
    }
    if(breakseconds == 0){
        breakseconds = 60;
        if(breakminutes!=0){
            breakminutes--;
        }
    }
    let output = "";
    if(breakseconds<=9){
        output = breakminutes + " : " + "0" + breakseconds;
    }
    if(breakminutes<=9){
        output = "0" + breakminutes + " : " + breakseconds;
    }
    if(breakseconds<=9 && breakminutes<=9){
        output = "0" + breakminutes + " : " + "0" + breakseconds;
    }
    if(breakseconds>9 && breakminutes>9){
        breakminutes + " : " + breakseconds;
    }
    if(breakminutes==-1 && breakseconds==60){
        output = "0" + " : " + "0" + breakseconds;
    }
    breakseconds--;
    document.getElementById('sessioninfo').innerHTML = "Break " + breaktime;
    screen.innerHTML = output;
};

resetbtn.addEventListener('click', ()=>{
    clearInterval(timer);
    clearInterval(breaktimer);
    minutes = 0;
    seconds = 0;
    breakminutes = 0;
    breakseconds = 0;
    tempbreakminutes = 0;
    tempbreakseconds = 0;
    tempminutes = 0;
    tempseconds = 0;
    sessiontime = 1;
    breaktime = 1;
    screen.innerHTML = "00 : 00"
    document.getElementById('sessioninfo').innerHTML = "Session";
    timeofbreak.innerHTML = "0 mins";
    timeofsession.innerHTML = "0 mins";
});