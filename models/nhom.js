const db = require('../db');
const table ='nhom';
module.exports={
    all: _ =>{return db.load(`select * from ${table}`);
    },
    add: function(entity){
        return db.add(table,entity);
    },
    single: function(id){
        return db.load(`select * from ${table} where tennhom= '${id}' `);
    },
    patch: function(entity){
        const condition={
            id_nhom: entity.id_nhom
        }
        delete entity.id_nhom
        return db.patch(table,entity,condition);
    },
    del: function(id){
        const condition={
            id_nhom: id
        }
        return db.del(table,condition);
    },
    singlebytaikhoan:async function(matk){
       const row= await db.load(` select * from ${table} where id_tk= '${matk}'`);
       if(row.length===0){
           return null;
       }
       return row;
    },
    timkiemallnhombyid:async function(id_tk){
        const row= await db.load(`SELECT * FROM ${table} inner join taikhoan_nhom on nhom.id_nhom=taikhoan_nhom.id_nhom where id_tk='${id_tk}' group by tennhom;`);
        if(row.length===0){
            return null;
        }
        return row;
     },

};
