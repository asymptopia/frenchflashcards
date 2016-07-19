var TA_WIDTH="270px";
var TA_HEIGHT="150px";
var agent=null;
var verb_config=null;

if(navigator.userAgent.indexOf("MSIE")>-1)agent="MSIE";
else if(navigator.userAgent.indexOf("Chrome")>-1)agent="CHROME";
else if(navigator.userAgent.indexOf("Safari")>-1)agent="SAFARI";
else agent="SAFARI";//i.e. Firefox,Netscape,Mozilla,Opera

var current_verb=null;
var current_vidx=null;
/*
var indicative_tenses=['present','passe_compose','imperfect','pluperfect','future'];
var indicative_fr_tenses=['présent','passé composé','imparfait','plus-parfait','futur'];
var indicative_persons=['je','tu','il','nous','vous','ils'];

var	conditional_fr_tenses=['présent','passé'];
var	conditional_tenses=['present','past'];
var conditional_persons=['je','tu','il','nous','vous','ils'];

var subjunctive_fr_tenses=['présent'];
var subjunctive_tenses=['present'];
var subjunctive_persons=['je','tu','il','nous','vous','ils'];

var imperative_fr_tenses=[''];
var imperative_tenses=['present'];
var imperative_persons=['tu','nous','vous'];

var inf_present_past_fr_tenses=['inf,présent,passé'];
var inf_present_past_tenses=[];
var inf_present_past_persons=[];
*/
function verb_selectCB(e){
	
	verb_select=document.getElementById("verb_select");
	
	for(var vidx=0;vidx<verb_select.options.length;vidx++)
		if(verb_select.options[vidx].selected==1){
			if(verb_select.options[vidx].text=="New"){
				document.getElementById("indicative_present").value="";
				document.getElementById("indicative_passe_compose").value="";
				document.getElementById("indicative_imperfect").value="";
				document.getElementById("indicative_pluperfect").value="";
				document.getElementById("indicative_future").value="";
				
				document.getElementById("conditional_present").value="";
				document.getElementById("conditional_past").value="";
				
				document.getElementById("subjunctive_present").value="";
				document.getElementById("imperative_present").value="";
				document.getElementById("inf_present_past").value="";
				current_verb=null;current_vidx=null;
				return;
			}
			else{
				current_verb=verbs_fr[vidx-1];current_vidx=vidx-1;break;
			}
		}
	
	for(var tidx=0;tidx<indicative_tenses.length;tidx++){
		ta=document.getElementById("indicative_"+indicative_tenses[tidx]);
		tense=indicative_tenses[tidx];
		ta.value='';
		for(var pidx=0;pidx<indicative_persons.length;pidx++){
			if(!current_verb['indicative'][tense][indicative_persons[pidx]])continue;
			ta.value+=current_verb['indicative'][tense][indicative_persons[pidx]];
			if(pidx<indicative_persons.length-1)ta.value+="\n";
		}
	}
	for(var tidx=0;tidx<conditional_tenses.length;tidx++){
		ta=document.getElementById("conditional_"+conditional_tenses[tidx]);
		tense=conditional_tenses[tidx];
		ta.value='';
		for(var pidx=0;pidx<conditional_persons.length;pidx++){
			if(!current_verb['conditional'][tense][conditional_persons[pidx]])continue;
			ta.value+=current_verb['conditional'][tense][conditional_persons[pidx]];
			if(pidx<conditional_persons.length-1)ta.value+="\n";
		}
	}
	for(var tidx=0;tidx<subjunctive_tenses.length;tidx++){
		ta=document.getElementById("subjunctive_"+subjunctive_tenses[tidx]);
		tense=subjunctive_tenses[tidx];
		ta.value='';
		for(var pidx=0;pidx<subjunctive_persons.length;pidx++){
			if(!current_verb['subjunctive'][tense][subjunctive_persons[pidx]])continue;
			ta.value+=current_verb['subjunctive'][tense][subjunctive_persons[pidx]];
			if(pidx<subjunctive_persons.length-1)ta.value+="\n";
		}
	}
	for(var tidx=0;tidx<imperative_tenses.length;tidx++){
		ta=document.getElementById("imperative_"+imperative_tenses[tidx]);
		tense=imperative_tenses[tidx];
		ta.value='';
		for(var pidx=0;pidx<imperative_persons.length;pidx++){
			if(!current_verb['imperative'][tense][imperative_persons[pidx]])continue;
			ta.value+=current_verb['imperative'][tense][imperative_persons[pidx]];
			if(pidx<imperative_persons.length-1)ta.value+="\n";
		}
	}
		
	ta=document.getElementById("inf_present_past");
	ta.value='';
	try{if(current_verb['infinitive'])ta.value+=current_verb['infinitive']+"\n";}catch(e){;}
	try{if(current_verb['present_participle'])ta.value+=current_verb['present_participle']+"\n";}catch(e){;}
	try{if(current_verb['past_participle'])ta.value+=current_verb['past_participle'];}catch(e){;}
		

}
function verb_saveCB(e){
	obj={
		"infinitive":"",
		"present_participle":"",
		"past_participle":"",
		"indicative":{
			"present":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""},
			"passe_compose":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""},
			"imperfect":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""},
			"pluperfect":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""},
			"future":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""},
		},
		"conditional":{
			"present":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""},
			"past":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""}
		},
		"subjunctive":{
			"present":{"je":"","tu":"","il":"","nous":"","vous":"","ils":""},
		},
		"imperative":{
			"present":{"tu":"","nous":"","vous":""},
		},
	};
	
	for(var tidx=0;tidx<indicative_tenses.length;tidx++){
		ta=document.getElementById("indicative_"+indicative_tenses[tidx]);
		split_value=ta.value.split("\n");
		tense=indicative_tenses[tidx];
		for(var pidx=0;pidx<indicative_persons.length;pidx++){
			try{obj["indicative"][tense][indicative_persons[pidx]]=split_value[pidx];}
			catch(e){;}
		}
	}
	for(var tidx=0;tidx<conditional_tenses.length;tidx++){
		ta=document.getElementById("conditional_"+conditional_tenses[tidx]);
		split_value=ta.value.split("\n");
		tense=conditional_tenses[tidx];
		for(var pidx=0;pidx<conditional_persons.length;pidx++){
			try{obj["conditional"][tense][conditional_persons[pidx]]=split_value[pidx];}
			catch(e){;}
		}
	}
	for(var tidx=0;tidx<subjunctive_tenses.length;tidx++){
		ta=document.getElementById("subjunctive_"+subjunctive_tenses[tidx]);
		split_value=ta.value.split("\n");
		tense=subjunctive_tenses[tidx];
		for(var pidx=0;pidx<subjunctive_persons.length;pidx++){
			try{obj["subjunctive"][tense][subjunctive_persons[pidx]]=split_value[pidx];}
			catch(e){;}
		}
	}
	for(var tidx=0;tidx<imperative_tenses.length;tidx++){
		ta=document.getElementById("imperative_"+imperative_tenses[tidx]);
		split_value=ta.value.split("\n");
		tense=imperative_tenses[tidx];
		for(var pidx=0;pidx<imperative_persons.length;pidx++){
			try{obj["imperative"][tense][imperative_persons[pidx]]=split_value[pidx];}
			catch(e){;}
		}
	}
	ta=document.getElementById("inf_present_past");
	split_value=ta.value.split("\n");
	try{
	obj["infinitive"]=split_value[0];
	obj["present_participle"]=split_value[1];
	obj["past_participle"]=split_value[2];
	}catch(e){;}
	alert(JSON.stringify(obj));
}
function applyStyle(w){
	w.style.border="1px solid";
	w.style.bordercolor="#696 #363 #363 #696";
}

