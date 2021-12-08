const db = require('../db');
const table ='taikhoan';
module.exports={
    all: _ =>{return db.load(`select * from ${table}`);
    },
    add: function(entity){
        return db.add(table,entity);
    },
    single: function(id){
        return db.load(`select * from ${table} where ma_tk=${id} `);
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
            ma_tk: id
        }
        delete entity.ma_tk
        return db.del(table,condition);
    },
    singlebysdt:async function(sdt){
       const row= await db.load(` select * from ${table} where sdt= '${sdt}'`);
       if(row.length===0){
           return null;
       }
       return row[0];
    }

};
