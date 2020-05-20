
class Employee {
    // employee class defined by a name, id, and email
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // returns employee's name
    getName(){
        return this.name;
    }
    // returns employee id
    getId(){
        return this.id;
    }
    // returns employee email address
    getEmail(){
        return this.email
    }
    // returns role of employee, which will be overriden in other constructor classes
    getRole(){
        return "Employee";
        // Returns Employee
    }
}

module.exports = Employee;