"use strict";
if(function(){
	try{
		if(localStorage.getItem&&localStorage.setItem)return true;
	}catch(e){return false}
}()){
	var localStorage={};
	localStorage.getItem=n=>{
		var ca=decodeURIComponent(document.cookie).split(';');
		const _n=n.length+1;
		n=new RegExp(`^${n}=`);
		for(let i of ca)if(n.test(i))return i.slice(_n);
	}
	localStorage.setItem=(v,s,e=60)=>{
		document.cookie=v+`=${s};expires=`+(function(){
			let d=new Date();
			return d.setTime(d.getTime()+(e*864e+5)).toUTCString();
		}());
	}
}