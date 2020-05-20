const Employee = require("./Employee");
// manager constructor class extends employee constructor class
class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    // overwrites role from employee to manager
    getRole(){
        return "Manager"
    }
    // returns managers office number
    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;