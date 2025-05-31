import { db } from "../db";
import { redes_sociales } from "../db/schemas";
import { eq } from "drizzle-orm";

export class RedesSocialesService {

  async agregarRedSocial(social: string, usuarioId: number, activo: boolean, usuario?: string) {
    const nuevoRegistro = {
      social,
      activo: activo ? "1" : "0", // Convertir booleano a 1 o 0
      usuario,
      usuario_id: usuarioId
    };

    const result = await db
      .insert(redes_sociales)
      .values(nuevoRegistro)
      .returning();

    return result[0];
  }

  async obtenerRedesSocialesPorUsuario(usuarioId: number) {
    const redes = await db
      .select()
      .from(redes_sociales)
      .where(eq(redes_sociales.usuario_id, usuarioId));

    return redes;
  }

  async modificarRedSocial(id: number, social: string, activo: boolean, usuario?: string) {
    const actualizacion = {
      social,
      activo: activo ? "1" : "0", // Convertir booleano a 1 o 0
      usuario
    };

    const result = await db
      .update(redes_sociales)
      .set(actualizacion)
      .where(eq(redes_sociales.id, id))
      .returning();

    return result[0];
  }
}

export const redesSocialesService = new RedesSocialesService();