var params = new URLSearchParams(location.search);
var token = params.get('token');

$('#ReestablecerPassword').submit(async function (e) {
    e.preventDefault();
    $('#Spinner').addClass('d-flex');
    const data = {
        cedula: "",
        correo: "",
        nombre: "",
        token: token,
        Password: $('#PasswordUsuario').val()
    }
    const Registro = await ReestablecerPassword(data);
    $('#Spinner').removeClass('d-flex');
    if (Registro.mensaje == "ok") {
        Swal.fire({
            icon: 'success',
            title: 'Hecho',
            text: '¡Se ha reestablecido la contraseña!',
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

async function ReestablecerPassword(data) {
    var resultado;
    try {
        resultado = await fetch(url + 'api/Login/ReestablecerPassword', {
            method: 'PUT',
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
