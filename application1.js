import chalk from "chalk";
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import readLineSync, { question } from 'readline-sync';
import fetch from 'node-fetch';

async function fetchData() {
    const response = await fetch("https://raw.githubusercontent.com/zaineb-123/student-cli-app/refs/heads/main/data.json");
    const data = await response.json();
    return(data);
  }


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
    const data = await fetchData();
    const department = await askDepartment(data);
    const classgroup = await askClass(data,department);
    

    const result = {
        ... studentinfo,
        department,
        classgroup,
    };
    console.table(result);
    return result;
}

async function askDepartment(data) {
    const {department} = await inquirer.prompt({
        name:'department',
        type: 'list',
        message:'choose your department:',
        choices: Object.keys(data.department)
    });
    return department;  
}

async function askClass(data,department) {
    const {classgroup} = await inquirer.prompt({
        name:'classgroup',
        type: 'list',
        message:'choose your class:',
        choices: data.department[department]
    });
    return classgroup;
}

async function main () {
    await showWelcomeText();
    await addStudent();
    
}
main();