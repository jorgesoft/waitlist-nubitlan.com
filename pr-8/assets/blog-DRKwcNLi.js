import{j as we}from"./js-yaml-B5MQNTTm.js";const ye=`---
title: 'Cinco errores de ciberseguridad que vemos en casi toda PYME'
date: 2026-07-28
excerpt: 'Patrones que se repiten en las evaluaciones que hacemos, y cómo corregirlos sin un presupuesto de empresa grande.'
author: Equipo Nubitlan
tags:
  - Ciberseguridad
  - PYMES
---

Después de varias evaluaciones a empresas salvadoreñas, los hallazgos empiezan a
parecerse entre sí. No se trata de ataques sofisticados: son configuraciones
olvidadas y procesos que nunca se documentaron.

Estos son los cinco patrones más frecuentes.

## 1. Cuentas de ex empleados que siguen activas

Es el hallazgo número uno, y casi siempre sorprende a la gerencia. Alguien salió
de la empresa hace ocho meses y su correo, su VPN o su acceso al sistema
contable siguen funcionando.

**Cómo corregirlo:** haz una revisión trimestral de cuentas activas contra la
planilla vigente, y agrega la desactivación de accesos a la lista de salida de
recursos humanos. El control importa más que la herramienta.

## 2. Todos son administradores

En muchas PYMES cada usuario tiene permisos totales, normalmente porque en algún
momento fue más rápido que configurar roles. El costo aparece cuando una sola
cuenta comprometida entrega el control completo del sistema.

**Cómo corregirlo:** aplica el principio de menor privilegio. Empieza por los
sistemas que tocan datos personales o dinero, define dos o tres roles y asigna a
cada persona el mínimo que necesita para trabajar.

## 3. Respaldos que nunca se han restaurado

Casi todas las empresas dicen tener respaldos. Muy pocas han intentado
restaurarlos. Un respaldo que no se ha probado es una suposición, no un control —
y es exactamente lo que un ataque de ransomware pone a prueba.

**Cómo corregirlo:** adopta la regla 3-2-1 (tres copias, dos medios distintos,
una fuera de sitio) y agenda una restauración de prueba cada semestre. Documenta
cuánto tardó: ese número es tu tiempo real de recuperación.

## 4. Servicios expuestos a internet sin necesidad

Bases de datos, paneles de administración y escritorios remotos accesibles
directamente desde internet, a veces con credenciales por defecto. Suelen ser
restos de una migración o de una solución temporal que se volvió permanente.

**Cómo corregirlo:** inventaria qué está publicado hacia afuera. Todo lo que no
necesite ser público debe quedar detrás de una VPN o restringido por IP. Es la
corrección con mejor relación esfuerzo-impacto de esta lista.

## 5. Ningún plan para el día del incidente

Cuando ocurre algo, la pregunta "¿a quién llamamos?" se responde improvisando.
Se pierden horas críticas y, con la nueva ley, también se arriesgan los plazos
de notificación.

**Cómo corregirlo:** escribe un plan de una página. Quién decide, quién comunica,
a qué proveedor se llama, dónde están los respaldos y qué se le dice a los
clientes. Una página que existe vale más que un manual de cuarenta que nadie
escribió.

## El patrón detrás del patrón

Ninguno de estos cinco problemas requiere inversión significativa. Requieren
que alguien tenga la responsabilidad explícita de revisarlos con cierta
periodicidad. En las empresas donde no pasa nada durante años, casi siempre hay
una persona con ese encargo por escrito.

Si quieres saber cuáles de estos aplican a tu empresa, la
[evaluación gratuita](/evaluacion) es un buen punto de partida.
`,Se=`---
title: 'Contraseñas seguras: por qué la longitud le gana a los símbolos'
date: 2026-08-14
excerpt: 'Las reglas clásicas de contraseñas envejecieron mal. Esto es lo que realmente hace que una contraseña resista, y cómo aplicarlo en tu equipo.'
author: Equipo Nubitlan
tags:
  - Ciberseguridad
  - Buenas prácticas
---

Durante años la recomendación fue la misma: mezcla mayúsculas, minúsculas,
números y símbolos. El resultado predecible fue \`Empresa2024!\` repetida en
catorce sistemas distintos. Esa regla producía contraseñas difíciles de recordar
para las personas y fáciles de adivinar para las máquinas.

Hoy sabemos que la variable que más importa es otra: **la longitud**.

## Entropía, en términos simples

La entropía mide cuántos intentos necesitaría un atacante para acertar por fuerza
bruta, y se expresa en bits. Cada bit adicional **duplica** el esfuerzo
necesario.

La fórmula es directa:

\`\`\`
entropía = longitud × log2(tamaño del alfabeto)
\`\`\`

Comparemos dos contraseñas:

| Contraseña | Longitud | Entropía aprox. |
| --- | --- | --- |
| \`P@ssw0rd!\` | 9 | ~59 bits |
| \`caballo-grapa-batería-correcto\` | 30 | ~124 bits |

La segunda es más fácil de recordar y órdenes de magnitud más difícil de
quebrar. Añadir un símbolo suma unos pocos bits; añadir seis caracteres suma
muchos más.

> La entropía calculada asume que el atacante no conoce el patrón. Una frase
> tomada literalmente de una canción o película conocida tiene mucha menos
> entropía real que la que sugiere su longitud, porque el atacante puede
> atacar el diccionario de frases en lugar del alfabeto completo.

## Por qué las sustituciones no ayudan tanto

Reemplazar \`a\` por \`@\` y \`o\` por \`0\` es una transformación que los programas de
cracking aplican automáticamente desde hace más de una década. \`C0ntr@señ@\` no es
significativamente más fuerte que \`contraseña\` frente a un ataque real de
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
(\`Verano1\`, \`Verano2\`). La recomendación actual de NIST es cambiar la contraseña
cuando hay indicio de compromiso, no por calendario.

## Qué cambiar en tu empresa esta semana

- Elimina la caducidad automática de contraseñas si no responde a un riesgo real.
- Sube el mínimo a 12 caracteres y deja de exigir símbolos obligatorios.
- Habilita segundo factor en correo, banca y accesos administrativos.
- Dale a tu equipo un gestor de contraseñas y el tiempo para migrar a él.
- Revisa y desactiva las cuentas de personas que ya no trabajan contigo.

Ninguna de estas medidas requiere presupuesto significativo, y juntas cierran la
mayoría de las rutas de ataque que vemos en evaluaciones reales.
`,qe=`---
title: 'Ley de Protección de Datos en El Salvador: qué significa para tu empresa'
date: 2026-08-12
excerpt: 'Una guía práctica de las obligaciones que introduce la Ley de Protección de Datos Personales y los primeros pasos concretos para prepararte.'
author: Equipo Nubitlan
tags:
  - Cumplimiento
  - Ley de Datos
---

La Ley de Protección de Datos Personales cambia la forma en que las empresas
salvadoreñas recolectan, almacenan y usan la información de sus clientes. Si tu
empresa guarda nombres, números de teléfono, direcciones, datos de facturación o
historial de compras, la ley te aplica — sin importar el tamaño de la operación.

Esta guía resume lo esencial y traduce las obligaciones legales en tareas que
puedes empezar esta semana.

## Qué se considera un dato personal

Un dato personal es cualquier información que permita identificar a una persona,
directa o indirectamente. En la práctica, esto incluye mucho más de lo que
la mayoría de empresas asume:

- Nombre completo, DUI, NIT y número de teléfono
- Correo electrónico, incluso el corporativo cuando identifica a una persona
- Dirección física y datos de geolocalización
- Datos de facturación e historial de compras
- Fotografías, grabaciones de cámaras y registros biométricos

Existe además una categoría de **datos sensibles** — salud, biometría, creencias,
afiliación sindical u origen étnico — que exige un nivel de protección más
estricto y, en general, consentimiento explícito.

## Las cuatro obligaciones que más impactan

### 1. Base legal para cada tratamiento

No basta con tener los datos: necesitas poder explicar *por qué* los tienes. El
consentimiento es la base más conocida, pero no la única — la ejecución de un
contrato o el cumplimiento de una obligación legal también sirven. Lo importante
es que la base esté identificada y documentada antes de recolectar.

### 2. Información clara al titular

Cuando pides datos, la persona debe saber quién los recolecta, con qué finalidad,
por cuánto tiempo se conservan y cómo ejercer sus derechos. Un aviso de
privacidad accesible y escrito en lenguaje entendible deja de ser opcional.

### 3. Derechos ARCO

Los titulares pueden solicitar **A**cceso, **R**ectificación, **C**ancelación y
**O**posición sobre sus datos. Tu empresa necesita un canal de contacto conocido
y un procedimiento interno capaz de responder dentro de los plazos legales. En
la mayoría de casos, el cuello de botella no es legal sino operativo: nadie sabe
en qué sistemas viven los datos.

### 4. Medidas de seguridad demostrables

La ley exige proteger los datos con medidas técnicas y organizativas. "Tenemos
antivirus" no es una respuesta suficiente. Lo que se espera es control de acceso,
cifrado donde corresponda, respaldos, registro de quién accede a qué, y un plan
de respuesta cuando algo sale mal.

## Por dónde empezar

El error más común es intentar resolver todo a la vez y no terminar nada. Este
orden funciona mejor:

1. **Inventaria tus datos.** Haz una lista de qué datos personales recolectas, en
   qué sistema viven, quién tiene acceso y por cuánto tiempo los guardas. Una
   hoja de cálculo es suficiente para empezar.
2. **Elimina lo que no necesitas.** El dato que no guardas es el dato que no
   tienes que proteger ni justificar. Suele ser la medida con mejor retorno.
3. **Escribe tu aviso de privacidad.** Publícalo donde la gente realmente
   entregue sus datos: el formulario web, el contrato, el punto de venta.
4. **Define quién responde.** Asigna a una persona responsable de recibir
   solicitudes ARCO y de coordinar la respuesta ante incidentes.
5. **Cierra las brechas técnicas evidentes.** Contraseñas compartidas, accesos de
   ex empleados que siguen activos y bases de datos expuestas a internet son los
   hallazgos más frecuentes — y los más fáciles de corregir.

## Un error costoso: tratar esto como un problema solo legal

El cumplimiento se redacta en documentos, pero se sostiene en la operación. Una
política de retención que dice "eliminamos los datos a los 24 meses" no vale nada
si nadie configuró el proceso que los elimina. La evidencia que pedirá un
auditor no es la política: es la prueba de que se ejecuta.

Por eso conviene abordar la ley con el equipo legal y el equipo técnico en la
misma mesa desde el inicio.

## Siguiente paso

Si no sabes en qué punto está tu empresa, empieza midiendo. Nuestra
[evaluación gratuita](/evaluacion) toma pocos minutos y te da una lectura clara
de tu nivel de preparación, junto con recomendaciones ordenadas por prioridad.
Y si quieres el plan completo, consulta nuestra [guía completa de
cumplimiento](/guia_completa), con una hoja de autoevaluación descargable.
`;function U(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var v=U();function oe(n){v=n}var R={exec:()=>null};function T(n){let e=[];return t=>{let s=Math.max(0,Math.min(3,t-1)),a=e[s];return a||(a=n(s),e[s]=a),a}}function h(n,e=""){let t=typeof n=="string"?n:n.source,s={replace:(a,r)=>{let l=typeof r=="string"?r:r.source;return l=l.replace(f.caret,"$1"),t=t.replace(a,l),s},getRegex:()=>new RegExp(t,e)};return s}var Re=((n="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+n)}catch{return!1}})(),f={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:T(n=>new RegExp(`^ {0,${n}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:T(n=>new RegExp(`^ {0,${n}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:T(n=>new RegExp(`^ {0,${n}}(?:\`\`\`|~~~)`)),headingBeginRegex:T(n=>new RegExp(`^ {0,${n}}#`)),htmlBeginRegex:T(n=>new RegExp(`^ {0,${n}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:T(n=>new RegExp(`^ {0,${n}}>`))},$e=/^(?:[ \t]*(?:\n|$))+/,ve=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Te=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,L=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ze=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,H=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ce=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ue=h(ce).replace(/bull/g,H).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),_e=h(ce).replace(/bull/g,H).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),F=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,Pe=/^[^\n]+/,G=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ae=h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",G).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ee=h(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,H).getRegex(),N="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Y=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Le=h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Y).replace("tag",N).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),pe=n=>h(F).replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list",n).replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",N).getRegex(),Ce=pe(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Ie=pe(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),De=h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ie).getRegex(),V={blockquote:De,code:ve,def:Ae,fences:Te,heading:ze,hr:L,html:Le,lheading:ue,list:Ee,newline:$e,paragraph:Ce,table:R,text:Pe},te=h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",N).getRegex(),Be={...V,lheading:_e,table:te,paragraph:h(F).replace("hr",L).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",te).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",N).getRegex()},je={...V,html:h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Y).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:R,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:h(F).replace("hr",L).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ue).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ne=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Me=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,he=/^( {2,}|\\)\n(?!\s*$)/,Ze=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,S=/[\p{P}\p{S}]/u,z=/[\s\p{P}\p{S}]/u,C=/[^\s\p{P}\p{S}]/u,Qe=h(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,z).getRegex(),Oe=/[\p{Pi}\p{Ps}"']/u,de=/(?!~)[\p{P}\p{S}]/u,Ue=/(?!~)[\s\p{P}\p{S}]/u,He=/(?:[^\s\p{P}\p{S}]|~)/u,Fe=h(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Re?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ge=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Ge=h(ge,"u").replace(/punct/g,S).getRegex(),Ye=h(ge,"u").replace(/punct/g,de).getRegex(),Ve=/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,We=h(Ve,"u").replace(/openQuote/g,Oe).replace(/punct/g,S).getRegex(),me="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Xe=h(me,"gu").replace(/notPunctSpace/g,C).replace(/punctSpace/g,z).replace(/punct/g,S).getRegex(),Je=h(me,"gu").replace(/notPunctSpace/g,He).replace(/punctSpace/g,Ue).replace(/punct/g,de).getRegex(),Ke="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)",et=h(Ke,"gu").replace(/notPunctSpace/g,C).replace(/punctSpace/g,z).replace(/punct/g,S).getRegex(),tt=h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,C).replace(/punctSpace/g,z).replace(/punct/g,S).getRegex(),nt="^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)",at=h(nt,"gu").replace(/notPunctSpace/g,C).replace(/punctSpace/g,z).replace(/punct/g,S).getRegex(),st=h(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,S).getRegex(),rt="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",it=h(rt,"gu").replace(/notPunctSpace/g,C).replace(/punctSpace/g,z).replace(/punct/g,S).getRegex(),lt=h(/\\(punct)/,"gu").replace(/punct/g,S).getRegex(),ot=h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ct=h(Y).replace("(?:-->|$)","-->").getRegex(),ut=h("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ct).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),D=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,pt=h(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",D).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),fe=h(/^!?\[(label)\]\[(ref)\]/).replace("label",D).replace("ref",G).getRegex(),ke=h(/^!?\[(ref)\](?:\[\])?/).replace("ref",G).getRegex(),ht=h("reflink|nolink(?!\\()","g").replace("reflink",fe).replace("nolink",ke).getRegex(),ne=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,W={_backpedal:R,anyPunctuation:lt,autolink:ot,blockSkip:Fe,br:he,code:Me,del:R,delLDelim:R,delRDelim:R,emStrongLDelim:Ge,emStrongRDelimAst:Xe,emStrongRDelimUnd:tt,escape:Ne,link:pt,nolink:ke,punctuation:Qe,reflink:fe,reflinkSearch:ht,tag:ut,text:Ze,url:R},dt={...W,emStrongLDelim:We,emStrongRDelimAst:et,emStrongRDelimUnd:at,link:h(/^!?\[(label)\]\((.*?)\)/).replace("label",D).getRegex(),reflink:h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",D).getRegex()},Z={...W,emStrongRDelimAst:Je,emStrongLDelim:Ye,delLDelim:st,delRDelim:it,url:h(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ne).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:h(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ne).getRegex()},gt={...Z,br:h(he).replace("{2,}","*").getRegex(),text:h(Z.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},I={normal:V,gfm:Be,pedantic:je},A={normal:W,gfm:Z,breaks:gt,pedantic:dt},mt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ae=n=>mt[n];function y(n,e){if(e){if(f.escapeTest.test(n))return n.replace(f.escapeReplace,ae)}else if(f.escapeTestNoEncode.test(n))return n.replace(f.escapeReplaceNoEncode,ae);return n}function se(n){try{n=encodeURI(n).replace(f.percentDecode,"%")}catch{return null}return n}function re(n,e){let t=n.replace(f.findPipe,(r,l,i)=>{let o=!1,c=l;for(;--c>=0&&i[c]==="\\";)o=!o;return o?"|":" |"}),s=t.split(f.splitPipe),a=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;a<s.length;a++)s[a]=s[a].trim().replace(f.slashPipe,"|");return s}function q(n,e,t){let s=n.length;if(s===0)return"";let a=0;for(;a<s&&n.charAt(s-a-1)===e;)a++;return n.slice(0,s-a)}function ie(n){let e=n.split(`
`),t=e.length-1;for(;t>=0&&f.blankLine.test(e[t]);)t--;return e.length-t<=2?n:e.slice(0,t+1).join(`
`)}function ft(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return t>0?-2:-1}function kt(n,e=0){let t=e,s="";for(let a of n)if(a==="	"){let r=4-t%4;s+=" ".repeat(r),t+=r}else s+=a,t++;return s}function le(n,e,t,s,a){let r=e.href,l=e.title||null,i=n[1].replace(a.other.outputLinkReplace,"$1");s.state.inLink=!0;let o={type:n[0].charAt(0)==="!"?"image":"link",raw:t,href:r,title:l,text:i,tokens:s.inlineTokens(i)};return s.state.inLink=!1,o}function bt(n,e,t){let s=n.match(t.other.indentCodeCompensation);if(s===null)return e;let a=s[1];return e.split(`
`).map(r=>{let l=r.match(t.other.beginningSpace);if(l===null)return r;let[i]=l;return i.length>=a.length?r.slice(a.length):r}).join(`
`)}var B=class{options;rules;lexer;constructor(n){this.options=n||v}space(n){let e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){let e=this.rules.block.code.exec(n);if(e){let t=this.options.pedantic?e[0]:ie(e[0]),s=t.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t,codeBlockStyle:"indented",text:s}}}fences(n){let e=this.rules.block.fences.exec(n);if(e){let t=e[0],s=bt(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(n){let e=this.rules.block.heading.exec(n);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let s=q(t,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(t=s.trim())}return{type:"heading",raw:q(e[0],`
`),depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(n){let e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:q(e[0],`
`)}}blockquote(n){let e=this.rules.block.blockquote.exec(n);if(e){let t=q(e[0],`
`).split(`
`),s="",a="",r=[];for(;t.length>0;){let l=!1,i=[],o;for(o=0;o<t.length;o++)if(this.rules.other.blockquoteStart.test(t[o]))i.push(t[o]),l=!0;else if(!l)i.push(t[o]);else break;t=t.slice(o);let c=i.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,a=a?`${a}
${p}`:p;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,r,!0),this.lexer.state.top=u,t.length===0)break;let d=r.at(-1);if(d?.type==="code")break;if(d?.type==="blockquote"){let k=d,m=t.join(`
`),w=k.raw+`
`+m.replace(this.rules.other.blockquoteSetextReplace2,""),_=this.blockquote(w);r[r.length-1]=_,s=`${s}
${m}`,a=a.substring(0,a.length-k.text.length)+_.text;break}else if(d?.type==="list"){let k=d,m=k.raw+`
`+t.join(`
`),w=this.list(m);r[r.length-1]=w,s=s.substring(0,s.length-d.raw.length)+w.raw,a=a.substring(0,a.length-k.raw.length)+w.raw,t=m.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:r,text:a}}}list(n){let e=this.rules.block.list.exec(n);if(e){let t=e[1].trim(),s=t.length>1,a={type:"list",raw:"",ordered:s,start:s?+t.slice(0,-1):"",loose:!1,items:[]};t=s?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=s?t:"[*+-]");let r=this.rules.other.listItemRegex(t),l=!1;for(;n;){let o=!1,c="",p="";if(!(e=r.exec(n))||this.rules.block.hr.test(n))break;c=e[0],n=n.substring(c.length);let u=kt(e[2].split(`
`,1)[0],e[1].length),d=n.split(`
`,1)[0],k=!u.trim(),m=0;if(this.options.pedantic?(m=2,p=u.trimStart()):k?m=e[1].length+1:(m=u.search(this.rules.other.nonSpaceChar),m=m>4?1:m,p=u.slice(m),m+=e[1].length),k&&this.rules.other.blankLine.test(d)&&(c+=d+`
`,n=n.substring(d.length+1),o=!0),!o){let w=this.rules.other.nextBulletRegex(m),_=this.rules.other.hrRegex(m),K=this.rules.other.fencesBeginRegex(m),ee=this.rules.other.headingBeginRegex(m),be=this.rules.other.htmlBeginRegex(m),xe=this.rules.other.blockquoteBeginRegex(m);for(;n;){let M=n.split(`
`,1)[0],P;if(d=M,this.options.pedantic?(d=d.replace(this.rules.other.listReplaceNesting,"  "),P=d):P=d.replace(this.rules.other.tabCharGlobal,"    "),K.test(d)||ee.test(d)||be.test(d)||xe.test(d)||w.test(d)||_.test(d))break;if(P.search(this.rules.other.nonSpaceChar)>=m||!d.trim())p+=`
`+P.slice(m);else{if(k||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||K.test(u)||ee.test(u)||_.test(u))break;p+=`
`+d}k=!d.trim(),c+=M+`
`,n=n.substring(M.length+1),u=P.slice(m)}}a.loose||(l?a.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(l=!0)),a.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),a.raw+=c}let i=a.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let o of a.items){this.lexer.state.top=!1,o.tokens=this.lexer.blockTokens(o.text,[]);let c=o.tokens[0];if(o.task&&(c?.type==="text"||c?.type==="paragraph")){o.text=o.text.replace(this.rules.other.listReplaceTask,""),c.raw=c.raw.replace(this.rules.other.listReplaceTask,""),c.text=c.text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}let p=this.rules.other.listTaskCheckbox.exec(o.raw);if(p){let u={type:"checkbox",raw:p[0]+" ",checked:p[0]!=="[ ]"};o.checked=u.checked,a.loose?o.tokens[0]&&["paragraph","text"].includes(o.tokens[0].type)&&"tokens"in o.tokens[0]&&o.tokens[0].tokens?(o.tokens[0].raw=u.raw+o.tokens[0].raw,o.tokens[0].text=u.raw+o.tokens[0].text,o.tokens[0].tokens.unshift(u)):o.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):o.tokens.unshift(u)}}else o.task&&(o.task=!1);if(!a.loose){let p=o.tokens.filter(d=>d.type==="space"),u=p.length>0&&p.some(d=>this.rules.other.anyLine.test(d.raw));a.loose=u}}if(a.loose)for(let o of a.items){o.loose=!0;for(let c of o.tokens)c.type==="text"&&(c.type="paragraph")}return a}}html(n){let e=this.rules.block.html.exec(n);if(e){let t=ie(e[0]);return{type:"html",block:!0,raw:t,pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:t}}}def(n){let e=this.rules.block.def.exec(n);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",a=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:q(e[0],`
`),href:s,title:a}}}table(n){let e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=re(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),a=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:q(e[0],`
`),header:[],align:[],rows:[]};if(t.length===s.length){for(let l of s)this.rules.other.tableAlignRight.test(l)?r.align.push("right"):this.rules.other.tableAlignCenter.test(l)?r.align.push("center"):this.rules.other.tableAlignLeft.test(l)?r.align.push("left"):r.align.push(null);for(let l=0;l<t.length;l++)r.header.push({text:t[l],tokens:this.lexer.inline(t[l]),header:!0,align:r.align[l]});for(let l of a)r.rows.push(re(l,r.header.length).map((i,o)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:r.align[o]})));return r}}lheading(n){let e=this.rules.block.lheading.exec(n);if(e){let t=e[1].trim();return{type:"heading",raw:q(e[0],`
`),depth:e[2].charAt(0)==="="?1:2,text:t,tokens:this.lexer.inline(t)}}}paragraph(n){let e=this.rules.block.paragraph.exec(n);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(n){let e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){let e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){let e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){let e=this.rules.inline.link.exec(n);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let r=q(t.slice(0,-1),"\\");if((t.length-r.length)%2===0)return}else{let r=ft(e[2],"()");if(r===-2)return;if(r>-1){let l=(e[0].indexOf("!")===0?5:4)+e[1].length+r;e[2]=e[2].substring(0,r),e[0]=e[0].substring(0,l).trim(),e[3]=""}}let s=e[2],a="";if(this.options.pedantic){let r=this.rules.other.pedanticHrefTitle.exec(s);r&&(s=r[1],a=r[3])}else a=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?s=s.slice(1):s=s.slice(1,-1)),le(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let t;if((t=this.rules.inline.reflink.exec(n))||(t=this.rules.inline.nolink.exec(n))){let s=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),a=e[s.toLowerCase()];if(!a){let r=t[0].charAt(0);return{type:"text",raw:r,text:r}}return le(t,a,t[0],this.lexer,this.rules)}}emStrong(n,e,t=""){let s=this.rules.inline.emStrongLDelim.exec(n);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!t||this.rules.inline.punctuation.exec(t))){let a=[...s[0]].length-1,r,l,i=a,o=0,c=s[0][0],p=t===c,u=c==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*n.length+a);(s=u.exec(e))!==null;){if(r=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!r)continue;if(l=[...r].length,s[3]||s[4]){i+=l;continue}else if(s[5]||s[6]){if(a%3&&!((a+l)%3)){o+=l;continue}if(p)break}if(i-=l,i>0)continue;l=Math.min(l,l+i+o);let d=[...s[0]][0].length,k=n.slice(0,a+s.index+d+l);if(Math.min(a,l)%2){let w=k.slice(1,-1);return{type:"em",raw:k,text:w,tokens:this.lexer.inlineTokens(w)}}let m=k.slice(2,-2);return{type:"strong",raw:k,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(n){let e=this.rules.inline.code.exec(n);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(t),a=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return s&&a&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(n){let e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n,e,t=""){let s=this.rules.inline.delLDelim.exec(n);if(s&&(!s[1]||!t||this.rules.inline.punctuation.exec(t))){let a=[...s[0]].length-1,r,l,i=a,o=this.rules.inline.delRDelim;for(o.lastIndex=0,e=e.slice(-1*n.length+a);(s=o.exec(e))!==null;){if(r=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!r||(l=[...r].length,l!==a))continue;if(s[3]||s[4]){i+=l;continue}if(i-=l,i>0)continue;l=Math.min(l,l+i);let c=[...s[0]][0].length,p=n.slice(0,a+s.index+c+l),u=p.slice(a,-a);return{type:"del",raw:p,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(n){let e=this.rules.inline.autolink.exec(n);if(e){let t,s;return e[2]==="@"?(t=e[1],s="mailto:"+t):(t=e[1],s=t),{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}url(n){let e;if(e=this.rules.inline.url.exec(n)){let t,s;if(e[2]==="@")t=e[0],s="mailto:"+t;else{let a;do a=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(a!==e[0]);t=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(n){let e=this.rules.inline.text.exec(n);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},b=class Q{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||v,this.options.tokenizer=this.options.tokenizer||new B,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:f,block:I.normal,inline:A.normal};this.options.pedantic?(t.block=I.pedantic,t.inline=A.pedantic):this.options.gfm&&(t.block=I.gfm,this.options.breaks?t.inline=A.breaks:t.inline=A.gfm),this.tokenizer.rules=t}static get rules(){return{block:I,inline:A}}static lex(e,t){return new Q(t).lex(e)}static lexInline(e,t){return new Q(t).inlineTokens(e)}lex(e){e=e.replace(f.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(f.tabCharGlobal,"    ").replace(f.spaceLine,""));let a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let r;if(this.options.extensions?.block?.some(i=>(r=i.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=t.at(-1);r.raw.length===1&&i!==void 0?i.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let l=e;if(this.options.extensions?.startBlock){let i=1/0,o=e.slice(1),c;this.options.extensions.startBlock.forEach(p=>{c=p.call({lexer:this},o),typeof c=="number"&&c>=0&&(i=Math.min(i,c))}),i<1/0&&i>=0&&(l=e.substring(0,i+1))}if(this.state.top&&(r=this.tokenizer.paragraph(l))){let i=t.at(-1);s&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r),s=l.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=t.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let s=e;if(this.tokens.links){let i=Object.keys(this.tokens.links);i.length>0&&(s=s.replace(this.tokenizer.rules.inline.reflinkSearch,o=>i.includes(o.slice(o.lastIndexOf("[")+1,-1))?"["+"a".repeat(o.length-2)+"]":o))}s=s.replace(this.tokenizer.rules.inline.anyPunctuation,"++"),s=s.replace(this.tokenizer.rules.inline.blockSkip,(i,o,c)=>{let p=c?c.length:0;return i.slice(0,p)+"["+"a".repeat(i.length-p-2)+"]"}),s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let a=!1,r="",l=1/0;for(;e;){if(e.length<l)l=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}a||(r=""),a=!1;let i;if(this.options.extensions?.inline?.some(c=>(i=c.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length);let c=t.at(-1);i.type==="text"&&c?.type==="text"?(c.raw+=i.raw,c.text+=i.text):t.push(i);continue}if(i=this.tokenizer.emStrong(e,s,r)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.del(e,s,r)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),t.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),t.push(i);continue}let o=e;if(this.options.extensions?.startInline){let c=1/0,p=e.slice(1),u;this.options.extensions.startInline.forEach(d=>{u=d.call({lexer:this},p),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(o=e.substring(0,c+1))}if(i=this.tokenizer.inlineText(o)){e=e.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(r=i.raw.slice(-1)),a=!0;let c=t.at(-1);c?.type==="text"?(c.raw+=i.raw,c.text+=i.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t="Infinite loop on byte: "+e;if(this.options.silent)console.error(t);else throw new Error(t)}},j=class{options;parser;constructor(n){this.options=n||v}space(n){return""}code({text:n,lang:e,escaped:t}){let s=(e||"").match(f.notSpaceStart)?.[0],a=n.replace(f.endingNewline,"")+`
`;return s?'<pre><code class="language-'+y(s)+'">'+(t?a:y(a,!0))+`</code></pre>
`:"<pre><code>"+(t?a:y(a,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){let e=n.ordered,t=n.start,s="";for(let l=0;l<n.items.length;l++){let i=n.items[l];s+=this.listitem(i)}let a=e?"ol":"ul",r=e&&t!==1?' start="'+t+'"':"";return"<"+a+r+`>
`+s+"</"+a+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",t="";for(let a=0;a<n.header.length;a++)t+=this.tablecell(n.header[a]);e+=this.tablerow({text:t});let s="";for(let a=0;a<n.rows.length;a++){let r=n.rows[a];t="";for(let l=0;l<r.length;l++)t+=this.tablecell(r[l]);s+=this.tablerow({text:t})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let e=this.parser.parseInline(n.tokens),t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${y(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,tokens:t}){let s=this.parser.parseInline(t),a=se(n);if(a===null)return s;n=a;let r='<a href="'+n+'"';return e&&(r+=' title="'+y(e)+'"'),r+=">"+s+"</a>",r}image({href:n,title:e,text:t,tokens:s}){s&&(t=this.parser.parseInline(s,this.parser.textRenderer));let a=se(n);if(a===null)return y(t);n=a;let r=`<img src="${n}" alt="${y(t)}"`;return e&&(r+=` title="${y(e)}"`),r+=">",r}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:y(n.text)}},X=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}checkbox({raw:n}){return n}},x=class O{options;renderer;textRenderer;constructor(e){this.options=e||v,this.options.renderer=this.options.renderer||new j,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new X}static parse(e,t){return new O(t).parse(e)}static parseInline(e,t){return new O(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let s=0;s<e.length;s++){let a=e[s];if(this.options.extensions?.renderers?.[a.type]){let l=a,i=this.options.extensions.renderers[l.type].call({parser:this},l);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","checkbox","html","def","paragraph","text"].includes(l.type)){t+=i||"";continue}}let r=a;switch(r.type){case"space":{t+=this.renderer.space(r);break}case"hr":{t+=this.renderer.hr(r);break}case"heading":{t+=this.renderer.heading(r);break}case"code":{t+=this.renderer.code(r);break}case"table":{t+=this.renderer.table(r);break}case"blockquote":{t+=this.renderer.blockquote(r);break}case"list":{t+=this.renderer.list(r);break}case"checkbox":{t+=this.renderer.checkbox(r);break}case"html":{t+=this.renderer.html(r);break}case"def":{t+=this.renderer.def(r);break}case"paragraph":{t+=this.renderer.paragraph(r);break}case"text":{t+=this.renderer.text(r);break}default:{let l='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let s="";for(let a=0;a<e.length;a++){let r=e[a];if(this.options.extensions?.renderers?.[r.type]){let i=this.options.extensions.renderers[r.type].call({parser:this},r);if(i!==!1||!["escape","html","link","image","checkbox","strong","em","codespan","br","del","text"].includes(r.type)){s+=i||"";continue}}let l=r;switch(l.type){case"escape":{s+=t.text(l);break}case"html":{s+=t.html(l);break}case"link":{s+=t.link(l);break}case"image":{s+=t.image(l);break}case"checkbox":{s+=t.checkbox(l);break}case"strong":{s+=t.strong(l);break}case"em":{s+=t.em(l);break}case"codespan":{s+=t.codespan(l);break}case"br":{s+=t.br(l);break}case"del":{s+=t.del(l);break}case"text":{s+=t.text(l);break}default:{let i='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return s}},E=class{options;block;constructor(n){this.options=n||v}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(n=this.block){return n?b.lex:b.lexInline}provideParser(n=this.block){return n?x.parse:x.parseInline}},xt=class{defaults=U();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=x;Renderer=j;TextRenderer=X;Lexer=b;Tokenizer=B;Hooks=E;constructor(...n){this.use(...n)}walkTokens(n,e){let t=[];for(let s of n)switch(t=t.concat(e.call(this,s)),s.type){case"table":{let a=s;for(let r of a.header)t=t.concat(this.walkTokens(r.tokens,e));for(let r of a.rows)for(let l of r)t=t.concat(this.walkTokens(l.tokens,e));break}case"list":{let a=s;t=t.concat(this.walkTokens(a.items,e));break}default:{let a=s;this.defaults.extensions?.childTokens?.[a.type]?this.defaults.extensions.childTokens[a.type].forEach(r=>{let l=a[r].flat(1/0);t=t.concat(this.walkTokens(l,e))}):a.tokens&&(t=t.concat(this.walkTokens(a.tokens,e)))}}return t}use(...n){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(t=>{let s={...t};if(s.async=this.defaults.async||s.async||!1,t.extensions&&(t.extensions.forEach(a=>{if(!a.name)throw new Error("extension name required");if("renderer"in a){let r=e.renderers[a.name];r?e.renderers[a.name]=function(...l){let i=a.renderer.apply(this,l);return i===!1&&(i=r.apply(this,l)),i}:e.renderers[a.name]=a.renderer}if("tokenizer"in a){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=e[a.level];r?r.unshift(a.tokenizer):e[a.level]=[a.tokenizer],a.start&&(a.level==="block"?e.startBlock?e.startBlock.push(a.start):e.startBlock=[a.start]:a.level==="inline"&&(e.startInline?e.startInline.push(a.start):e.startInline=[a.start]))}"childTokens"in a&&a.childTokens&&(e.childTokens[a.name]=a.childTokens)}),s.extensions=e),t.renderer){let a=this.defaults.renderer||new j(this.defaults);for(let r in t.renderer){if(!(r in a))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let l=r,i=t.renderer[l],o=a[l];a[l]=(...c)=>{let p=i.apply(a,c);return p===!1&&(p=o.apply(a,c)),p||""}}s.renderer=a}if(t.tokenizer){let a=this.defaults.tokenizer||new B(this.defaults);for(let r in t.tokenizer){if(!(r in a))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let l=r,i=t.tokenizer[l],o=a[l];a[l]=(...c)=>{let p=i.apply(a,c);return p===!1&&(p=o.apply(a,c)),p}}s.tokenizer=a}if(t.hooks){let a=this.defaults.hooks||new E;for(let r in t.hooks){if(!(r in a))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let l=r,i=t.hooks[l],o=a[l];E.passThroughHooks.has(r)?a[l]=c=>{if(this.defaults.async&&E.passThroughHooksRespectAsync.has(r))return(async()=>{let u=await i.call(a,c);return o.call(a,u)})();let p=i.call(a,c);return o.call(a,p)}:a[l]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await i.apply(a,c);return u===!1&&(u=await o.apply(a,c)),u})();let p=i.apply(a,c);return p===!1&&(p=o.apply(a,c)),p}}s.hooks=a}if(t.walkTokens){let a=this.defaults.walkTokens,r=t.walkTokens;s.walkTokens=function(l){let i=[];return i.push(r.call(this,l)),a&&(i=i.concat(a.call(this,l))),i}}this.defaults={...this.defaults,...s}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return b.lex(n,e??this.defaults)}parser(n,e){return x.parse(n,e??this.defaults)}parseMarkdown(n){return(e,t)=>{let s={...t},a={...this.defaults,...s},r=this.onError(!!a.silent,!!a.async);if(this.defaults.async===!0&&s.async===!1)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(a.hooks&&(a.hooks.options=a,a.hooks.block=n),a.async)return(async()=>{let l=a.hooks?await a.hooks.preprocess(e):e,i=await(a.hooks?await a.hooks.provideLexer(n):n?b.lex:b.lexInline)(l,a),o=a.hooks?await a.hooks.processAllTokens(i):i;a.walkTokens&&await Promise.all(this.walkTokens(o,a.walkTokens));let c=await(a.hooks?await a.hooks.provideParser(n):n?x.parse:x.parseInline)(o,a);return a.hooks?await a.hooks.postprocess(c):c})().catch(r);try{a.hooks&&(e=a.hooks.preprocess(e));let l=(a.hooks?a.hooks.provideLexer(n):n?b.lex:b.lexInline)(e,a);a.hooks&&(l=a.hooks.processAllTokens(l)),a.walkTokens&&this.walkTokens(l,a.walkTokens);let i=(a.hooks?a.hooks.provideParser(n):n?x.parse:x.parseInline)(l,a);return a.hooks&&(i=a.hooks.postprocess(i)),i}catch(l){return r(l)}}}onError(n,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let s="<p>An error occurred:</p><pre>"+y(t.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(t);throw t}}},$=new xt;function g(n,e){return $.parse(n,e)}g.options=g.setOptions=function(n){return $.setOptions(n),g.defaults=$.defaults,oe(g.defaults),g};g.getDefaults=U;g.defaults=v;function wt(...n){return $.use(...n),g.defaults=$.defaults,oe(g.defaults),g}g.use=wt;g.walkTokens=function(n,e){return $.walkTokens(n,e)};g.parseInline=$.parseInline;g.Parser=x;g.parser=x.parse;g.Renderer=j;g.TextRenderer=X;g.Lexer=b;g.lexer=b.lex;g.Tokenizer=B;g.Hooks=E;g.parse=g;g.options;g.setOptions;g.walkTokens;g.parseInline;x.parse;b.lex;function yt(n){if(n instanceof Date)return Number.isNaN(n.getTime())?null:n.toISOString().slice(0,10);if(typeof n=="string"){const e=n.trim();return e.length>0?e:null}return null}const St=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;function qt(n,e){const t=n.match(St);if(!t)return console.warn(`[blog] "${e}" has no frontmatter block; skipping.`),{data:{},body:n};try{return{data:we.load(t[1])??{},body:n.slice(t[0].length)}}catch(s){return console.warn(`[blog] Invalid YAML frontmatter in "${e}":`,s),{data:{},body:n.slice(t[0].length)}}}const Rt=200;function $t(n){const e=n.trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.round(e/Rt))}g.setOptions({gfm:!0,breaks:!1});const vt=Object.assign({"../content/blog/cinco-errores-pymes-ciberseguridad.md":ye,"../content/blog/contrasenas-seguras-guia-practica.md":Se,"../content/blog/ley-proteccion-datos-el-salvador-guia.md":qe});function Tt(){const n=[];for(const[e,t]of Object.entries(vt)){const s=e.split("/").pop().replace(/\.md$/,""),{data:a,body:r}=qt(t,s),l=yt(a.date);if(!a.title||!l){console.warn(`[blog] "${s}" is missing a valid "title" or "date"; skipping.`);continue}a.draft||n.push({slug:s,title:a.title,date:l,excerpt:a.excerpt??"",author:a.author??"Equipo Nubitlan",tags:Array.isArray(a.tags)?a.tags.filter(i=>typeof i=="string"):[],draft:a.draft??!1,html:g.parse(r,{async:!1}),readingMinutes:$t(r)})}return n.sort((e,t)=>t.date.localeCompare(e.date))}const J=Tt();function Pt(n){return J.find(e=>e.slug===n)}function At(){const n=new Map;for(const e of J)for(const t of e.tags)n.set(t,(n.get(t)??0)+1);return[...n.entries()].sort((e,t)=>t[1]-e[1]||e[0].localeCompare(t[0])).map(([e])=>e)}function Et(n,e=2){return J.filter(t=>t.slug!==n.slug).map(t=>({post:t,shared:t.tags.filter(s=>n.tags.includes(s)).length})).filter(t=>t.shared>0).sort((t,s)=>s.shared-t.shared||s.post.date.localeCompare(t.post.date)).slice(0,e).map(t=>t.post)}const zt=new Intl.DateTimeFormat("es-SV",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});function Lt(n){const e=new Date(`${n}T00:00:00Z`);return Number.isNaN(e.getTime())?n:zt.format(e)}export{Et as a,At as b,Lt as f,Pt as g,J as p};
