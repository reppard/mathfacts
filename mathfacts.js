function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function fetchProblem() {
  var problem = {
    first_num: randomInt(0, 12),
    second_num: randomInt(0, 10)
  }
  problem.answer = problem.first_num + problem.second_num;

  return problem
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

  document.getElementById('num1').innerHTML = problem.first_num;
  document.getElementById('num2').innerHTML = problem.second_num;
  return problem;
}

function updateScore(score) {
  var scoreBox = document.getElementById("score");
  scoreBox.innerHTML = "Score: " + score;
}

function problemInit() {
  var problem = loadProblem();

  updateScore(score);
  answerBox.focus();
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

function timesUp(feedbackBox, answerBox) {
  answerBox.disabled = true;
  feedbackBox.innerHTML =
    "<span style='color: #FF9400'>Times up! Final Score: " + score + "</span>";
}

function formatTime(seconds) {
  var mins = Math.floor(seconds /60);
  var secs = seconds % 60;

  if(secs < 10){
    secs = "0" + secs;
  }
  return mins + ":" + secs;
}

var score = 0;
var feedbackBox = document.getElementById("feedback");
var answerBox = document.getElementById("answer");

window.onload = problemInit();
window.setInterval(function() {
  var time = document.getElementById("secs").innerHTML;
  if (time > 0) {
    time -= 1;
  } else {
    timesUp(feedbackBox, answerBox);
  }
  document.getElementById("secs").innerHTML = time;
  document.getElementById("mins").innerHTML = formatTime(time);
}, 1000);
