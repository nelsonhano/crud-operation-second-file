const pluralize = require('pluralize');
const {query} = require('./connection');
class Model {

    //get table name from class name
    static get tableName() {
        return pluralize(this.name.toLowerCase());
    }


    constructor(obj = {}) {
        for (const key in obj) {
            this[key] = obj[key]
        }
    }

    static async fetch(){
        let results = []
        let sql = `SELECT * FROM ${this.tableName}`
        let rows = await query(sql);
        for (const row of rows) {
            results.push(new this(row))
        }
        return results        
    }

    
    static async findById(id){
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
        let results = await query(sql);
        if (results.length > 0) {
            let row = results[0]
            return new this(row)
        }
        return null
    }
}
module.exports = Model;