$(document).ready(() => {
	$('.status').click(function() {
		$('.status').removeClass('status-active');
		$(this).addClass('status-active');
	});
});

let name = document.getElementById("nume");
let comentariu = document.getElementById("comentariu");
let submit = document.getElementById("submit");
let best = document.getElementById("best");
let worst = document.getElementById("worst");

submit.addEventListener("click", function() {
	let status = "MEDIUM";
	if(best.classList.contains('status-active')) {
		status = "BEST";
	} else if(worst.classList.contains('status-active')) {
		status = "WORST";
	}
    let data = JSON.stringify({
        name : name.value,
        text : comentariu.value,
		rating : status
    });
    fetch("http://localhost:8080/comments", {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : data
    })
    .then(function() {
        location.reload();
    })
})

let comentarii = document.getElementById("comentarii");

function getReaction(reaction) {
	switch(reaction) {
		case 'BEST':
			return '<i class="fa fa-smile-o"></i>';
		case 'MEDIUM':
			return '<i class="fa fa-meh-o"></i>';
		case 'WORST':
			return '<i class="fa fa-frown-o"></i>';
	}
	return '';
}

function createComment(commentResponse) {
	const comment = document.createElement("div");
	const name = document.createElement("div");
	const text = document.createElement("div");
	const emoji = document.createElement("div");

	name.appendChild(document.createTextNode(commentResponse.name));
	name.appendChild(document.createTextNode('\x20'));
	text.appendChild(document.createTextNode(commentResponse.text))
	text.className="comment-text";
	name.className="comment-name";
	emoji.innerHTML=getReaction(commentResponse.rating);
	name.appendChild(emoji).classList.add('my_div');
	comment.appendChild(name);
	comment.appendChild(text);
	comment.className="comment";
	comentarii.appendChild(comment);
}

fetch('http://localhost:8080/comments')
  .then(response => response.json())
  .then(function(data) {
	  for(let commentResponse of data) {
		  createComment(commentResponse);
	  }
	  
  });