window.onload=function(){
	var DIV = document.createElement("div");
	
	DIV.id = "ImgContainerID";
	DIV.style="display:none;position:absolute;z-index:1;";
	
	document.body.appendChild(DIV);
	document.body.insertBefore(DIV, document.body.firstElementChild);
}

function showImg(src)
{
	var posX = 0, posY = 0;

	var event = event || window.event;

	if (event.pageX || event.pageY)
	{
		posX = event.pageX;
		posY = event.pageY;

	} 
	else if (event.clientX || event.clientY)
	{
		posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
	}

	var IMGContainer = document.getElementById("ImgContainerID");
	
	IMGContainer.style.left 	= posX;
	IMGContainer.style.top 		= posY; 
	IMGContainer.innerHTML 		= "<img src=\"" + src + "\" />";
	IMGContainer.style.display  = "block";
}

function hideImg(src)
{
	var IMGContainer = document.getElementById("ImgContainerID");
	
	IMGContainer.InnerHTML  	= "";
	IMGContainer.style.display  = "none";
}
 
