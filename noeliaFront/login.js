$(function(){
   
    $("#entrar").on("click", function(e){
        $("#formularioInicio").validate({
                rules:{
                    email:{required:true},
                    password:{required:true}
                },
                messages:
                {
                    email:{required:'El campo es requerido'},
                    password:{required:'Introduce una contraseña'}
                 },
                // submitHandler: function(){
                   
                // setTimeout( function() { window.location.href = "#"; }, 5000 );
                // }
            });
            
    });

    $("#entrar").on("click", function(e){
        var valorEmail = document.getElementById("email").value;
        var valorPassword = document.getElementById("password").value;
        $.ajax({
            url: 'http://localhost:8800/api/auth/login',
            'data': JSON.stringify({
                email: valorEmail,
                password: valorPassword
              }),
            type: 'POST',
            success: function (respuesta) {
                sessionStorage.getItem("idInicioSesion");    
            },
            error: function () {
                console.error("No se puede");
            }
        });
        
        
    });
    

    $("#registrate").on("click", function() {
        window.location.href='./pagina-registro.html';
      });
  
      

});
