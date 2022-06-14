$(document).ready(function () {
    let idInicioSesion = sessionStorage.getItem('idInicioSesion');
    let servidor = "http://localhost:8800/api/"
    $.ajax({
        url: servidor + 'users/' + idInicioSesion,
        type: 'GET',
        success: function (respuesta) {
            //carga de datos de desplegable de configuracion del perfil
            $("#img-desplegable-perfil").attr('src',   `data:image/png;base64,${toBase64(respuesta.datos.profileImg.img.data.data)}`)
            $("#usuario-tablon-span-miniatura").html(respuesta.datos.username.toString());
        }})

    //funcion para convertir el buffer de las imagenes a base64
    function toBase64(arr) {
        return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }

    $("#icono-perfil-boton").click(function () {
        if ($(".desplegable-perfil").css("display") == "none") {
          $(".desplegable-perfil").show()
        } else {
          $(".desplegable-perfil").hide()
        }
      })

    jQuery('#contenedor-post').empty();
    peticionPosts();
     peticionUsers();
    $("#boton-clasificador-todo").on("click", function () {
        $('#boton-clasificador-posts').removeClass('clasificacion-aceptada');
        $('#boton-clasificador-users').removeClass('clasificacion-aceptada');
        $('#boton-clasificador-todo').addClass('clasificacion-aceptada');
        jQuery('#contenedor-post').empty();
        peticionPosts();
        peticionUsers();
    });
    $("#boton-clasificador-posts").on("click", function () {
        $('#boton-clasificador-todo').removeClass('clasificacion-aceptada');
        $('#boton-clasificador-users').removeClass('clasificacion-aceptada');
        $('#boton-clasificador-posts').addClass('clasificacion-aceptada');
        	
        jQuery('#contenedor-post').empty();
        peticionPosts();
    });
    $("#boton-clasificador-users").on("click", function () {
        $('#boton-clasificador-posts').removeClass('clasificacion-aceptada');
        $('#boton-clasificador-todo').removeClass('clasificacion-aceptada');
        $('#boton-clasificador-users').addClass('clasificacion-aceptada');
        jQuery('#contenedor-post').empty();
        peticionUsers();
    });

    $("#boton-busqueda").on("click", function () {
        var botonTodo = document.getElementById("boton-clasificador-todo");
        var botonPosts = document.getElementById("boton-clasificador-posts");
        var botonUsers = document.getElementById("boton-clasificador-users");
        if ((botonTodo.classList.contains( 'clasificacion-aceptada' ))|| (botonPosts.classList.contains( 'clasificacion-aceptada' ))||(botonUsers.classList.contains( 'clasificacion-aceptada' ))){
            if (botonTodo.classList.contains( 'clasificacion-aceptada' )){
                console.log("Estas buscando en TODO");
    
                buscarPost();
                buscarUser();
            }else{
                if (botonPosts.classList.contains( 'clasificacion-aceptada' )){
                    console.log("Estas buscando en POSTS");
    
                    buscarPost();
    
                }else{
                    if (botonUsers.classList.contains( 'clasificacion-aceptada' )){
                        console.log("Estas buscando en USUARIOS");
    
                        buscarUser();
                    }
    
                }
    
            }
        }else{
            jQuery('#contenedor-post').empty();
            $("#contenedor-post").append(`<div class="row"><div class="col-12">No se ha podido realizar la busqueda</div><div class="col-12">Compruebe que la búsqueda y los filtros son correctos.</div></div>`);
            console.log('no se puedo buscar maquina');
        }
        
     
    });
    

})

