// ========================================
// Cahier Journal - Script
// ========================================

// ---------- Date automatique ----------

const jours = [
"Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"
];

const mois = [
"janvier","février","mars","avril","mai","juin",
"juillet","août","septembre","octobre","novembre","décembre"
];

const aujourd'hui = new Date();

const dateTexte =
jours[aujourd'hui.getDay()]+" "+
aujourd'hui.getDate()+" "+
mois[aujourd'hui.getMonth()]+" "+
aujourd'hui.getFullYear();

const date = document.getElementById("date");

if(date && date.innerHTML.trim()==""){
    date.innerHTML=dateTexte;
}

// ---------- Sauvegarde ----------

function sauvegarder(){

localStorage.setItem(
"cahierJournal",
document.querySelector(".page").innerHTML
);

}

function charger(){

const sauvegarde = localStorage.getItem("cahierJournal");

if(sauvegarde){

document.querySelector(".page").innerHTML=sauvegarde;

}

activerEdition();

}

// ---------- Active la sauvegarde ----------

function activerEdition(){

document.querySelectorAll("[contenteditable]").forEach(el=>{

el.removeEventListener("input",sauvegarder);

el.addEventListener("input",sauvegarder);

});

}

// ---------- Boutons ----------

function creerBoutonSupprimer(){

const btn=document.createElement("button");

btn.innerHTML="🗑";

btn.className="supprimer";

btn.onclick=function(){

if(confirm("Supprimer ce bloc ?")){

this.parentElement.remove();

sauvegarder();

}

};

return btn;

}

// ---------- Nouveau créneau ----------

function ajouterCreneau(){

const bloc=document.createElement("div");

bloc.className="bloc";

bloc.innerHTML=`

<div class="heure" contenteditable>08h00</div>

<div class="contenu">

<h2 contenteditable>💖 ACTIVITÉ</h2>

<div class="champ">

<h3>🎯 Objectifs</h3>

<div contenteditable></div>

</div>

<div class="champ">

<h3>📝 Descriptif</h3>

<div class="grand" contenteditable></div>

</div>

<div class="champ">

<h3>📚 Matériel</h3>

<div contenteditable></div>

</div>

<div class="champ">

<h3>🎓 Compétences</h3>

<div contenteditable></div>

</div>

<div class="champ">

<h3>📌 Observations</h3>

<div contenteditable></div>

</div>

</div>

`;

bloc.appendChild(creerBoutonSupprimer());

document.getElementById("timeline").appendChild(bloc);

activerEdition();

sauvegarder();

}

// ---------- Récréation ----------

function ajouterRecreation(){

const bloc=document.createElement("div");

bloc.className="pause recreation";

bloc.contentEditable="true";

bloc.innerHTML="🛝 RÉCRÉATION";

bloc.appendChild(creerBoutonSupprimer());

document.getElementById("timeline").appendChild(bloc);

activerEdition();

sauvegarder();

}

// ---------- Pause méridienne ----------

function ajouterPause(){

const bloc=document.createElement("div");

bloc.className="pause midi";

bloc.contentEditable="true";

bloc.innerHTML="🍽️ PAUSE MÉRIDIENNE";

bloc.appendChild(creerBoutonSupprimer());

document.getElementById("timeline").appendChild(bloc);

activerEdition();

sauvegarder();

}

// ---------- Impression ----------

function imprimer(){

window.print();

}

// ---------- Associer les boutons ----------

document.addEventListener("DOMContentLoaded",()=>{

charger();

const boutons=document.querySelectorAll(".actions button");

if(boutons.length>=4){

boutons[0].onclick=ajouterCreneau;
boutons[1].onclick=ajouterRecreation;
boutons[2].onclick=ajouterPause;
boutons[3].onclick=imprimer;

}

activerEdition();

});

// ---------- Sauvegarde avant fermeture ----------

window.addEventListener("beforeunload",sauvegarder);

// ---------- Raccourci clavier ----------

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="s"){

e.preventDefault();

sauvegarder();

alert("✔ Cahier journal sauvegardé");

}

});
