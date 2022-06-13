let idInicioSesion = "62a702295174230e04ecafe4"
$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:8800/api/users/62a702295174230e04ecafe4',
    type: 'GET',
    success: function (respuesta) {
      //carga de datos del usuario con el que se ha iniciado sesion
      console.log(respuesta)
      // $("#img-eteam").attr("src",respuesta.datos.username);
      // $("#usuario-tablon-span").html(respuesta.datos.username.toString());
      // $("#descripcion-tablon-span").html(respuesta.datos.description.toString());
      // $("#usuario-tablon-span-miniatura").html(respuesta.datos.username.toString());
      // $("#descripcion-tablon-span-miniatura").html(respuesta.datos.description.toString());
      // $("#nombre-tablon-span").html(respuesta.datos.name.toString());
      // $("#apellidos-tablon-span").html(respuesta.datos.secondName.toString());
      // $("#juegos-tablon-span").html(respuesta.datos.games.toString());
      // $("#seguidores-perfil-span").html(respuesta.datos.theFollowers.length);
      // $("#siguiendo-perfil-span").html(respuesta.datos.theFollowing.length);
      var username = respuesta.datos.username;
      var description = respuesta.datos.description;
      var idPost;
      var text;
      var fecha;
      var nLikes = "";
      var nShareds = "";
      var nSaveds = "";
      var nResents = "";
      var nComments = "";
      for (let index = 0; index < respuesta.datos.thePosts.length; index++) {
        idPost = respuesta.datos.thePosts[index].id;
        text = respuesta.datos.thePosts[index].text;
        fecha = respuesta.datos.thePosts[index].createdAt;
        fecha=formatearFecha(fecha, "all")

        $.ajax({
          url: 'http://localhost:8800/api/posts/' + idPost,
          type: 'GET',
          success: function (respuesta2) {
            // console.log("respuesta2 %o", respuesta2)
            nLikes = respuesta2.datos.theLikes.length;
            // console.log()
            nComments = respuesta2.datos.theComments.length;
            nSaveds = respuesta2.datos.theSaved.length;
            nResents = respuesta2.datos.theResent.length;
            nShareds = respuesta2.datos.theShared.length;


            $("#contenedor-post").append(`
              <div class="row contenedor-post" id="${idPost}">
                  <div class="col-md-1">
                      <img class="img-miniatura-perfil-post" src="../../../Downloads/img_perfil.jpeg">
                  </div>
                  <div class="col-md-10">
                      <span class="post-usuario-dato">@<span id="usuario-post-span">${username}</span></span><br>
                      <span class="post-usuario-dato"><span id="descripcion-usuario-post-span">${description}</span></span><br>
                      <span class="post-fecha-hora"><span id="hora-post-span">${fecha}</span></span>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-1"></div>
                  <div class="col-md-11 post-contenido">
                      <span id="descripcion-post-span">${text}</span>
                  </div>
                  <div class="col-md-1"></div>
              </div>
              <div class="row">
                  <div class="col-md-2 post-boton">
                      <button class="boton-icono icono-xs">
                          <i class="fi fi-rr-redo align-middle"></i>
                          <span class="numero-interacciones">${nResents}</span>
                      </button>
                  </div>
                  <div class="col-md-2 post-boton">
                      <button class="boton-icono icono-xs">
                          <i class="fi fi-rr-heart align-middle"></i>
                          <span class="numero-interacciones">${nLikes}</span>
                      </button>
                  </div>
                  <div class="col-md-2 post-boton">
                      <button class="boton-icono comentarios icono-xs " >
                          <i class="fi fi-rr-comment align-middle"></i>
                          <span class="numero-interacciones">${nComments}</span>
                      </button>
                  </div>
                  <div class="col-md-2 post-boton">
                      <button class="boton-icono icono-xs">
                          <i class="fi fi-rr-share align-middle"></i>
                          <span class="numero-interacciones">${nShareds}</span>
                      </button>
                  </div>
                  <div class="col-md-2 post-boton">
                      <button class=" boton-icono icono-xs ">
                          <i class="fi fi-rr-bookmark align-middle"></i>
                          <span class="numero-interacciones">${nSaveds}</span>
                      </button>
                  </div>
                  <div class="col-md-2 post-boton">
                      <button class="boton-icono icono-xs">
                          <i class="fi fi-rr-menu-dots-vertical align-middle"></i>
                  </button>
                  </div>
              </div>
              <div class="row barraNegra">`)
            // $(`#usuario-post-span${idPost}`).html(respuesta.datos.thePosts[index].owner.toString());
            // $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos.thePosts[index].owner.toString());
            // $(`#hora-post-span${idPost}`).html(respuesta.datos.thePosts[index].createdAt.toString());
            // $(`#descripcion-post-span${idPost}`).html(respuesta.datos.thePosts[index].text.toString());
          }
        })
      }
    },
   
    error: function () {
      console.error("No es posible completar la operación");
    },
    complete : function(xhr, status) {
      $(".comentarios").on("click", ".comentarios", function(){
        console.log("hola")
      })
  }
  });
  // conexion API

})




imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {
    blah.src = URL.createObjectURL(file)
    $("#imagen-cargada").show()
    $("#imagen-cargada").attr("src", blah.src)
  }
}

$(document).ready(function () {

  var margin = 10,
    instance1 = new emojiButtonList("boton-emoji", {
      dropDownXAlign: "left",
      textBoxID: "boton-emoji1",
      yAlignMargin: margin,
      xAlignMargin: margin
    });

  function emojiClickEvent(emojiText) {
    document.title += " " + emojiText;
  }
 
})


$(document).ready(function () {
  if ($("#imagen-cargada").attr("src") == "") {
    $("#imagen-cargada").hide()
  }
  $("#contenedor-comentarios").show();
  $("#contenedor-fotos-videos").hide();
  $("#contenedor-destacados").hide();

  $("#seccion-comentarios").click(function () {
    $("#contenedor-comentarios").show();
    $("#contenedor-fotos-videos").hide();
    $("#contenedor-destacados").hide();

  });

  $("#seccion-fotos-videos").click(function () {
    $("#contenedor-comentarios").hide();
    $("#contenedor-fotos-videos").show();
    $("#contenedor-destacados").hide();

  });

  $("#seccion-destacados").click(function () {
    $("#contenedor-comentarios").hide();
    $("#contenedor-fotos-videos").hide();
    $("#contenedor-destacados").show();

  });
  $("#icono-perfil-boton").click(function () {
    if ($(".desplegable-perfil").css("display") == "none") {
      $(".desplegable-perfil").show()
    } else {
      $(".desplegable-perfil").hide()
    }
  })
});

$("#boton-subir-post").click(function () {
  let contenidNuevoPost = $("#texto-post-subir").val();
  let idOwner = "62a702295174230e04ecafe4";
  $.ajax({
    url: 'http://localhost:8800/api/posts/',
    'data': JSON.stringify({
      text: contenidNuevoPost,
      multimedia: "",
      "likes.number": 0,
      "likes.usersId": "",
      owner: idOwner
    }),
    'type': 'POST',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})

function formatearFecha(fecha, estado) {

  try {

    if (estado == "date") {

      return new Date(fecha).toLocaleDateString();

    } else if (estado == "time") {

      return new Date(fecha).toLocaleTimeString();

    } else if (estado == "all") {

      return new Date(fecha).toLocaleString();

    }

  } catch (error) {

    return null;

  }

}