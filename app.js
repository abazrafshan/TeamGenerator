const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// set empty array of team, members will be pushed to this array as the application is prompted to create and establish team members
const team = [];
// object that is a question asking the user which type of employee to add to the team, response to this question will lead to set of questions dependent on type of employee selected
const employeeq = [
{
    type: "list",
    message: "What type of employee are you adding to your team?",
    name: "id",
    choices:[
        "Engineer",
        "Intern",
        "I don't want to add any more team members"]
}];
// array of objects that asks user 4 questions to set the managers name, email address, office phone number, and id number
const managerq = [
    {
        type: "input",
        message: "What is the name of the manager?",
        name: "managername"
    },
    {
        type: "input",
        message: "What is the Manager's email address?",
        name: "manageremail"
    },
    {
        type: "input",
        message: "What is the Manager's office number?",
        name: "officenumber"
    },
    {
        type: "input",
        message: "What is the Manager's id number?",
        name: "managerid"
    }
];
// array of objects that asks user 4 questions to set an intern's name, email address, school, and id number
const internq = [
    {
        type: "input",
        message: "What is the name of the intern?",
        name: "internname"
    },
    {
        type: "input",
        message: "What is the intern's email address?",
        name: "internemail"
    },
    {
        type: "input",
        message: "Which school did the intern attend?",
        name: "school"
    },
    {
        type: "input",
        message: "What is the intern's id number?",
        name: "internid"
    }
];
// array of objects that asks user 4 questions to set the engineers name, email address, github username, and id number
const engineerq = [
    {
        type: "input",
        message: "What is the name of the engineer?",
        name: "engineername"
    },
    {
        type: "input",
        message: "What is the engineer's email address?",
        name: "engineeremail"
    },
    {
        type: "input",
        message: "What is the engineer's gitHub username?",
        name: "github"
    },
    {
        type: "input",
        message: "What is the engineer's id number?",
        name: "engineerid"
    }
];
// function that initiates process of collecting user input to add members to team array
function initiate(){
    // function uses inquirer method and prompts user to select which type of employee user wants to add to team
    function promptEmployee() {
        inquirer.prompt(employeeq).then((data)=>{
            switch(data.id){
                // if user selected to add engineer to team, promptEngineer function is called to establish engineer params
                case "Engineer":
                    promptEngineer();
                    break;
                // if user selected to add intern to team, promptIntern function is called to establish intern params
                case "Intern":
                    promptIntern();
                    break;
                // If user chooses not to add anymore team members, createHTML function is called to produce HTML page displaying finalized team
                default:
                    createHTML();
            }
        })
    
    }
// user is prompted with questions to define manager parameters, this is first function called when the application runs since each team will only have one manager
function promptManager(){
    inquirer.prompt(managerq).then((data) => {
        // create new mgr object with parameters defined via inquirer method
        const mgr = new Manager(data.managername, data.managerid, data.manageremail, data.officenumber);
        // push mgr object to team array
        team.push(mgr);
        // call promptEmployee function to ask user if they want to add another team member and if so, what type of team member
        promptEmployee();
    });
    
}
// user is prompted with questions to define engineer parameters, function called when user chooses to add engineer to team
function promptEngineer(){
    inquirer.prompt(engineerq).then((data) => {
        // create new engr object with parameters defined via inquirer method
        const engr = new Engineer(data.engineername, data.engineerid, data.engineeremail, data.github);
        // push mgr object to team array
        team.push(engr);
        // call promptEmployee function to ask user if they want to add another team member and if so, what type of team member
        promptEmployee();
    });
}

// user is prompted with questions to define intern parameters, function called when user chooses to add intern to team
function promptIntern(){
    inquirer.prompt(internq).then((data) => {
        // create new intern object with parameters defined via inquirer method
        const intern = new Intern(data.internname, data.internid, data.internemail, data.school);
        // push engr object to team array
        team.push(intern);
        // call promptEmployee function to ask user if they want to add another team member and if so, what type of team member
        promptEmployee();
    });
}
// function checks to see if output directory already exists
function createHTML(){
    // if output directory doesn't exist, one is created
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    // render function uses team array to create HTML page that is written to a file labeled team.html in the output directory
    fs.writeFileSync(outputPath, render(team));
}
// upon initiation of application, promptManager function is called to first establish manager info before user is prompted to establish rest of team
promptManager();
}
// initiate application
initiate();