function get_verb_config(){
	
	if(verb_config)return verb_config;
	
	verb_config=document.createElement("div");
	verb_config.id="verb_config";
//	verb_config.style.background="brown";
	verb_config.style.height="500px";
	verb_config.style.width="100%";
	
	fieldset=document.createElement("fieldset");
	legend=document.createElement("legend");
	legend.appendChild(document.createTextNode("Verb Controls"));
	fieldset.appendChild(legend);
	
	t=document.createElement("table");
	t.align="center";
	r=t.insertRow(-1);
	
//	verb_select:
	verb_select=document.createElement("select");
	verb_select.id="verb_select";
	applyStyle(verb_select);
//	if(agent=="MSIE")verb_select.attachEvent("onSelect",verb_selectCB);
//	else verb_select.addEventListener("click",verb_selectCB,false);
	
	opt=document.createElement("option");
	opt.selected=0;
	opt.text="New";
	if(agent=="MSIE")verb_select.add(opt);
	else verb_select.add(opt,verb_select.options[0]);
	if(agent=="MSIE")opt.attachEvent("onSelect",verb_selectCB);
	else opt.addEventListener("click",verb_selectCB,false);
	
	for(var vidx=0;vidx<verbs_fr.length;vidx++){
		opt=document.createElement("option");
		opt.selected=0;
		opt.text=verbs_fr[vidx]['infinitive'];
		if(agent=="MSIE")verb_select.add(opt);
		else verb_select.add(opt,verb_select.options[verb_select.options.length]);
		if(agent=="MSIE")opt.attachEvent("onSelect",verb_selectCB);
		else opt.addEventListener("click",verb_selectCB,false);
	}
	
	c=r.insertCell(-1);
	c.appendChild(verb_select);
	
	verb_setB=document.createElement("input");
	verb_setB.type="button";
	verb_setB.value="load";
	applyStyle(verb_setB);
	if(agent=="MSIE")verb_setB.attachEvent("onclick",verb_selectCB);
	else verb_setB.addEventListener("click",verb_selectCB,false);
	c=r.insertCell(-1);
	c.appendChild(verb_setB);
	
	verb_saveB=document.createElement("input");
	verb_saveB.type="button";
	verb_saveB.value="save";
	applyStyle(verb_saveB);
	if(agent=="MSIE")verb_saveB.attachEvent("onclick",verb_saveCB);
	else verb_saveB.addEventListener("click",verb_saveCB,false);
	c=r.insertCell(-1);
	c.appendChild(verb_saveB);

	fieldset.appendChild(t);
	verb_config.appendChild(fieldset);

//	verb_table:
	verb_table=document.createElement("table");
	verb_table.id="verb_table";
	verb_table.align="center";
	
//	INDICATIVE:
	r=verb_table.insertRow(-1);
	c=r.insertCell(-1);
	c.colSpan=5;
	c.align="center";
	c.appendChild(document.createTextNode("indicative"));
	c.title="A verb form denoting actions or states considered facts";
	
	r=verb_table.insertRow(-1);
	for(var tidx=0;tidx<indicative_fr_tenses.length;tidx++){
		c=r.insertCell(-1);
		c.align="center";
		c.appendChild(document.createTextNode(indicative_fr_tenses[tidx]));
		if(indicative_tenses[tidx]=="passe_compose")c.title="A verb tense that expresses a past action with a definite ending. It consists of the present indicative of the auxilary verb (etre or avoir) and the past participle of the conjugated verb. There are several equivalent forms in English.";
		if(indicative_tenses[tidx]=="imperfect")c.title="A verb tense that expresses a past action with no specific beginning or end.  (ex. we used to swim often)";
		if(indicative_tenses[tidx]=="pluperfect")c.title="A verb tense formed with the imperfect of the auxiliary verb (avoir or etre) + the past participle of the main verb.";
	}
	r=verb_table.insertRow(-1);
	for(var tidx=0;tidx<indicative_tenses.length;tidx++){
		c=r.insertCell(-1);
		ta=document.createElement("textarea");
		ta.style.overflow="hidden";
		ta.id='indicative_'+indicative_tenses[tidx];
		ta.style.width=TA_WIDTH;
		ta.style.height=TA_HEIGHT;
		applyStyle(ta);
		c.appendChild(ta);
	}
	
//	CONDITIONAL,SUBJUNCTIVE,IMPERATIVE,PARTICIPLE:
	r=verb_table.insertRow(-1);
	
	c=r.insertCell(-1);
	c.colSpan=2;
	c.align="center";
	c.appendChild(document.createTextNode("conditional"));
	
	c=r.insertCell(-1);
	c.colSpan=1;
	c.align="center";
	c.appendChild(document.createTextNode("subjunctive"));
	
	c=r.insertCell(-1);
	c.colSpan=1;
	c.align="center";
	c.appendChild(document.createTextNode("imperative"));
	
	c=r.insertCell(-1);
	c.colSpan=1;
	c.align="center";
	c.appendChild(document.createTextNode("infinitive & participles"));
	
	
	r=verb_table.insertRow(-1);
	for(var tidx=0;tidx<conditional_fr_tenses.length;tidx++){
		c=r.insertCell(-1);
		c.align="center";
		c.appendChild(document.createTextNode(conditional_fr_tenses[tidx]));
		if(conditional_tenses[tidx]=="past")c.title="The past conditional is used to express an action or event that would have occured if some set of conditions (stated or implied) had been present. (ex. we would have worried (if we had known))";
	}

	c=r.insertCell(-1);
	c.align="center";
	c.appendChild(document.createTextNode(subjunctive_fr_tenses[0]));
	c.title="A verb form, uncommon in English, used primarily in subordinate clauses after expressions of desire, doubt, or emotion.  French constructions with the subjunctive have many possible English equivalents.";
	
	c=r.insertCell(-1);
	c.align="center";
	c.appendChild(document.createTextNode(imperative_fr_tenses[0]));

	c=r.insertCell(-1);
	c.align="center";
	c.appendChild(document.createTextNode("inf present past"));

	r=verb_table.insertRow(-1);
	
	for(var tidx=0;tidx<conditional_tenses.length;tidx++){
		c=r.insertCell(-1);
		ta=document.createElement("textarea");
		ta.style.overflow="hidden";
		ta.id='conditional_'+conditional_tenses[tidx];
		ta.style.width=TA_WIDTH;
		ta.style.height=TA_HEIGHT;
		applyStyle(ta);
		c.appendChild(ta);
	}
	for(var tidx=0;tidx<subjunctive_tenses.length;tidx++){
		c=r.insertCell(-1);
		ta=document.createElement("textarea");
		ta.id='subjunctive_'+subjunctive_tenses[tidx];
		ta.style.overflow="hidden";
		ta.style.width=TA_WIDTH;
		ta.style.height=TA_HEIGHT;
		applyStyle(ta);
		c.appendChild(ta);
	}
	for(var tidx=0;tidx<imperative_tenses.length;tidx++){
		c=r.insertCell(-1);
		ta=document.createElement("textarea");
		ta.style.overflow="hidden";
		ta.id='imperative_'+imperative_tenses[tidx];
		ta.style.width=TA_WIDTH;
		ta.style.height=TA_HEIGHT;
		applyStyle(ta);
		c.appendChild(ta);
	}
	c=r.insertCell(-1);
	ta=document.createElement("textarea");
	ta.id='inf_present_past';
	ta.style.width=TA_WIDTH;
	ta.style.height=TA_HEIGHT;
	applyStyle(ta);
	c.appendChild(ta);
	
//	verb_config.appendChild(verb_table);
	fieldset.appendChild(verb_table);
	
	return verb_config;
}
