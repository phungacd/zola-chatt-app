const db = require('../db');
const table ='banbe';
module.exports={
    all: _ =>{return db.load(`select * from ${table}`);
    },
    add: function(entity){
        return db.add(table,entity);
    },
    single: function(id){
        return db.load(`select * from ${table} where id_tk= ${id} `);
    },
    patch: function(entity){
        const condition={
            ma_tk: entity.ma_tk
        }
        delete entity.ma_tk
        return db.patch(table,entity,condition);
    },
    del: function(id){
        const condition={
            id_tk: id
        }
        delete entity.id_tk
        return db.del(table,condition);
    },
    singlebytaikhoan:async function(matk){
       const row= await db.load(` select * from ${table} where id_tk= '${matk}'`);
       if(row.length===0){
           return null;
       }
       return row;
    },
    dembanbe:async function(matk){
        const row= await db.load(` SELECT banbe.id_tk, count(id_banbe) as sobanbe  FROM ${table} where id_tk='${matk}' group by id_tk;
        `);
        if(row.length===0){
            return null;
        }
        return row;
     },
     loaddsbanbechuavaogroup:async function(id_tk,tennhom){
        const row= await db.load(`select id_banbe from ${table} where id_tk=${id_tk} and NOT EXISTS (select id_tk from taikhoan_nhom inner join nhom on taikhoan_nhom.id_nhom=nhom.id_nhom where tennhom='${tennhom}' and taikhoan_nhom.id_tk=banbe.id_banbe) group by id_banbe;
        `);
        if(row.length===0){
            return null;
        }
        return row;
     }

};
