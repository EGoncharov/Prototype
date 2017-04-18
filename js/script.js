var  sliderDiv = document.getElementById("slider");

function Item(userName, avatar, pic, like, likeacktive) {
	this.userName = userName;
	this.avatar = avatar;
	this.pic = pic;
	this.like = like;
	this.likeacktive = likeacktive;
};

Item.prototype.render = function() {
	var item = document.createElement("div");
	item.setAttribute("class","item");

	var img = document.createElement("img");
	img.setAttribute("src", this.avatar);

	img.onclick = function() {
		var block = document.getElementById("main");
		block.innerHTML = "";
		var bigFoto = document.createElement("img");
		bigFoto.setAttribute("src", this.pic);
		block.appendChild(bigFoto);

		var footer = document.getElementById("footer");
		footer.innerHTML = "";
		var like = document.createElement("img");
		like.setAttribute("src", this.like);
		footer.appendChild(like);

		like.onclick = function() {
			like.setAttribute("src", this.likeacktive);
		}.bind(this)
		var text = document.createElement("input");
		text.setAttribute("placeholder","Add a comment...");
		footer.appendChild(text);
	}.bind(this);

	var name = document.createElement("h4");
	name.textContent = this.userName;

	item.appendChild(img);
	item.appendChild(name);

	return item
};

var users = [
	["David","img/1.jpg","img/1.jpg","img/like.png","img/likeacktive.png"],
	["Chris","img/2.jpg","img/2.jpg","img/like.png","img/likeacktive.png"],
	["Mark","img/3.jpg","img/3.jpg","img/like.png","img/likeacktive.png"],
	["Paul","img/4.jpg","img/4.jpg","img/like.png","img/likeacktive.png"],
	["Joe","img/5.jpg","img/5.jpg","img/like.png","img/likeacktive.png"],
	["Linda","img/6.jpg","img/6.jpg","img/like.png","img/likeacktive.png"]
];

var usersObj = [];

for (var i=0; i<users.length; i++) {
	usersObj.push( new Item(users[i][0], users[i][1], users[i][2], users[i][3], users[i][4]));
};

for (var i=0; i<usersObj.length; i++) {
	sliderDiv.appendChild(usersObj[i].render());
};

var header = document.getElementById("header");
var deltaX;
function move(e) {
	var pX = e.pageX;
	sliderDiv.style.left = (pX-deltaX) + "px";
}

function startDrag(e) {
	deltaX = e.pageX - sliderDiv.offsetLeft;
	header.addEventListener("mousemove", move);
}
function stopDrag(e) {
	header.removeEventListener("mousemove", move);
	var headerWidth = header.offsetWidth;
	var delta = - (sliderDiv.scrollWidth - headerWidth);
	if (sliderDiv.offsetLeft > 0) {
		sliderDiv.style.left = 0;
	} else if (sliderDiv.offsetLeft  < delta) {
		sliderDiv.style.left = delta + "px";
	}
}

sliderDiv.onmousedown = startDrag;
sliderDiv.onmouseup = stopDrag;