import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import readLineSync, { question } from 'readline-sync';
import fs from 'fs';

const rawData = fs.readFileSync('data.json', 'utf-8');
const data = JSON.parse(rawData);


const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
async function showWelcomeText() {
    const title = chalkAnimation.rainbow("Espace Etudiant\n");
    await sleep(2000);
    title.stop();
}

function validateEmail(email){
    const estvalide=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return estvalide.test(email);
}

function validateYear(year){
    const estvalide=/^\d{4}$/;
    return estvalide.test(year) && year >= 2000 && year <= 2025;
}

async function addStudent() {
    console.log(chalk.blue.bold.italic('Please enter your personal information'));
    const studentinfo = await inquirer.prompt([
        { name: 'name', message: 'full name  :' },
        { name:'email', message:'email:',  validate: (input) => validateEmail(input) ? true : 'Email must be a valid address'},
        {name:'studentNumber',message:'student number'},
        {name:'year', message:'year ', validate: (input) => validateYear(input)? true:'Year must be a 4-digit number between 2000 and 2025'},
    ]);
    const department = await askDepartment();
    const classgroup = await askClass();

    const result = {
        ... studentinfo,
        department,
        classgroup,
    };
    console.table(result);
    return result;
}

async function askDepartment() {
    const {department} = await inquirer.prompt({
        name:'department',
        type: 'list',
        message:'choose your department:',
        choices: data.department
    });
    return department;  
}

async function askClass() {
    const {classgroup} = await inquirer.prompt({
        name:'classgroup',
        type: 'list',
        message:'choose your class:',
        choices: data.classgroup
    });
    return classgroup;
}

async function main () {
    await showWelcomeText();
    await addStudent();
    
}
main();