function pintarPeticionPosts(respuesta) {
        for (let index = 0; index < respuesta.datos.length; index++) {

            let idPost = respuesta.datos[index]._id;    
            console.log("respuesta %o",respuesta);
            $("#contenedor-post").append(`<div class="row">
    <div class="col-md-1">
      <img class="img-miniatura-perfil-post" id="img-miniatura-perfil-post${idPost}">
    </div>
    <div class="col-md-11">
      <span class="post-usuario-dato">@<span id="usuario-post-span${idPost}"></span></span><br>
      <span class="post-usuario-dato"><span id="descripcion-usuario-post-span${idPost}"></span></span><br>
      <span class="post-fecha-hora"><span id="hora-post-span${idPost}"></span></span>
    </div>
    </div>
    <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-10 post-contenido">
      <span id="descripcion-post-span${idPost}"></span><br>
      <span id="imagen-post-span${idPost}"></span>
    </div>
    <div class="col-md-1"></div>
    </div>
    <div class="row">
    <div class="col-md-2 post-boton">
      <button class="boton-icono icono-xs">
          <i class="fi fi-rr-redo align-middle"></i>
          <span class="numero-interacciones">${respuesta.datos[index].theResent.length}</span>
      </button>
    </div>
    <div class="col-md-2 post-boton">
      <button class="boton-icono icono-xs">
          <i class="fi fi-rr-heart align-middle"></i>
          <span class="numero-interacciones">${respuesta.datos[index].theLikes.length}</span>
      </button>
    </div>
    <div class="col-md-2 post-boton">
      <button class="boton-icono icono-xs " >
          <i class="fi fi-rr-comment align-middle"></i>
          <span class="numero-interacciones">${respuesta.datos[index].theComments.length}</span>
      </button>
    </div>
    <div class="col-md-2 post-boton">
      <button class="boton-icono icono-xs">
          <i class="fi fi-rr-share align-middle"></i>
          <span class="numero-interacciones">${respuesta.datos[index].theShared.length}</span>
      </button>
    </div>
    <div class="col-md-2 post-boton">
      <button class=" boton-icono icono-xs ">
          <i class="fi fi-rr-bookmark align-middle"></i>
          <span class="numero-interacciones">${respuesta.datos[index].theSaved.length}</span>
      </button>
    </div>
    <div class="col-md-2 post-boton">
      <button class="boton-icono icono-xs">
          <i class="fi fi-rr-menu-dots-vertical align-middle"></i>
          <span class="numero-interacciones "></span>
    </button>
    </div>
    </div>
    <div class="row barraNegra">`)
    $.ajax({
        url: 'http://localhost:8800/api/users/'+respuesta.datos[index].owner._id,
        type: 'GET',
        success: function (respuestaOwner) {
            console.log('respuesta Imagen %o', respuestaOwner);
            $(`#img-miniatura-perfil-post${idPost}`).attr('src', `data:image/png;base64,${toBase64(respuestaOwner.datos.profileImg.img.data.data)}`);
            
        },
        error: function () {
            console.error("No se puede");
        }
    });
    
    
            $(`#usuario-post-span${idPost}`).html(respuesta.datos[index].owner.username);
            $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos[index].owner.profileType);
            $(`#hora-post-span${idPost}`).html(respuesta.datos[index].createdAt.toString());
            $(`#descripcion-post-span${idPost}`).html(respuesta.datos[index].text.toString());
            $(`#imagen-post-span${idPost}`).html(respuesta.datos[index].multimedia);
            // console.log(respuesta.datos[index].createdAt.toString());

        }
        console.log("respuesta %o",respuesta);
}

function peticionPosts() {
    $.ajax({
        url: 'http://localhost:8800/api/posts',
        type: 'GET',
        success: function (respuesta) {

            pintarPeticionPosts(respuesta);

        },
        error: function () {
            console.error("No se puede");
        }
    });
}

