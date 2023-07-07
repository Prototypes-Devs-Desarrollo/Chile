import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // Aquí puedes realizar la lógica de cierre de sesión utilizando Firebase Authentication
    // Por ejemplo, utilizando la instancia de auth de Firebase importada desde el archivo de configuración
    auth
      .signOut()
      .then(() => {
        // Una vez cerrada la sesión con éxito, puedes redirigir al usuario a otra página
        // o realizar cualquier otra acción necesaria
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  }, []);

  return (
    <div>
      <h1>Cerrando sesión...</h1>
    </div>
  );
}
