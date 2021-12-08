
$(function(){
    const dongy = document.querySelector('#kt');
    dongy.addEventListener('click',(e)=>{
        e.preventDefault();
        const tentk = document.querySelector('#tentk').value;
        const sdt = document.querySelector('#sdt').value;
        const email = document.querySelector('#email').value;
        const file = document.querySelector('#file').files[0];
        console.log(file);
        const reader = new FileReader();
        reader.onload=function (e){
            const thongtin={
                tentk:tentk,
                sdt:sdt,
                email:email,
                anh:e.target.result
            }
            console.log(thongtin);
            $.ajax({
                url:'/capnhatanh',
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
 
        reader.readAsDataURL(file);
        
    })
   
})
