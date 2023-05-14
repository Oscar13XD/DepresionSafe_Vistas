using DepresionSafe_Vistas.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DepresionSafe_Vistas.Controllers
{
    public class IniciarSesionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Registro()
        {
            return View();
        }
        public IActionResult RecuperarPassword()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Reestablecer(string? token)
        {
            if (token == null)
            {
                return NotFound();
            }
            else
            {
                var cliente = new HttpClient();
                cliente.BaseAddress = new Uri("http://localhost:5281");
                var response = await cliente.GetAsync("api/Login/VerificarToken/" + token);
                var json = await response.Content.ReadAsStringAsync();
                var resultado = JsonConvert.DeserializeObject<VerificarToken>(json);
                if (resultado.Mensaje == "ok")
                {
                    return View();
                }
                else
                {
                    return NotFound();
                }
            }
        }
        [HttpPost]
        public IActionResult CrearToken(string token, string rol)
        {
            HttpContext.Session.SetString("token", token);
            HttpContext.Session.SetString("rol", rol);

            if (rol == "USUARIO")
            {
                return Content(Url.Action("Index", "Usuario"));
            }
            return NotFound();
        }

        public RedirectToActionResult CerrarSesion()
        {
            HttpContext.Session.Remove("token");
            HttpContext.Session.Remove("rol");
            return RedirectToAction("Index", "IniciarSesion");
        }
    }
}
