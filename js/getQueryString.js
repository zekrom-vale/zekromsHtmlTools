"use strict";
function getQueryString(path,raw){
	const query=location.search.slice(1).split("&"),
	reg=new RegExp(`^${path}=`);
	path=path.length+1;
	for(let i of query)if(reg.test(i))return raw?i:decodeURIComponent(i.slice(path).replace(/\+/g,"%20"));
}