const express = require('express');
const router = express.Router();
var messagebird = require('messagebird')('');
const dangkymodel = require('../../models/dangnhap');
const bcrypt = require('bcryptjs');
const configg = require('../../config/default.json');
require('express-async-errors');
const uuid = require('uuid');
const AWS = require('aws-sdk');
require('dotenv').config();
const s3 = new AWS.S3(
  { 
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
  }
);
//authu
const restrict = require('../../middelwase/auth');
//chat

router.get('/xacthuc', async (req,res)=>{
    res.render('xacthuc');
})
router.get('/',async (req,res)=>{

    res.render('dangNhap');
});
router.get('/dangky',async (req,res)=>{
    res.render('dangky');
});
router.get('/thongtin',async(req,res)=>{
    const soban = await table_banbe.dembanbe(req.session.AuthUser.ma_tk);
    const sonhom = await table_tk_nhom.demsonhom(req.session.AuthUser.ma_tk);
   
    let a=0
    console.log(soban);;
    if(sonhom ===null ){
        if(soban===null){
            const mang =[];
            const tt={
                id_tk:req.session.AuthUser.ma_tk,
                sobanbe:0
            }
            mang.push(tt);
            const data={soban:mang,sonhom:0};
            res.render('thongtin-user',{data:data});
        }
        else{
            const data={soban:soban,sonhom:0};
            res.render('thongtin-user',{data:data});
        }
    } 
    else{
        if(soban===null){
            const mang =[];
            for(let i= 0;i<sonhom.length;i++){
                a++
            }
            const tt={
                id_tk:req.session.AuthUser.ma_tk,
                sobanbe:0
            }
            mang.push(tt);
            const data={soban:mang,sonhom:a};
            res.render('thongtin-user',{data:data});
        }
        else{
            for(let i= 0;i<sonhom.length;i++){
                a++
            }
            console.log(a);
            console.log(soban);
           
            const data={soban:soban,sonhom:a};
            console.log(data);
            res.render('thongtin-user',{data:data});
        }
    }   
    
    
    
});
//cap nhat anh
router.post('/capnhatanh',async (req,res)=>{
    console.log(req.body.thongtin_update);
    const file = new Buffer.from(req.body.thongtin_update.anh.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    //lay đuôi ảnh
    const type = req.body.thongtin_update.anh.split(';')[0].split('/')[1];
   var id = uuid.v4()+Date.now().toString();
    const filePath=`${id}.${type}`;
   const params = {
     Bucket:'detaizalo',
     Key : filePath,
     Body:file,
     ACL:'public-read',
     ContentEncoding:'base64',
     ContentType:`image/${type}`
   }
   
   
   const entity={
       "ma_tk":req.session.AuthUser.ma_tk,
    "ten_tk":req.body.thongtin_update.tentk,
    "sdt":req.body.thongtin_update.sdt,
    "url":`${process.env.URL_S3}${filePath}`,
    "email":req.body.thongtin_update.email
}
    await dangkymodel.patch(entity);
    s3.upload(params,function(err,data){
        if(err){
         console.log(err);
         console.log('Error uploading data: ', data); 
       } else {
         console.log('successfully uploaded the image!');
        
         res.send({data:'thanhcong'});
       }
      })
}); 
router.get('/suathongtin',async(req,res)=>{
    const soban = await table_banbe.dembanbe(req.session.AuthUser.ma_tk);
    const sonhom = await table_tk_nhom.demsonhom(req.session.AuthUser.ma_tk);
    let a=0;
    if(sonhom ===null ){
        if(soban===null){
            const mang =[];
            const tt={
                id_tk:req.session.AuthUser.ma_tk,
                sobanbe:0
            }
            mang.push(tt);
            const data={soban:mang,sonhom:0};
            res.render('suathongtin',{data:data});
        }
        else{
            const data={soban:soban,sonhom:0};
            res.render('suathongtin',{data:data});
        }
    } 
    else{
        if(soban===null){
            const mang =[];
            for(let i= 0;i<sonhom.length;i++){
                a++
            }
            const tt={
                id_tk:req.session.AuthUser.ma_tk,
                sobanbe:0
            }
            mang.push(tt);
            const data={soban:mang,sonhom:a};
            res.render('suathongtin',{data:data});
        }
        else{
            for(let i= 0;i<sonhom.length;i++){
                a++
            }
            console.log(a);
            console.log(soban);
           
            const data={soban:soban,sonhom:a};
            console.log(data);
            res.render('suathongtin',{data:data});
        }
    }   
    
});
 
router.post('/dangky',async (req,res)=>{
    const pass_hash = bcrypt.hashSync(req.body.matkhau,configg.authentication.saltRounds);
    const entity={
        ten_tk: req.body.ten,
        sdt: req.body.sdt,
        email:req.body.email,
        mat_khau:pass_hash,
        quyen:'cá nhân',
        url:'https://detaizalo.s3.ap-southeast-1.amazonaws.com/anhmacdinh.jpg'
    }
    console.log(entity);
    await dangkymodel.add(entity);
    res.redirect('/');
    
     // var so1=String(sdt);
    // var so2="";
    // for(let i=1;i<so1.length;i++){
    //     so2+=so1[i];
    // }
    // var soxacthuc="84"+so2;

    // messagebird.verify.create(soxacthuc,{
    //     originator:"Code",
    //     template:"Mã kích hoạt của bạn là: %token."
    // },function(err,response){
    //     if(err){
    //         console.log(err);
    //         res.redirect('./dangky');
    //     }else{
    //         var data={id:response.id,ten_tk:ten_tk,email:email,mat_khau:mat_khau,quyen:quyen,sdt:sdt};
            
    //         res.render('xacthuc',{data:data});
    //     }
    // })

    // var id='123456';
    // var data={id:id,ten_tk:ten_tk,email:email,mat_khau:mat_khau,quyen:quyen,sdt:sdt};
    // console.log(data);
    // res.render('xacthuc',{data:data});
});

router.post('/',async (req,res)=>{
    const user = await dangkymodel.singlebysdt(req.body.sdt);
    //console.log(user);
    if(user=== null){
         res.render('dangNhap',{
            layout:false,
            err:'Sđt hoặc mật khẩu không đúng'
        });
    };
    
    const rss = bcrypt.compareSync(req.body.password,user.mat_khau);
    if(rss=== false){
        return res.render('dangNhap',{
            layout:false,
            err:'Sđt hoặc mật khẩu không đúng'
        });
    }
    //lay du lieu cho reqqquet khác
    delete user.mat_khau;
    req.session.isAuthenticated = true;
    req.session.AuthUser = user;
    //res.send({rediskey: user});
    const url = req.query.retUrl ||  '/chat';
    res.redirect(url);
    
});
router.post('/xacthuc',async(req,res)=>{
    var id=req.body.id;
    var token=req.body.token;
    
    const entity={
        ten_tk: req.body.ten_tk,
        sdt:req.body.sdt,
        email:req.body.email,
        mat_khau:req.body.mat_khau,
        quyen:req.body.quyen
    }
    // if(id===token){
    //     console.log(entity);
    //     console.log(id);
    //     await dangkymodel.add(entity);
    //     res.redirect('/');
    // }else{
    //     console.log('loi');
    //     console.log(token);
    //     console.log(id);
    //     res.redirect('./dangky');
    // }
    messagebird.verify.verify(id,token,async(err,response)=>{
        if(err){
            console.log(err);
            console.log(id);
            console.log(token);
            res.redirect('xacthuc');
        }else{
            console.log(entity);
            await dangkymodel.add(entity);
            res.redirect('/');
        }
    })
});

router.post('/dangxuat',restrict,async (req,res)=>{
    req.session.isAuthenticated = false;
    req.session.AuthUser = null;
    res.render('/');
});
router.get('/chat/danhsachbanbe',async (req,res)=>{
    //const session = req.session.AuthUser;
    //console.log(req.session.AuthUser);
 const ds_idbanbe =  await table_banbe.single(req.session.AuthUser.ma_tk);
 var danhsachbanbe = [];
  for(let i=0;i<ds_idbanbe.length;i++){
      const thongtinbanbe = await dangkymodel.single(ds_idbanbe[i].id_banbe);
      danhsachbanbe.push(thongtinbanbe);
  }
 // console.log(danhsachbanbe);
    res.send({ds_banbe:danhsachbanbe});
});
router.get('/chat',restrict,async (req,res)=>{
    //const session = req.session.AuthUser;
    //console.log(req.session.AuthUser);
    res.render('chat');
});
const table_tinnhan = require('../../models/tinnhan');
router.get('/chat/danhsachtinnhan/:id',async (req,res)=>{
    //const id_tinnhanUser = await table_tinnhan.single(req.session.AuthUser.ma_tk);
   // const ten_nguoi_nhan = await dangkymodel.single(req.params.id);
    const danhsachtinnhan = await table_tinnhan.timtatcatinnhan(req.session.AuthUser.ma_tk,req.params.id);
    if(danhsachtinnhan.length!=null){
        res.send({user: danhsachtinnhan});
    }
     
    // console.log(mang_tinnhan);
});
router.get('/chat/kiemtraketban',async (req,res)=>{
    const userkb = await thongbaoketban.singlebytaikhoan(req.session.AuthUser.ma_tk);
    console.log(userkb);
    //console.log(userkb.length);
    if(userkb.length !=null){
    const mang_user = [];
    for(let i=0;i<userkb.length;i++)
    {    
      const userguiketban = await dangkymodel.single(userkb[i].id_nguoigui);
      console.log(userguiketban);
      mang_user[i]=(userguiketban);
    }
        //var arrayToString = JSON.stringify(Object.assign({}, mang_user));  // convert array to string
        //var stringToJsonObject = JSON.parse(mang_user);  // convert string to json object
       // console.log(arrayToString);
     res.send({user: mang_user});
    }
});
const table_banbe = require('../../models/banbe');
router.post('/chat/kiemtraketban',async (req,res)=>{
    const dongy = req.body.dongy_ketban;
    //dongy.toString();
  // console.log(dongy.id_banbe[0])  
    const entity ={
        "id_tk": req.session.AuthUser.ma_tk,
        "id_banbe":dongy.id_banbe[0],
    }
    const entity1 ={
        "id_tk": dongy.id_banbe[0],
        "id_banbe":req.session.AuthUser.ma_tk,
    }
    console.log(entity);
    await table_banbe.add(entity);
    await table_banbe.add(entity1);
    await thongbaoketban.del(req.session.AuthUser.ma_tk);
    console.log(dongy.ten);
    res.send({data:dongy.ten});

});
router.delete('/chat/xoaketban',async (req,res)=>{
    await thongbaoketban.del(req.session.AuthUser.ma_tk);
    res.send({data:'thanhcong'})
})
router.get('/chat/themban',async (req,res)=>{
  const user = await dangkymodel.all();
   res.send({users: user});
});
const thongbaoketban = require('../../models/thongbaoketban');
const { system } = require('nodemon/lib/config');
router.post('/chat/themban',async (req,res)=>{
    const yeucauthemban = req.body.idketban;
    console.log(yeucauthemban);
    const entity = {
        "id_tk":yeucauthemban.id_nguoiketban,
        "noidung":yeucauthemban.thongtin,
        "id_nguoigui":yeucauthemban.id_nguoiguiketban,
    }
    const add = await thongbaoketban.add(entity);
    
    res.send('thanhcong');
//res.send({users: user});
  });
router.post('/chat',async (req,res)=>{
    //console.log(req.body.search);
    //console.log(user);
   // res.session.usersdt = user;
   // console.log(res.session.usersdt);
});
//them danh sach group 
const table_nhom = require('../../models/nhom');
const table_tk_nhom = require('../../models/taikhoan_nhom');
const { redirect } = require('express/lib/response');
const nhom = require('../../models/nhom');
router.post('/nhomchat',async (req,res)=>{
    const ds_group = req.body.ds_group;
  //  console.log(ds_group.ten_nhom);
    const entity={
        "tennhom":ds_group.ten_nhom,
        "urlnhom":'https://detaizalo.s3.ap-southeast-1.amazonaws.com/anhgroup.png',
        "id_chuphong":req.session.AuthUser.ma_tk
    }
    console.log(entity);
    const sosanhtennhom = await table_nhom.timkiemallnhombyid(req.session.AuthUser.ma_tk);
    let a=0
    for(let i=0; i<sosanhtennhom.length;i++){
        if(sosanhtennhom[i].tennhom===ds_group.ten_nhom){
            a++;
            res.send({tennhom: 'thatbai'});
        }
    }
    console.log(a);
    if(a===0){
         await table_nhom.add(entity);
    const id_nhom = await table_nhom.single(ds_group.ten_nhom);
    let id_nhomm = id_nhom.map(a=> a.id_nhom);
    const add_mygroup={
        "id_tk":req.session.AuthUser.ma_tk,
        "id_nhom":id_nhomm[0],
        "thoigian":ds_group.thoigian,
        "noidung":'Hi',
        "loaitinnhan":'vanban',
        "trangthai":'hoạt động'
    }
   await table_tk_nhom.add(add_mygroup);
    for(let i=0;i<ds_group.id_banbe.length;i++){
    const entity1 = {
        "id_tk":ds_group.id_banbe[i],
        "id_nhom":id_nhomm[0],
        "thoigian":ds_group.thoigian,
        "noidung":'Hi',
        "loaitinnhan":'vanban',
        "trangthai":'hoạt động'
    }
    console.log(entity1);
   await table_tk_nhom.add(entity1);
    }  
    res.send({tennhom: ds_group.ten_nhom});
    }
  
  });
router.get('/nhomchat',async (req,res)=>{
    const user = await table_tk_nhom.singlebytkbytennhom(req.session.AuthUser.ma_tk);
   // console.log(user);
   if(user.length!=null){
     res.send({nhomchat: user});
    }
  });
router.get('/danhsachnhantingroup/:tennhom',async (req,res)=>{
    const tennhomm =await table_tk_nhom.loadalltinnhan(req.params.tennhom);  
   res.send({nhomchat: tennhomm});
  });  

router.get('/loadhinhanh/:tennhom',async (req,res)=>{
    const all_id = await table_tk_nhom.loadidtennhom(req.params.tennhom);
    const tatcatinnhan = await table_tk_nhom.demtinnhantatca(req.params.tennhom);
    console.log(tatcatinnhan);
    const tt={
        id:all_id,
        tatcatinnhan:tatcatinnhan
    }
    res.send({id:tt})
});  
router.get('/dsbanbechuavaonhom/:tennhom',async (req,res)=>{
    const id_banbechuathemvaonhom = await table_banbe.loaddsbanbechuavaogroup(req.session.AuthUser.ma_tk,req.params.tennhom);

    var danhsachbanbechuathemnhom = [];
    for(let i=0;i<id_banbechuathemvaonhom.length;i++){
        const thongtinbanbe = await dangkymodel.single(id_banbechuathemvaonhom[i].id_banbe);
        danhsachbanbechuathemnhom.push(thongtinbanbe);
    }
    res.send({ds_banbe:danhsachbanbechuathemnhom});
});  
//them ban vao group
router.post('/thembanvaogroup',async (req,res)=>{
    const thongtin = req.body.thongtin;
    
    const add_mygroup={
        "id_tk":thongtin.id_tk[0],
        "id_nhom":thongtin.id_nhom,
        "thoigian":thongtin.thoigian,
        "noidung":'Hi',
        "loaitinnhan":'vanban',
        "trangthai":'hoạt động'
    }
    console.log(add_mygroup);
    await table_tk_nhom.add(add_mygroup);
    res.send({data:'thanhcong'})
  });
 // xóa group
 router.post('/xoagroup',async (req,res)=>{
    const thongtin = req.body.thongtin;
    
    await table_nhom.del(thongtin);
    res.send({data:'thanhcong'})
  }); 
//loadds de kích
router.get('/loaddsgroup/:tennhom',async (req,res)=>{
    const all_id = await table_tk_nhom.loadidtennhom(req.params.tennhom);
    let ds=[]
    
    for(let i=0;i<all_id.length;i++){
        if(all_id[i].id_tk!=req.session.AuthUser.ma_tk){
            ds.push(all_id[i]);
        }
    }
    res.send({id:ds})
});
//kich ban trong group  
router.post('/kichban',async (req,res)=>{
    const thongtin = req.body.thongtin;
    await table_tk_nhom.deldel(thongtin.id_tk,thongtin.id_nhom);
    res.send({data:'thanhcong'})
  }); 
 // rời group chat
 router.post('/roigroup',async (req,res)=>{
    const thongtin = req.body.thongtin;
    console.log(thongtin);
    await table_tk_nhom.deldel(req.session.AuthUser.ma_tk,thongtin);
    res.send({data:'thanhcong'})
  });  
 //cap nhat anh cho group
 router.post('/capnhatanhchogroup',async (req,res)=>{
    console.log(req.body.thongtin_update);
    const file = new Buffer.from(req.body.thongtin_update.urlnhom.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    //lay đuôi ảnh
    const type = req.body.thongtin_update.urlnhom.split(';')[0].split('/')[1];
   var id = uuid.v4()+Date.now().toString();
    const filePath=`${id}.${type}`;
   const params = {
     Bucket:'detaizalo',
     Key : filePath,
     Body:file,
     ACL:'public-read',
     ContentEncoding:'base64',
     ContentType:`image/${type}`
   }
   s3.upload(params,function(err,data){
     if(err){
      console.log(err);
      console.log('Error uploading data: ', data); 
    } else {
      console.log('successfully uploaded the image!');
    }
   })
   
   const entity={
    "id_nhom":req.body.thongtin_update.id_nhom,
    "tennhom":req.body.thongtin_update.tennhom,
    "urlnhom":`${process.env.URL_S3}${filePath}`,
    "id_chuphong":req.body.thongtin_update.id_chuphong
    }
    console.log(entity);
    await table_nhom.patch(entity);
    res.send({data:'thanhcong'});
}); 
module.exports= router;