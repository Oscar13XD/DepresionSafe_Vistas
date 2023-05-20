using Microsoft.AspNetCore.Mvc;

namespace DepresionSafe_Vistas.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("token") != null && HttpContext.Session.GetString("rol") == "USUARIO")
            {
                ViewBag.Token = HttpContext.Session.GetString("token");
                return View();
            }
            else
            {
                return RedirectToAction("Index", "IniciarSesion");
            }
        }

        public IActionResult ActualizarDatos()
        {
            if (HttpContext.Session.GetString("token") != null && HttpContext.Session.GetString("rol") == "USUARIO")
            {
                ViewBag.Token = HttpContext.Session.GetString("token");
                return View();
            }
            else
            {
                return RedirectToAction("Index","IniciarSesion");
            }
        }
    }
}
