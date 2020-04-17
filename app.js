
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];


function start(){

    addManager();



}


    function addManager(){
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "managerName",
                    message: "What is your manager's name?"
                },
                {
                    type: "input",
                    name: "managerId",
                    message: "What is your manager's id?"
                },
                {
                    type: "input",
                    name: "managerEmail",
                    message: "What is your manager's email?"
                },
                {
                    type: "input",
                    name: "managerOfficeNumber",
                    message: "What is your manager's office number?"
                }
            ]
        ).then(function(answers){

            const newManager = new Manager(answers.managerName, answers.managerId,answers.managerEmail,answers.managerOfficeNumber)
            teamArray.push(newManager);
            createTeamPrompt();
            //console.log(answers);
        });

    }
    function addEngineer(){
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is your engineer's name?"
                },
                {
                    type: "input",
                    name: "engineerId",
                    message: "What is your engineer's id?"
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is your manager's email?"
                },
                {
                    type: "input",
                    name: "engineerGithub",
                    message: "What is your engineer's Github account?"
                }
            ]
        ).then(function(answers){

            const newEngineer = new Engineer(answers.engineerName, answers.engineerId,answers.engineerEmail,answers.engineerGithub)
            teamArray.push(newEngineer);
            createTeamPrompt();
            //console.log(answers);
        });


    }
    function addIntern(){
        inquirer.prompt(
            [
                {
                    type: "input",
                    name: "internName",
                    message: "What is your intern's name?"
                },
                {
                    type: "input",
                    name: "internId",
                    message: "What is your interns's id?"
                },
                {
                    type: "input",
                    name: "internEmail",
                    message: "What is your interns's email?"
                },
                {
                    type: "input",
                    name: "internSchool",
                    message: "What is your interns's school name?"
                }
            ]
        ).then(function(answers){

            const newIntern = new Intern(answers.internName, answers.internId,answers.internEmail,answers.internSchool)
            teamArray.push(newIntern);
            createTeamPrompt();
        // console.log(answers);
        });

        
    }
    function createTeamPrompt(){

        inquirer.prompt([
            {
            type: "list",
            name: "teamChoice",
            message: "Which type of team member would you like to add?",
            choices: [
                "EngineerTeam",
                "InternTeam",
                "no team"
            ]
            }
        ]).then(function(answers) {
            if(answers.teamChoice === "EngineerTeam"){
                addEngineer();
            } else if(answers.teamChoice === "InternTeam"){
                addIntern();
            } else{
                buildManagerTeam();
            }

        })

    }
    function buildManagerTeam(){
        fs.writeFileSync(outputPath, render(teamArray), "utf-8");
    }


start();