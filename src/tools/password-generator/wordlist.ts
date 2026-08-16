/**
 * Spanish wordlist for passphrase generation.
 *
 * Chosen to be common, concrete and easy to retype: no accents, no "ñ", no
 * words shorter than four letters. Accent-free entries matter because a
 * passphrase often has to be typed on a keyboard layout the user did not
 * choose (a hotel PC, a phone, a server console).
 *
 * The list is deduplicated at module load, and entropy is always computed
 * from `WORDS.length` rather than a hardcoded constant — so a duplicate that
 * slips in reduces the reported strength instead of silently overstating it.
 */
const RAW_WORDS = [
  'abeja', 'abrigo', 'aceite', 'acero', 'acido', 'agenda', 'agua', 'aguila',
  'ahorro', 'ajedrez', 'alambre', 'albergue', 'alcalde', 'aldea', 'alfombra',
  'algodon', 'alimento', 'almendra', 'alumno', 'amable', 'amarillo', 'ambiente',
  'amigo', 'ancla', 'andar', 'anillo', 'animal', 'antena', 'anuncio', 'arbol',
  'arcilla', 'arena', 'arete', 'argumento', 'armario', 'arroz', 'arte',
  'asiento', 'astro', 'atlas', 'atun', 'aula', 'ausente', 'avena', 'avestruz',
  'avion', 'ayuda', 'azucar', 'azul', 'bahia', 'baile', 'balcon', 'ballena',
  'banco', 'bandera', 'barco', 'barrio', 'basura', 'bebida', 'bosque', 'bota',
  'botella', 'brazo', 'brillo', 'brisa', 'broche', 'bronce', 'bufanda', 'buho',
  'burbuja', 'buzon', 'caballo', 'cebada', 'cable', 'cactus', 'cadena', 'cafe',
  'caja', 'calle', 'calor', 'cama', 'camara', 'camino', 'campana', 'campo',
  'canal', 'cancion', 'canela', 'cangrejo', 'canoa', 'cantera', 'capa',
  'capitan', 'carbon', 'carne', 'carpeta', 'carrera', 'carta', 'casa',
  'cascada', 'casco', 'castillo', 'cebolla', 'cedro', 'ceja', 'celeste',
  'cena', 'centro', 'cepillo', 'cerca', 'cereza', 'cerro', 'cesta', 'chaleco',
  'cielo', 'ciervo', 'cima', 'cinta', 'circo', 'ciudad', 'clavel', 'clave',
  'clima', 'cobre', 'cocina', 'codigo', 'codo', 'cohete', 'cojin', 'colina',
  'collar', 'color', 'columna', 'comedor', 'cometa', 'compas', 'concha',
  'conejo', 'copa', 'coral', 'corazon', 'corbata', 'cordel', 'corona',
  'correo', 'cosecha', 'costa', 'crema', 'cristal', 'cuaderno', 'cuadro',
  'cuarzo', 'cubo', 'cuchara', 'cuello', 'cuerda', 'cuerpo', 'cueva', 'culebra',
  'cumbre', 'cuna', 'dado', 'danza', 'dardo', 'dedo', 'delfin', 'deporte',
  'desierto', 'diamante', 'diario', 'dibujo', 'diente', 'disco', 'dorado',
  'dulce', 'duna', 'eclipse', 'edificio', 'elefante', 'embudo', 'enano',
  'enero', 'ensayo', 'entrada', 'equipo', 'ermita', 'escalera', 'escoba',
  'escudo', 'esfera', 'espada', 'espejo', 'espiga', 'espuma', 'estadio',
  'estanque', 'estrella', 'estufa', 'examen', 'fabrica', 'faisan', 'falda',
  'familia', 'farol', 'fecha', 'feria', 'fiebre', 'fiesta', 'figura', 'filete',
  'filtro', 'firma', 'flauta', 'flecha', 'flor', 'foca', 'fogata', 'fondo',
  'forma', 'fresa', 'frijol', 'frontera', 'fruta', 'fuego', 'fuente', 'fuerza',
  'galleta', 'gallina', 'ganso', 'garaje', 'garra', 'gato', 'gaviota', 'gemelo',
  'gente', 'globo', 'gorra', 'gota', 'granate', 'granero', 'granja', 'grieta',
  'grillo', 'gruta', 'guante', 'guerra', 'guitarra', 'gusano', 'habano',
  'habito', 'hacha', 'hamaca', 'harina', 'helado', 'helecho', 'hermano',
  'hielo', 'hierba', 'hierro', 'higo', 'hilo', 'hoguera', 'hoja', 'hombro',
  'honda', 'hongo', 'horno', 'hotel', 'hueco', 'huerta', 'hueso', 'huevo',
  'humo', 'idioma', 'iglesia', 'iguana', 'imagen', 'imperio', 'indice',
  'insecto', 'invierno', 'isla', 'jabon', 'jardin', 'jarra', 'jaula', 'jinete',
  'jirafa', 'joya', 'juego', 'jugo', 'juguete', 'junco', 'jungla', 'kilo',
  'labio', 'ladrillo', 'lago', 'lampara', 'lana', 'lancha', 'langosta',
  'lanza', 'lapiz', 'laurel', 'leche', 'lechuga', 'lengua', 'leon', 'letra',
  'libro', 'liebre', 'lienzo', 'limon', 'linterna', 'lirio', 'lista', 'llama',
  'llanura', 'llave', 'lluvia', 'lobo', 'loma', 'loro', 'luces', 'lucha',
  'lugar', 'luna', 'lupa', 'madera', 'madre', 'maestro', 'maiz', 'maleta',
  'malla', 'mancha', 'manga', 'mango', 'manta', 'manzana', 'mapa', 'maquina',
  'marco', 'marea', 'marfil', 'margen', 'marino', 'martillo', 'mascara',
  'mecha', 'medalla', 'mejilla', 'melon', 'membrillo', 'menta', 'mercado',
  'mesa', 'metal', 'metro', 'miel', 'milla', 'mina', 'minuto', 'mirada',
  'mochila', 'moda', 'molino', 'moneda', 'monje', 'monte', 'morada', 'mosca',
  'motor', 'muelle', 'murcielago', 'muralla', 'museo', 'musgo', 'musica', 'muslo',
  'nabo', 'nacion', 'nadador', 'naranja', 'nariz', 'nata', 'nave', 'neblina',
  'negocio', 'nervio', 'nevada', 'nido', 'niebla', 'nieve', 'nogal', 'nombre',
  'norte', 'nota', 'nube', 'nudo', 'nuez', 'numero', 'obra', 'oceano', 'oeste',
  'oficio', 'oleaje', 'olivo', 'olla', 'ombligo', 'onda', 'opera', 'orilla',
  'ortiga', 'oruga', 'ostion', 'ostra', 'otero', 'oveja', 'padre', 'pagina',
  'paisaje', 'paja', 'pajaro', 'pala', 'palabra', 'palacio', 'paleta', 'palma',
  'paloma', 'pantano', 'panal', 'panadero', 'papel', 'paquete', 'parque',
  'partida', 'pasillo', 'pasta', 'pastel', 'pata', 'patio', 'pato', 'pecho',
  'pedal', 'peine', 'pelota', 'pena', 'pera', 'perfil', 'perla', 'perro',
  'pesca', 'petalo', 'pico', 'piedra', 'piel', 'pierna', 'pila', 'piloto',
  'pina', 'pincel', 'pino', 'pintura', 'pipa', 'piso', 'pista', 'pizarra',
  'plancha', 'planeta', 'planta', 'plata', 'playa', 'plaza', 'pluma', 'poema',
  'polen', 'pollo', 'polvo', 'portal', 'postre', 'pozo', 'pradera', 'premio',
  'presa', 'puente', 'puerta', 'puerto', 'pulga', 'pulpo', 'pulso', 'punta',
  'queso', 'quinta', 'racimo', 'radio', 'raiz', 'rama', 'rana', 'ranura',
  'rastro', 'rayo', 'receta', 'recodo', 'redoma', 'refugio', 'regalo', 'regla',
  'reina', 'reloj', 'remo', 'reptil', 'resina', 'retrato', 'revista', 'rincon',
  'ribera', 'risa', 'roble', 'roca', 'rocio', 'rombo', 'ropa', 'rosa', 'rostro',
  'rueda', 'ruido', 'ruta', 'sabana', 'sabor', 'salero', 'sala', 'salmon',
  'salto', 'sandia', 'sangre', 'sardina', 'sarten', 'sauce', 'seda', 'selva',
  'semilla', 'sendero', 'serpiente', 'sierra', 'siesta', 'silla', 'sirena',
  'sobre', 'sofa', 'solera', 'soldado', 'sombra', 'sonido', 'sopa', 'soplo',
  'suelo', 'suela', 'suerte', 'surco', 'tabla', 'taller', 'tambor', 'tapa',
  'tarde', 'tarea', 'taza', 'techo', 'tecla', 'tejado', 'tela', 'telar',
  'templo', 'tenedor', 'tesoro', 'tienda', 'tierra', 'tigre', 'tijera',
  'timbre', 'tinta', 'tira', 'titulo', 'tiza', 'toalla', 'tobillo', 'tomate',
  'tonel', 'tormenta', 'toro', 'torre', 'tortuga', 'trampa', 'tren', 'trigo',
  'trineo', 'tripa', 'trono', 'tropa', 'trucha', 'trueno', 'tubo', 'tulipan',
  'tunel', 'turno', 'urraca', 'vaca', 'vagon', 'valle', 'vapor', 'vara', 'vaso',
  'vecino', 'vela', 'veleta', 'vena', 'venado', 'ventana', 'verano', 'verde',
  'vereda', 'vestido', 'viaje', 'vidrio', 'viento', 'viga', 'vino', 'violin',
  'vista', 'volcan', 'yegua', 'yema', 'yeso', 'yunque', 'zafiro', 'zanja',
  'zapato', 'zorro', 'zumo',
]

/** Deduplicated, sorted for stable ordering across builds. */
export const WORDS: string[] = [...new Set(RAW_WORDS)].sort()

/** Bits of entropy contributed by each randomly chosen word. */
export const BITS_PER_WORD = Math.log2(WORDS.length)
