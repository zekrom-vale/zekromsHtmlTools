"use strict";
//Requires node.js
function alertInfo(m,t="danger",id,loc){
	var div=document.getElementById(id);
	if(div)div.classList.value=div.innerHTML="";
	else{
		div=document.createElement("div");
		if(id)div.id=id;
		div.setAttribute("roll","alert");
		document.getElementById("container").prepend(div);
	}
	div.appendChild(typeof m==="string"?
		document.createTextNode(m):
			Array.isArray(m)?node(...m):m
	);
	div.appendChild(node("button","&times;",{class:"close","data-dismiss":"alert"},true));
	div.classList.add("alert","alert-"+t,"alert-dismissible");
	loc?div.classList.add("loc"):scrollTo(0,0);
}