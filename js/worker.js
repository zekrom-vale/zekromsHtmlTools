"use strict";
{
	const funcs=[funcs Object];
	if(isWorker())onmessage=e=>{
		switch(e.data.act){
			case "save":
				funcs[e.data.name]=new Function(...e.data.args,e.data.func);
				break;
			case "call":
				postMessage(funcs[e.data.func].apply(e.data.that,e.data.args));
				break;
			case "eval":
				postMessage(new Function(...Object.keys(e.data.args),e.data.func).apply(e.data.that,Object.values(e.data.args)));
		}
	}
	else worker.funcs=funcs;
	function isWorker(){
		try{
			if(DedicatedWorkerGlobalScope)return true;
		}catch(e){return false;}
	}
}