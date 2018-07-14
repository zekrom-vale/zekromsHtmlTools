"use strict";
//Preppend to document head 
function(){
	let head=document.head||document.createElement("head"),
	CSP=document.createElement("meta");
	CSP.setAttribute("http-equiv","Content-Security-Policy");
	CSP.setAttribute("content","script-src 'none';");
	head.appendChild(CSP);
	if(!document.head)document.getElementsByTagName("html")[0].appendChild(head);
}();