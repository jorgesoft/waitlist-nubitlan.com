---
title: 'Contraseñas seguras: por qué la longitud le gana a los símbolos'
date: 2026-08-14
excerpt: 'Las reglas clásicas de contraseñas envejecieron mal. Esto es lo que realmente hace que una contraseña resista, y cómo aplicarlo en tu equipo.'
author: Equipo Nubitlan
tags:
  - Ciberseguridad
  - Buenas prácticas
---

Durante años la recomendación fue la misma: mezcla mayúsculas, minúsculas,
números y símbolos. El resultado predecible fue `Empresa2024!` repetida en
catorce sistemas distintos. Esa regla producía contraseñas difíciles de recordar
para las personas y fáciles de adivinar para las máquinas.

Hoy sabemos que la variable que más importa es otra: **la longitud**.

## Entropía, en términos simples

La entropía mide cuántos intentos necesitaría un atacante para acertar por fuerza
bruta, y se expresa en bits. Cada bit adicional **duplica** el esfuerzo
necesario.

La fórmula es directa:

```
entropía = longitud × log2(tamaño del alfabeto)
```

Comparemos dos contraseñas:

| Contraseña | Longitud | Entropía aprox. |
| --- | --- | --- |
| `P@ssw0rd!` | 9 | ~59 bits |
| `caballo-grapa-batería-correcto` | 30 | ~124 bits |

La segunda es más fácil de recordar y órdenes de magnitud más difícil de
quebrar. Añadir un símbolo suma unos pocos bits; añadir seis caracteres suma
muchos más.

> La entropía calculada asume que el atacante no conoce el patrón. Una frase
> tomada literalmente de una canción o película conocida tiene mucha menos
> entropía real que la que sugiere su longitud, porque el atacante puede
> atacar el diccionario de frases en lugar del alfabeto completo.

## Por qué las sustituciones no ayudan tanto

Reemplazar `a` por `@` y `o` por `0` es una transformación que los programas de
cracking aplican automáticamente desde hace más de una década. `C0ntr@señ@` no es
significativamente más fuerte que `contraseña` frente a un ataque real de
diccionario con reglas.

Lo que sí agrega dificultad es la imprevisibilidad: palabras elegidas al azar,
sin relación semántica entre ellas.

## Frases de contraseña: la opción práctica

Una frase generada al azar a partir de una lista de palabras (método *diceware*)
combina alta entropía con memorabilidad. Cuatro palabras aleatorias de una lista
de 7.776 dan unos 51 bits; seis palabras dan unos 77 bits, que hoy se considera
sólido para cuentas importantes.

La clave está en **generar** las palabras al azar, no en elegirlas. Una frase
escogida por una persona tiende a seguir patrones del lenguaje y pierde buena
parte de su fuerza teórica.

Puedes generar una ahora mismo con nuestro
[generador de contraseñas y frases](/ps): funciona por completo en tu navegador,
sin enviar nada a ningún servidor.

## Las tres reglas que sí importan

### 1. Única por sitio

La causa más común de compromiso no es que alguien adivine tu contraseña, sino
que la reutilizaste en un servicio que sufrió una filtración. Un gestor de
contraseñas resuelve esto mejor que cualquier regla de complejidad.

### 2. Segundo factor donde se pueda

Una contraseña robada deja de ser suficiente si hay un segundo factor. Prioriza
aplicaciones de autenticación o llaves físicas sobre los códigos por SMS, que son
vulnerables a suplantación de línea.

### 3. Rotación solo cuando hay motivo

Forzar cambios cada 90 días empuja a la gente hacia patrones predecibles
(`Verano1`, `Verano2`). La recomendación actual de NIST es cambiar la contraseña
cuando hay indicio de compromiso, no por calendario.

## Qué cambiar en tu empresa esta semana

- Elimina la caducidad automática de contraseñas si no responde a un riesgo real.
- Sube el mínimo a 12 caracteres y deja de exigir símbolos obligatorios.
- Habilita segundo factor en correo, banca y accesos administrativos.
- Dale a tu equipo un gestor de contraseñas y el tiempo para migrar a él.
- Revisa y desactiva las cuentas de personas que ya no trabajan contigo.

Ninguna de estas medidas requiere presupuesto significativo, y juntas cierran la
mayoría de las rutas de ataque que vemos en evaluaciones reales.
