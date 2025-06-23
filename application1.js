import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import readLineSync, { question } from 'readline-sync';


const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
//==== Use meaningful english naming for functions for example:
// bienvenu() => showWelcomeText()
async function bienvenu() {
    const title = chalkAnimation.rainbow("Espace Etudiant\n");
    await sleep(2000);
    title.stop();
//==== Remove unnacessary extra lines
    
}

//==== Use meaningful english naming for functions for example:
// valideremail() => validateEmail()
function valideremail(email){
    //==== Use a regex to validate an email, not all user have gmail 
    const estvalide=/^[a-zA-Z0-9]+@gmail\.com$/;
    return estvalide.test(email);
}

//==== Use meaningful english naming for functions
function valideranne(annee){
    //==== Add more validation for the year, the year should be between 2000 and 2025
    const estvalide=/^\d{4}$/;
    return estvalide.test(annee);
}

//==== Use meaningful english naming for functions
async function ajouteretudiant() {
    console.log(chalk.blue.bold.italic('veuillez saisir vos informations personelles'));
    const question = await inquirer.prompt([
        { name: 'nom', message: 'Nom complet :' },
        { name:'email', message:' votre email:',  validate: (input) => valideremail(input) ? true : 'email doit etre une adresse correcte @gmail.com'},
        {name:'numero etudiant',message:'votre numero'},
        {name:'annee', message:'annee ', validate: (input) => valideranne(input)? true:'l\'anne doit contenir exactement 4 chifffre '},
    ]);
    const filiere = await question1();
    const classe = await question2();

    const resultat = {
        question,
        filiere,
        classe,
    };
    console.log(resultat);
    return resultat;
}

//==== Use meaningful english naming for functions
async function question1() {
    const {filiere} = await inquirer.prompt({
        name:'filiere',
        type: 'list',
        message:'filiere:',
        choices:['reseaux','multimedia','developpement','genie logiciel'],

    });
    return filiere;
    
}

//==== Use meaningful english naming for functions
async function question2() {
    const {classe} = await inquirer.prompt({
        name:'classe',
        type: 'list',
        message:'classe:',
        choices:['A1','A2','A3'],

    });
    return classe;
}

async function main () {
    await bienvenu();
    await ajouteretudiant();
    
}
main();