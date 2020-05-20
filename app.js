const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

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



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function initiate(){
    function promptEmployee() {
        inquirer.prompt(employeeq).then((data)=>{
            switch(data.id){
                case "Engineer":
                    promptEngineer();
                    break;
                case "Intern":
                    promptIntern();
                    break;
                default:
                    createHTML();
            }
        })
    
    }


function promptManager(){
    inquirer.prompt(managerq).then((data) => {
        const mgr = new Manager(data.managername, data.managerid, data.manageremail, data.officenumber);
        team.push(mgr);
        promptEmployee();
    });
    
}

function promptEngineer(){
    inquirer.prompt(engineerq).then((data) => {
        const engr = new Engineer(data.engineername, data.engineerid, data.engineeremail, data.github);
        team.push(engr);
        promptEmployee();
    });
}

function promptIntern(){
    inquirer.prompt(internq).then((data) => {
        const intern = new Intern(data.internname, data.internid, data.internemail, data.school);
        team.push(intern);
        promptEmployee();
    });
}
function createHTML(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(team));
}
promptManager();
}

initiate();


    

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
