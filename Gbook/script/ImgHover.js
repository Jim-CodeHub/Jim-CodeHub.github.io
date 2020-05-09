window.onload=function(){
	var DIV = document.createElement("div");
	
	DIV.id = "ImgContainerID";
	DIV.style="display:none;position:absolute;z-index:1;";
	
	document.body.appendChild(DIV);
	document.body.insertBefore(DIV, document.body.firstElementChild);
}

function showImg(src)
{
	var IMGContainer = document.getElementById("ImgContainerID");
	
	IMGContainer.style.left 	= event.clientX;
	IMGContainer.style.top 		= event.clientY;
	IMGContainer.innerHTML 		= "<img src=\"" + src + "\" />";
	IMGContainer.style.display  = "block";
}

function hideImg(src)
{
	var IMGContainer = document.getElementById("ImgContainerID");
	
	IMGContainer.InnerHTML  	= "";
	IMGContainer.style.display  = "none";
}
 