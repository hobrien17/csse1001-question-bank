var ANSWER_FORMAT = '<input type="radio" name="q" value="a"> {0} <br>\n' +
					'<input type="radio" name="q" value="b"> {1} <br>\n' +
			        '<input type="radio" name="q" value="c"> {2} <br>\n' +
			        '<input type="radio" name="q" value="d"> {3} <br>\n' +
			        '<input type="radio" name="q" value="e"> {4} <br>\n';
var JSON_URL = "https://python-question-gen.herokuapp.com"
var qno;
var question;

String.Format = function (b) {
    var a = arguments;
    return b.replace(/(\{\{\d\}\}|\{\d\})/g, function (b) {
        if (b.substring(0, 2) == "{{") return b;
        var c = parseInt(b.match(/\d/)[0]);
        return a[c + 1]
    })
};

function get_json(ext) {
	var url = JSON_URL + ext;
	request.get(url, function(res) {
		var body = '';
		res.on('data', function(chunk) {
			body += chunk;
		});

		res.on('end', function() {
			var response = JSON.parse(body);
			pythonCallback(response);
		});
	});
}

function pythonCallback(response) {
	console.log(response["question"])
}

function nextQuestion() {
	/*var index = qno;
	while(index  == qno) {
		qno = Math.floor(Math.random() * data.length);
	}
	question = data[qno];
	populateQuestion();*/
}

function populateQuestion() {
	/*document.getElementById("question").innerHTML = question["question"];
	//console.log(document.getElementById("frm").innerHtml);
	document.getElementById("frm").innerHTML = String.Format(ANSWER_FORMAT, 
		question["a"], question["b"], question["c"], question["d"], question["e"]);*/
}

function pressBtn() {
	/*var query = document.querySelector('input[name="q"]:checked');
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
	nextQuestion();*/
}

window.onload = get_json("/exp");