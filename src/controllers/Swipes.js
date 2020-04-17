import db from "../database";
import { verifyToken } from "../auth/Token";
import resolver from "../utils/resolvers";
import CalcularDistancia from "../utils/distancia";
class Swipes {
  static async getSwipes(req, res) {
    const convert = (sexo) => {
      switch (sexo) {
        case "Mujeres":
          return "Mujer";
        case "Hombres":
          return "Hombre";
      }
    };
    verifyToken(req.token, async (err, authData) => {
      const DISTANCIA_MAX = 100; // KM
      if (err) return resolver(401, "Token expirado...", res);
      const users = db.collection("users");
      // Obtener info del usuario (Ciudad)
      const user_data = await users
        .findOne({ correo: authData.correo })
        .then((e) => e);
      // Buscar Personas que vivan dentro de la misma ciudad...
      let users_ciudad = await users
        .find({ ciudad: user_data.ciudad })
        .toArray()
        .then((e) => e);
      // Filtrar que tenga el sexo de preferencia del usuario
      users_ciudad = users_ciudad.filter(
        (user) => user.sexo == convert(user_data.preferencia)
      );
      // Filtrar los que tengan coordenadas asignadas y excluir al usuario
      users_ciudad = users_ciudad.filter(
        (user) => "latitud" in user && user.correo != authData.correo
      );
      // Agregar Tag de Distancia a todos los usuarios
      users_ciudad = users_ciudad.map((user) => ({
        ...user,
        distancia: CalcularDistancia(
          { ...user.latitud, ...user.longitud },
          { latitud: user_data.latitud, longitud: user_data.longitud }
        ),
      }));
      // Excluir los que esten fuera del rango
      users_ciudad = users_ciudad.filter(
        (user) => user.distancia < DISTANCIA_MAX
      );
      // Limitar solo a info que nos interesa...
      users_ciudad = users_ciudad.map(user => {
          const { fullNombre, bio, sexo, universidad, distancia } = user;
          return { fullNombre, bio, sexo, universidad, distancia, _id};
      })
      // Ordenar por Gustos (PROXIMAMENTE)
      resolver(200, users_ciudad, res);
    });
  }
}

export default Swipes;
