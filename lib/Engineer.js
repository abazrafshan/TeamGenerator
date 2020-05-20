const Employee = require("./Employee");
// engineer constructor class extends employee class
class Engineer extends Employee{
    constructor(name, id, email, github){
        // import employee constructor class parameters
        super(name, id, email);
        // set engineers github
        this.github = github;
    }

    getGithub(){
        // return github username
        return this.github;
    }

    getRole(){
        // overwrites role from employee to engineer
        return "Engineer";
    }
}

module.exports = Engineer;