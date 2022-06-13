$(document).ready(function () {
    // iconos cabecera
   

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
            $("#contenedor-post").append(`<div class="row">
    <div class="col-md-2">
      <img class="img-miniatura-perfil-post" src="./img/userPic.png">
    </div>
    <div class="col-md-10">
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
            $(`#usuario-post-span${idPost}`).html(respuesta.datos[index].owner.username.toString());
            $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos[index].owner.profileType.toString());
            $(`#hora-post-span${idPost}`).html(respuesta.datos[index].createdAt.toString());
            $(`#descripcion-post-span${idPost}`).html(respuesta.datos[index].text.toString());
            $(`#imagen-post-span${idPost}`).html(respuesta.datos[index].multimedia);
            // console.log(respuesta.datos[index].createdAt.toString());

        }
        console.log(respuesta);
}

function peticionPosts() {
    $.ajax({
        url: 'https://eteamapp.herokuapp.com/api/posts',
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
    <div class="col-md-2">
        <img class="img-miniatura-perfil-post" src="./img/userPic.png">
    </div>
    <div class="col-md-10 ">
        <span class="post-usuario-dato">@<span id="usuario-post-span${idPost}"></span></span><br>
        <span class="post-fecha-hora"><span id="email-span${idPost}"></span></span>
    </div>
    </div>


    </div>
    <div class="row barraNegra">`)
        $(`#usuario-post-span${idPost}`).html(respuesta.datos[index].username.toString());
        $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos[index].profileType.toString());
        $(`#email-span${idPost}`).html(respuesta.datos[index].email.toString());
        // $(`#descripcion-user-span${idPost}`).html(respuesta.datos[index].description);

    }
    console.log(respuesta);

}
function peticionUsers() {
    $.ajax({
        url: 'https://eteamapp.herokuapp.com/api/users',
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
            url: 'https://eteamapp.herokuapp.com/api/posts?buscar=' + valorBusqueda,
            type: 'GET',
            success: function (respuesta) {
                for (let index = 0; index < respuesta.datos.length; index++) {
                    let idPost = respuesta.datos[index]._id;
                    $("#contenedor-post").append(`<div class="row">
              <div class="col-md-2">
                  <img class="img-miniatura-perfil-post" src="./img/userPic.png">
              </div>
              <div class="col-md-10">
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
            url: 'https://eteamapp.herokuapp.com/api/users?buscar=' + valorBusqueda,
            type: 'GET',
            success: function (respuesta) {
                for (let index = 0; index < respuesta.datos.length; index++) {
                    let idPost = respuesta.datos[index]._id;
                    $("#contenedor-post").append(`<div class="row">
              <div class="col-md-2">
                  <img class="img-miniatura-perfil-post" src="./img/userPic.png">
              </div>
              <div class="col-md-10">
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
