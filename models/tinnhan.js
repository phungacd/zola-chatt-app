const db = require('../db');
const table ='tinnhan';
module.exports={
    all: _ =>{return db.load(`select * from ${table}`);
    },
    add: function(entity){
        return db.add(table,entity);
    },
    single: function(id){
        return db.load(`select * from ${table} where id_tk= ${id} `);
    },
    timtinnhan: function(id_my,id_user){
        return db.load(`select * from ${table} where id_tk= ${id_my} and id_nguoinhan=${id_user} `);
    },
    patch: function(entity){
        const condition={
            ma_tk: entity.ma_tk
        }
        delete entity.ma_tk
        return db.patch(table,entity,condition);
    },
    patchtinnhan: function(entity){
        const condition={
            thoigian: entity.id
        }
        delete entity.id
        return db.patch(table,entity,condition);
    },
    del: function(id){
        const condition={
            thoigian: id
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
    timtatcatinnhan:async function(id_my,id_user){
        const row= await db.load(`SELECT * FROM taikhoan inner join ${table} on taikhoan.ma_tk=tinnhan.id_tk where id_tk in('${id_my}','${id_user}') and id_nguoinhan in ('${id_user}','${id_my}') order by thoigian `);
        if(row.length===0){
            return null;
        }
        return row;
     }
};
