const {query} = require('./connection');
const Model = require('./Model');
class student extends Model{
    

    async save() {
        let sql = `INSERT INTO students (surname, first_name, other_name, dob, date_joined, email, phone, disability, gender,Address, password) VALUES
         ('${this.surname}', '${this.first_name}', '${this.other_name}', '${this.dob}', '${this.date_joined}', '${this.email}', '${this.phone}', '${this.disability}', '${this.gender}', '${this.address}', '${this.password}')`
        let result = await query(sql)
        this.id = result.insertId
        return result.insertId
    }

    

    
    update(){
        let sql = `UPDATE students SET surname = '${this.surname}', first_name = '${this.first_name}',
        other_name = '${this.other_name}', dob = '${this.dob}', date_joined = '${this.date_joined}', email = '${this.email}', phone = '${this.phone}', disability = '${this.disability}', gender = '${this.gender}', address = '${this.address}', password = '${this.password}' WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    delete(){
        let sql = `DELETE FROM students WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    
}

module.exports = student;