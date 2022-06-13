$(document).ready(function () {
   
    $.ajax({
      url: 'http://localhost:8800/api/users/629923ac84944079440d54e0',
      type: 'GET',
      success: function (respuesta) {
      
        console.log("respuesta %o",respuesta)
        
        let theNotif = respuesta.datos.theNotifications;
        console.log("theNotif %o",theNotif)
        for (let index = 0; index < respuesta.datos.theNotifications.length; index++) {
            let idNotification = respuesta.datos.theNotifications[index]._id;
            console.log("idNotification %o",idNotification);

            let typeNotification = respuesta.datos.theNotifications[index].type;
            console.log(typeNotification);
           
                $.ajax({
                  url: 'http://localhost:8800/api/notifications/'+idNotification,
                  type: 'GET',
                  success: function (respuesta2) {
                    console.log("respuesta2 %o", respuesta2)

                    let userName;
                    let textoComentario;
                    let fecha;
                    let hora;
                    let imgPerfil;
                    let read;
                    let id;
                    
                    switch(typeNotification){
                        case "follow":
                            imgPerfil=respuesta2.datos.trasmitter.profileImg
                            userName= respuesta2.datos.trasmitter.username;
                            fecha=respuesta2.datos.createdAt.toString();
                            fecha=fecha.split("T");
                            hora=fecha[1].split(".");
                            read=respuesta2.datos.read;
                            id=respuesta2.datos._id;

                            $(".datos-perfil").append(`
                            <div class="row align-items-center contenedor-notificacion ${read} id="${id}">
                                <div class="col-md-2 contenedor-imgen id=">
                                    <img class="img-miniatura-perfil-post" src="${imgPerfil}">
                                </div>
                                <div class="col-md-9 contenedor-contenido">
                                    <span class="post-usuario-dato">@<span id="usuario-post-span">${userName}</span></span><br>
                                    <span id="texto-notificacion"> Te ha empezado a seguir</span><br>
                                    <span class="post-fecha-hora"><span id="hora-post-span">${fecha[0]} a las ${hora[0]}</span></span>
                                    
                                </div>
                                <div class="contenedor-marca col-1">
                                    <span>◦</span>
                                </div>

                            </div>
                            <hr>`)
            
                        break;
                        case "saved":
                            imgPerfil=respuesta2.datos.trasmitter.profileImg
                            userName= respuesta2.datos.trasmitter.username;
                            fecha=respuesta2.datos.createdAt.toString();
                            fecha=fecha.split("T");
                            hora=fecha[1].split(".");

                            $(".datos-perfil").append(`
                            <div class="row align-items-center contenedor-notificacion ${read} id="${id}">
                                <div class="col-md-2 contenedor-imgen">
                                    <img class="img-miniatura-perfil-post" src="${imgPerfil}">
                                </div>
                                <div class="col-md-10 contenedor-contenido">
                                    <span class="post-usuario-dato">@<span id="usuario-post-span">${userName}</span></span><br>
                                    <span id="texto-notificacion"> Ha guardado tu post</span><br>
                                    <span class="post-fecha-hora"><span id="hora-post-span">${fecha[0]} a las ${hora[0]}</span></span>
                                </div>
                            </div>
                            <hr>`)
                            break;
                        case "shared":
                            imgPerfil=respuesta2.datos.trasmitter.profileImg
                            userName= respuesta2.datos.trasmitter.username;
                            fecha=respuesta2.datos.createdAt.toString();
                            fecha=fecha.split("T");
                            hora=fecha[1].split(".");
                            $(".datos-perfil").append(`
                            <div class="row align-items-center contenedor-notificacion ${read} id="${id}">
                                <div class="col-md-2 contenedor-imgen">
                                    <img class="img-miniatura-perfil-post" src="${imgPerfil}">
                                </div>
                                <div class="col-md-10 contenedor-contenido">
                                    <span class="post-usuario-dato">@<span id="usuario-post-span">${userName}</span></span><br>
                                    <span id="texto-notificacion"> Ha compartido un post tuyo</span><br>
                                    <span class="post-fecha-hora"><span id="hora-post-span">${fecha[0]} a las ${hora[0]}</span></span>
                                </div>
                                <div class="contenedor-marca col-1">
                                    <span>◦</span>
                                </div>
                            </div>
                            <hr>`)
                            break;
                        case "comment":
                            imgPerfil=respuesta2.datos.trasmitter.profileImg
                            userName= respuesta2.datos.trasmitter.username;
                            fecha=respuesta2.datos.createdAt.toString();
                            fecha=fecha.split("T");
                            hora=fecha[1].split(".");

                            $(".datos-perfil").append(`
                            <div class="row align-items-center contenedor-notificacion ${read} id="${id}">
                                <div class="col-md-2 contenedor-imgen">
                                    <img class="img-miniatura-perfil-post" src="${imgPerfil}">
                                </div>
                                <div class="col-md-10 contenedor-contenido">
                                    <span class="post-usuario-dato">@<span id="usuario-post-span">${userName}</span></span><br>
                                    <span id="texto-notificacion"> Te ha escrito el siguiente comentario: ${textoComentario}</span><br>
                                    <span class="post-fecha-hora"><span id="hora-post-span">${fecha[0]} a las ${hora[0]}</span></span>
                                </div>
                                <div class="contenedor-marca col-1">
                                    <span>◦</span>
                                </div>
                            </div>
                            <hr>`)
                            break;
                        case "member":
                            imgPerfil=respuesta2.datos.trasmitter.profileImg
                            userName= respuesta2.datos.trasmitter.username;
                            fecha=respuesta2.datos.createdAt.toString();
                            fecha=fecha.split("T");
                            hora=fecha[1].split(".");
                            $(".datos-perfil").append(`
                            <div class="row align-items-center contenedor-notificacion ${read} id="${id}">
                                <div class="col-md-2 contenedor-imgen">
                                    <img class="img-miniatura-perfil-post" src="${imgPerfil}">
                                </div>
                                <div class="col-md-10 contenedor-contenido">
                                    <span class="post-usuario-dato">@<span id="usuario-post-span">${userName}</span></span><br>
                                    <span id="texto-notificacion">Te ha añadido al equipo</span><br>
                                    <span class="post-fecha-hora"><span id="hora-post-span">${fecha[0]} a las ${hora[0]}</span></span>
                                </div>
                                <div class="contenedor-marca col-1">
                                    <span>◦</span>
                                </div>
                            </div>
                            <hr>`)
                            break;
                        case "team":
                            break;
                      }

                  }
                })
        }
      },
      error: function () {
        console.error("No es posible completar la operación");
      }
     }).done(function(){
        $(".contenedor-notificacion").click(function() {
                console.log("entra en al click")
                // let idNotification=e.target.id
                // $.ajax({
                //     url: 'http://localhost:8800/api/notifications/'+idNotification,
                //     type: 'PUT',
                //     success: function (respuesta) {
                //         console.log("cambiarLaiida %o", respuesta)
                //     }
                // })
            })
     });
    //  marcar como leidas

    // $("div.contenedor-notificacion").click(function() {
    //     console.log("entra en al click")
    //     // let idNotification=e.target.id
    //     // $.ajax({
    //     //     url: 'http://localhost:8800/api/notifications/'+idNotification,
    //     //     type: 'PUT',
    //     //     success: function (respuesta) {
    //     //         console.log("cambiarLaiida %o", respuesta)
    //     //     }
    //     // })
    // })


     } )



  