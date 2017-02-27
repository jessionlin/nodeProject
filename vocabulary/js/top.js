/**/
$(document).ready(function(){
	var top = document.createElement("div"),
		body = document.getElementsByTagName("body")[0],
		div = document.getElementsByTagName("div")[0],
		img = document.createElement("img");
	top.style.width="100%";
	top.style.height="100px";
	top.style.marginTop = "5px";
	top.style.marginLeft = "5px";
	top.id = "top";
	body.insertBefore(top,div);
	img.src = "image/top_bac.png";
	img.style.width="99%";
	img.style.height="100px";
	top.appendChild(img);
});