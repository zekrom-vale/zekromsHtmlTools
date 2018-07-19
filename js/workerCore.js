"use strict";
/*
CSP:The Content Security Policy is a way to restrict content from ruining on a page, by default it allows all content.
Call worker with the functions required (strings recommended Ex:"function(){doStuff}")
Then await for worker to process your functions before requesting
CSP `script-src blob:` required
	worker({
		synchronousWait:"(t=1e+10)=>{for(let i=0;i<t;i++)continue;return 'done'}",
		add:'function(...n){return n.reduce((a,v)=>a+v)}',
		subtract:`function(...n){return n.reduce((a,v)=>a-v)}`,
		multiply:"function(...n){return n.reduce((a,v)=>a*v)}",
		divide:function(...n){return n.reduce((a,v)=>a/v)}//Wastes time on back-end optimizations
		//Other functions to be called
		//CSP `script-src 'unsafe-eval';` not required to call
	});
*/
var worker=function(funcs){
	var funcsArr=[],
	n=0;
	for(let i in funcs)funcsArr[n++]=i+":"+funcs[i].toString();
	return new Promise(resolve=>{
		fetch("js/worker.js").then(r=>r.text()).then(text=>{
			var url=URL.createObjectURL(new Blob(text.replace('[funcs Object]'),funcsArr.join(","),{type:"application/javascript"}));
			if(self.Worker){
				var response,
				queue=[];//pseudo-queue
				const coreWorker=new Worker(url),//Revoke url and blob?
				end=new CustomEvent("end"),
				___call=(func,that,args,act)=>{
					const _q=queue.length,
					obj={func:func,that:that,args:args,act:act};
					if(_q===0){
						queue[0]=undefined;
						return new Promise(r=>{
							coreWorker.postMessage(obj);
							coreWorker.onerror=coreWorker.onmessage=e=>{
								if(queue.length>1)queue[1].run();
								else queue=[];
								r(e.data||e);
							}
						});
					}
					else{
						queue[_q]={run:run.bind(_q,obj),event:document.createElement("i")};
						return new Promise(r=>{
							queue[_q].event.addEventListener("end",()=>{
								r(response);
								response=queue[_q]=undefined;
							},{once:true});
						});
					}
				};
				worker={
					call:(func,that,args=[])=>___call(func,that,args,"call"),
					//requires CSP of `script-src 'unsafe-eval';`
					eval:(func,that,args={})=>___call(func,that,args,"eval"),
					save:(name,func,args=[])=>{
						coreWorker.postMessage({func:func,args:args,name:name,act:"save"});
					}
				}
				function run(obj){
					coreWorker.postMessage(obj);
					coreWorker.onerror=coreWorker.onmessage=e=>{
						response=e.data||e;
						queue[this].event.dispatchEvent(end);
						if(queue.length-1>this)queue[this+1].run();
						else queue=[];
					}
				}
			}
			else{
				console.warn("Web Worker not supported");
				{
					const script=document.createElement("script");
					script.src=url;
					document.head.appendChild(script);
				}
				worker=function(){
					const ___call=(func,that,args,act)=>new Promise(r=>{
						switch(act){
							case"call":
								r(worker.funcs[func].apply(that,args));
								break;
							case"eval":
								r(new Function(...Object.keys(args),func).apply(that,Object.values(args)));
						}
					});
					return{
						call:(func,that,args=[])=>___call(func,that,args,"call"),
						//  v  requires CSP of `script-src 'unsafe-eval';`  v
						eval:(func,that,args={})=>___call(func,that,args,"eval"),
						save:(name,func,args=[])=>{
							worker.funcs[name]=new Function(...args,func);
						}
					}
				}();
			}
			resolve();
		});
	});
};