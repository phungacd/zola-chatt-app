
//timkiemban
$(function(){
    const buttun = document.querySelector('#themban');
   // const buttun = document.querySelector('#test');
    //giaodien
    const form = document.querySelector('#timkiemthanhcong');
    const tk_guiketban = document.querySelector('#tk_guiketban').value;
    buttun.addEventListener('click',(e)=>{
        const text = document.querySelector('#timkiem_enter').value;
        e.preventDefault();
        $.ajax({
            url:'/chat/themban',
            contentType: 'application/json',
            success: function(res){
                const users = res.users;
               // console.log(text);
               let gt = 0; 
                for(let i =0;i<users.length;i++){
                    if(users[i].sdt===text){
                        gt += i;
                        const a = document.createElement('a');
                        a.className='d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1';
                        const div1 = document.createElement('div');
                        div1.className=('symbol symbol-35px symbol-circle me-5');
                        const img = document.createElement('img');
                        img.src=users[i].url;
                        div1.append(img);
                        const div2 = document.createElement('div');
                        div2.className=('fw-bold');
                        const span1 = document.createElement('span');
                        span1.className='fs-6 text-gray-800 me-2';
                        span1.textContent=users[i].ten_tk;
                        const span2 = document.createElement('span');
                        span2.className='badge badge-light';
                        span2.textContent=users[i].sdt;
                        div2.append(span1);
                        div2.append(span2);
                        a.append(div1);
                        a.append(div2);
                        const div3 = document.createElement('div');
                        div3.className='btn-group btn-group-sm';
                        div3.style= 'margin-left:auto';
                        div3.role = 'group';
                        a.append(div3);
                        const bunton1 = document.createElement('button');
                        bunton1.id='yeucaukb';
                        bunton1.className='btn';
                        bunton1.addEventListener('click',ketban);
                        const i1 = document.createElement('i');
                        i1.className='bi bi-plus-circle';
                        i1.style='font-size: 1.5rem; color: black';
                        bunton1.append(i1);
                        const bunton2 = document.createElement('button');
                        bunton2.className='btn';
                        bunton2.addEventListener('click',xoaketban);
                        const i2 = document.createElement('i');
                        i2.className='bi bi-x-circle';
                        i2.style='font-size: 1.5rem; color: black';
                        bunton2.append(i2);
                        div3.append(bunton1);
                        div3.append(bunton2);
                        form.appendChild(a);
                        //xulythemketban
                        function ketban(){
                            //alert('ok');
                             const thongtin={
                                 "id_nguoiketban": users[i].ma_tk,
                                 "id_nguoiguiketban": tk_guiketban,
                                    "thongtin":"Kết bạn nhé!"
                             }
                            $.ajax({
                                url:'/chat/themban',
                                method:'POST',
                                contentType: 'application/json',
                                data : JSON.stringify({idketban: thongtin }),
                                success: function(res){
                                    a.remove();
                                    toastr.options = {
                                        "closeButton": false,
                                        "debug": false,
                                        "newestOnTop": false,
                                        "progressBar": false,
                                        "positionClass": "toastr-top-center",
                                        "preventDuplicates": false,
                                        "onclick": null,
                                        "showDuration": "300",
                                        "hideDuration": "1000",
                                        "timeOut": "5000",
                                        "extendedTimeOut": "1000",
                                        "showEasing": "swing",
                                        "hideEasing": "linear",
                                        "showMethod": "fadeIn",
                                        "hideMethod": "fadeOut"
                                      };
                                      
                                      toastr.success("Đã gửi kết bạn");
                                }
                            })
                        }                       
                        function xoaketban(){
                            a.remove();
                        }
                    } 
                }
                if(gt===0){
                    const aa = document.createElement('a');
                    aa.className='d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1';
                    const h1 = document.createElement('h1');
                    h1.textContent='Số điện thoại chưa được kích hoạt';
                    const div3 = document.createElement('div');
                    div3.className='btn-group btn-group-sm';
                    div3.style= 'margin-left:auto';
                  //  div3.role = 'group';
                    // const bunton1 = document.createElement('button');
                    // bunton1.className='btn';
                    // const i1 = document.createElement('i');
                    // i1.className='bi bi-plus-circle';
                    // i1.style='font-size: 1.5rem; color: black';
                    // bunton1.append(i1);
                    const bunton2 = document.createElement('button');
                    bunton2.className='btn';
                    const i2 = document.createElement('i');
                    i2.className='bi bi-x-circle';
                    i2.style='font-size: 1.5rem; color: black';
                    bunton2.append(i2);
                    bunton2.addEventListener('click',() =>{
                        aa.remove();
                    })
                    //div3.append(bunton1);
                    div3.append(bunton2);
                   // h1.append(div3);
                   aa.append(h1);
                   aa.append(div3);  
                    form.appendChild(aa);
                }
                document.querySelector('#timkiem_enter').value=''
            }
        })

    })
    
})
//thembanbe
$(function(){
    const menu_xacnhanbanbe = document.querySelector('#menu_xacnhanbanbe');
    $.ajax({
        url:'/chat/kiemtraketban',
        contentType: 'application/json',
        success: function(res){
            const user = res.user;
           // var stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
           //const aaa= Object.assign({}, user); // {0:"a", 1:"b", 2:"c"}
            // const user = user.toString();
           //console.log( user[1]);
           // console.log(RowDataPacket[i].ten_tk);
            for(let i =0;i<user.length;i++){
                let  ten = user[i].map(a => a.ten_tk);
                let sdt = user[i].map(a => a.sdt);  
                let url = user[i].map(a => a.url);
            const div1 = document.createElement('div');
            div1.className='menu-item px-3';
            const div2 = document.createElement('div');
            div2.className='menu-content d-flex align-items-center px-3';
            
            const div3 = document.createElement('div');
            div3.className='symbol symbol-50px me-5';
            const img = document.createElement('img');
            img.src=url;
            div3.append(img);

            const div4 = document.createElement('div');
            div4.className='d-flex flex-column';
            const div4_1 = document.createElement('div');
            div4_1.className='fw-bolder d-flex align-items-center fs-5';
            div4_1.textContent=ten;
            const a = document.createElement('a');
            a.className='fw-bold text-muted text-hover-primary fs-7';
            a.textContent=sdt;
            div4.append(div4_1);
            div4.append(a);

            const div5 = document.createElement('div');
            div5.className='btn-group btn-group-sm';
            div5.role='group';
            const btn1 = document.createElement('button');
            btn1.className='btn';
            btn1.addEventListener('click',dongy);
            const i1 = document.createElement('i');
            i1.className='bi bi-check-circle text-primary fs-3';
            const btn2 = document.createElement('button');
            btn2.className='btn';
            btn2.addEventListener('click',khongdongy)
            const i2 = document.createElement('i');
            i2.className='bi bi-x text-danger fs-3';
            btn1.append(i1);
            btn2.append(i2);
            div5.append(btn1);
            div5.append(btn2);

            div2.append(div3);
            div2.append(div4);
            div2.append(div5);
            div1.append(div2);
            menu_xacnhanbanbe.appendChild(div1);

            function dongy(){
                let id_banbe = user[i].map(a => JSON.parse(a.ma_tk));  
                let  ten = user[i].map(a => a.ten_tk);
                console.log(id_banbe);   
                const thongtin={
                    "id_banbe":id_banbe,
                    "ten":ten
                }
                $.ajax({
                    url:'/chat/kiemtraketban',
                    method:'POST',
                    contentType: 'application/json',
                    data : JSON.stringify({dongy_ketban: thongtin }),
                    success: function(res){
                      //  console.log(res.data);
                        const thongtin_ban = res.data;
                        const hienthi_khungchat = document.querySelector('#kt_chat_contacts_body');
                        const div11 = document.createElement('div');
                        div11.className=('hover scroll-y me-n5 pe-5 h-200px h-lg-auto');
                        div11.style='max-height: 416px;';
                        //div1.addEventListener('click',formchat)
                        const div2 = document.createElement('div');
                        div2.className=('d-flex flex-stack py-4');
    
                        const div3 = document.createElement('div');
                        div3.className=('d-flex align-items-center');
                        const div3_1 = document.createElement('div');
                        div3_1.className=('symbol symbol-45px symbol-circle');
                        div3.append(div3_1);
                        const img = document.createElement('img');
                        img.src=url;
                        div3_1.append(img);
                        const div3_2 = document.createElement('div');
                        div3_2.className=('ms-5');
                        const a = document.createElement('a');
                        a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary mb-2');
                        //let  ten = ds_banbe[i].map(a => a.ten_tk);
                        a.textContent=thongtin_ban;
                        div3_2.append(a);
    
                        div3.append(div3_1);
                        div3.append(div3_2);
                        const div5 = document.createElement('div');
                        div5.className=('d-flex flex-column align-items-end ms-2');
                        const span = document.createElement('span');
                        span.className=('text-muted fs-7 mb-1');
                        span.textContent='1h';
                        div5.append(span);
    
                        div2.append(div3);
                        div11.append(div2);
                        div2.append(div5);
                        hienthi_khungchat.appendChild(div11);
                        div1.remove();
                        toastr.options = {                                        
                            "progressBar": true,
                            "positionClass": "toastr-top-center",
                            "showDuration": "300",
                            "hideDuration": "1000",
                            "timeOut": "2000",
                            "extendedTimeOut": "1000",
                            "showEasing": "swing",
                            "hideEasing": "linear",
                            "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                          };
                        toastr.success("Thêm bạn thành công");
                        location.reload();
                    }
                    
                })  
            }
            function khongdongy(){
                    $.ajax({
                        url:'/chat/xoaketban',
                        method:'DELETE',
                        //contentType: 'application/json',
                        //data : JSON.stringify({dongy_ketban: thongtin }),
                        success: function(res){     
                            const a = res.data
                            if(a=== 'thanhcong'){
                                toastr.options = {                                        
                                    "progressBar": true,
                                    "positionClass": "toastr-top-center",
                                    "showDuration": "300",
                                    "hideDuration": "1000",
                                    "timeOut": "2000",
                                    "extendedTimeOut": "1000",
                                    "showEasing": "swing",
                                    "hideEasing": "linear",
                                    "showMethod": "fadeIn",
                                    "hideMethod": "fadeOut"
                                  };
                                toastr.success("Bạn đã không đồng ý");
                                div1.remove(); 
                            }                     
                        }     
                    })  
                    
            }
            }

        }
    })
})
//load danh sach ban be
$(function(){
    const ma_myid = document.querySelector('#tk_guiketban').value;
    const formdanhsach = document.querySelector('#kt_chat_contacts_body');
    //formdanhsach.style.display='block';
    $.ajax({
        url:'/chat/danhsachbanbe',
            contentType: 'application/json',
            success: function(res){
                const ds_banbe = res.ds_banbe;
                for(let i=0;i<ds_banbe.length;i++){
                    const div1 = document.createElement('div');
                    div1.className=('hover scroll-y me-n5 pe-5 h-200px h-lg-auto');
                    div1.style='max-height: 416px;';
                    div1.addEventListener('click',formchat)
                    const div2 = document.createElement('div');
                    div2.className=('d-flex flex-stack py-4');

                    const div3 = document.createElement('div');
                    div3.className=('d-flex align-items-center');
                    const div3_1 = document.createElement('div');
                    div3_1.className=('symbol symbol-45px symbol-circle');
                    div3.append(div3_1);
                    const img = document.createElement('img');
                    let  url = ds_banbe[i].map(a => a.url);
                    img.src=url;
                    div3_1.append(img);
                    const div3_2 = document.createElement('div');
                    div3_2.className=('ms-5');
                    const a = document.createElement('a');
                    a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary mb-2');
                    let  ten = ds_banbe[i].map(a => a.ten_tk);
                    a.textContent=ten;
                    div3_2.append(a);

                    div3.append(div3_1);
                    div3.append(div3_2);
                    const div5 = document.createElement('div');
                    div5.className=('d-flex flex-column align-items-end ms-2');
                    const span = document.createElement('span');
                    span.className=('text-muted fs-7 mb-1');
                    span.textContent='1h';
                    div5.append(span);

                    div2.append(div3);
                    div1.append(div2);
                    div2.append(div5);
                    formdanhsach.appendChild(div1);
                   
                    function formchat(){ 

                                       //nhan tin nhan tu database chat  
                                       let  user_id = ds_banbe[i].map(a => a.ma_tk);
                                  
                                       let user_idd = JSON.parse(user_id);
                                        
                     //loaddanhsachtinnhan
                    $.ajax({
                        url:'/chat/danhsachtinnhan/' + user_idd,
                        contentType: 'application/json',
                        success: function(res){
                            data = res.user;              
                            for(let i=0;i<data.length;i++){ 
                               if(data[i].id_tk==ma_myid){
                                const thoigian_nguoiguigroup= data[i].thoigian;
                                const gio_phutnguoiguigroup =thoigian_nguoiguigroup.slice(11,16);
                                   if(data[i].loaitinnhan === 'vanban' && data[i].trangthai==='hoạt động'){        
                                    nguoigui(data[i].id_nguoinhan,thoigian_nguoiguigroup,data[i].ten_tk,gio_phutnguoiguigroup,data[i].noidung,data[i].url)
                                   }
                                   else if(data[i].loaitinnhan === 'hinhanh' && data[i].trangthai==='hoạt động'){
                                       nguoiguihinhanh(data[i].id_nguoinhan,thoigian_nguoiguigroup,data[i].ten_tk,gio_phutnguoiguigroup,data[i].noidung,data[i].url)
                                   }
                                   else if(data[i].loaitinnhan === 'file' && data[i].trangthai==='hoạt động'){
                                       const duongdan= data[i].noidung.split(';');
                                       console.log(`${duongdan[0]}${duongdan[2]}`);
                                        nguoiguifile(data[i].id_nguoinhan,thoigian_nguoiguigroup,data[i].ten_tk,gio_phutnguoiguigroup,duongdan[1],data[i].url,`${duongdan[0]}${duongdan[2]}`,duongdan[1]);
                                   }else if(data[i].loaitinnhan === 'video' && data[i].trangthai==='hoạt động'){
                                       const style = data[i].noidung.split(';');
                                    nguoiguivideo(data[i].id_nguoinhan,thoigian_nguoiguigroup,data[i].ten_tk,gio_phutnguoiguigroup,style[0],data[i].url,style[1])

                                }
                               }
                               else{
                                const thoigian_nguoinhangroup= data[i].thoigian;
                                const gio_phutnguoinhangroup =thoigian_nguoinhangroup.slice(11,16);
                                if(data[i].loaitinnhan === 'vanban' && data[i].trangthai==='hoạt động'){
                                    nguoinhan(thoigian_nguoinhangroup,data[i].ten_tk,gio_phutnguoinhangroup,data[i].noidung,data[i].url)
                                }
                                else if(data[i].loaitinnhan === 'hinhanh' && data[i].trangthai==='hoạt động'){
                                    nguoinhanhinhanh(thoigian_nguoinhangroup,data[i].ten_tk,gio_phutnguoinhangroup,data[i].noidung,data[i].url)
                                }
                                else if(data[i].loaitinnhan === 'file' && data[i].trangthai==='hoạt động'){
                                    const duongdann= data[i].noidung.split(';');
                                     nguoinhanfile(thoigian_nguoinhangroup,data[i].ten_tk,gio_phutnguoinhangroup,duongdann[1],data[i].url,`${duongdann[0]}${duongdann[2]}`,duongdann[1])
                                }
                                else if(data[i].loaitinnhan === 'video' && data[i].trangthai==='hoạt động'){
                                    const style = data[i].noidung.split(';');
                                 nguoinhanvideo(thoigian_nguoinhangroup,data[i].ten_tk,gio_phutnguoinhangroup,style[0],data[i].url,style[1])
                                }
                               }
                            } 
                        }
                        
                    }) 
                    
                    // const form_mess = document.querySelector('#kt_chat_messenger');
                     const form_group = document.querySelector('#form_a');
                     const div_to = document.createElement('div');
                     div_to.className='card';
                     div_to.id="kt_chat_messenger";
                     //header
                     const div_head = document.createElement('div');
                     div_head.className='card-header';
                     const div_head_1 = document.createElement('div');
                     div_head_1.className='card-title';
                     div_head_1.innerHTML=` <div class="symbol symbol-45px symbol-circle"><img src=${url}></div>
                     <!--begin::User-->
                     <div class="d-flex justify-content-center flex-column me-3 ms-5">
                         <a id="tenban" href="#" class="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">${ten}</a>
                         <!--begin::Info-->
                         <div class="mb-0 lh-1">
                             <span class="badge badge-success badge-circle w-10px h-10px me-1"></span>
                             <span class="fs-7 fw-bold text-muted">Active</span>
                         </div>
                         <!--end::Info-->
                     </div>`
                     const div_head_2 = document.createElement('div');
                     div_head_2.className='card-toolbar';
                    div_head_2.innerHTML=` <div class="me-n3">
                    <button id="thoat_chat" class="btn btn-sm btn-icon btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                        <i class="bi bi-x-lg" style="color: black"></i>
                    </button> 
                </div>`
                     div_head.append(div_head_1);
                     div_head.append(div_head_2);
                    
                     const div_body = document.createElement('div');
                     div_body.className='card-body';
                     div_body.innerHTML=` <div class="scroll-y me-n5 pe-5 h-300px h-lg-auto" id="chat-body" style="max-height: 271px;">
                    
                    
                 </div>`
                   
                     const form = document.createElement('form');
                        form.id='chat-form';
                        form.innerHTML=`<div class="card-footer pt-4" id="kt_chat_messenger_footer">
                        
                       
                         <textarea class="form-control form-control-flush mb-3" rows="1" id="chat-mes" placeholder="Type a message"></textarea>
                        <!--end::Input-->
                        <!--begin:Toolbar-->
                        <div class="d-flex flex-stack">
                            <!--begin::Actions-->
                            <div class="d-flex align-items-center me-2">
                            <button class="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="" data-bs-original-title="Coming soon">
                                <label class="btn btn-icon btn-paperclip btn-active-color-primary w-20px h-25px "
                                data-kt-image-input-action="change"
                                data-bs-toggle="tooltip"
                                data-bs-dismiss="click"
                                title="Change avatar">
                                    <i class="bi bi-card-image fs-3"></i>
                                    <input type="file" id="file" name="avatar" accept="image/png, image/jpg, image/jpeg" />  
                                </label>
                                </button>
                                <button class="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="" data-bs-original-title="Coming soon">
                                <label class="btn btn-icon btn-paperclip btn-active-color-primary w-20px h-25px "
                                data-kt-image-input-action="change"
                                data-bs-toggle="tooltip"
                                data-bs-dismiss="click">
                                    <i class="bi bi-paperclip fs-3"></i>
                                    <input type="file" id="tailieu" accept=".doc,.docx,.pdf" />  
                                    </label>
                                </button>
                                <button class="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="" data-bs-original-title="Coming soon">
                                <label class="btn btn-icon btn-paperclip btn-active-color-primary w-20px h-25px "
                                data-kt-image-input-action="change"
                                data-bs-toggle="tooltip"
                                data-bs-dismiss="click">
                                    <i class="bi bi-upload fs-3"></i>
                                    <input type="file" id="video" accept="video/*" />  
                                    </label>
                                </button>
                            </div>
                            <!--end::Actions-->
                            <!--begin::Send-->
                            <button class="btn btn-primary" type="submit" id="send-chat" >Send</button>
                            <!--end::Send-->
                            </div></div></div>`

                        div_to.append(div_head);
                        div_to.append(div_body);
                        div_to.append(form);
                        form_group.appendChild(div_to);
                        // load_anh
                        document.querySelector('#file').addEventListener('change',function(){
                            loadanh();
                       })
                       function loadanh(){
                        const selector = document.querySelector('#file');
                        const div = document.querySelector('#kt_chat_messenger_footer');
                        const text = document.querySelector('#chat-mes');
                        const anh = document.createElement('img');
                        anh.id="hinhanh";
                        anh.style = 'width:120px;height:60px;'
                        div.insertBefore(anh,text);

                        var reader = new  FileReader();
                        reader.onload = function(e){
                            anh.src = e.target.result;
                        }
                        reader.readAsDataURL(selector.files[0]);
                    }
                  
                        //thoatchat
                         document.querySelector('#thoat_chat').addEventListener('click',a =>{
                             div_to.remove();
                         })
                        

                     //const tenban = document.querySelector('#tenban');
                    //  tenban.textContent=ten;
                    // tao cổng chat
                    const socket = io();          
                     const chatForm= document.querySelector('#chat-form');
                     const chatmes = document.querySelector('#chat-mes');
                     const tentk = document.querySelector('#userr').value;
                     const url_nguoigui = document.querySelector('#url_nguoigui').value;
                     const my_id = document.querySelector('#tk_guiketban').value;
                     const messages = document.querySelector('#chat-body')
                     
                     socket.emit("user-connect",my_id); 
                     //console.log(user_idd);
                     const currentdate = new Date();
                     const datatime =('0'+ currentdate.getDate()).slice(-2) +"/" +('0'+(currentdate.getMonth()+1)).slice(-2)+"/"+ currentdate.getFullYear() +" "
                     + ('0'+currentdate.getHours()).slice(-2)+":" + ('0'+currentdate.getMinutes()).slice(-2)+":"+ ('0'+currentdate.getSeconds()).slice(-2);
                     const gio_phut = ('0'+currentdate.getHours()).slice(-2)+":" + ('0'+currentdate.getMinutes()).slice(-2);
                    chatForm.addEventListener('submit',(e)=>{
                      e.preventDefault();
                     const message =  chatmes.value
                        
                        if(message.length > 0){
                            socket.emit('on-chat',{
                                my_id:my_id,
                                user_id:user_idd,
                                message:message,
                                ten :tentk,
                                tg : datatime,
                                tg_giophut:gio_phut,
                                url : url_nguoigui
                            });
                           
                            nguoigui(user_idd,datatime,tentk,gio_phut,message,url_nguoigui);
                            document.querySelector('#chat-mes').value=''                            
                        }
                        else{
                            const selector = document.querySelector('#file');
                            var reader = new  FileReader();
                            reader.onload = function(e){
                                thongtin={
                                    base64:e.target.result,
                                    id_banbe:user_idd,
                                    id_my:my_id,    
                                    ten :tentk,
                                tg : datatime,
                                tg_giophut:gio_phut,
                                url : url_nguoigui
                                }
                                socket.emit("guianh",thongtin);
                                console.log(e.target.result);
                                nguoiguihinhanh(user_idd,datatime,tentk,gio_phut,e.target.result,url_nguoigui)         
                            }
                            reader.readAsDataURL(selector.files[0]);
                             document.querySelector('#hinhanh').remove();
                        }
                    })
                    // xu kiện enter
                    chatForm.addEventListener('keydown', e=>{
                        if(e.key==='Enter'){
                            const message =  chatmes.value
                            e.preventDefault();
                            socket.emit('on-chat',{
                                my_id:my_id,
                                user_id:user_idd,
                                message:message,
                                ten :tentk,
                                tg : datatime,
                                tg_giophut:gio_phut,
                                url : url_nguoigui
                            });
                           
                            nguoigui(user_idd,datatime,tentk,gio_phut,message,url_nguoigui);
                            document.querySelector('#chat-mes').value=''
                        }
                    })

                   
                 // lay tai lieu
                 document.querySelector('#tailieu').addEventListener('change', function(){
                    console.log(user_idd);
                    const tailieu =document.querySelector('#tailieu').files[0];
                    var reader = new FileReader();
                     reader.onload = function(e){
                        thongtin={
                            file:e.target.result,
                            tenfile:tailieu.name,
                            id_banbe:user_idd,
                            id_my:my_id,    
                            ten :tentk,
                        tg : datatime,
                        tg_giophut:gio_phut,
                        url : url_nguoigui
                        }
                        socket.emit("guifile",thongtin);
                         nguoiguifile(user_idd,datatime,tentk,gio_phut,tailieu.name,url_nguoigui,e.target.result,tailieu.name)
                     }
                    
                     reader.readAsDataURL(tailieu);   
                })
                //lay video
                document.querySelector('#video').addEventListener('change', function(){
                    console.log(user_idd);
                    const video =document.querySelector('#video').files[0];
                    var reader = new FileReader();
                     reader.onload = function(e){
                    //     console.log(e.target.result);
                         const style = e.target.result.split(';')[0].split(':')[1];
                        console.log(e.target.result);
                         nguoiguivideo(user_idd,datatime,tentk,gio_phut,e.target.result,url_nguoigui,style)
                        thongtin={
                            video:e.target.result,
                            tenfile:style,
                            id_banbe:user_idd,
                            id_my:my_id,    
                            ten :tentk,
                        tg : datatime,
                        tg_giophut:gio_phut,
                        url : url_nguoigui
                        }
                        socket.emit("guivideo",thongtin);
                        // nguoiguifile(tentk,gio_phut,tailieu.name,url_nguoigui,e.target.result,tailieu.name)
                     }
                    
                     reader.readAsDataURL(video);   
                })

                function nguoiguivideo(id_uservideo,id_thoigianvideo,tennguoinhan,thoigian,noidung,url,type){
                    const div = document.createElement('div');
                    div.id=id_uservideo
                    div.className=('d-flex justify-content-end mb-10');
                    const div2 = document.createElement('div');
                    div2.className = ('d-flex flex-column align-items-end');
                    const div3 = document.createElement('div');
                    div3.className = ('d-flex align-items-center mb-2');
                    const div3_1= document.createElement('div');
                    div3_1.className=('me-3');
                    const div3_1_span= document.createElement('span');
                    div3_1_span.className='text-muted fs-7 mb-1';
                    //cat chuoi thoi gian
                   // var thoigian =data.nguoigui[i].thoigian;
                   // const thoigian1 = thoigian.toString();
                    div3_1_span.textContent= thoigian;
                    const div3_1_a= document.createElement('a');
                    div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                     div3_1_a.textContent=tennguoinhan;
                    div3_1.append(div3_1_span);
                    div3_1.append(div3_1_a); 
                    const div3_2= document.createElement('div');
                    div3_2.className=('symbol symbol-35px symbol-circle');
                     const img = document.createElement('img');
                     img.src= url;
                     div3_2.append(img);
                    div3.append(div3_1);
                    div3.append(div3_2);
                    const div4 = document.createElement('div');
                    div4.id=id_thoigianvideo;
                    div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end');
                    const video = document.createElement('video');
                    video.height='200';
                    video.width='250';
                    video.controls='autoplay';
                    const srouch = document.createElement('source');
                    srouch.src=noidung;
                    srouch.type=type;
                    video.append(srouch);
                    div4.append(video);
                    const div46 = document.createElement('div');
                    div46.className='d-flex align-items-center mb-2 overlay'
                    const div6 = document.createElement('div');
                    const div6_1 = document.createElement('div');
                    div6_1.className='me-3 overlay-layer';
                    div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                    <i class="bi bi-three-dots fs-3"></i>
                </button>`
                    div6.append(div6_1)
                    div6_1.addEventListener('click', function thuhoi(e){
                        e.preventDefault();
                        var x = document.createElement("SELECT");
                        x.id='mySelect';
                        x.className='overlay-layer';
                        var z = document.createElement("option");
                        z.value='thu hồi'
                        var t = document.createTextNode("Thu hồi");
                        x.addEventListener('click',function thuhoitinnhan(e){
                            e.preventDefault();
                            let b= document.querySelector('#mySelect').value;
                            if(b==='thu hồi'){
                                const c = document.createElement('a');
                                c.textContent = `Tin nhắn đã được thu hồi`;
                                div4.replaceChild(c,video)
                            }
                            const tt={
                                'idthoigian':id_thoigianvideo,
                                'id_user':id_uservideo,
                            }
                            socket.emit('thuhoivideo',tt);
                        })
                        var z1 = document.createElement("option");
                        var t1 = document.createTextNode("");
                        z1.value='null'
                        z1.selected=true;
                    
                        z.appendChild(t);
                        z1.appendChild(t1);
                        x.append(z1)
                        x.append(z)
                        div6.append(x);
                    })
                    div46.append(div6)
                    div46.append(div4)



                    div.append(div2);
                    div2.append(div3);
                    div2.append(div46);
                    
                    
                    messages.appendChild(div);
                    messages.scrollTop = messages.scrollHeight;
                }
                function nguoinhanvideo(thoigianvideo,tennguoigui,thoigian,noidung,url,type){
                    socket.on('thuhoivideo',data =>{
                        if(data.idthoigian===thoigianvideo){
                            const c = document.createElement('a');
                            c.textContent = `Tin nhắn đã được thu hồi`;
                            tinnhan.replaceChild(c,video)
                        }
                    })
                    const chatItem = document.createElement('div');
                    chatItem.className=('d-flex justify-content-start mb-10');
                    const chatItem2 = document.createElement('div');
                    chatItem2.className=('d-flex flex-column align-items-start');
                    const ha_ten = document.createElement('div');
                    ha_ten.className=('d-flex align-items-center mb-2');
                    const anh = document.createElement('div');
                    anh.className=('symbol symbol-35px symbol-circle');
                    const img = document.createElement('img');
                    img.src=url;
                    anh.append(img);
                    const tengio = document.createElement('div');
                    tengio.className = ('ms-3');
                    const ten = document.createElement('a');
                    ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                    ten.textContent =tennguoigui;
                    const span = document.createElement('span');
                    span.className=('text-muted fs-7 mb-1');
                    span.textContent=thoigian;
                    tengio.append(ten);
                    tengio.append(span)
                    ha_ten.append(anh);
                    ha_ten.append(tengio);
                    const tinnhan = document.createElement('div')
                    tinnhan.id=thoigianvideo
                    tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                    const video = document.createElement('video');
                    video.height='200';
                    video.width='250';
                    video.controls='autoplay';
                    const srouch = document.createElement('source');
                    srouch.src=noidung;
                    srouch.type=type;
                    video.append(srouch);
                    chatItem.append(chatItem2);
                    chatItem2.append(ha_ten);
                    chatItem2.append(tinnhan);
                    tinnhan.append(video);
                    messages.appendChild(chatItem);
                    // scroll down
                    messages.scrollTop = messages.scrollHeight;
                }
                function nguoiguifile(id_userfile,id_thoigianfile,tennguoinhan,thoigian,noidung,url,linktai,download){
                    const div = document.createElement('div');
                    div.id=id_userfile
                    div.className=('d-flex justify-content-end mb-10');
                    const div2 = document.createElement('div');
                    div2.className = ('d-flex flex-column align-items-end');
                    const div3 = document.createElement('div');
                    div3.className = ('d-flex align-items-center mb-2');
                    const div3_1= document.createElement('div');
                    div3_1.className=('me-3');
                    const div3_1_span= document.createElement('span');
                    div3_1_span.className='text-muted fs-7 mb-1';
                    //cat chuoi thoi gian
                   // var thoigian =data.nguoigui[i].thoigian;
                   // const thoigian1 = thoigian.toString();
                    div3_1_span.textContent= thoigian;
                    const div3_1_a= document.createElement('a');
                    div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                     div3_1_a.textContent=tennguoinhan;
                    div3_1.append(div3_1_span);
                    div3_1.append(div3_1_a); 
                    const div3_2= document.createElement('div');
                    div3_2.className=('symbol symbol-35px symbol-circle');
                     const img = document.createElement('img');
                     img.src= url;
                     div3_2.append(img);
                    div3.append(div3_1);
                    div3.append(div3_2);
                    const div4 = document.createElement('div');
                    div4.id=id_thoigianfile
                    div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end');
                    const a = document.createElement('a');
                    a.href=linktai;
                    a.download=download;
                    a.textContent = noidung;
                    div4.append(a);
                    const div46 = document.createElement('div');
                    div46.className='d-flex align-items-center mb-2 overlay'
                    const div6 = document.createElement('div');
                    const div6_1 = document.createElement('div');
                    div6_1.className='me-3 overlay-layer';
                    div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                    <i class="bi bi-three-dots fs-3"></i>
                </button>`
                    div6.append(div6_1)
                    div6_1.addEventListener('click', function thuhoi(e){
                        e.preventDefault();
                        var x = document.createElement("SELECT");
                        x.id='mySelect';
                        x.className='overlay-layer';
                        var z = document.createElement("option");
                        z.value='thu hồi'
                        var t = document.createTextNode("Thu hồi");
                        x.addEventListener('click',function thuhoitinnhan(e){
                            e.preventDefault();
                            let b= document.querySelector('#mySelect').value;
                            if(b==='thu hồi'){
                                const c = document.createElement('a');
                                c.textContent = `Tin nhắn đã được thu hồi`;
                                div4.replaceChild(c,a)
                                }
                            const tt={
                                'idthoigian':id_thoigianfile,
                                'id_user':id_userfile,
                            }
                            socket.emit('thuhoifile',tt);
                        })
                        var z1 = document.createElement("option");
                        var t1 = document.createTextNode("");
                        z1.value='null'
                        z1.selected=true;

                        z.appendChild(t);
                        z1.appendChild(t1);
                        x.append(z1)
                        x.append(z)
                        div6.append(x);
                    })
                    div46.append(div6)
                    div46.append(div4)


                    div.append(div2);
                    div2.append(div3);
                    div2.append(div46);
                  
                    
                    messages.appendChild(div);
                    messages.scrollTop = messages.scrollHeight;
                }
                function nguoinhanfile(idthoigianfile,tennguoigui,thoigian,noidung,url,duonglink,download){
                    const chatItem = document.createElement('div');
                    chatItem.className=('d-flex justify-content-start mb-10');
                    const chatItem2 = document.createElement('div');
                    chatItem2.className=('d-flex flex-column align-items-start');
                    const ha_ten = document.createElement('div');
                    ha_ten.className=('d-flex align-items-center mb-2');
                    const anh = document.createElement('div');
                    anh.className=('symbol symbol-35px symbol-circle');
                    const img = document.createElement('img');
                    img.src=url;
                    anh.append(img);
                    const tengio = document.createElement('div');
                    tengio.className = ('ms-3');
                    const ten = document.createElement('a');
                    ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                    ten.textContent =tennguoigui;
                    const span = document.createElement('span');
                    span.className=('text-muted fs-7 mb-1');
                    span.textContent=thoigian;
                    tengio.append(ten);
                    tengio.append(span)
                    ha_ten.append(anh);
                    ha_ten.append(tengio);
                    const tinnhan = document.createElement('div')
                    tinnhan.id=idthoigianfile
                    tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                    const tin = document.createElement('a');
                    tin.href=duonglink;
                    tin.download=download;
                    tin.textContent = noidung;
                    tinnhan.append(tin);

                    chatItem.append(chatItem2);
                    chatItem2.append(ha_ten);
                    chatItem2.append(tinnhan);
                   
                   
                    messages.appendChild(chatItem);
                    // scroll down
                    messages.scrollTop = messages.scrollHeight;
                    socket.on('thuhoifile',data =>{
                        console.log(data);
                        if(data.idthoigian===idthoigianfile){
                            const c = document.createElement('a');
                            c.textContent = `Tin nhắn đã được thu hồi`;
                            tinnhan.replaceChild(c,tin);
                        }
                    })
                }
                function nguoiguihinhanh(id_user,id_thoigian,tennguoigui,thoigian,anh,url){
                    const div = document.createElement('div');
                    div.id=id_user
                    div.className=('d-flex justify-content-end mb-10');
                    const div2 = document.createElement('div');
                    div2.className = ('d-flex flex-column align-items-end');
                    const div3 = document.createElement('div');
                    div3.className = ('d-flex align-items-center mb-2');
                    const div3_1= document.createElement('div');
                    div3_1.className=('me-3');
                    const div3_1_span= document.createElement('span');
                    div3_1_span.className='text-muted fs-7 mb-1';
                    //cat chuoi thoi gian
                   // var thoigian =data.nguoigui[i].thoigian;
                   // const thoigian1 = thoigian.toString();
                    div3_1_span.textContent= thoigian;
                    const div3_1_a= document.createElement('a');
                    div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                     div3_1_a.textContent=tennguoigui;
                    div3_1.append(div3_1_span);
                    div3_1.append(div3_1_a); 
                    const div3_2= document.createElement('div');
                    div3_2.className=('symbol symbol-35px symbol-circle');
                     const img = document.createElement('img');
                     img.src= url;
                     div3_2.append(img);
                    div3.append(div3_1);
                    div3.append(div3_2);
                    const div4 = document.createElement('div');
                    div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end');
                    div4.id=id_thoigian;
                    const imgg = document.createElement('img');
                    imgg.style='width:128px;height:128px;'
                    div4.append(imgg);
                    imgg.src = anh;
                    const div46 = document.createElement('div');
                    div46.className='d-flex align-items-center mb-2 overlay'
                    const div6 = document.createElement('div');
                    const div6_1 = document.createElement('div');
                    div6_1.className='me-3 overlay-layer';
                    div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                    <i class="bi bi-three-dots fs-3"></i>
                </button>`
                    div6.append(div6_1)
                    div6_1.addEventListener('click', function thuhoi(e){
                        e.preventDefault();
                        var x = document.createElement("SELECT");
                        x.id='mySelect';
                        x.className='overlay-layer';
                        var z = document.createElement("option");
                        z.value='thu hồi'
                        var t = document.createTextNode("Thu hồi");
                        x.addEventListener('click',function thuhoitinnhan(e){
                            e.preventDefault();
                            let b= document.querySelector('#mySelect').value;
                            if(b==='thu hồi'){
                                const c = document.createElement('a');
                                c.textContent = `Tin nhắn đã được thu hồi`;
                                div4.replaceChild(c,imgg)
                            }
                            const tt={
                                'idthoigian':id_thoigian,
                                'id_user':id_user,
                            }
                            socket.emit('thuhoihinhanh',tt);
                        })
                        var z1 = document.createElement("option");
                        var t1 = document.createTextNode("");
                        z1.value='null'
                        z1.selected=true;
                        z.appendChild(t);
                        z1.appendChild(t1);
                        x.append(z1)
                        x.append(z)
                        div6.append(x);
                    })
                    div46.append(div6)
                    div46.append(div4)

                    div.append(div2);
                    div2.append(div3);
                    div2.append(div46);
                    
                    messages.appendChild(div);
                    messages.scrollTop = messages.scrollHeight;   
                }         
                function nguoigui(id_user,id,tennguoinhan,thoigian,noidung,url){
                    const div = document.createElement('div');
                    div.id=id_user;
                    div.className=('d-flex justify-content-end mb-10 ');
                    const div2 = document.createElement('div');
                    div2.className = ('d-flex flex-column align-items-end');
                    const div3 = document.createElement('div');
                    div3.className = ('d-flex align-items-center mb-2');
                    const div3_1= document.createElement('div');
                    div3_1.className=('me-3');
                    const div3_1_span= document.createElement('span');
                    div3_1_span.className='text-muted fs-7 mb-1';
                    //cat chuoi thoi gian
                   // var thoigian =data.nguoigui[i].thoigian;
                   // const thoigian1 = thoigian.toString();
                    div3_1_span.textContent= thoigian;
                    const div3_1_a= document.createElement('a');
                    div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                     div3_1_a.textContent=tennguoinhan;
                    div3_1.append(div3_1_span);
                    div3_1.append(div3_1_a); 
                    const div3_2= document.createElement('div');
                    div3_2.className=('symbol symbol-35px symbol-circle');
                     const img = document.createElement('img');
                     img.src= url;
                     div3_2.append(img);
                    div3.append(div3_1);
                    div3.append(div3_2);
                    const div4 = document.createElement('div');
                    div4.id=id;
                    div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end  ');
                    const a = document.createElement('a');
                    a.textContent = noidung;
                    div4.append(a);
                    const div46 = document.createElement('div');
                    div46.className='d-flex align-items-center mb-2 overlay'
                    const div6 = document.createElement('div');
                    const div6_1 = document.createElement('div');
                    div6_1.className='me-3 overlay-layer';
                    div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                    <i class="bi bi-three-dots fs-3"></i>
                </button>`
                    div6.append(div6_1)
                    div6_1.addEventListener('click', function thuhoi(e){
                        e.preventDefault();
                        var x = document.createElement("SELECT");
                        x.id='mySelect';
                        x.className='overlay-layer';
                        var z = document.createElement("option");
                        z.value='thu hồi'
                        var t = document.createTextNode("Thu hồi");
                        x.addEventListener('click',function thuhoitinnhan(e){
                            e.preventDefault();
                            let b= document.querySelector('#mySelect').value;
                            if(b==='thu hồi'){
                                const c = document.createElement('a');
                                c.textContent = `Tin nhắn đã được thu hồi`;
                                div4.replaceChild(c,a)
                            }
                            const tt={
                                'id':id,
                                'id_user':id_user,
                            }
                            socket.emit('thuhoi',tt);
                        })
                        var z1 = document.createElement("option");
                        var t1 = document.createTextNode("");
                        z1.value='null'
                        z1.selected=true;
                        
                    
                        z.appendChild(t);
                        z1.appendChild(t1);
                        x.append(z1)
                        x.append(z)
                        div6.append(x);
                    })
                    div46.append(div6)
                    div46.append(div4)
                    div.append(div2);
                    div2.append(div3);
                    div2.append(div46);              
                    messages.appendChild(div);
                    messages.scrollTop = messages.scrollHeight;

                   
                   
                }
                function nguoinhan(id,tennguoigui,thoigian,noidung,url){
                    socket.on('thuhoi',data =>{
                        if(data.id===id){
                            const c = document.createElement('a');
                            c.textContent = `Tin nhắn đã được thu hồi`;
                            tinnhan.replaceChild(c,tin)
                        }
                    })
                    const chatItem = document.createElement('div');
                    chatItem.className=('d-flex justify-content-start mb-10');
                    const chatItem2 = document.createElement('div');
                    chatItem2.className=('d-flex flex-column align-items-start');
                    const ha_ten = document.createElement('div');
                    ha_ten.className=('d-flex align-items-center mb-2');
                    const anh = document.createElement('div');
                    anh.className=('symbol symbol-35px symbol-circle');
                    const img = document.createElement('img');
                    img.src=url;
                    anh.append(img);
                    const tengio = document.createElement('div');
                    tengio.className = ('ms-3');
                    const ten = document.createElement('a');
                    ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                    ten.textContent =tennguoigui;
                    const span = document.createElement('span');
                    span.className=('text-muted fs-7 mb-1');
                    span.textContent=thoigian;
                    tengio.append(ten);
                    tengio.append(span)
                    ha_ten.append(anh);
                    ha_ten.append(tengio);
                    const tinnhan = document.createElement('div')
                    tinnhan.id=id;
                    tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                    const tin = document.createElement('a');
                    tin.textContent = noidung;
                    tinnhan.append(tin);
                    chatItem.append(chatItem2);
                    chatItem2.append(ha_ten);
                    chatItem2.append(tinnhan);              
                    messages.appendChild(chatItem);
                    // scroll down
                    messages.scrollTop = messages.scrollHeight;
                    
                }
                function nguoinhanhinhanh(idthoigian,tennguoinhan,thoigian,nhananh,url){
                    socket.on('thuhoihinhanh',data =>{
                        if(data.idthoigian===idthoigian){
                            const c = document.createElement('a');
                            c.textContent = `Tin nhắn đã được thu hồi`;
                            tinnhan.replaceChild(c,imgg)
                        }
                    })
                    const chatItem = document.createElement('div');
                    chatItem.className=('d-flex justify-content-start mb-10');
                    const chatItem2 = document.createElement('div');
                    chatItem2.className=('d-flex flex-column align-items-start');
                    const ha_ten = document.createElement('div');
                    ha_ten.className=('d-flex align-items-center mb-2');
                    const anh = document.createElement('div');
                    anh.className=('symbol symbol-35px symbol-circle');
                    const img = document.createElement('img');
                    img.src=url;
                    anh.append(img);
                    const tengio = document.createElement('div');
                    tengio.className = ('ms-3');
                    const ten = document.createElement('a');
                    ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                    ten.textContent =tennguoinhan;
                    const span = document.createElement('span');
                    span.className=('text-muted fs-7 mb-1');
                    span.textContent=thoigian;
                    tengio.append(ten);
                    tengio.append(span)
                    ha_ten.append(anh);
                    ha_ten.append(tengio);
                    const tinnhan = document.createElement('div')
                    tinnhan.id=idthoigian
                    tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                    const imgg = document.createElement('img');
                    imgg.style='width:128px;height:128px;'
                    chatItem.append(chatItem2);
                    chatItem2.append(ha_ten);
                    chatItem2.append(tinnhan);
                    tinnhan.append(imgg);
                    imgg.src=nhananh;
                    messages.appendChild(chatItem);
                    // scroll down
                    messages.scrollTop = messages.scrollHeight;
                }
                 socket.on('user-chat',(message)=>{
                     nguoinhan(message.tg,message.ten,message.tg_giophut,message.message,message.url);
                 })
                 socket.on('guianh',thongtin=>{
                     console.log(thongtin);
                     nguoinhanhinhanh(thongtin.tg,thongtin.ten,thongtin.tg_giophut,thongtin.base64,thongtin.url);
                 })
                 socket.on('guifile',(file)=>{
                    //console.log(file);
                    nguoinhanfile(file.tg,file.ten,file.tg_giophut,file.tenfile,file.url,file.file,file.tenfile);
                })
                socket.on('guivideo',(file)=>{
                    //console.log(file);
                    nguoinhanvideo(file.tg,file.ten,file.tg_giophut,file.video,file.url,file.tenfile);
                })
                   }
                   
                
                }
            }

    })
})
//tao group
$(function(){
    const form_dsGroup = document.querySelector('#form_ds_group')
     $.ajax({
        url:'/chat/danhsachbanbe',
            contentType: 'application/json',
            success: function(res){
                const ds_user = res.ds_banbe;
                console.log(ds_user);
                for(let i=0;i<ds_user.length;i++){
                    let  ten_group = ds_user[i].map(a => a.ten_tk);
                    let  sdt_group = ds_user[i].map(a => a.sdt);
                    let  url = ds_user[i].map(a => a.url);
                    let  ma_tk_group = ds_user[i].map(a => a.ma_tk)
                    const div_group = document.createElement('div'); 
                    div_group.className='d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed';
                    div_group.innerHTML=`<div class="d-flex align-items-center">
                    <!--begin::Avatar-->
                    <div class="symbol symbol-35px symbol-circle">
                        <img alt="Pic" src="${url}">
                    </div>
                    <!--end::Avatar-->
                    <!--begin::Details-->
                    <div class="ms-5">
                        <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">${ten_group}</a>
                        <div class="fw-bold text-muted">${sdt_group}</div>
                    </div>
                    <!--end::Details-->
                </div>`;
                    const div2_group = document.createElement('div');
                    div2_group.className='ms-2 w-100px';
                    const btn_group = document.createElement('button');
                    btn_group.className='btn btn-primary btn-sm';
                    btn_group.addEventListener('click', addGroup_chat)
                    btn_group.style='submit';
                    btn_group.textContent='thêm';
                    div2_group.append(btn_group);
                    div_group.append(div2_group);
                    form_dsGroup.appendChild(div_group);
                    
                    function addGroup_chat(){
                        div_group.remove(); 
                        const tag_form = document.querySelector('#tag');
                        const tag_element = document.createElement('tag');
                        tag_element.className='tagify__tag tagify--noAnim';
                        tag_element.title=ten_group;
                        tag_element.value=ten_group;
                        tag_element.tabindex="-1"
                         const x = document.createElement('x');
                         x.className='tagify__tag__removeBtn';
                         x.setAttribute('role','button')
                         x.setAttribute('aria-label','remove tag')
                         x.addEventListener('click',()=>{
                             tag_element.remove();
                         })
                         x.role='button';
                         const div = document.createElement('div');
                         div.innerHTML=`<span class="tagify__tag-text">${ten_group}</span>`
                        tag_element.append(x);
                        tag_element.append(div);
                        //tag_element.innerHTML=`<div><span class="tagify__tag-text">${ten_group}</span></div>`;
                        tag_form.appendChild(tag_element);
                        //lay du lieu luu xuong database
                        const tao_group = document.querySelector('#tao_room');
                        tao_group.addEventListener('click', getName_adddatabase);

                    }
                }
               
                 
                //tao thoi gian
                const currentdate = new Date();
                const datatime =('0'+ currentdate.getDate()).slice(-2) +"/" +('0'+(currentdate.getMonth()+1)).slice(-2)+"/"+ currentdate.getFullYear() +" "
                + ('0'+currentdate.getHours()).slice(-2)+":" + ('0'+currentdate.getMinutes()).slice(-2)+":"+ ('0'+currentdate.getSeconds()).slice(-2);
                function getName_adddatabase(){
                    //tao cau so caht nhom
                                      //gui xunog database
                    const get_tag = document.querySelectorAll('tag');
                    const ten_group = document.querySelector('#ten_group').value;
                   // console.log(ten_group);
                   let ds_ban = [];
                    for(let i=0; i<get_tag.length;i++){
                        console.log(get_tag[i]);
                        get_tag[i].remove();      
                        let  ma_tk_group = ds_user[i].map(a => a.ma_tk)
                        //lay ma tai khoan 
                        ds_ban[i]= ma_tk_group;
                        //console.log(ds_ban);
                    }                                
                    const thongtin={
                        "ten_nhom":ten_group,
                        "id_banbe":ds_ban,
                        "thoigian":datatime
                    }
                       // console.log(thongtin);
                        $.ajax({
                            url:'/nhomchat',
                            method:'POST',
                            contentType: 'application/json',
                            data : JSON.stringify({ds_group: thongtin }),
                            success: function(res){ 
                                const tennhomm = res.tennhom
                                if(tennhomm==='thatbai'){
                                    toastr.options = {
                                        "closeButton": false,
                                        "debug": false,
                                        "newestOnTop": false,
                                        "progressBar": true,
                                        "positionClass": "toastr-top-right",
                                        "preventDuplicates": false,
                                        "onclick": null,
                                        "showDuration": "300",
                                        "hideDuration": "500",
                                        "timeOut": "3000",
                                        "extendedTimeOut": "500",
                                        "showEasing": "swing",
                                        "hideEasing": "linear",
                                        "showMethod": "fadeIn",
                                        "hideMethod": "fadeOut"
                                      };
                                      
                                      toastr.error("Tên Nhóm Trùng Vui Lòng Nhập Lại!");
                                      
                                }
                                else{
                                    const form_chat_group = document.querySelector('#kt_chat_contacts_body_group');
                                    const div = document.createElement('div');
                                    div.className='hover scroll-y me-n5 pe-5 h-200px h-lg-auto';
                                    div.style='max-height: 416px;';
                                   // div.addEventListener('click', chatgroup)
                                    div.innerHTML=`<div class="d-flex flex-stack py-4">
                                    <!--begin::Details-->
                                    <div class="d-flex align-items-center">
                                        <!--begin::Avatar-->
                                        <div class="symbol symbol-45px symbol-circle">
                                            <img src="https://detaizalo.s3.ap-southeast-1.amazonaws.com/anhgroup.png">
                                        </div>
                                        <!--end::Avatar-->
                                        <!--begin::Details-->
                                        <div class="ms-5">
                                            <a href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">${tennhomm}</a>
                                        </div>
                                        <!--end::Details-->
                                    </div>
                                    <!--end::Details-->
                                    <!--begin::Lat seen-->
                                    <div class="d-flex flex-column align-items-end ms-2">
                                        <span class="text-muted fs-7 mb-1">3 hrs</span>
                                    </div>
                                    <!--end::Lat seen-->
                                </div>`;
                                    form_chat_group.appendChild(div);
                                    ten_group.value="";   
                                    location.reload();
                                }
                                   
                                     
                             }
                        })        
                }
                
               
            }
    })   
   
})
//load danh sach group
$(function(){ 
    const add_groupchat= document.querySelector('#kt_chat_contacts_body_group')
    $.ajax({
        url:'/nhomchat',
        method:'GET',
        contentType: 'application/json',
       // data : JSON.stringify({ds_group: thongtin }),
        success: function(res){   
            var nhom_chat = res.nhomchat;  
            console.log(nhom_chat);
            for(let i=0;i<nhom_chat.length;i++){
                var div_chatgroup = document.createElement('div');
                div_chatgroup.className='hover scroll-y me-n5 pe-5 h-200px h-lg-auto';
                div_chatgroup.style='max-height: 416px;';
                div_chatgroup.addEventListener('click', chatgroup)
                div_chatgroup.innerHTML=`<div class="d-flex flex-stack py-4">
                <!--begin::Details-->
                <div class="d-flex align-items-center">
                    <!--begin::Avatar-->
                    <div class="symbol symbol-45px symbol-circle">
                        <img src="${nhom_chat[i].urlnhom}">
                    </div>
                    <!--end::Avatar-->
                    <!--begin::Details-->
                    <div class="ms-5">
                        <a id="tennhomchat" href="#" class="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">${nhom_chat[i].tennhom}</a>
                    </div>
                    <!--end::Details-->
                </div>
                <!--end::Details-->
                <!--begin::Lat seen-->
                <div class="d-flex flex-column align-items-end ms-2">
                    <span class="text-muted fs-7 mb-1">1h</span>
                </div>
                <!--end::Lat seen-->
            </div>`;
                add_groupchat.appendChild(div_chatgroup);
               
                function chatgroup(){
                   
                      const formGroup = document.querySelector('#form_a');
                      var div_lon = document.createElement('div');
                      div_lon.className='card'
                      div_lon.id='kt_chat_messenger_group'
    
                      const head_group= document.createElement('div');
                      head_group.className='card-header'
                     const head_group_title = document.createElement('div');
                     head_group_title.className='card-title'
                      // load modal khác  
                     head_group_title.innerHTML=`<div data-bs-toggle="modal" data-bs-target="#kt_modal_view_users" class="symbol symbol-45px symbol-circle"><img src="${nhom_chat[i].urlnhom}"></div>
                     <div class="d-flex justify-content-center flex-column me-3 ms-5">
                         <a id="" href="#" data-bs-toggle="modal" data-bs-target="#kt_modal_select_users" class="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">${nhom_chat[i].tennhom}</a>
                     </div>`
                     $.ajax({
                        url:'/loadhinhanh/'+nhom_chat[i].tennhom,
                        method:'GET',
                        contentType: 'application/json',
                        success: function(req){ 
                            console.log(req.id);    
                            console.log(req.id.id[0]);                 
                            const id = req.id
                            const div_tong = document.querySelector('#modelloadtt') 
                            const tongtinnhan = document.querySelector('#tongtinnhan')
                            const maTK = document.querySelector('#tk_guiketban').value 
                            
                            for(let i=0;i<id.id.length;i++){
                                tongtinnhan.textContent=id.tatcatinnhan[0].tongtn;
                               // if(id.id[i].id_chuphong===id.id[i].id_tk){
                                    const div = document.createElement('div');
                                    div.className='border border-hover-primary p-7 rounded'
                                    const div_thongtin = document.createElement('div');
                                    div_thongtin.className='d-flex flex-stack pb-3'
                                  
                                    div_thongtin.innerHTML=`<div class="d-flex">
                                    <!--begin::Avatar-->
                                    <div class="symbol symbol-circle symbol-45px">
                                        <img src="${id.id[i].url}" alt="">
                                    </div>
                                    <!--end::Avatar-->
                                    <!--begin::Details-->
                                    <div class="ms-5">
                                        <!--begin::Name-->
                                        <div class="d-flex align-items-center">
                                            <a href="" class="text-dark fw-bolder text-hover-primary fs-5 me-4">${id.id[i].ten_tk}</a>
                                            <!--begin::Label-->
                                            <span class="m-0"></span>
                                            <!--end::Label-->
                                        </div>
                                        <!--end::Name-->
                                        <!--begin::Desc-->
                                        <span class="text-muted fw-bold mb-3">${id.id[i].sdt}</span>
                                        <!--end::Desc-->
                                    </div>
                                    <!--end::Details-->
                                </div>
                                <div clas="d-flex">
                                            <!--begin::Price-->
                                            <div class="text-end pb-3">
                                                <span class="text-dark fw-bolder fs-5">${id.id[i].sotinnhan}</span>
                                                <span class="text-muted fs-7">tin nhắn</span>
                                            </div>
                                            <!--end::Price-->
                                        </div>`
                                   
                                    const div_xoa = document.createElement('div');
                                    div_xoa.className='p-0'
                                   
                                    const div_ten = document.createElement('div');
                                    div_ten.className='d-flex flex-column'
                                    const div_tentrong = document.createElement('div');
                                    div_tentrong.className='d-flex flex-stack'
                                    const p_ten = document.createElement('p');
                                    p_ten.className='text-gray-700 fw-bold fs-6 mb-4'
                                    if(id.id[i].id_chuphong===id.id[i].id_tk){
                                    p_ten.textContent='Người Tạo Phòng'
                                    }
                                    else{
                                    p_ten.textContent='Thành Viên'
                                    }
                                    div_tentrong.append(p_ten)
                                    var select = document.createElement('select');
                                    select.id='luachon'
                                     if(id.id[i].ma_tk=== parseInt(maTK)){  
                                        select.className=' form-select-sm form-select-solid'
                                        var op = document.createElement('option');
                                        op.value='null'
                                        op.selected=true
                                        var op1 = document.createElement('option');
                                        op1.value='them'
                                        select.append(op)
                                        select.append(op1)
                                        if(id.id[i].id_chuphong===id.id[i].id_tk){
                                            const op2 = document.createElement('option');
                                            op2.value='xoa'
                                            const op3 = document.createElement('option');
                                            op3.value='kich'
                                            op1.textContent='Thêm'
                                            
                                            op2.textContent='Xóa Nhóm'
                                            op3.textContent='Kích'
                                            select.append(op2)
                                            select.append(op3)
                                        }
                                        else{
                                            op1.textContent='Thêm'
                                            const op4= document.createElement('option');
                                            op4.textContent='Rời nhóm'
                                            op4.value='roinhom'
                                            select.append(op4)
                                        }  
                                        div_tentrong.append(select)
                                    }
                                    select.addEventListener('change',thaydoi);
                                    
                                    div_ten.append(div_tentrong)
                                    div_xoa.append(div_ten)

                                    div.append(div_thongtin)
                                    div.append(div_xoa)
                                    div_tong.appendChild(div)
                                
                            }
                            function thaydoi(){                          
                                const luachon = document.querySelector('#luachon').value;
                                if(luachon==='them'){
                                    const modal = document.getElementById('modalmoiban');
                                    const thoat = document.querySelector('#thoatmodal');
                                    $('#modalmoiban').modal('show')
                                     //load ds ban be chua vao nhóm
                                     const id_nhom = nhom_chat[i].id_nhom;
                                     const form_dsban = document.querySelector('#dsbanchuathemgroup');
                                     $.ajax({
                                        url:'/dsbanbechuavaonhom/'+nhom_chat[i].tennhom,
                                        method:'GET',
                                        contentType: 'application/json',
                                        success: function(req){ 
                                            const ds = req.ds_banbe ;                      
                                            for(let i=0;i<ds.length;i++){
                                                const  url= ds[i].map(a => a.url);
                                                const  ten= ds[i].map(a => a.ten_tk);
                                                const  sdt= ds[i].map(a => a.sdt);
                                                const  ma= ds[i].map(a => a.ma_tk);
                                                const a = document.createElement('a')
                                                a.className='d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1'
                                                const div1 =document.createElement('div')
                                                div1.className='symbol symbol-35px symbol-circle me-5'
                                                div1.innerHTML=`<img alt="Pic" src="${url}">`
                                                const div2 =document.createElement('div')
                                                div2.className='fw-bold'
                                                div2.innerHTML=`<span class="fs-6 text-gray-800 me-2">${ten}</span>
                                                <span class="badge badge-light">${sdt}</span>`

                                                const div3 =document.createElement('div')
                                                div3.className='btn-group btn-group-sm'
                                                div3.style='margin-left:auto'
                                                div3.setAttribute('role','group')
                                                const btn =document.createElement('button')
                                                btn.className='btn'
                                                btn.addEventListener('click',(e)=>{
                                                    e.preventDefault();
                                                    const currentdate = new Date();
                                                    const datatime =('0'+ currentdate.getDate()).slice(-2) +"/" +('0'+(currentdate.getMonth()+1)).slice(-2)+"/"+ currentdate.getFullYear() +" "
                                                    + ('0'+currentdate.getHours()).slice(-2)+":" + ('0'+currentdate.getMinutes()).slice(-2)+":"+ ('0'+currentdate.getSeconds()).slice(-2);
                                                        const thongtin = {
                                                            "id_tk":ma,
                                                            "id_nhom":id_nhom,
                                                            "thoigian":datatime,
                                                        }
                                                        $.ajax({
                                                            url:'/thembanvaogroup',
                                                            method:'POST',
                                                            contentType: 'application/json',
                                                            data : JSON.stringify({thongtin: thongtin }),
                                                            success: function(res){
                                                                const b = res.data
                                                                if(b==='thanhcong'){
                                                                    toastr.options = {                                        
                                                                        "progressBar": true,
                                                                        "positionClass": "toastr-top-right",
                                                                        "showDuration": "300",
                                                                        "hideDuration": "1000",
                                                                        "timeOut": "2000",
                                                                        "extendedTimeOut": "1000",
                                                                        "showEasing": "swing",
                                                                        "hideEasing": "linear",
                                                                        "showMethod": "fadeIn",
                                                                        "hideMethod": "fadeOut"
                                                                      };
                                                                    toastr.success("Thêm Bạn Vào Group Thành Công");
                                                                    a.remove();
                                                                }
                                                                
                                                            }
                                                        })   
                                                })
                                                btn.innerHTML=`<i class="bi bi-plus-circle" style="font-size: 1.5rem; color: black"></i>`
                                                div3.append(btn);

                                                a.appendChild(div1)
                                                a.appendChild(div2)
                                                a.appendChild(div3)
                                                form_dsban.appendChild(a)
                                            }
                                           
                                        }
                                    }) 
                                    thoat.onclick = function() {
                                        modal.style.display = "none";
                                        location.reload()
                                        //div_lon.remove()
                                    }
                                    window.onclick = function(event) {
                                        if (event.target == modal) {
                                            modal.style.display = "none";
                                            location.reload()
                                            //div_lon.remove()
                                        }
                                      }
                                      
                                 //quay lại lựa chọn
                                 op.selected=true;
                                }   
                                if(luachon==='xoa'){
                                    $.ajax({
                                        url:'/xoagroup',
                                        method:'POST',
                                        contentType: 'application/json',
                                        data : JSON.stringify({thongtin: nhom_chat[i].id_nhom }),
                                        success: function(res){
                                            const b = res.data
                                            if(b==='thanhcong'){
                                                toastr.options = {                                        
                                                    "progressBar": true,
                                                    "positionClass": "toastr-top-right",
                                                    "showDuration": "300",
                                                    "hideDuration": "1000",
                                                    "timeOut": "2000",
                                                    "extendedTimeOut": "1000",
                                                    "showEasing": "swing",
                                                    "hideEasing": "linear",
                                                    "showMethod": "fadeIn",
                                                    "hideMethod": "fadeOut"
                                                  };
                                                toastr.success("Xóa Nhóm Thành Công");
                                                $('#kt_modal_select_users').modal('hide')
                                                div_lon.remove()
                                                div_chatgroup.remove();
                                                
                                            }
                                        }
                                    })
                                }
                                if(luachon==='kich'){
                                    const modalkich = document.querySelector('#modalkichban')
                                    const nhanx = document.querySelector('#id_kichban')
                                    $('#modalkichban').modal('show')
                                    $.ajax({
                                        url:'/loaddsgroup/'+nhom_chat[i].tennhom,
                                        method:'GET',
                                        contentType: 'application/json',
                                        success: function(req){ 
                                            const ds = req.id
                                            const form = document.querySelector('#dsbanmuonkich');
                                            form.className='mh-375px scroll-y me-n7 pe-7'
                                            for(let i=0;i<ds.length;i++){
                                                const aa = document.createElement('a')
                                                aa.className='d-flex align-items-center p-3 rounded bg-state-light bg-state-opacity-50 mb-1'
                                                const div1 =document.createElement('div')
                                                div1.className='symbol symbol-35px symbol-circle me-5'
                                                div1.innerHTML=`<img alt="Pic" src="${ds[i].url}">`
                                                const div2 =document.createElement('div')
                                                div2.className='fw-bold'
                                                div2.innerHTML=`<span class="fs-6 text-gray-800 me-2">${ds[i].ten_tk}</span>
                                                <span class="badge badge-light">${ds[i].sdt}</span>`

                                                const div3 =document.createElement('div')
                                                div3.className='btn-group btn-group-sm'
                                                div3.style='margin-left:auto'
                                                div3.setAttribute('role','group')
                                                const btn =document.createElement('button')
                                                btn.className='btn'
                                                btn.addEventListener('click',function kich(e) {
                                                    e.preventDefault()
                                                    const thongtin={
                                                        id_tk:ds[i].ma_tk,
                                                        id_nhom:ds[i].id_nhom,
                                                    }
                                                    $.ajax({
                                                        url:'/kichban',
                                                        method:'POST',
                                                        contentType: 'application/json',
                                                        data : JSON.stringify({thongtin: thongtin }),
                                                        success: function(res){
                                                            const b = res.data
                                                            if(b==='thanhcong'){
                                                                toastr.options = {                                        
                                                                    "progressBar": true,
                                                                    "positionClass": "toastr-top-right",
                                                                    "showDuration": "300",
                                                                    "hideDuration": "1000",
                                                                    "timeOut": "2000",
                                                                    "extendedTimeOut": "1000",
                                                                    "showEasing": "swing",
                                                                    "hideEasing": "linear",
                                                                    "showMethod": "fadeIn",
                                                                    "hideMethod": "fadeOut"
                                                                  };
                                                                toastr.success("Kích Bạn Thành Công");
                                                                aa.remove();
                                                            }
                                                            
                                                        }
                                                    })  
                                                    
                                                })
                                                btn.innerHTML=`<i class="bi bi-x text-danger fs-3" style="font-size: 1.5rem; color: black"></i>`
                                                div3.append(btn);

                                                aa.appendChild(div1)
                                                aa.appendChild(div2)
                                                aa.appendChild(div3)
                                                
                                                form.appendChild(aa);
                                        }

                                        }
                                    })
                                    nhanx.onclick = function() {
                                        modalkich.style.display = "none";
                                        location.reload()
                                        //div_lon.remove()
                                    }
                                    window.onclick = function(event) {
                                        if (event.target == modalkich) {
                                            modalkich.style.display = "none";
                                            location.reload()
                                            //div_lon.remove()
                                        }
                                      }
                                    //quay lại lựa chọn
                                    op.selected=true;
                                }
                                if(luachon==='roinhom'){
                                    $.ajax({
                                        url:'/roigroup',
                                        method:'POST',
                                        contentType: 'application/json',
                                        data : JSON.stringify({thongtin: nhom_chat[i].id_nhom }),
                                        success: function(res){
                                            const tc = res.data
                                            if(tc==='thanhcong'){
                                                toastr.options = {                                        
                                                    "progressBar": true,
                                                    "positionClass": "toastr-top-center",
                                                    "showDuration": "300",
                                                    "hideDuration": "1000",
                                                    "timeOut": "2000",
                                                    "extendedTimeOut": "1000",
                                                    "showEasing": "swing",
                                                    "hideEasing": "linear",
                                                    "showMethod": "fadeIn",
                                                    "hideMethod": "fadeOut"
                                                  };
                                                toastr.success("Bạn đã rời nhóm");
                                                $('#kt_modal_select_users').modal('hide')
                                                div_lon.remove()
                                                div_chatgroup.remove();
                                            }
                                        }
                                    })        
                                   
                                }
                            
                            }
                        }
                    })
                    //modal sua thong tin nhomchat
                    const anhnhomchat = document.querySelector('#anhnhomchat') 
                    anhnhomchat.style.backgroundImage=`url("${nhom_chat[i].urlnhom}")`                 
                    const tennhomchat = document.querySelector('#tennhomchat')
                    tennhomchat.value=nhom_chat[i].tennhom
                    document.querySelector('#suathongtin').addEventListener('click',function(e) {
                        const fileanh = document.querySelector('#layanh').files[0];
                        e.preventDefault();
                       const reader = new FileReader();
                       reader.readAsDataURL(fileanh);
                       reader.onload=function (e){
                           const thongtin={
                               id_nhom:nhom_chat[i].id_nhom,
                               urlnhom:e.target.result,
                               tennhom:nhom_chat[i].tennhom,
                               id_chuphong:nhom_chat[i].id_chuphong
                           }
                           $.ajax({
                               url:'/capnhatanhchogroup',
                               method:'POST',
                               contentType: 'application/json',
                               data : JSON.stringify({thongtin_update: thongtin }),
                               success: function(res){
                                   const a = res.data
                                   if(a==='thanhcong')
                                   {
                                       window.location.reload(true);
                                   }
                               }
                           })
                       }
                       
                    })
                     const head_group_toobar = document.createElement('div');
                     head_group_toobar.className='card-toolbar'
                     head_group_toobar.innerHTML=`<div class="me-n3">
                     <button id="thoat" class="btn btn-sm btn-icon btn-active-light-primary show menu-dropdown hiding" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                         <i class="bi bi-x-lg" style="color: black"></i>
                     </button>
                 </div>`
                     head_group.append(head_group_title);
                     head_group.append(head_group_toobar);
    
                     const body_group = document.createElement('div');
                     body_group.className='card-body';
                     const khungtinnhan = document.createElement('div');
                     khungtinnhan.className='scroll-y me-n5 pe-5 h-300px h-lg-auto';
                     khungtinnhan.id='loadtinnhan_nhom';
                     khungtinnhan.style='max-height: 271px;'
                     
                     body_group.append(khungtinnhan);
    
                     const khungchat = document.createElement('div');
                     khungchat.id='kt_chat_messenger_footer'
                     khungchat.className='card-footer pt-4'
                     khungchat.innerHTML=`<textarea id="doantinnhan_group" class="form-control form-control-flush mb-3" rows="1"  placeholder="Nhập tin nhắn"></textarea>      
                     <div class="d-flex flex-stack">
                                         <!--begin::Actions-->
                                         <div class="d-flex align-items-center me-2">
                                         <button class="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="" data-bs-original-title="Coming soon">

                                         <label class="btn btn-icon btn-card-image btn-active-color-primary w-20px h-25px "
                                         data-kt-image-input-action="change"
                                         data-bs-toggle="tooltip"
                                         data-bs-dismiss="click"
                                         title="Change avatar">
                                             <i class=" bi bi-card-image fs-3"></i>
                                             <input type="file" id="file_group" name="avatar" accept=".png, .jpg, .jpeg" />  
                                         </label>
                                         </button>
                                         <button class="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="" data-bs-original-title="Coming soon">
                                         <label class="btn btn-icon btn-paperclip btn-active-color-primary w-20px h-25px "
                                         data-kt-image-input-action="change"
                                         data-bs-toggle="tooltip"
                                         data-bs-dismiss="click">
                                             <i class="bi bi-paperclip fs-3"></i>
                                             <input type="file" id="tailieugroup" accept=".doc,.docx,.pdf" />  
                                             </label>
                                         </button>
                                         <button class="btn btn-sm btn-icon btn-active-light-primary me-1" type="button" data-bs-toggle="tooltip" title="" data-bs-original-title="Coming soon">
                                         <label class="btn btn-icon btn-paperclip btn-active-color-primary w-20px h-25px "
                                         data-kt-image-input-action="change"
                                         data-bs-toggle="tooltip"
                                         data-bs-dismiss="click">
                                             <i class="bi bi-upload fs-3"></i>
                                             <input type="file" id="videogroup" accept="video/*" />  
                                             </label>
                                         </button>
                                         </div>
                                         <!--end::Actions-->
                                         <!--begin::Send-->
                                         <button class="btn btn-primary" id="send" type="button" data-kt-element="send">Send</button>
                                         <!--end::Send-->
                                     </div>`
                                     div_lon.append(head_group)
                                     div_lon.append(body_group)
                                     div_lon.append(khungchat)
                                     formGroup.appendChild(div_lon)
                     
                      document.querySelector('#thoat').addEventListener('click',a=>{
                         div_lon.remove();
                     })
                     //hien thi hinh anh xem truoc
                     document.querySelector('#file_group').addEventListener('change',function(){
                        loadanh_group();
                   })
                   function loadanh_group(){
                    const selector = document.querySelector('#file_group');
                    const div = document.querySelector('#kt_chat_messenger_footer');
                    const text = document.querySelector('#doantinnhan_group');
                    const anh = document.createElement('img');
                    anh.id="hinhanh";
                    anh.style = 'width:120px;height:60px;'
                    div.insertBefore(anh,text);

                    var reader = new  FileReader();
                    reader.onload = function(e){
                        anh.src = e.target.result;
                    }
                    reader.readAsDataURL(selector.files[0]);
                }
                     
                      // tao cong chat    
                   const my_id = document.querySelector('#tk_guiketban').value;
                   const tentk = document.querySelector('#userr').value;
                   const url_idmy = document.querySelector('#url_nguoigui').value;
                   //console.log(url_idmy);
                   const currentdate = new Date();
                   const datatime_group =('0'+ currentdate.getDate()).slice(-2) +"/" +('0'+(currentdate.getMonth()+1)).slice(-2)+"/"+ currentdate.getFullYear() +" "
                   + ('0'+currentdate.getHours()).slice(-2)+":" + ('0'+currentdate.getMinutes()).slice(-2)+":"+ ('0'+currentdate.getSeconds()).slice(-2);
                  const gio_phut_group = ('0'+currentdate.getHours()).slice(-2)+":" + ('0'+currentdate.getMinutes()).slice(-2);
                  const sukiengui = document.querySelector('#send');  
                  const socket = io(); 
                      socket.emit("john_group",nhom_chat[i].tennhom)

                      
                  sukiengui.addEventListener('click', (e)=>{
                        e.preventDefault();
                       const doantinnhan = document.querySelector('#doantinnhan_group').value;
                       
                       const thongtin={
                        "my_id":my_id,
                        "tennhom":nhom_chat[i].tennhom,
                        "thoigian_database":datatime_group,
                        "thoigian_hienthi":gio_phut_group,
                        "ten_nguoigui":tentk,
                        "url":url_idmy,
                        "tinnhan":doantinnhan,
                        "id_nhom":nhom_chat[i].id_nhom
                    }   
                       if(doantinnhan.length>0){
                       socket.emit("user-group",nhom_chat[i].tennhom,thongtin);
                       nguoigui(nhom_chat[i].tennhom,datatime_group,tentk,gio_phut_group,doantinnhan,url_idmy);
                         document.querySelector('#doantinnhan_group').value='';
                       }
                       else{ 
                        const selector = document.querySelector('#file_group');
                        var reader = new  FileReader();
                        reader.onload = function(e){
                            thongtin1={
                                my_id:my_id,
                           tennhom:nhom_chat[i].tennhom,
                           thoigian_database:datatime_group,
                           thoigian_hienthi:gio_phut_group,
                           ten_nguoigui:tentk,
                           url:url_idmy,
                                base64:e.target.result,
                                id_nhom:nhom_chat[i].id_nhom
                            }
                            socket.emit("guianh_group",nhom_chat[i].tennhom,thongtin1);
                           
                           nguoiguihinhanhgroup(nhom_chat[i].tennhom,datatime_group,tentk,gio_phut_group,e.target.result,url_idmy)
                           
                        }
                        reader.readAsDataURL(selector.files[0]);
                         document.querySelector('#hinhanh').remove();
                       }
                   })
                   //su kien enter
                   document.querySelector('#kt_chat_messenger_footer').addEventListener('keydown',(e)=>{
                    if(e.key === 'Enter'){
                        e.preventDefault();
                        const doantinnhan = document.querySelector('#doantinnhan_group').value;
                        const thongtin={
                            "my_id":my_id,
                            "tennhom":nhom_chat[i].tennhom,
                            "thoigian_database":datatime_group,
                            "thoigian_hienthi":gio_phut_group,
                            "ten_nguoigui":tentk,
                            "url":url_idmy,
                            "tinnhan":doantinnhan,
                            "id_nhom":nhom_chat[i].id_nhom
                        }  
                        socket.emit("user-group",nhom_chat[i].tennhom,thongtin);
                        console.log(thongtin);
                        nguoigui(nhom_chat[i].tennhom,datatime_group,tentk,gio_phut_group,doantinnhan,url_idmy);
                          document.querySelector('#doantinnhan_group').value='';

                    }
                   })
                   //gui file 
                   document.querySelector('#tailieugroup').addEventListener('change', function(){
                    const tailieu =document.querySelector('#tailieugroup').files[0];
                    var reader = new FileReader();
                     reader.onload = function(e){
                        thongtin={
                            "file":e.target.result,
                            "tenfile":tailieu.name,
                            "my_id":my_id,
                        "tennhom":nhom_chat[i].tennhom,
                        "thoigian_database":datatime_group,
                        "thoigian_hienthi":gio_phut_group,
                        "ten_nguoigui":tentk,
                        "url":url_idmy,
                        "id_nhom":nhom_chat[i].id_nhom
                        }
                        socket.emit("guifilegroup",nhom_chat[i].tennhom,thongtin);
                         nguoiguifilegroup(nhom_chat[i].tennhom,datatime_group,tentk,gio_phut_group,tailieu.name,url_idmy,e.target.result,tailieu.name)
                     }
                     reader.readAsDataURL(tailieu);   
                })
                //gui video
                document.querySelector('#videogroup').addEventListener('change', function(){
                    const video =document.querySelector('#videogroup').files[0];
                    var reader = new FileReader();
                     reader.onload = function(e){
                        const style = e.target.result.split(';')[0].split(':')[1];
                        thongtin={
                            "video":e.target.result,
                            "style":style,
                            "my_id":my_id,
                        "tennhom":nhom_chat[i].tennhom,
                        "thoigian_database":datatime_group,
                        "thoigian_hienthi":gio_phut_group,
                        "ten_nguoigui":tentk,
                        "url":url_idmy,
                        "id_nhom":nhom_chat[i].id_nhom
                        }
                        socket.emit("guivideogroup",nhom_chat[i].tennhom,thongtin);
                         nguoiguivideogroup(nhom_chat[i].tennhom,datatime_group,tentk,gio_phut_group,e.target.result,url_idmy,style);
                     }
                     reader.readAsDataURL(video);   
                })
                   //load tin nhắn group
                   $.ajax({
                    url:'/danhsachnhantingroup/'+nhom_chat[i].tennhom ,
                    method:'GET',
                    contentType: 'application/json',
                   // data : JSON.stringify({ds_group: thongtin }),
                    success: function(res){  
                        const thongtin = res.nhomchat;
                        for(let i=0;i< thongtin.length;i++){
                            if(thongtin[i].ma_tk == my_id){ 
                                const thoigian_nguoiguigroup= thongtin[i].thoigian;                    
                                  const gio_phutnguoiguigroup =thoigian_nguoiguigroup.slice(11,16);
                                  if(thongtin[i].loaitinnhan==='vanban' && thongtin[i].trangthai==='hoạt động'){
                                    nguoigui(thongtin[i].tennhom,thoigian_nguoiguigroup,thongtin[i].ten_tk,gio_phutnguoiguigroup,thongtin[i].noidung,thongtin[i].url);
                                  }
                                  else if(thongtin[i].loaitinnhan==='hinhanh' && thongtin[i].trangthai==='hoạt động'){
                                      nguoiguihinhanhgroup(thongtin[i].tennhom,thoigian_nguoiguigroup,thongtin[i].ten_tk,gio_phutnguoiguigroup,thongtin[i].noidung,thongtin[i].url);
                                  }
                                  else if(thongtin[i].loaitinnhan==='file' && thongtin[i].trangthai==='hoạt động'){
                                      const duongdan= thongtin[i].noidung.split(';');
                                    nguoiguifilegroup(thongtin[i].tennhom,thoigian_nguoiguigroup,thongtin[i].ten_tk,gio_phutnguoiguigroup,duongdan[1],thongtin[i].url,`${duongdan[0]}${duongdan[2]}`,duongdan[1]);
                                }
                                else if(thongtin[i].loaitinnhan==='video'&& thongtin[i].trangthai==='hoạt động'){
                                    const duongdan= thongtin[i].noidung.split(';');
                                  nguoiguivideogroup(thongtin[i].tennhom,thoigian_nguoiguigroup,thongtin[i].ten_tk,gio_phutnguoiguigroup,duongdan[0],thongtin[i].url,duongdan[1]);
                              }

                            }
                            else{
                                const thoigian_nguoinhangroup= thongtin[i].thoigian;
                                const gio_phutnguoinhangroup =thoigian_nguoinhangroup.slice(11,16);
                                if(thongtin[i].loaitinnhan==='vanban'&& thongtin[i].trangthai==='hoạt động'){
                                    nguoinhan(thoigian_nguoinhangroup,thongtin[i].ten_tk,gio_phutnguoinhangroup,thongtin[i].noidung,thongtin[i].url);
                                }
                                else if(thongtin[i].loaitinnhan==='hinhanh'&& thongtin[i].trangthai==='hoạt động'){
                                    nguoinhanhinhanhgroup(thoigian_nguoinhangroup,thongtin[i].ten_tk,gio_phutnguoinhangroup,thongtin[i].noidung,thongtin[i].url);
                                }
                                else if(thongtin[i].loaitinnhan==='file'&& thongtin[i].trangthai==='hoạt động'){
                                    const duongdan= thongtin[i].noidung.split(';');
                                    nguoinhanfilegroup(thoigian_nguoinhangroup,thongtin[i].ten_tk,gio_phutnguoinhangroup,duongdan[1],thongtin[i].url,`${duongdan[0]}${duongdan[2]}`,duongdan[1]);                               
                                
                                }
                                else if(thongtin[i].loaitinnhan==='video'&& thongtin[i].trangthai==='hoạt động'){
                                    const duongdan= thongtin[i].noidung.split(';');
                                    nguoinhanvideogroup(thoigian_nguoinhangroup,thongtin[i].ten_tk,gio_phutnguoinhangroup,duongdan[0],thongtin[i].url,duongdan[1]);                               
                                
                                }
                            }
                                 
                                 
                        }
                      
                    }
                   })
                 
                   function nguoiguivideogroup(tengroup,idthoigiangroup,tennguoinhan,thoigian,noidung,url,type){
                    const div_khungtong = document.querySelector('#loadtinnhan_nhom')
                    const div = document.createElement('div');
                    div.id=tengroup
                    div.className=('d-flex justify-content-end mb-10');
                    const div2 = document.createElement('div');
                    div2.className = ('d-flex flex-column align-items-end');
                    const div3 = document.createElement('div');
                    div3.className = ('d-flex align-items-center mb-2');
                    const div3_1= document.createElement('div');
                    div3_1.className=('me-3');
                    const div3_1_span= document.createElement('span');
                    div3_1_span.className='text-muted fs-7 mb-1';
                    //cat chuoi thoi gian
                   // var thoigian =data.nguoigui[i].thoigian;
                   // const thoigian1 = thoigian.toString();
                    div3_1_span.textContent= thoigian;
                    const div3_1_a= document.createElement('a');
                    div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                     div3_1_a.textContent=tennguoinhan;
                    div3_1.append(div3_1_span);
                    div3_1.append(div3_1_a); 
                    const div3_2= document.createElement('div');
                    div3_2.className=('symbol symbol-35px symbol-circle');
                     const img = document.createElement('img');
                     img.src= url;
                     div3_2.append(img);
                    div3.append(div3_1);
                    div3.append(div3_2);
                    const div4 = document.createElement('div');
                    div4.id=idthoigiangroup
                    div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end');
                    const video = document.createElement('video');
                    video.height='200';
                    video.width='250';
                    video.controls='autoplay';
                    const srouch = document.createElement('source');
                    srouch.src=noidung;
                    srouch.type=type;
                    video.append(srouch);
                    div4.append(video);
                    const div46 = document.createElement('div');
                    div46.className='d-flex align-items-center mb-2 overlay'
                    const div6 = document.createElement('div');
                    const div6_1 = document.createElement('div');
                    div6_1.className='me-3 overlay-layer';
                    div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                    <i class="bi bi-three-dots fs-3"></i>
                </button>`
                    div6.append(div6_1)
                    div6_1.addEventListener('click', function thuhoi(e){
                        e.preventDefault();
                        var x = document.createElement("SELECT");
                        x.id='mySelect';
                        x.className='overlay-layer';
                        var z = document.createElement("option");
                        z.value='thu hồi'
                        var t = document.createTextNode("Thu hồi");
                        x.addEventListener('click',function thuhoitinnhan(e){
                            e.preventDefault();
                            let b= document.querySelector('#mySelect').value;
                            if(b==='thu hồi'){
                                const c = document.createElement('a');
                                c.textContent = `Tin nhắn đã được thu hồi`;
                                div4.replaceChild(c,video)
                            }
                            socket.emit('thuhoivideogroup',tengroup,idthoigiangroup);
                        })
                        var z1 = document.createElement("option");
                        var t1 = document.createTextNode("");
                        z1.value='null'
                        z1.selected=true;
                        
                        z.appendChild(t);
                        z1.appendChild(t1);
                        x.append(z1)
                        x.append(z)
                        div6.append(x);
                    })
                    div46.append(div6)
                    div46.append(div4)


                    div.append(div2);
                    div2.append(div3);
                    div2.append(div46);
                   
                    
                    div_khungtong.appendChild(div);
                    div_khungtong.scrollTop = div_khungtong.scrollHeight;
                }
                function nguoinhanvideogroup(idthoigian,tennguoigui,thoigian,noidung,url,type){
                    const div_khungtong = document.querySelector('#loadtinnhan_nhom')
                    const chatItem = document.createElement('div');
                    chatItem.className=('d-flex justify-content-start mb-10');
                    const chatItem2 = document.createElement('div');
                    chatItem2.className=('d-flex flex-column align-items-start');
                    const ha_ten = document.createElement('div');
                    ha_ten.className=('d-flex align-items-center mb-2');
                    const anh = document.createElement('div');
                    anh.className=('symbol symbol-35px symbol-circle');
                    const img = document.createElement('img');
                    img.src=url;
                    anh.append(img);
                    const tengio = document.createElement('div');
                    tengio.className = ('ms-3');
                    const ten = document.createElement('a');
                    ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                    ten.textContent =tennguoigui;
                    const span = document.createElement('span');
                    span.className=('text-muted fs-7 mb-1');
                    span.textContent=thoigian;
                    tengio.append(ten);
                    tengio.append(span)
                    ha_ten.append(anh);
                    ha_ten.append(tengio);
                    const tinnhan = document.createElement('div')
                    tinnhan.id=idthoigian
                    tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                    const video = document.createElement('video');
                    video.height='200';
                    video.width='250';
                    video.controls='autoplay';
                    const srouch = document.createElement('source');
                    srouch.src=noidung;
                    srouch.type=type;
                    video.append(srouch);
                    chatItem.append(chatItem2);
                    chatItem2.append(ha_ten);
                    chatItem2.append(tinnhan);
                    tinnhan.append(video);
                    div_khungtong.appendChild(chatItem);
                    // scroll down
                    div_khungtong.scrollTop = div_khungtong.scrollHeight;
                    socket.on('thuhoivideogroup',data=>{
                        if(data===idthoigian){
                           const c = document.createElement('a');
                           c.textContent = `Tin nhắn đã được thu hồi`;
                           tinnhan.replaceChild(c,video)
                        }
                    })   
                }
                   function nguoinhanhinhanhgroup(idthoigian,tennguoinhan,thoigian,nhananh,url){
                    const div_khungtong = document.querySelector('#loadtinnhan_nhom')

                    const chatItem = document.createElement('div');
                    chatItem.className=('d-flex justify-content-start mb-10');
                    const chatItem2 = document.createElement('div');
                    chatItem2.className=('d-flex flex-column align-items-start');
                    const ha_ten = document.createElement('div');
                    ha_ten.className=('d-flex align-items-center mb-2');
                    const anh = document.createElement('div');
                    anh.className=('symbol symbol-35px symbol-circle');
                    const img = document.createElement('img');
                    img.src=url;
                    anh.append(img);
                    const tengio = document.createElement('div');
                    tengio.className = ('ms-3');
                    const ten = document.createElement('a');
                    ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                    ten.textContent =tennguoinhan;
                    const span = document.createElement('span');
                    span.className=('text-muted fs-7 mb-1');
                    span.textContent=thoigian;
                    tengio.append(ten);
                    tengio.append(span)
                    ha_ten.append(anh);
                    ha_ten.append(tengio);
                    const tinnhan = document.createElement('div')
                    tinnhan.id=idthoigian;
                    tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                    const imgg = document.createElement('img');
                    imgg.style='width:128px;height:128px;'
                    chatItem.append(chatItem2);
                    chatItem2.append(ha_ten);
                    chatItem2.append(tinnhan);
                    tinnhan.append(imgg);
                    imgg.src=nhananh;
                    div_khungtong.appendChild(chatItem);
                    // scroll down
                    div_khungtong.scrollTop = div_khungtong.scrollHeight;
                    socket.on('thuhoihinhanhgroup',data=>{
                        if(data===idthoigian){
                           const c = document.createElement('a');
                           c.textContent = `Tin nhắn đã được thu hồi`;
                           tinnhan.replaceChild(c,imgg)
                        }
                    })   
                }
                   function nguoiguihinhanhgroup(tengroup,idthoigiangroup,tennguoigui,thoigian,anh,url){
                    const div_khungtong = document.querySelector('#loadtinnhan_nhom')
                    const div = document.createElement('div');
                    div.id=tengroup;
                    div.className=('d-flex justify-content-end mb-10');
                    const div2 = document.createElement('div');
                    div2.className = ('d-flex flex-column align-items-end');
                    const div3 = document.createElement('div');
                    div3.className = ('d-flex align-items-center mb-2');
                    const div3_1= document.createElement('div');
                    div3_1.className=('me-3');
                    const div3_1_span= document.createElement('span');
                    div3_1_span.className='text-muted fs-7 mb-1';
                    //cat chuoi thoi gian
                   // var thoigian =data.nguoigui[i].thoigian;
                   // const thoigian1 = thoigian.toString();
                    div3_1_span.textContent= thoigian;
                    const div3_1_a= document.createElement('a');
                    div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                     div3_1_a.textContent=tennguoigui;
                    div3_1.append(div3_1_span);
                    div3_1.append(div3_1_a); 
                    const div3_2= document.createElement('div');
                    div3_2.className=('symbol symbol-35px symbol-circle');
                     const img = document.createElement('img');
                     img.src= url;
                     div3_2.append(img);
                    div3.append(div3_1);
                    div3.append(div3_2);
                    const div4 = document.createElement('div');
                    div4.id=idthoigiangroup
                    div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end');
                    const imgg = document.createElement('img');
                    imgg.style='width:128px;height:128px;'
                    div4.append(imgg);
                    imgg.src = anh;
                    const div46 = document.createElement('div');
                         div46.className='d-flex align-items-center mb-2 overlay'
                         const div6 = document.createElement('div');
                         const div6_1 = document.createElement('div');
                         div6_1.className='me-3 overlay-layer';
                         div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                         <i class="bi bi-three-dots fs-3"></i>
                     </button>`
                         div6.append(div6_1)
                         div6_1.addEventListener('click', function thuhoi(e){
                             e.preventDefault();
                             var x = document.createElement("SELECT");
                             x.id='mySelect';
                             x.className='overlay-layer';
                             var z = document.createElement("option");
                             z.value='thu hồi'
                             var t = document.createTextNode("Thu hồi");
                             x.addEventListener('click',function thuhoitinnhan(e){
                                 e.preventDefault();
                                 let b= document.querySelector('#mySelect').value;
                                 if(b==='thu hồi'){
                                     const c = document.createElement('a');
                                     c.textContent = `Tin nhắn đã được thu hồi`;
                                     div4.replaceChild(c,imgg)
                                 }
                                 socket.emit('thuhoihinhanhgroup',tengroup,idthoigiangroup);
                             })
                             var z1 = document.createElement("option");
                             var t1 = document.createTextNode("");
                             z1.value='null'
                             z1.selected=true;
                         
                             z.appendChild(t);
                             z1.appendChild(t1);
                             x.append(z1)
                             x.append(z)
                             div6.append(x);
                         })
                         div46.append(div6)
                         div46.append(div4)

                    div.append(div2);
                    div2.append(div3);
                    div2.append(div46);
                   
                    div_khungtong.appendChild(div);
                    div_khungtong.scrollTop = div_khungtong.scrollHeight;   
                } 
                     function nguoigui(id_user,id,tennguoinhan,thoigian,noidung,url){
                         const div_khungtong = document.querySelector('#loadtinnhan_nhom')
                         const div = document.createElement('div');
                         div.id=id_user;
                         div.className=('d-flex justify-content-end mb-10 ');
                         const div2 = document.createElement('div');
                         div2.className = ('d-flex flex-column align-items-end');
                         const div3 = document.createElement('div');
                         div3.className = ('d-flex align-items-center mb-2');
                         const div3_1= document.createElement('div');
                         div3_1.className=('me-3');
                         const div3_1_span= document.createElement('span');
                         div3_1_span.className='text-muted fs-7 mb-1';
                         //cat chuoi thoi gian
                        // var thoigian =data.nguoigui[i].thoigian;
                        // const thoigian1 = thoigian.toString();
                         div3_1_span.textContent= thoigian;
                         const div3_1_a= document.createElement('a');
                         div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                          div3_1_a.textContent=tennguoinhan;
                         div3_1.append(div3_1_span);
                         div3_1.append(div3_1_a); 
                         const div3_2= document.createElement('div');
                         div3_2.className=('symbol symbol-35px symbol-circle');
                          const img = document.createElement('img');
                          img.src= url;
                          div3_2.append(img);
                         div3.append(div3_1);
                         div3.append(div3_2);
                         const div4 = document.createElement('div');
                         div4.id=id;
                         div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end  ');
                         const a = document.createElement('a');
                         a.textContent = noidung;
                         div4.append(a);
                         const div46 = document.createElement('div');
                         div46.className='d-flex align-items-center mb-2 overlay'
                         const div6 = document.createElement('div');
                         const div6_1 = document.createElement('div');
                         div6_1.className='me-3 overlay-layer';
                         div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                         <i class="bi bi-three-dots fs-3"></i>
                     </button>`
                         div6.append(div6_1)
                         div6_1.addEventListener('click', function thuhoi(e){
                             e.preventDefault();
                             var x = document.createElement("SELECT");
                             x.id='mySelect';
                             x.className='overlay-layer';
                             var z = document.createElement("option");
                             z.value='thu hồi'
                             var t = document.createTextNode("Thu hồi");
                             x.addEventListener('click',function thuhoitinnhan(e){
                                 e.preventDefault();
                                 let b= document.querySelector('#mySelect').value;
                                 if(b==='thu hồi'){
                                     const c = document.createElement('a');
                                     c.textContent = `Tin nhắn đã được thu hồi`;
                                     div4.replaceChild(c,a)
                                 }
                                 socket.emit('thuhoigroup',id_user,id);
                             })
                             var z1 = document.createElement("option");
                             var t1 = document.createTextNode("");
                             z1.value='null'
                                z1.selected=true;
                             z.appendChild(t);
                             z1.appendChild(t1);
                             x.append(z1)
                             x.append(z)
                             div6.append(x);
                         })
                         div46.append(div6)
                         div46.append(div4)
                         div.append(div2);
                         div2.append(div3);
                         div2.append(div46);              
                         div_khungtong.appendChild(div);
                         div_khungtong.scrollTop = div_khungtong.scrollHeight;
                     }
                     function nguoinhan(id,tennguoigui,thoigian,noidung,url){
                         const div_khungtong = document.querySelector('#loadtinnhan_nhom')
                         const chatItem = document.createElement('div');
                         chatItem.className=('d-flex justify-content-start mb-10');
                         const chatItem2 = document.createElement('div');
                         chatItem2.className=('d-flex flex-column align-items-start');
                         const ha_ten = document.createElement('div');
                         ha_ten.className=('d-flex align-items-center mb-2');
                         const anh = document.createElement('div');
                         anh.className=('symbol symbol-35px symbol-circle');
                         const img = document.createElement('img');
                         img.src=url;
                         anh.append(img);
                         const tengio = document.createElement('div');
                         tengio.className = ('ms-3');
                         const ten = document.createElement('a');
                         ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                         ten.textContent =tennguoigui;
                         const span = document.createElement('span');
                         span.className=('text-muted fs-7 mb-1');
                         span.textContent=thoigian;
                         tengio.append(ten);
                         tengio.append(span)
                         ha_ten.append(anh);
                         ha_ten.append(tengio);
                         const tinnhan = document.createElement('div')
                         tinnhan.id=id
                         tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                         const tin = document.createElement('a');
                         chatItem.append(chatItem2);
                         chatItem2.append(ha_ten);
                         chatItem2.append(tinnhan);
                         tinnhan.append(tin);
                         tin.textContent = noidung;
                         div_khungtong.appendChild(chatItem);
                         // scroll down
                         div_khungtong.scrollTop = div_khungtong.scrollHeight;
                         socket.on('thuhoigroup',data=>{
                            if(data===id){
                               const c = document.createElement('a');
                               c.textContent = `Tin nhắn đã được thu hồi`;
                               tinnhan.replaceChild(c,tin)
                            }
                        })
                     }
                     function nguoiguifilegroup(tengroup,idthoigiangroup,tennguoinhan,thoigian,noidung,url,link,tendownload){
                        const div_khungtong = document.querySelector('#loadtinnhan_nhom')
                        const div = document.createElement('div');
                        div.id=tengroup
                        div.className=('d-flex justify-content-end mb-10');
                        const div2 = document.createElement('div');
                        div2.className = ('d-flex flex-column align-items-end');
                        const div3 = document.createElement('div');
                        div3.className = ('d-flex align-items-center mb-2');
                        const div3_1= document.createElement('div');
                        div3_1.className=('me-3');
                        const div3_1_span= document.createElement('span');
                        div3_1_span.className='text-muted fs-7 mb-1';
                        //cat chuoi thoi gian
                       // var thoigian =data.nguoigui[i].thoigian;
                       // const thoigian1 = thoigian.toString();
                        div3_1_span.textContent= thoigian;
                        const div3_1_a= document.createElement('a');
                        div3_1_a.className=('fs-5 fw-bolder text-gray-900 text-hover-primary ms-1');
                         div3_1_a.textContent=tennguoinhan;
                        div3_1.append(div3_1_span);
                        div3_1.append(div3_1_a); 
                        const div3_2= document.createElement('div');
                        div3_2.className=('symbol symbol-35px symbol-circle');
                         const img = document.createElement('img');
                         img.src= url;
                         div3_2.append(img);
                        div3.append(div3_1);
                        div3.append(div3_2);
                        const div4 = document.createElement('div');
                        div4.id=idthoigiangroup
                        div4.className=('p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end');
                        const a = document.createElement('a');
                        a.href=link;
                        a.download=tendownload;
                        div4.append(a);
                        const div46 = document.createElement('div');
                        div46.className='d-flex align-items-center mb-2 overlay'
                        const div6 = document.createElement('div');
                        const div6_1 = document.createElement('div');
                        div6_1.className='me-3 overlay-layer';
                        div6_1.innerHTML=`<button class="btn btn-sm btn-icon  btn-bg-light btn-active-color-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                        <i class="bi bi-three-dots fs-3"></i>
                    </button>`
                        div6.append(div6_1)
                        div6_1.addEventListener('click', function thuhoi(e){
                            e.preventDefault();
                            var x = document.createElement("SELECT");
                            x.id='mySelect';
                            x.className='overlay-layer';
                            var z = document.createElement("option");
                            z.value='thu hồi'
                            var t = document.createTextNode("Thu hồi");
                            x.addEventListener('click',function thuhoitinnhan(e){
                                e.preventDefault();
                                let b= document.querySelector('#mySelect').value;
                                if(b==='thu hồi'){
                                    const c = document.createElement('a');
                                    c.textContent = `Tin nhắn đã được thu hồi`;
                                    div4.replaceChild(c,a)
                                }
                                socket.emit('thuhoifilegroup',tengroup,idthoigiangroup);
                            })
                            var z1 = document.createElement("option");
                            var t1 = document.createTextNode("");
                            z1.value='null'
                             z1.selected=true;
                        
                            z.appendChild(t);
                            z1.appendChild(t1);
                            x.append(z1)
                            x.append(z)
                            div6.append(x);
                        })
                        div46.append(div6)
                        div46.append(div4)

                        div.append(div2);
                        div2.append(div3);
                        div2.append(div46);
                       
                        a.textContent = noidung;
                        div_khungtong.appendChild(div);
                        div_khungtong.scrollTop = div_khungtong.scrollHeight;
                    }
                    function nguoinhanfilegroup(idthoigian,tennguoigui,thoigian,noidung,url,linktai,tendownload){
                        const div_khungtong = document.querySelector('#loadtinnhan_nhom')
                        const chatItem = document.createElement('div');
                        chatItem.className=('d-flex justify-content-start mb-10');
                        const chatItem2 = document.createElement('div');
                        chatItem2.className=('d-flex flex-column align-items-start');
                        const ha_ten = document.createElement('div');
                        ha_ten.className=('d-flex align-items-center mb-2');
                        const anh = document.createElement('div');
                        anh.className=('symbol symbol-35px symbol-circle');
                        const img = document.createElement('img');
                        img.src=url;
                        anh.append(img);
                        const tengio = document.createElement('div');
                        tengio.className = ('ms-3');
                        const ten = document.createElement('a');
                        ten.className= ('fs-5 fw-bolder text-gray-900 text-hover-primary me-1')
                        ten.textContent =tennguoigui;
                        const span = document.createElement('span');
                        span.className=('text-muted fs-7 mb-1');
                        span.textContent=thoigian;
                        tengio.append(ten);
                        tengio.append(span)
                        ha_ten.append(anh);
                        ha_ten.append(tengio);
                        const tinnhan = document.createElement('div')
                        tinnhan.id=idthoigian
                        tinnhan.className=('p-5 rounded bg-light-info text-dark fw-bold mw-lg-400px text-start');
                        const tin = document.createElement('a');
                        tin.href=linktai;
                        tin.download=tendownload;
                        chatItem.append(chatItem2);
                        chatItem2.append(ha_ten);
                        chatItem2.append(tinnhan);
                        tinnhan.append(tin);
                        tin.textContent = noidung;
                        div_khungtong.appendChild(chatItem);
                        // scroll down
                        div_khungtong.scrollTop = div_khungtong.scrollHeight;
                        socket.on('thuhoifilegroup',data=>{
                            if(data===idthoigian){
                               const c = document.createElement('a');
                               c.textContent = `Tin nhắn đã được thu hồi`;
                               tinnhan.replaceChild(c,tin)
                            }
                        })   
                    }

                     socket.on("chatgroup",data=>{
                        console.log(data);
                        nguoinhan(data.thoigian_database,data.ten_nguoigui,data.thoigian_hienthi,data.tinnhan,data.url);
                    })
                    socket.on("guianh_group",data=>{
                      //console.log(data);
                      nguoinhanhinhanhgroup(data.thoigian_database,data.ten_nguoigui,data.thoigian_hienthi,data.base64,data.url);
                     })
                     socket.on("guifilegroup",data=>{
                        //console.log(data);
                        nguoinhanfilegroup(data.thoigian_database,data.ten_nguoigui,data.thoigian_hienthi,data.tenfile,data.url,data.file,data.tenfile);
                       })
                       socket.on("guivideogroup",data=>{
                        //console.log(data);
                        nguoinhanvideogroup(data.thoigian_database,data.ten_nguoigui,data.thoigian_hienthi,data.video,data.url,data.style);
                       })
                      
                 }
                  
            }  
           
        }
    })  
})
//timkiembanchat
$(function(){
    $(document).ready(function(){
        $("#timbanchat").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#kt_chat_contacts_body >div ").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
          $("#kt_chat_contacts_body_group >div ").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
})
//timkiemchothembanbe
$(function(){
    $(document).ready(function(){
        $("#timkiem_enter1").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#dsbanchuathemgroup > a").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });   
        });

      });
})
//timkiemchokichbanbe
$(function(){
    $(document).ready(function(){
        $("#timkiemnguoikich").on("keyup", function() {
          var value = $(this).val().toLowerCase();
          $("#dsbanmuonkich > a").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });   
        });
      });
})
$(function(){
    $(document).ready(function(){
        $("#timbanaddgroup").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#form_ds_group > div").each(function() {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });   
          });
      });
})
