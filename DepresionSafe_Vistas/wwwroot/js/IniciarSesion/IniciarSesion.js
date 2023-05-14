$('#IniciarSesion').submit(async function (e) {
    e.preventDefault();
    $('#Spinner').addClass('d-flex');
    const data = {
        correo: $('#CorreoUsuario').val(),
        clave: $('#PasswordUsuario').val(),
    }
    const InicioSesion = await IniciarSesion(data);
    $('#Spinner').removeClass('d-flex');
    if (InicioSesion.mensaje == "OK") {
        location.href = await CrearSesion(InicioSesion.token, InicioSesion.rol);
    }
});

async function IniciarSesion(data) {
    var resultado;
    try {
        resultado = await fetch(url + 'api/Login/IniciarSesion', {
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

async function CrearSesion(token, rol) {
    var resultado;
    try {
        resultado = await $.ajax({
            type: "POST",
            url: crearToken,
            data: {
                token: token,
                rol: rol
            },
        });
        return resultado;
    } catch (error) {
        console.error(error)
    }
}