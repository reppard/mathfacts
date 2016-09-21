function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function fetchProblem() {
  var problem = {
    first_num:  randomInt(0, config.maxnum),
    second_num: randomInt(0, config.maxnum),
    operator:   config.operator
  }

  problem.answer = eval(
      problem.first_num + problem.operator + problem.second_num
      );

  return problem;
};

function loadProblem(lastProblem) {
  if (lastProblem === undefined) {
    lastProblem = {
      answer: 0
    }
  }
  var problem = fetchProblem();

  while (lastProblem.answer == problem.answer) {
    problem = fetchProblem();
  }

  document.getElementById('num1').innerHTML         = problem.first_num;
  document.getElementById('num2').innerHTML         = problem.second_num;
  document.getElementById('operatorSign').innerHTML = problem.operator;

  return problem;
}

function updateScore(score) {
  scoreBox.innerHTML = "Score: " + score;
}

function initializeRound() {
  var problem = loadProblem();
	score = 0;

  answerBox.disabled = false;
  answerBox.focus();

  updateScore(score);
  startTime();
  answerBox.onkeydown = function(e) {
    if (e.keyCode == 13) {
      if (answerBox.value == problem.answer) {
        feedbackBox.innerHTML = "<span style='color: #4F87A5'>CORRECT!</span>";
        score += 1;
        updateScore(score);
        answerBox.value = '';
        problem = loadProblem(problem);
      } else {
        answerBox.value = '';
        feedbackBox.innerHTML = "<span style='color: #FF9400'>WRONG!</span>";
      }
    }
  }
}

function endOfRoundMessage () {
	return "<span style='color: #FF9400'>"
		+ "Times up! Final Score: "
		+ score
		+ "</span><br>"
		+ "<div id='tryagain' onclick='showConfig(true)'>Try Again?</div>";
}

function timesUp(feedbackBox, answerBox) {
  answerBox.disabled = true;
  feedbackBox.innerHTML = endOfRoundMessage();
}

function formatTime(seconds) {
  var mins = Math.floor(seconds /60);
  var secs = seconds % 60;

  if(secs < 10){
    secs = "0" + secs;
  }
  return mins + ":" + secs;
}

function showConfig (status) {
  var modal = document.getElementById('myModal');
  var start = document.getElementById('start');

  if(status) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }

  // Start button
  start.onclick = (function(){
    config = {
      timelimit: timelimit.value,
      operator:  operator.value,
      maxnum:    maxnum.value
    };

    modal.style.display = "none";
    feedbackBox.innerHTML = '';
    initializeRound();
  });
}

function startTime () {
  clock.innerHTML = "--:--"
  var time = config.timelimit * 60;

  var interval = window.setInterval(function() {
    if (time > 0) {
      time -= 1;
    } else {
      timesUp(feedbackBox, answerBox);
      window.clearInterval(interval);
    }
    clock.innerHTML = formatTime(time);
  }, 1000);
}

// Initialize Game

var score       = 0;
var scoreBox    = document.getElementById("score");
var feedbackBox = document.getElementById("feedback");
var answerBox   = document.getElementById("answer");
var timelimit   = document.getElementById("timelimit");
var operator    = document.getElementById("operator");
var maxnum      = document.getElementById("maxnum");
var clock       = document.getElementById("clock");
var config      = {
  timelimit: timelimit.value,
  operator:  operator.value,
  maxnum:    maxnum.value
};

window.onload = showConfig(true);
