"use strict";
HTMLElement.prototype.empty=function(){
	this.innerHTML="";
}
HTMLElement.prototype.getValue=function(){
	return this.getAttribute("value");
}