function pintarPeticionUsers(respuesta) {
    // $("#contenedor-comentarios").empty();
    // $("#contenedor-posts").remove();
    // location.reload();
    for (let index = 0; index < respuesta.datos.length; index++) {
        
        let idPost = respuesta.datos[index]._id;
        $("#contenedor-post").append(`<div class="row">
    <div class="col-md-1">
        <img class="img-miniatura-perfil-post" id="img-miniatura-perfil-post${idPost}">
    </div>
    <div class="col-md-11 ">
        <span class="post-usuario-dato">@<span id="usuario-post-span${idPost}"></span></span><br>
        <span class="post-fecha-hora"><span id="email-span${idPost}"></span></span>
    </div>
    </div>


    </div>
    <div class="row barraNegra">`)
    $.ajax({
        url: 'http://localhost:8800/api/users/'+respuesta.datos[index]._id,

        type: 'GET',
        success: function (respuestaOwner) {
            console.log('respuesta Imagen Usuario %o', respuestaOwner);
            $(`#img-miniatura-perfil-post${idPost}`).attr('src', `data:image/png;base64,${toBase64(respuestaOwner.datos.profileImg.img.data.data)}`);
            
        },
        error: function () {
            console.error("No se puede");
        }
    });
        $(`#usuario-post-span${idPost}`).html(respuesta.datos[index].username.toString());
        $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos[index].profileType.toString());
        $(`#email-span${idPost}`).html(respuesta.datos[index].email.toString());
        // $(`#descripcion-user-span${idPost}`).html(respuesta.datos[index].description);

    }
    console.log(respuesta);

}
function peticionUsers() {
    $.ajax({
        url: 'http://localhost:8800/api/users',
        type: 'GET',
        success: function (respuesta) {
            pintarPeticionUsers(respuesta);
        },
        error: function () {
            console.error("No se puede");
        }

    });
}



