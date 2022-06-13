$(function(){
    $.validator.addMethod("pwcheck", function (value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[A-Z]/.test(value);
    });

    $("#registrate").on("click", function(){
        $("#formularioRegistro").validate({
                rules:{
                    username:{required:true},
                    politica:{required:true},
                    email: {
                        required: true,
                        email: true
                      },
                      password: {required:true, pwcheck:true},
                      repeatPassword: {
                        equalTo: "#password"
                      }
                  
                },
                messages:
                {
                    username:{required:'El campo es requerido'},
                    politica:{required:'Debe aceptar la política de privacidad'},
                    email:{required:'El campo es requerido', email:'Debe introducir un email'},
                    password:{required:'Introduce una contraseña', pwcheck:'Formato incorrecto'},
                    repeatPassword:{equalTo:'No coinciden las contraseñas'}
                },
                submitHandler: function(){
                    window.location.href='./login.html';
                }
            });
        
    });

    $("#logo").on("click", function() {
        window.location.href='./login.html';
      });
      
    
});
