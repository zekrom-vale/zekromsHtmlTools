"use strict";
function RegExpSwitch(value,args,options){
	let opt={};
	if(typeof options==="object")opt=options;
	else args=Array.prototype.slice.call(arguments,1);
	for(let i=0,_a=args.length;i<_a;i+=2){
		if(args[i]==="default"&&opt.default!=false)return args[i+1]();
		let reg=args[i] instanceof RegExp?args[i]:new RegExp(args[i]);
		if(reg.test(value))return args[i+1]();
	}
}