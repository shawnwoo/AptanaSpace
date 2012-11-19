
/**
 * Name: Xiaopeng WU
 * Course Name: COEN 276 Web programming I
 * Assign Number:2
 * Date of Submission: Oct. 26th, 2012	**/
var seconds = 0;
		var mins = 0;


$(document).ready(function() {
	
	geoQuestions.sort(function() {return 0.5 - Math.random()});

	var qc = "#question_section p";
	var r = new result();
	var number = 0;

	$("#btnStart").click(function() {

		r.clearScore();
		$('#progress_section').css("visibility","visible");
		$("#timer_icon").css("visibility","visible");
		updateProgressBar(0);

		number = constructQuestion(number);

		$("#btnStart").prop("disabled", true);
		$("#btnStart").attr("style", "color:#9c9c9c;");
		$("#btnNext").prop("disabled", false);
		$("#btnNext").attr("style", "color:#0000FF;");

		
		
		t=setInterval("display()", 1000);
		display();
	})

	$("#btnNext").click(function() {

		if (number == geoQuestions.length) {
			$("#btnNext").prop("disabled", true);
			$("#btnNext").attr("style", "color:#9c9c9c;");
			
			
			
		}

		checkScore(geoQuestions[number - 1], r);

		updateScore(r);

		updateProgressBar(number / geoQuestions.length);
		
		if(number==geoQuestions.length){
			alert("Congratulations, you finished the quiz!");
			clearInterval(t);
		}

		number = constructQuestion(number);

	})

	$("#btnQuit").click(function() {
		var confirmBtn = confirm("Are you sure you want to quit the quiz?")
		if (confirmBtn == true) {
			document.location.reload(true);

		} else {
		}

	})
	var constructQuestion = function(number) {

		if (number > geoQuestions.length - 1)
			return number;

		var question = geoQuestions[number];

		if (question.questionType === 1) {
			createMultiChoiceQuestion(question);
			number++;
		}

		if (question.questionType === 2) {
			createInputQuestion(question);
			number++;
		}

		return number;

	}
})
var createMultiChoiceQuestion = function(question) {

	$("#question_section").html("<p>" + question.question + "</p></br><form></form>	");

	addOption(question, $("#question_section form"));

}
var addOption = function(question, element) {
	for (q in question.choices) {

		element.append("<input type=\"radio\" name=\"group1\" id=\"" + question.choices[q] + "\" value=\"" + question.choices[q] + "\">" + question.choices[q] + " </br>");

	}
}
var createInputQuestion = function(question) {
	var qs = "#question_section";

	$(qs).html("<p>" + question.question + "</p></br><form></form>	");
	$(qs + " form").append("Answer: <input type=\'text\' id=\'ans\'>");

}
var checkScore = function(question, result) {

	if (question.questionType === 1) {
		var ans = "#" + question.correctChoice;

		if ($(ans).attr("checked")) {
			result.addRight(question.score);
		} else {
			result.addWrong(question.score);
		}
	}

	if (question.questionType === 2) {

		var ans = "#ans";

		if ($(ans).val() === question.correctChoice) {
			result.addRight(question.score);

		} else {
			result.addWrong(question.score);
		}
	}

}
var updateScore = function(result) {
	$("#right_score").text(result.getRight());
	$("#wrong_score").text(result.getWrong());
}
function result() {
	var right = 0;
	var wrong = 0;
	var total = 0;

	this.addRight = function(score) {
		right += score;
	}

	this.addWrong = function(score) {
		wrong += score;
	}

	this.getRight = function() {
		return right;
	}

	this.getWrong = function() {
		return wrong;
	}

	this.getTotal = function() {
		return right - wrong;
	}

	this.clearScore = function() {
		right = 0;
		wrong = 0;
		total = 0;
	}
}

var showTimer = function() {

}

var display = function() {
			if (seconds >= 59) {
				seconds = 0;
				mins += 1;
			} else {
				seconds += 1;
			}

			$("#timer").text(mins + " mins " + seconds + " secs");

		}
var updateDate = function() {
	var mydate = new Date()
	var year = mydate.getYear()
	if (year < 1000)
		year += 1900
	var day = mydate.getDay()
	var month = mydate.getMonth()
	var daym = mydate.getDate()
	if (daym < 10)
		daym = "0" + daym
	var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
	var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
	$("#date").text(dayarray[day] + ", " + montharray[month] + " " + daym + ", " + year);

}
var updateProgressBar = function(number) {
	
	$("#progressbar").progressbar({
		value : number * 100
	});
}
