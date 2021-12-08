const express = require('express');
const app= express();
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const config = require('./config/default.json');
const sessionStore = new MySQLStore(config.mysql);
const res = require('express/lib/response');
const body_parset = require('body-parser');
const { symlink } = require('fs');
require('dotenv').config();

//config folfer
app.use(express.static('./css'));
app.use(body_parset.json(
 { limit: '50mb'}
));
app.set('view engine','ejs','js');
app.set('views','./view');
//conver session with socket
//const sharedsession = require("express-socket.io-session");

//chat
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const { response } = require('express');
const io = new Server(server);

//exprees seesion
app.set('trust proxy', 1) // trust first 
app.use(session({
    key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
  }));
//S3
const AWS = require('aws-sdk');

const s3 = new AWS.S3(
  { 
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
  }
);
//const bucket = 'detaizalo';
const uuid = require('uuid');
app.use(express.urlencoded({
    extended:true
}));
// server socket
const table_tinnhan = require('./models/tinnhan');
const table_tk_nhom = require('./models/taikhoan_nhom');
const table_nhom = require('./models/nhom');
const { group } = require('console');
var users =[];
io.on('connection',(socket)=>{
    console.log('usre connect');
//    console.log(socket.handshake.session.AuthUser);
    // console.log(response.session.AuthUser);
    //1-1
     socket.on('user-connect',my_user =>{
        // let user_idd = JSON.parse(user_id);
        // console.log(user_id); 
         users[my_user] = socket.id;
        console.log(socket.id);
     })
     //1-1 gui anh
     socket.on('guianh',async (thongtin) =>{
      if(users[thongtin.id_banbe]===" "){
        socket.to(socketID).emit('guianh',thongtin);
      }
      else{
     var socketID= users[thongtin.id_banbe];
      socket.to(socketID).emit('guianh',thongtin);
    }
    const base64Data = new Buffer.from(thongtin.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      //lay đuôi ảnh
      const type = thongtin.base64.split(';')[0].split('/')[1];
     var id = uuid.v4()+Date.now().toString();
      const filePath=`${id}.${type}`;
     const params = {
       Bucket:'detaizalo',
       Key : filePath,
       Body:base64Data,
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
          "id_tk":thongtin.id_my,
          "id_nguoinhan":thongtin.id_banbe,
          "noidung":`${process.env.URL_S3}${filePath}`,
          "thoigian":thongtin.tg,
          "loaitinnhan":'hinhanh',
          "trangthai":'hoạt động'
      }
       await table_tinnhan.add(entity);
     })
     //cong cho chat group
     socket.on('john_group', async room =>{
       socket.join(room);
        console.log(socket.id);
     })
     socket.on('guianh_group',async (room,thongtin) =>{
     if(room === " "){
       socket.to(room).emit('guianh_group',thongtin);
     }
     else{
      socket.to(room).emit('guianh_group',thongtin);
     }
     //upload s3
     const base64Data = new Buffer.from(thongtin.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      //lay đuôi ảnh
      const type = thongtin.base64.split(';')[0].split('/')[1];
     var id = uuid.v4()+Date.now().toString();
      const filePath=`${id}.${type}`;
      const params = {
        Bucket:'detaizalo',
        Key : filePath,
        Body:base64Data,
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
      

    //  const timidboitennhom= await table_nhom.single(thongtin.tennhom);
    //  let id_nhom = timidboitennhom.map(a => a.id_nhom);

        const entity={
          "id_tk":thongtin.my_id,
          "id_nhom":thongtin.id_nhom,
          "noidung":`${process.env.URL_S3}${filePath}`,
          "thoigian":thongtin.thoigian_database,
          "loaitinnhan":'hinhanh',
          "trangthai":'hoạt động'
      }
      await table_tk_nhom.add(entity);

     })
     socket.on('user-group',async (room,thongtin) =>{ 
        if(room === " "){
          socket.to(room).emit('chatgroup',thongtin);
        }
        else{
        socket.to(room).emit('chatgroup',thongtin);
         }
      const timidboitennhom= await table_nhom.single(thongtin.tennhom);
      let id_nhom = timidboitennhom.map(a => a.id_nhom);
      //console.log(id_nhom[0]);
      const entity={
        "id_tk":thongtin.my_id,
        "id_nhom":id_nhom[0],
        "noidung":thongtin.tinnhan,
        "thoigian":thongtin.thoigian_database,
        "loaitinnhan":'vanban',
        "trangthai":'hoạt động'
      }
      await table_tk_nhom.add(entity);
     })
     //chat 1-1
    socket.on('on-chat',async (data) =>{ 
      //  console.log(data);
        // save arr
        //users[data.ten]=socket.id;
        if(users[data.user_id]===""){
          socket.to(socketID).emit('user-chat',data);

        }
        else{
        
         var socketID= users[data.user_id];
        // console.log(data.user_id[0]);
          //   console.log(socketID);
        socket.to(socketID).emit('user-chat',data);
        //socket.broadcast.emit('user-chat',data); 
        }
        const entity={
          "id_tk":data.my_id,
          "id_nguoinhan":data.user_id,
          "noidung":data.message,
          "thoigian":data.tg,
          "loaitinnhan":'vanban',
          "trangthai":'hoạt động'
      }
      await table_tinnhan.add(entity);
    })  
    //file 1-1
    socket.on('guifile',async (data) =>{ 
      console.log(data.id_banbe);
        if(users[data.id_banbe]===""){
          socket.to(socketID).emit('guifile',data);
        }
        else{
         var socketID= users[data.id_banbe];
        // console.log(data.user_id[0]);
          //   console.log(socketID);
        socket.to(socketID).emit('guifile',data);
        //socket.broadcast.emit('user-chat',data); 
        }
        //lay bodyfile
        const file = new Buffer.from(data.file.replace(/^data:application\/\w+;base64,/, ""), 'base64');
     // console.log(file);
        //lay đuôi ảnh
      const type = data.tenfile.split('.')[1];
     // console.log(type);
     var id = uuid.v4()+Date.now().toString();
      const filePath=`${id}.${type}`;
      const params = {
        Bucket:'detaizalo',
        Key : filePath,
        Body:file,
        ACL:'public-read',
        ContentEncoding:'base64',
        ContentType:`application/${type}`
      }
      s3.upload(params,function(err,data){
        if(err){
         console.log(err);
         console.log('Error uploading data: ', data); 
       } else {
         console.log('successfully uploaded the FILE!');
       }
      })
      
 
        const entity={
            "id_tk":data.id_my,
            "id_nguoinhan":data.id_banbe,
            "noidung":`${process.env.URL_S3};${data.tenfile};${filePath}`,
            "thoigian":data.tg,
            "loaitinnhan":'file',
            "trangthai":'hoạt động'
        }
      await table_tinnhan.add(entity);
        
    }) 
    // filegroup
    socket.on('guifilegroup',async (room,thongtin) =>{ 
      if(room === ""){
        socket.to(room).emit('guifilegroup',thongtin);
      }
      else{
      socket.to(room).emit('guifilegroup',thongtin);
      }
       //body file
     const file = new Buffer.from(thongtin.file.replace(/^data:application\/\w+;base64,/, ""), 'base64');
     //lay đuôi ảnh
      const type = thongtin.tenfile.split('.')[1];
    var id = uuid.v4()+Date.now().toString();
     const filePath=`${id}.${type}`;
     const params = {
       Bucket:'detaizalo',
       Key : filePath,
       Body:file,
       ACL:'public-read',
       ContentEncoding:'base64',
       ContentType:`application/${type}`
     }
     s3.upload(params,function(err,data){
       if(err){
        console.log(err);
        console.log('Error uploading data: ', data); 
      } else {
        console.log('successfully uploaded the FILE!');
      }
     })
     
     const entity={
      "id_tk":thongtin.my_id,
      "id_nhom":thongtin.id_nhom,
      "noidung":`${process.env.URL_S3};${thongtin.tenfile};${filePath}`,
      "thoigian":thongtin.thoigian_database,
      "loaitinnhan":'file',
      "trangthai":'hoạt động'
  }
  await table_tk_nhom.add(entity);
   })
   //guivideo 1-1
   socket.on('guivideo',async (data) =>{ 
    //  console.log(data);
      // save arr
      //users[data.ten]=socket.id;
      if(users[data.id_banbe]===""){
        socket.to(socketID).emit('guivideo',data);

      }
      else{
      
       var socketID= users[data.id_banbe];
      // console.log(data.user_id[0]);
        //   console.log(socketID);
      socket.to(socketID).emit('guivideo',data);
      //socket.broadcast.emit('user-chat',data); 
      }
      const video = new Buffer.from(data.video.replace(/^data:video\/\w+;base64,/, ""), 'base64');
      //lay đuôi ảnh
      const type = data.tenfile.split('/')[1];
      console.log(type);
     var id = uuid.v4()+Date.now().toString();
      const filePath=`${id}.${type}`;
     const params = {
       Bucket:'detaizalo',
       Key : filePath,
       Body:video,
       ACL:'public-read',
       ContentEncoding:'base64',
       ContentType:`video/${type}`
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
        "id_tk":data.id_my,
        "id_nguoinhan":data.id_banbe,
        "noidung":`${process.env.URL_S3}${filePath};${data.tenfile}`,
        "thoigian":data.tg,
        "loaitinnhan":'video',
        "trangthai":'hoạt động'
    }
    await table_tinnhan.add(entity);
  }) 
  //guivideo group
  socket.on('guivideogroup',async (room,thongtin) =>{ 
    if(room === ""){
      socket.to(room).emit('guivideogroup',thongtin);
    }
    else{
    socket.to(room).emit('guivideogroup',thongtin);
    }
     //body file
     const video = new Buffer.from(thongtin.video.replace(/^data:video\/\w+;base64,/, ""), 'base64');
     //lay đuôi ảnh
     const type = thongtin.style.split('/')[1];
  var id = uuid.v4()+Date.now().toString();
   const filePath=`${id}.${type}`;
   const params = {
     Bucket:'detaizalo',
     Key : filePath,
     Body:video,
     ACL:'public-read',
     ContentEncoding:'base64',
     ContentType:`video/${type}`
   }
   s3.upload(params,function(err,data){
     if(err){
      console.log(err);
      console.log('Error uploading data: ', data); 
    } else {
      console.log('successfully uploaded the FILE!');
    }
   })
   
   const entity={
    "id_tk":thongtin.my_id,
    "id_nhom":thongtin.id_nhom,
    "noidung":`${process.env.URL_S3}${filePath};${thongtin.style}`,
    "thoigian":thongtin.thoigian_database,
    "loaitinnhan":'video',
    "trangthai":'hoạt động'
}
await table_tk_nhom.add(entity);
 })
 //thuhoitinnhan 1-1
 socket.on('thuhoi',async data =>{ 
  
  var socketID= users[data.id_user];
  if(users[data.id_user]===""){
    socket.to(socketID).emit('thuhoi',data);
  }
  else{
   //var socketID= users[data.id_user];
  socket.to(socketID).emit('thuhoi',data);

  }
    const entity={
      id:data.id,
      trangthai:'thu hồi'
    }
    await table_tinnhan.patchtinnhan(entity);
})
//thuhoitinnhan nhóm
socket.on('thuhoigroup',async (room,thongtin) =>{ 
  if(room === " "){
    socket.to(room).emit('thuhoigroup',thongtin);
  }
  else{
  socket.to(room).emit('thuhoigroup',thongtin);
   }
   const entity={
    id:thongtin,
    trangthai:'thu hồi'
  }
  await table_tk_nhom.patchtinnhan(entity);
})
//thu hoi anh 1-1
socket.on('thuhoihinhanh',async (thongtin) =>{
  if(users[thongtin.id_user]===" "){
    socket.to(socketID).emit('thuhoihinhanh',thongtin);
  }
  else{
 var socketID= users[thongtin.id_user];
  socket.to(socketID).emit('thuhoihinhanh',thongtin);
}
      const entity={
        id:thongtin.idthoigian,
        trangthai:'thu hồi'
      }
await table_tinnhan.patchtinnhan(entity);
 
 })
 //thuhoi hinh anh nhóm
 socket.on('thuhoihinhanhgroup',async (room,thongtin) =>{ 
  if(room === " "){
    socket.to(room).emit('thuhoihinhanhgroup',thongtin);
  }
  else{
  socket.to(room).emit('thuhoihinhanhgroup',thongtin);
   }
   const entity={
    id:thongtin,
    trangthai:'thu hồi'
  }
  await table_tk_nhom.patchtinnhan(entity);
})
//thu hoi video 1-1
socket.on('thuhoivideo',async (thongtin) =>{
  if(users[thongtin.id_user]===" "){
    socket.to(socketID).emit('thuhoivideo',thongtin);
  }
  else{
 var socketID= users[thongtin.id_user];
  socket.to(socketID).emit('thuhoivideo',thongtin);
}
      const entity={
        id:thongtin.idthoigian,
        trangthai:'thu hồi'
      }
await table_tinnhan.patchtinnhan(entity);
 
 })
 //thu hoi file 1-1
socket.on('thuhoifile',async (thongtin) =>{
  if(users[thongtin.id_user]===" "){
    socket.to(socketID).emit('thuhoifile',thongtin);
  }
  else{
 var socketID= users[thongtin.id_user];
  socket.to(socketID).emit('thuhoifile',thongtin);
}
console.log(thongtin);
      const entity={
        id:thongtin.idthoigian,
        trangthai:'thu hồi'
      }
await table_tinnhan.patchtinnhan(entity);
 
 })
  //thuhoi file nhóm
  socket.on('thuhoifilegroup',async (room,thongtin) =>{ 
    if(room === " "){
      socket.to(room).emit('thuhoifilegroup',thongtin);
    }
    else{
    socket.to(room).emit('thuhoifilegroup',thongtin);
     }
     console.log(thongtin);
     const entity={
      id:thongtin,
      trangthai:'thu hồi'
    }
    await table_tk_nhom.patchtinnhan(entity);
  })
   //thuhoi video nhóm
   socket.on('thuhoivideogroup',async (room,thongtin) =>{ 
    if(room === " "){
      socket.to(room).emit('thuhoivideogroup',thongtin);
    }
    else{
    socket.to(room).emit('thuhoivideogroup',thongtin);
     }
    // console.log(thongtin);
     const entity={
      id:thongtin,
      trangthai:'thu hồi'
    }
    await table_tk_nhom.patchtinnhan(entity);
  })

})


// miderware
app.use(async function (req,res,next){
    if(req.session.isAuthenticated===null){
        req.session.isAuthenticated=false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAtthorUser = req.session.AuthUser;
    next();
});
app.use('/',require('./router/login/dangnhap'));
//tra ve trang loi toan bo he thong html
//app.use((err,req,res,next)=>{
//    console.error(err.stack);
//    res.status(404).render('404',{layout:false});
//})
//app.use((req,res)=>{
//    
//    res.render('404',{layout:false});
//})
//app.get('/',(req,res)=>{
//    return res.render('dangNhap');
//})


server.listen(process.env.PORT || 3000,()=>{
    console.log('server running');
})