$('#RegistroUsuario').submit(async function (e) {
    e.preventDefault();
    $('#Spinner').addClass('d-flex');
    const data = {
        Nombre: $('#NombreUsuario').val(),
        Cedula: $('#CedulaUsuario').val(),
        Telefono: parseInt($('#TelefonoUsuario').val(), 10),
        Correo: $('#CorreoUsuario').val(),
        Password: $('#PasswordUsuario').val(),
    }
    const Registro = await RegistrarUsuario(data);
    $('#Spinner').removeClass('d-flex');
    if (Registro.mensaje == "ok") {
        Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: '¡Se ha realizado el registro!',
            allowOutsideClick: false,
            confirmButtonText: 'De acuerdo'
        }).then((result) => {
            location.href = UrlIniciarSesion;
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: Registro.mensaje,
        });
    }
});

async function RegistrarUsuario(data) {
    var resultado;
    try {
        resultado = await fetch(url + 'api/Login/RegistrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return resultado.json();

    } catch (error) {
        console.error('Error:', error);
    };
}
