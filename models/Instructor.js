const Model = require('./Model');
class Instructor extends Model {

    async save() {
        let sql = `INSERT INTO instructors ( title, surname, first_name, other_name, dob, staff_no, employment_date, email, phone, gender, address, password) VALUES
         ( '${this.title}','${this.surname}', '${this.first_name}', '${this.other_name}', '${this.dob}', '${this.staff_no}', '${this.employment_date}', '${this.email}', '${this.phone}','${this.gender}', '${this.address}', '${this.password}')`
        let result = await query(sql)
        this.id = result.insertId
        return result.insertId
    }

    

    
    update(){
        let sql = `UPDATE students SET  title = '${this.title}', surname = '${this.surname}', first_name = '${this.first_name}', other_name = '${this.other_name}', dob = '${this.dob}', staff_no = '${this.staff_no}', employment_date = '${this.employment_date}', email = '${this.email}', phone = '${this.phone}', gender = '${this.gender}', address = '${this.address}', password = '${this.password}' WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    delete(){
        let sql = `DELETE FROM students WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

}

module.exports = Instructor;