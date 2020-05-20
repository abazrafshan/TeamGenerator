const Employee = require("./Employee");
// intern constructor class extends employee constructor class
class Intern extends Employee {
    constructor(name, id, email, school){
        // import employee constructor class parameters
        super(name, id, email);
        // set school
        this.school = school;
    }
    // return intern's school
    getSchool(){
        return this.school;
    }
    // overwrites role from employee to intern
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;