function buscarPost() {
    $("#boton-busqueda").on("click", function () {
        jQuery('#contenedor-post').empty();
        
        let valorBusqueda = document.getElementById("busqueda").value;
        console.log(valorBusqueda);
        $.ajax({
            url: 'http://localhost:8800/api/posts/?buscar=' + valorBusqueda,
            type: 'GET',
            success: function (respuesta) {
                for (let index = 0; index < respuesta.datos.length; index++) {
                    let idPost = respuesta.datos[index]._id;
                    $("#contenedor-post").append(`<div class="row">
              <div class="col-md-1">
                  <img class="img-miniatura-perfil-post" id="img-miniatura-perfil-post${idPost}">
              </div>
              <div class="col-md-11">
                  <span class="post-usuario-dato">@<span id="usuario-post-span${idPost}"></span></span><br>
                  <span class="post-usuario-dato"><span id="descripcion-usuario-post-span${idPost}"></span></span><br>
                  <span class="post-fecha-hora"><span id="hora-post-span${idPost}"></span></span>
              </div>
          </div>
          <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10 post-contenido">
                  <span id="descripcion-post-span${idPost}"></span><br>
                  <span id="imagen-post-span${idPost}"></span>
              </div>
              <div class="col-md-1"></div>
          </div>
          <div class="row">
              <div class="col-md-2 post-boton">
                  <button class="boton-icono icono-xs">
                      <i class="fi fi-rr-redo align-middle"></i>
                      <span class="numero-interacciones">${respuesta.datos[index].theResent.length}</span>
                  </button>
              </div>
              <div class="col-md-2 post-boton">
                  <button class="boton-icono icono-xs">
                      <i class="fi fi-rr-heart align-middle"></i>
                      <span class="numero-interacciones">${respuesta.datos[index].theLikes.length}</span>
                  </button>
              </div>
              <div class="col-md-2 post-boton">
                  <button class="boton-icono icono-xs " >
                      <i class="fi fi-rr-comment align-middle"></i>
                      <span class="numero-interacciones">${respuesta.datos[index].theComments.length}</span>
                  </button>
              </div>
              <div class="col-md-2 post-boton">
                  <button class="boton-icono icono-xs">
                      <i class="fi fi-rr-share align-middle"></i>
                      <span class="numero-interacciones">${respuesta.datos[index].theShared.length}</span>
                  </button>
              </div>
              <div class="col-md-2 post-boton">
                  <button class=" boton-icono icono-xs ">
                      <i class="fi fi-rr-bookmark align-middle"></i>
                      <span class="numero-interacciones">${respuesta.datos[index].theSaved.length}</span>
                  </button>
              </div>
              <div class="col-md-2 post-boton">
                  <button class="boton-icono icono-xs">
                      <i class="fi fi-rr-menu-dots-vertical align-middle"></i>
                      <span class="numero-interacciones "></span>
              </button>
              </div>
          </div>
          <div class="row barraNegra">`)
          $.ajax({
            url: 'http://localhost:8800/api/users/'+respuesta.datos[index].owner._id,
            type: 'GET',
            success: function (respuestaOwner) {
                console.log('respuesta Imagen busqueda %o', respuestaOwner);
                $(`#img-miniatura-perfil-post${idPost}`).attr('src', `data:image/png;base64,${toBase64(respuestaOwner.datos.profileImg.img.data.data)}`);
                
            },
            error: function () {
                console.error("No se puede");
            }
        });
                    $(`#usuario-post-span${idPost}`).html(respuesta.datos[index].owner.username.toString());
                    $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos[index].owner.profileType.toString());
                    $(`#hora-post-span${idPost}`).html(respuesta.datos[index].createdAt.toString());
                    $(`#descripcion-post-span${idPost}`).html(respuesta.datos[index].text.toString());
                    $(`#imagen-post-span${idPost}`).html(respuesta.datos[index].multimedia);
                    // console.log(respuesta.datos[index].createdAt.toString());

                }
                console.log(respuesta);
            },
            error: function () {
                console.error("No se puede");
            }
        });


    });
}
function buscarUser() {
    $("#boton-busqueda").on("click", function () {
        jQuery('#contenedor-post').empty();
        let valorBusqueda = document.getElementById("busqueda").value;
        console.log(valorBusqueda);
        $.ajax({
            url: 'http://localhost:8800/api/users/?buscar=' + valorBusqueda,
            type: 'GET',
            success: function (respuesta) {
                for (let index = 0; index < respuesta.datos.length; index++) {
                    let idPost = respuesta.datos[index]._id;
                    $("#contenedor-post").append(`<div class="row">
              <div class="col-md-1">
                  <img class="img-miniatura-perfil-post" id="img-miniatura-perfil-post${idPost}">
              </div>
              <div class="col-md-11">
                  <span class="post-usuario-dato">@<span id="usuario-post-span${idPost}"></span></span><br>   
                  <span class="post-fecha-hora"><span id="email-span${idPost}"></span></span>
              </div>
          </div>
          <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-10 post-contenido">
                  <span id="descripcion-user-span${idPost}"></span><br>
              </div>
              <div class="col-md-1"></div>
          </div>
          
          </div>
          <div class="row barraNegra">`)
          $.ajax({
            url: 'http://localhost:8800/api/users/'+respuesta.datos[index]._id,
    
            type: 'GET',
            success: function (respuestaOwner) {
                console.log('respuesta Imagen Usuario %o', respuestaOwner);
                $(`#img-miniatura-perfil-post${idPost}`).attr('src', `data:image/png;base64,${toBase64(respuestaOwner.datos.profileImg.img.data.data)}`);
                
            },
            error: function () {
                console.error("No se puede");
            }
        });
                    $(`#usuario-post-span${idPost}`).html(respuesta.datos[index].username.toString());
                    $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos[index].profileType.toString());
                    $(`#email-span${idPost}`).html(respuesta.datos[index].email.toString());
                    // $(`#descripcion-user-span${idPost}`).html(respuesta.datos[index].description);

                }
                console.log(respuesta);
            },
            error: function () {
                console.error("No se puede");
            }
        });


    });
}

function toBase64(arr) {

    return btoa(
    
    arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    
    );
    
    }