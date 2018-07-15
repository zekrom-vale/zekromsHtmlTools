"use strict";
addEventListener("load",()=>{
saveData=(function(){
	const a=document.createElement("a");
	a.style.display="none";
	document.body.appendChild(a);
	return(data,fileName,t)=>{
		let url=URL.createObjectURL(new Blob([t?data:JSON.stringify(data)],{type:"octet/stream"}));
		a.href=url;
		a.download=fileName;
		a.click();
		URL.revokeObjectURL(url);
	};
	//https://jsfiddle.net/koldev/cW7W5
}());
});