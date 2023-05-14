$('#RecuperarPassword').submit(async function (e) {
    e.preventDefault();
    $('#Spinner').addClass('d-flex');
    var correo = $('#CorreoUsuario').val();
    const Enviado = await RecuperarPassword(correo);
    $('#Spinner').removeClass('d-flex');
    if (Enviado.mensaje == "ok") {
        Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: '¡Se ha enviado un correo para reestablecer su clave!',
            allowOutsideClick: false,
            confirmButtonText: 'De acuerdo'
        }).then((result) => {
            location.href = UrlIniciarSesion;
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: Enviado.mensaje
        });
    }
    return;
});

async function RecuperarPassword(correo) {
    var resultado;
    try {
        resultado = await fetch(url + 'api/Login/RecuperarPassword/' + correo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return resultado.json();

    } catch (error) {
        console.error('Error:', error);
    };
}
