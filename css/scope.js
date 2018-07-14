"use strict";
//Makes :scope work in in line scripts
//https://developer.mozilla.org/en-US/docs/Web/CSS/:scope
addEventListener("DOMContentLoaded",()=>{
	for(let i=0,styles=document.querySelectorAll("style[href],style[src]"),_s=styles.length;i<_s;i++){
		fetch(styles[i].getAttribute("href")||styles[i].getAttribute("src")).then(r=>r.text()).then((r)=>{
			styles[i].innerHTML=r;
			styles[i].removeAttribute("href");
			styles[i].removeAttribute("src");
		});
	}
	for(let i=0,scopes=document.body.querySelectorAll("style.scope"),_s=scopes.length;i<_s;i++){
		let id=i+(scopes[i].parentNode.id||"");
		scopes[i].parentNode.dataset.scope=id;
		scopes[i].innerHTML=scopes[i].innerHTML.replace(/:scope/i,`[data-scope="${id}"]`);
		scopes[i].classList.remove("scope");
	}
	for(let i=0,scopes=document.body.querySelectorAll("style[scoped]"),_s=scopes.length;i<_s;i++){
		let id=i+(scopes[i].parentNode.id||"");
		scopes[i].parentNode.dataset.scope=id;
		scopes[i].innerHTML=scopes[i].innerHTML.replace(/([,};]\s*|@media(?:[^\{"']|"(?:[^"]+|\\")*"|'(?:[^']+|\\')*')+\{|^)([^@])/i,`$1[data-scope="${id}"] $2`);
		scopes[i].removeAttribute("scoped");
	}
});