"use strict";
//Requires jQuery
function alertModal(mh,mb,f,focus="ok"){
	if(mh)document.getElementById("modalHead").innerHTML=mh;
	if(mb)document.getElementById("modalBody").innerHTML=mb;
	$("#modal:First").modal();
	var modal=new Promise((resolve,reject)=>{
		const ok=document.getElementById("modalOk"),
		cancel=document.getElementById("modalCancel"),
		x=document.getElementById("modalX"),
		rem=()=>{
			ok.removeEventListener("click",res);
			cancel.removeEventListener("click",rej);
			x.removeEventListener("click",rej);
			removeEventListener("keyup",keyRes);
		},
		res=()=>{
			rem();	resolve();
		},
		rej=()=>{
			rem();	reject();
		},
		keyRes=event=>{
			if(event.key==="Escape")x.click();
			else if(/Arrow[ULDR]/.test(event.key)){
				if(document.activeElement==cancel)ok.focus();
				else cancel.focus();
			}
		};
		if(focus==="ok")ok.focus();
		else if(focus==="cancel")cancel.focus();
		addEventListener("keyup",keyRes);
		ok.addEventListener("click",res);
		cancel.addEventListener("click",rej);
		x.addEventListener("click",rej);
	});
	function fin(){
		if(f["finally"])f["finally"][0](...f["finally"].slice(1));
	}
	modal.then(()=>{
		if(f.resolve){
			fin();
			f.resolve[0](...f.resolve.slice(1));
		}
		else fin();
	},()=>{
		if(f.reject){
			fin();
			f.reject[0](...f.reject.slice(1));
		}
		else fin();
	});
}
/*
//Requires HTML markup
<div class="modal center" id="modal" aria-modal="true">
	<div class="modal-dialog">
		<div class="modal-content" roll="alert">
			<div class="modal-header">
				<h4 class="modal-title" id="modalHead" roll="alertdialog"></h4>
				<button class="close" data-dismiss="modal" id="modalX">&times;</button>
			</div>
			<div class="modal-body" id="modalBody" roll="alertdialog"></div>
			<div class="modal-footer">
				<button class="btn-primary" data-dismiss="modal" id="modalOk" data-nav="false">Ok</button>
				<button class="btn-danger" data-dismiss="modal" id="modalCancel" data-nav="false">Cancel</button>
			</div>
		</div>
	</div>
</div>
*/