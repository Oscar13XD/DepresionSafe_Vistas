$('#subcribe-form').submit(async function(e){
    e.preventDefault();
    console.log("si");
    var correo = $('#TxtCorreo').val();
    const respuesta = await Registrar(correo);



    console.log(respuesta);  
});


async function Registrar(correo){
    var resultado;
    try{
        resultado = await $.ajax({
            type: "POST",
            url: "registro.php",
            mode: 'no-cors',
            data:{
                correo: correo
            }
        });
        return resultado;
    }catch(error){
        console.log(error);
    }
}