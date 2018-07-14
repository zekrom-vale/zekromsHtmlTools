addEventListener("DOMContentLoaded",()=>{
	for(let i=0,el=document.querySelectorAll('[style*="!important"]'),_e=el.length;i<_e;i++){
		el.style.cssText=el.style.cssText.replace(/!important/g,"");
	}
});