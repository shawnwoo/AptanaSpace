// Add more objects of your choice

$(document).ready(function() {

	var qc = "#question_section p";
	var r = new result();
	var number = 0;

	$("#btnStart").click(function() {

		r.clearScore();

		number = constructQuestion(number);

		$("#btnStart").prop("disabled", true);
		$("#btnStart").attr("style", "color:#9c9c9c;");

	})

	$("#btnNext").click(function() {

		if (number == geoQuestions.length) {
			$("#btnNext").prop("disabled", true);
			$("#btnNext").attr("style", "color:#9c9c9c;");
		}

		console.log(number);

		checkScore(geoQuestions[number - 1], r);

		updateScore(r);

		number = constructQuestion(number);

	})

	$("#btnQuit").click(function() {
		alert();
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
		console.log($(ans).val());
		console.log(question.correctChoice);

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
