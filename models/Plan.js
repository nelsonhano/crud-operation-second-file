const {query} = require('./connection');
const Model = require('./Model');
class Plan extends Model{
    

    async save() {
        let sql = `INSERT INTO plans (name, price, description) VALUES ('${this.name}', '${this.price}', '${this.description}')`
        let result = await query(sql)
        this.id = result.insertId
        return result.insertId
    }

    

    
    update(){
        let sql = `UPDATE plans SET name = '${this.name}', price = '${this.price}', description = '${this.description}' WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    delete(){
        let sql = `DELETE FROM plans WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    
}

module.exports = Plan;