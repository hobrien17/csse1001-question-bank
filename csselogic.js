var ANSWER_FORMAT = '<input type="radio" name="q" value="a"> {0} <br>\n' +
					'<input type="radio" name="q" value="b"> {1} <br>\n' +
			        '<input type="radio" name="q" value="c"> {2} <br>\n' +
			        '<input type="radio" name="q" value="d"> {3} <br>\n' +
			        '<input type="radio" name="q" value="e"> {4} <br>\n';
var JSON_URL = "https://python-question-gen.herokuapp.com";
var question;

String.Format = function (b) {
    var a = arguments;
    return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
        if (b.substring(0, 2) == "{{") return b;
        var c = parseInt(b.match(/\d/)[0]);
        return a[c + 1]
    })
};

function getJson(ext) {
	$.ajax({
		type: "GET",
		url: JSON_URL + ext,
		dataType: "json",
		success: callback,
		error: function (err) {
			alert("AJAX error in request: " + JSON.stringify(err, null, 2));
		}
	});
}

function callback(response) {
	question = response;
	populateQuestion();
	$("#submit").show();
}

function nextQuestion() {
	$("#submit").hide()
	$("#frm").hide()
	$("#question").html("Loading question...")
	var i = Math.floor(Math.random()*3)
	if (i == 0) {
		getJson("/exp");
	} else if (i == 1) {
		getJson("/slice");
	} else if (i == 2) {
		getJson("/list");
	}
}

function populateQuestion() {
	$("#question").html(question["question"]replace(/(?:\r\n|\r|\n)/g, '<br />'));
	$("#frm").html(String.Format(ANSWER_FORMAT, 
		question["a"], question["b"], question["c"], question["d"], question["e"]));
	$("#frm").show()
}

function pressBtn() {
	var query = document.querySelector('input[name="q"]:checked');
	var selected;
	if(query == null) {
		selected = null;
	} else {
		selected = query.value;
	}
	if(selected == question["ans"]) {
		alert("Correct!");
	} else {
		alert("Sorry, the correct answer was actually " + question[question["ans"]]);
	}
	nextQuestion();
}

function load() {
	$("#submit").hide();
}

window.onload = load;