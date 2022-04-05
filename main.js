class SavoirInutile
{
    // Attrributs dans le constricteur
    constructor( savoir, auteur, date){
        this.savoir = savoir;
        this.auteur = auteur;
        this.date = date;
    }

    // Methode pour ajouter le savoir dans le dom
    ajouterDansleDom(){
        // Création
        let newElementLi = document.createElement("li");
        let newElementP = document.createElement("p");
        let newElementP2 = document.createElement("p");
        let newElementButton = document.createElement("button");

        // Paragraphe du savoir inutile
        newElementP.innerText = this.savoir;

        // Eclatement de la date
        var jour = this.date.getDate().toString().padStart(2, "0");
        var mois = (this.date.getMonth() + 1).toString().padStart(2, "0");
        var annee = this.date.getFullYear();

        newElementP2.innerText = `Par ${this.auteur}, le ${jour}/${mois}/${annee}`;

        // Insérer le P dans le LI
        newElementLi.appendChild( newElementP );
        newElementLi.appendChild( newElementP2 );
        // Insérer le Button dans le LI
        newElementLi.appendChild( newElementButton );

        // Ajouter un événement à cet élément LI
        newElementButton.addEventListener("click", supprimer);
        newElementButton.innerText = "Supprimer";


        // 3. Ajoute l'élément de liste au DOM
        let elementOl = document.getElementById("olListeSavoir");
        elementOl.appendChild( newElementLi );
    }

    // Methode de vérification
    verificationSaisie(){
        return this.savoir != "" && this.auteur != "" && this.date != null;
    }
}

function ajouter()
{
    // 1. Récupération valeur du input de savoir
    let elSavoir = document.getElementById("texte").value;
    // 1. Récupération valeur du input de auteur
    let elAuteur = document.getElementById("auteur").value;
    // 1. Récupération valeur du input de auteur
    let elDate = document.getElementById("ladate").valueAsDate;

    localStorage.setItem('savoir'+localStorage.length,JSON.stringify({"savoir":elSavoir, "auteur":elAuteur, "date": elDate}))

    // Instanciation
    let newSavoir = new SavoirInutile( elSavoir, elAuteur, elDate);

    // Verififer
    if (newSavoir.verificationSaisie())
    {
        // Ajouter dans le dom
        newSavoir.ajouterDansleDom();
    }
}

function supprimer(event){
    console.log(" Vous avez cliqué sur: ");
    console.log( event.currentTarget );

    console.log(" Le parent: ");
    console.log( event.currentTarget.parentNode );
    event.currentTarget.parentNode.parentNode.removeChild( event.currentTarget.parentNode )
}

for (let i = 0; i < localStorage.length; i++) {
    let savoir = JSON.parse(localStorage.getItem('savoir'+i));

    let newSavoir = new SavoirInutile( savoir.savoir, savoir.auteur, savoir.date);

    // Verififer
    if (newSavoir.verificationSaisie())
    {
        // Ajouter dans le dom
        newSavoir.ajouterDansleDom();
    }


}