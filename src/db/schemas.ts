import { integer, text, sqliteTable, numeric } from 'drizzle-orm/sqlite-core';

// Tabla usuario
export const usuario = sqliteTable('usuario', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre_usuario: text('nombre_usuario').notNull().unique(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

// Tabla perfil
export const perfil = sqliteTable('perfil', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  foto: text('foto'),
  titulos: text('titulos'),
  usuario_id: integer('usuario_id').notNull().references(() => usuario.id),
});

// Tabla proyectos
export const proyectos = sqliteTable('proyectos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titulo: text('titulo').notNull(),
  descripcion: text('descripcion').notNull(),
  imagen: text('imagen'),
  linkGithub: text('linkGithub'),
  linkDemo: text('linkDemo'),
  usuario_id: integer('usuario_id').notNull().references(() => usuario.id),
});

// Tabla redes sociales
export const redes_sociales = sqliteTable('redes_sociales', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  social: text('social').notNull(),
  activo: numeric('activo').notNull(), // 1 para activo, 0 para inactivo
  usuario: text('usuario'), // este parece opcional, si quieres lo puedes quitar
  usuario_id: integer('usuario_id').notNull().references(() => usuario.id),
});

// Tabla tecnologia
export const tecnologia = sqliteTable('tecnologia', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  proyecto_id: integer('proyecto_id').notNull().references(() => proyectos.id, { onDelete: 'cascade' }),
  nombre_tecnologia: text('nombre_tecnologia').notNull(),
});

export const colores = sqliteTable('colores', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  color_texto: text('color_texto').notNull(),
  color_titulo: text('color_titulo').notNull(),
  fondo_navegacion: text('fondo_navegacion').notNull(),
  fondo_presentacion: text('fondo_presentacion').notNull(),
  fondo_proyectos: text('fondo_proyectos').notNull(),
  fondo_redes: text('fondo_redes').notNull(),
  usuario_id: integer('usuario_id').notNull().references(() => usuario.id),
});