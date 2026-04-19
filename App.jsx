import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Circle, ChevronRight, ChevronDown, Award, Brain, Target, TrendingUp, AlertCircle, Lightbulb, RotateCcw, Home, FileText, Zap, BarChart3, HelpCircle, Trophy, ArrowLeft } from 'lucide-react';

// ============================================================
// CONTENIDO: diseños, ejemplos, quizzes
// ============================================================

const CLASIFICACION = {
  cuasi: {
    nombre: 'Diseños cuasiexperimentales',
    color: 'indigo',
    hijos: {
      gcne: {
        nombre: 'Grupo control no equivalente',
        disenos: ['pretest_postest', 'vd_no_equiv', 'trat_invertido']
      },
      sti: {
        nombre: 'Serie Temporal Interrumpida (STI)',
        disenos: ['sti_simple', 'sti_gc', 'sti_vd', 'sti_retirada', 'sti_replic_mult', 'sti_replic_camb']
      }
    }
  },
  intrasujeto: {
    nombre: 'Diseños de replicación intrasujeto',
    color: 'emerald',
    hijos: {
      reversion: {
        nombre: 'Diseños de reversión',
        disenos: ['aba', 'abab', 'abab_inv', 'bab', 'multinivel', 'trat_multiple', 'interactivos']
      },
      no_reversion: {
        nombre: 'Diseños de no reversión',
        disenos: ['ab', 'lbm_conductas', 'lbm_sujetos', 'lbm_situaciones', 'cambio_criterio']
      }
    }
  }
};

const DISENOS = {
  // ============ GRUPO CONTROL NO EQUIVALENTE ============
  pretest_postest: {
    familia: 'cuasi',
    nombre: 'Pretest-postest con grupo control no equivalente',
    notacion: 'O X O\n- - - - -\nO   O',
    notacionVisual: [
      ['O', 'X', 'O'],
      ['O', ' ', 'O']
    ],
    separador: true,
    teoria: `Este es el diseño cuasiexperimental más extendido en investigación educativa y social. Se caracteriza por trabajar con dos grupos naturales (no aleatorios): un grupo experimental que recibe el tratamiento (X) y un grupo control que no lo recibe. En ambos grupos se realizan registros pretest (antes del tratamiento) y postest (después).

La línea discontinua en la notación indica que los grupos no son equivalentes inicialmente, es decir, no se ha realizado asignación aleatoria. Se parte de grupos ya formados (dos aulas, dos hospitales, dos empresas, etc.).

El pretest cumple una función doble: (1) permite determinar la equivalencia inicial entre los grupos antes del tratamiento, y (2) permite controlar la presencia de variables contaminadoras, ya que si no hubiera tratamiento, no deberían producirse cambios en el grupo control.`,
    ejemplo: `Una investigadora quiere evaluar el efecto de un programa de mindfulness sobre la ansiedad en alumnos de secundaria. Selecciona dos clases de 4º ESO del mismo instituto. A una clase (grupo experimental) se le aplica el programa durante 8 semanas; a la otra (grupo control) se le mantiene con la actividad habitual. Ambos grupos cumplimentan el STAI antes y después de las 8 semanas.`,
    controla: ['Historia (parcialmente)', 'Maduración', 'Instrumentación', 'Administración de tests'],
    amenazas: ['Selección diferencial × historia', 'Selección diferencial × maduración', 'Regresión hacia la media (si los grupos se seleccionaron por puntuaciones extremas)'],
    ventajas: ['Alta viabilidad en contextos aplicados', 'Permite comparación inter e intragrupo', 'Control razonable de varias amenazas clásicas'],
    inconvenientes: ['Grupos no equivalentes → interacciones con selección', 'Difícil asegurar comparabilidad inicial completa'],
    patron: 'pretest_postest'
  },
  vd_no_equiv: {
    familia: 'cuasi',
    nombre: 'Grupo control con variables dependientes no equivalentes',
    notacion: 'O₁ₐ X O₂ₐ\n- - - - -\nO₁ᵦ   O₂ᵦ',
    notacionVisual: [
      ['O₁ₐ', 'X', 'O₂ₐ'],
      ['O₁ᵦ', ' ', 'O₂ᵦ']
    ],
    separador: true,
    teoria: `Variante propuesta por Cook y Campbell donde se emplean al menos dos grupos de sujetos con un rasgo distintivo: la variable dependiente registrada en cada grupo es diferente, aunque ambas VDs deben ser sensibles al mismo tratamiento y a las mismas variables contaminadoras.

León y Montero (2015) proponen una variante relevante: registrar dos VDs en un único grupo de sujetos (esquema sin línea divisoria). El tratamiento se aplica solo sobre una VD; la segunda actúa como control de variables contaminadoras. Si cambia la VD que no recibe tratamiento, habrá alguna variable extraña actuando.`,
    ejemplo: `Una psicóloga aplica un programa de economía de fichas en un hospital psiquiátrico para aumentar la conducta de tirar vasos desechables a la basura (VD₁). Como control, registra también el orden en las habitaciones (VD₂), conducta sensible al mismo tipo de refuerzo pero sobre la que NO se implanta el tratamiento. Si solo cambia VD₁, se puede atribuir el cambio al programa. Si cambian ambas, hay otra variable actuando (p. ej., la supervisora ha cambiado otras reglas simultáneamente).`,
    controla: ['Variables contaminadoras mediante la VD no tratada', 'Mejor aislamiento del efecto del tratamiento'],
    amenazas: ['Selección diferencial', 'Dificultad de encontrar VDs verdaderamente equiparables'],
    ventajas: ['Potente control interno mediante VD no tratada', 'Puede aplicarse con un único grupo (versión León y Montero)'],
    inconvenientes: ['Encontrar VDs sensibles al mismo tratamiento es difícil', 'Si ambas VDs cambian, la conclusión queda comprometida'],
    patron: 'pretest_postest'
  },
  trat_invertido: {
    familia: 'cuasi',
    nombre: 'Diseño con tratamiento invertido',
    notacion: 'O X+ O\n- - - - -\nO X- O',
    notacionVisual: [
      ['O', 'X+', 'O'],
      ['O', 'X-', 'O']
    ],
    separador: true,
    teoria: `En este diseño se aplican dos tratamientos conceptualmente opuestos (X+ y X-) a dos grupos diferentes. Se espera que X+ produzca un efecto en una dirección determinada y X- produzca el efecto contrario.

La gran ventaja es que permite descartar amenazas como la interacción selección × maduración, porque sería muy improbable que estas amenazas justificaran cambios en direcciones opuestas. Si el tratamiento es realmente el responsable de los cambios, debe observarse un efecto diferencial (opuesto) entre los dos grupos.`,
    ejemplo: `Estudio sobre el efecto del ejercicio intenso previo al sueño. Grupo 1 (X+): pedalea 3h al 70% de la FC máxima justo antes de acostarse. Grupo 2 (X-): permanece sentado y despierto 3h antes de acostarse. Se registra el tiempo en conciliar el sueño antes y después. Si la hipótesis es correcta, los grupos deben mostrar cambios en direcciones opuestas respecto a su pretest.`,
    controla: ['Selección × maduración', 'Historia (en parte)', 'Regresión hacia la media'],
    amenazas: ['Dificultades éticas y prácticas para aplicar un tratamiento "contrario"', 'Disponibilidad de tratamientos verdaderamente opuestos'],
    ventajas: ['Alta validez interna', 'Descarta amenazas clave al mostrar efectos en direcciones opuestas'],
    inconvenientes: ['No siempre es ético aplicar un tratamiento conceptualmente opuesto', 'Puede ser difícil definir qué es un tratamiento "inverso"'],
    patron: 'trat_invertido'
  },
  // ============ SERIE TEMPORAL INTERRUMPIDA ============
  sti_simple: {
    familia: 'cuasi',
    nombre: 'Diseño simple de Serie Temporal Interrumpida',
    notacion: 'O₁ O₂ O₃ O₄ O₅ X O₆ O₇ O₈ O₉ O₁₀',
    notacionVisual: [['O₁','O₂','O₃','O₄','O₅','X','O₆','O₇','O₈','O₉','O₁₀']],
    teoria: `Diseño base de la familia STI. Su característica definitoria es el registro repetido de la VD a lo largo del tiempo, bajo condiciones idénticas, con un único grupo. En algún momento se introduce el tratamiento (X) "interrumpiendo" la serie.

Se diferencian dos fases: fase de no tratamiento (pretest) y fase de tratamiento (postest). El análisis se centra en la discontinuidad entre ambas series: cambio de nivel o de tendencia, inmediato o retardado, continuo o pasajero.

Permite controlar amenazas como maduración, instrumentación, cambios cíclicos y regresión estadística. Sin embargo, su principal amenaza es la historia: algún acontecimiento externo puede coincidir con la introducción del tratamiento y ser el verdadero responsable de los cambios.`,
    ejemplo: `Evaluación del impacto de una nueva ley de seguridad vial sobre el número mensual de accidentes de tráfico. Se recogen datos mensuales durante los 2 años previos a la ley (fase pretest) y durante los 2 años posteriores (fase postest). Se analiza si existe discontinuidad (cambio de nivel o tendencia) entre ambas fases.`,
    controla: ['Maduración', 'Instrumentación', 'Cambios cíclicos', 'Regresión estadística'],
    amenazas: ['HISTORIA (principal)', 'Especialmente problemática si los efectos son retardados', 'Factores estacionales, ciclos institucionales'],
    ventajas: ['Muy utilizado en evaluación de programas', 'Permite estudiar distintos tipos de cambio (nivel/tendencia)', 'Excelente validez externa'],
    inconvenientes: ['Vulnerable a la amenaza de historia', 'Requiere series largas de datos'],
    patron: 'sti_simple'
  },
  sti_gc: {
    familia: 'cuasi',
    nombre: 'STI con grupo control no equivalente',
    notacion: 'O₁ O₂ O₃ O₄ O₅ X O₆ O₇ O₈ O₉ O₁₀\n- - - - - - - - - - - - - - - - - - -\nO₁ O₂ O₃ O₄ O₅    O₆ O₇ O₈ O₉ O₁₀',
    notacionVisual: [
      ['O₁','O₂','O₃','O₄','O₅','X','O₆','O₇','O₈','O₉','O₁₀'],
      ['O₁','O₂','O₃','O₄','O₅',' ','O₆','O₇','O₈','O₉','O₁₀']
    ],
    separador: true,
    teoria: `Mejora del STI simple añadiendo un grupo control no equivalente (natural, sin tratamiento) sobre el que se realizan los mismos registros en los mismos momentos. Esta incorporación controla la principal amenaza del STI simple: la historia.

Si un acontecimiento externo afecta a ambos grupos por igual, se reflejará en ambas series. Si solo cambia el grupo experimental en el momento de la intervención, la inferencia causal se refuerza considerablemente.

Como contrapartida, se introducen nuevas amenazas: interacción selección diferencial × historia e interacción selección × maduración, especialmente si los grupos difieren mucho entre sí.`,
    ejemplo: `Evaluación de un programa de reducción de conductas disruptivas en un aula de 1º ESO. Se mide semanalmente durante 25 semanas el porcentaje de conductas inapropiadas. El grupo experimental (una clase) recibe el programa; el grupo control (otra clase del mismo centro y nivel) no. Ambas series se registran en paralelo durante 60 sesiones.`,
    controla: ['Historia (principal mejora respecto al STI simple)', 'Maduración general', 'Instrumentación'],
    amenazas: ['Selección × historia', 'Selección × maduración (si los grupos difieren mucho)'],
    ventajas: ['Mayor validez interna que STI simple', 'Controla la amenaza de historia'],
    inconvenientes: ['Difícil encontrar un grupo control similar', 'Introduce amenazas de interacción con selección'],
    patron: 'sti_gc'
  },
  sti_vd: {
    familia: 'cuasi',
    nombre: 'STI con variables dependientes no equivalentes',
    notacion: 'O₁ₐ O₂ₐ O₃ₐ X O₄ₐ O₅ₐ O₆ₐ\nO₁ᵦ O₂ᵦ O₃ᵦ    O₄ᵦ O₅ᵦ O₆ᵦ',
    notacionVisual: [
      ['O₁ₐ','O₂ₐ','O₃ₐ','X','O₄ₐ','O₅ₐ','O₆ₐ'],
      ['O₁ᵦ','O₂ᵦ','O₃ᵦ',' ','O₄ᵦ','O₅ᵦ','O₆ᵦ']
    ],
    separador: false,
    teoria: `Variante que registra simultáneamente dos (o más) VDs en el mismo grupo, a lo largo de todo el tiempo, antes y después de la intervención. Las VDs deben estar conceptualmente relacionadas y ser sensibles al mismo tratamiento (que es único).

Si tras la intervención ambas VDs siguen la misma tendencia en la fase de tratamiento, aumenta la seguridad de que el tratamiento es el responsable del cambio.

León y Montero (2015) plantean la variante de un único grupo con dos VDs, donde una recibe el tratamiento y la otra actúa como control interno (lo cual también es válido en la variante STI).`,
    ejemplo: `Estudio sobre el impacto de una campaña de prevención de accidentes de tráfico. Se registran dos VDs en paralelo: (1) accidentes en horas punta de ida al trabajo y (2) accidentes en noches de fin de semana. Ambas son sensibles a la misma campaña pero se espera que cambien en la misma dirección si la intervención es eficaz.`,
    controla: ['Variables contaminadoras por convergencia de patrones', 'Historia (si una VD cambia y otra no)'],
    amenazas: ['Dificultad de encontrar VDs con sensibilidad equivalente'],
    ventajas: ['Mayor seguridad al observar patrones convergentes en varias VDs', 'No requiere grupo control'],
    inconvenientes: ['Selección de VDs comparables es compleja', 'Si las VDs divergen, interpretación problemática'],
    patron: 'sti_vd'
  },
  sti_retirada: {
    familia: 'cuasi',
    nombre: 'STI con retirada de tratamiento',
    notacion: 'O₁...O₅ X O₆...O₁₀ X̄ O₁₁...O₁₄',
    notacionVisual: [['O₁','O₂','O₃','O₄','O₅','X','O₆','O₇','O₈','O₉','O₁₀','X̄','O₁₁','O₁₂','O₁₃','O₁₄']],
    teoria: `Variante en la que, tras implantar el tratamiento y mantenerlo durante un periodo, se retira y se continúa registrando la VD. Esto produce TRES series de registros:
• Serie 1 (O₁-O₅): fase pretest (sin tratamiento)
• Serie 2 (O₆-O₁₀): fase de tratamiento
• Serie 3 (O₁₁-O₁₄): fase post-retirada del tratamiento

La lógica es potente: si la conducta mejora al implantar el tratamiento Y empeora al retirarlo, hay evidencia clara de que el tratamiento es el responsable del cambio. Controla indirectamente la historia porque sería improbable que una variable externa actuara en direcciones opuestas en dos momentos diferentes.

Inconveniente principal: la desmoralización del grupo al retirar una medida que se había mostrado eficaz.`,
    ejemplo: `Estudio sobre un programa de refuerzo positivo en una clase para reducir agresiones. Se registran agresiones semanales durante 5 semanas (pretest), se aplica el programa durante 5 semanas, y después se retira durante 4 semanas más para comprobar si las agresiones vuelven a aumentar.`,
    controla: ['Historia (control indirecto potente)', 'Maduración', 'Instrumentación'],
    amenazas: ['Efectos irreversibles del tratamiento', 'Desmoralización del grupo'],
    ventajas: ['Alta validez interna', 'Evidencia causal robusta si la VD revierte'],
    inconvenientes: ['Éticamente cuestionable retirar un tratamiento eficaz', 'No aplicable a tratamientos con efectos permanentes'],
    patron: 'sti_retirada'
  },
  sti_replic_mult: {
    familia: 'cuasi',
    nombre: 'STI con replicaciones múltiples',
    notacion: 'O X O X̄ O X O X̄ O ... (alternancia repetida)',
    notacionVisual: [['O','X','O','X̄','O','X','O','X̄','O','X','O']],
    teoria: `Se introduce el tratamiento, se retira, se reintroduce y se retira de nuevo sucesivamente (al menos 4 fases: dos de no tratamiento y dos de tratamiento). Si los sujetos reaccionan de la misma forma cada vez que se introduce el tratamiento y lo hacen de manera coherente cada vez que se retira, el patrón es una evidencia muy fuerte del efecto del tratamiento.

Desde el punto de vista de la validez interna es superior al STI simple. No obstante, presenta dos limitaciones importantes:
1) Solo es adecuado cuando los efectos del tratamiento son INMEDIATOS y DESAPARECEN RÁPIDAMENTE tras la retirada.
2) Requiere un alto grado de control, normalmente solo alcanzable en contextos cerrados (hospitales, prisiones, laboratorio, escuelas con alto control).`,
    ejemplo: `Estudio policial en un distrito urbano: se introduce patrullaje intensivo con coche + helicóptero, luego solo coche patrulla, luego de nuevo coche + helicóptero, y se alterna para comprobar si la tasa de robos domésticos fluctúa en función de la presencia del recurso aéreo.`,
    controla: ['Historia', 'Maduración', 'Instrumentación', 'Cualquier amenaza que no actúe de forma alternada'],
    amenazas: ['Efectos irreversibles', 'Efectos acumulativos del tratamiento', 'Pérdida de control en contextos naturales'],
    ventajas: ['Muy alta validez interna', 'Evidencia fuerte por replicación intra-diseño'],
    inconvenientes: ['Solo para efectos inmediatos y reversibles', 'Difícil de aplicar fuera de contextos cerrados'],
    patron: 'sti_replic_mult'
  },
  sti_replic_camb: {
    familia: 'cuasi',
    nombre: 'STI con replicaciones cambiadas',
    notacion: 'G1: O O O X O O O\nG2: O O O O O X O (tratamiento desfasado)',
    notacionVisual: [
      ['O','O','O','X','O','O','O'],
      ['O','O','O','O','O','X','O']
    ],
    separador: false,
    teoria: `Se utilizan dos grupos no equivalentes, ambos expuestos al mismo tratamiento PERO EN MOMENTOS TEMPORALES DIFERENTES. Mientras un grupo recibe el tratamiento, el otro actúa como control, y viceversa cuando más tarde se aplica al segundo grupo.

Ventajas clave:
• Validez interna alta: se controla la amenaza de historia (muy improbable que los cambios coincidan con la intervención en dos momentos distintos).
• Validez externa: al encontrar cambios en la misma dirección en grupos y momentos diferentes, se refuerza la generalización.
• Especialmente útil para detectar efectos con periodo de retraso impredecible.`,
    ejemplo: `Evaluación del impacto de la introducción de la televisión sobre el promedio de libros leídos por habitante en dos comunidades. En la comunidad urbana la TV se introdujo en 1951; en la rural, en 1957. Se registra la lectura antes y después en ambas, usando la introducción desfasada para descartar la hipótesis de que otros factores históricos paralelos expliquen los cambios.`,
    controla: ['Historia (excelente control)', 'Maduración si es similar entre grupos'],
    amenazas: ['Efectos específicos de cada grupo', 'Diferencias en retardo entre grupos'],
    ventajas: ['Alta validez interna Y externa', 'Ideal para efectos con retardo impredecible'],
    inconvenientes: ['Requiere dos grupos comparables', 'Si los grupos difieren mucho, interpretación complicada'],
    patron: 'sti_replic_camb'
  },
  // ============ REVERSIÓN SIMPLE ============
  aba: {
    familia: 'intrasujeto',
    nombre: 'Diseño A-B-A (reversión de 3 fases)',
    notacion: 'A: OOOOOO | B: IOOOOOO | A: OOOOOO',
    notacionVisual: [['A','A','A','A','A','|','B','B','B','B','B','|','A','A','A','A','A']],
    teoria: `Modelo básico de los diseños de reversión. Consta de tres fases: línea base (A), tratamiento (B) y retorno a línea base (A).

La comparación A-B informa sobre el efecto de introducir el tratamiento; la comparación B-A (segunda) informa sobre el efecto de retirarlo. Si al retirar el tratamiento la conducta vuelve al nivel basal original, se confirma que el tratamiento (y no otra variable) fue el responsable del cambio.

Es un diseño potente y sencillo. Sin embargo, presenta limitaciones éticas importantes en contextos clínicos: no siempre es aceptable dejar al paciente en fase de no tratamiento tras haber mostrado mejoría.`,
    ejemplo: `Un niño con conducta disruptiva en el aula. Fase A (LB, 2 semanas): se registra la frecuencia diaria de conductas disruptivas sin intervención. Fase B (tratamiento, 3 semanas): se aplica economía de fichas. Fase A (retirada, 2 semanas): se retira la economía de fichas y se sigue registrando. Si la conducta vuelve a los niveles basales, el tratamiento era el responsable del cambio.`,
    controla: ['Historia', 'Reactividad experimental', 'Maduración', 'Efectos del paso del tiempo'],
    amenazas: ['Imposibilidad de reversión completa', 'Efectos residuales del tratamiento'],
    ventajas: ['Potente y sencillo', 'Control de múltiples amenazas'],
    inconvenientes: ['Limitaciones éticas (acaba en fase sin tratamiento)', 'No siempre la conducta vuelve realmente a la LB'],
    patron: 'aba'
  },
  abab: {
    familia: 'intrasujeto',
    nombre: 'Diseño A-B-A-B (reversión de 4 fases)',
    notacion: 'A: OOOOOO | B: IOOOOOO | A: OOOOO | B: IOOOOO',
    notacionVisual: [['A','A','A','A','A','|','B','B','B','B','B','|','A','A','A','A','|','B','B','B','B']],
    teoria: `Extensión del A-B-A con una segunda fase de tratamiento. El investigador realiza una REPLICACIÓN del efecto del tratamiento dentro del propio diseño.

La tercera fase (segunda A) es crítica: permite comprobar si la retirada del tratamiento produce regresión a niveles basales. La cuarta fase (segunda B) permite verificar si al reintroducir el tratamiento, se reproduce el cambio conductual.

Diversos autores exigen que la primera LB sea estacionaria y que la segunda LB muestre el nivel inicial (algo a lo que los psicólogos clínicos suelen poner objeciones por razones éticas). El diseño termina con tratamiento, lo que resuelve la principal objeción ética del A-B-A.`,
    ejemplo: `Un adulto con insomnio crónico. Fase A1 (LB, 10 días): se registra el tiempo en conciliar el sueño. Fase B1 (higiene del sueño + relajación, 10 días). Fase A2 (retirada, 7 días). Fase B2 (reintroducción, 10 días). Si el tiempo para dormirse mejora en B1, empeora en A2 y vuelve a mejorar en B2, la evidencia a favor del tratamiento es muy sólida.`,
    controla: ['Historia', 'Maduración', 'Reactividad'],
    amenazas: ['Efectos irreversibles del tratamiento', 'Deterioro deliberado en la segunda A'],
    ventajas: ['Termina con tratamiento (éticamente más aceptable que A-B-A)', 'Replicación intra-diseño', 'Mayor validez interna'],
    inconvenientes: ['Prolongada segunda LB problemática', 'No deseable dejar que la conducta se deteriore tras haber mejorado'],
    patron: 'abab'
  },
  abab_inv: {
    familia: 'intrasujeto',
    nombre: 'A-B-A-B con técnica de inversión (Leitenberg, 1973)',
    notacion: 'Cond. A: OOO IOOOO OOOOO IOOOO\nCond. B: OOO IOOOO OOOOO IOOOO',
    notacionVisual: [
      ['O','O','O','I','O','O','O','O','|','O','O','O','O','O','|','I','O','O','O','O'],
      ['O','O','O','I','O','O','O','O','|','O','O','O','O','O','|','I','O','O','O','O']
    ],
    separador: false,
    teoria: `Variante propuesta por Leitenberg que registra DOS conductas INCOMPATIBLES del mismo sujeto: la que se desea mejorar y una opuesta que debería disminuir.

En la primera fase (LB) se registran ambas. En la segunda (B), el tratamiento se dirige a potenciar una y/o reducir la otra. En la tercera fase ("de inversión crítica"), se INVIERTE la aplicación del tratamiento: si antes se reforzaba la conducta A, ahora se refuerza la B. Si el tratamiento es realmente efectivo, debe observarse una inversión del efecto en ambas conductas (cruce de patrones). En la cuarta fase se restablece el tratamiento original.

La principal dificultad es encontrar una conducta INCOMPATIBLE adecuada.`,
    ejemplo: `Niña hospitalizada que interactúa poco con adultos y demasiado con niños pequeños a los que molesta. Conducta A (interacción con adultos) y Conducta B (interacción con niños). En B1 se refuerza la interacción con adultos. En A2 (inversión crítica) se refuerza la interacción con niños. En B2 se vuelve a reforzar la interacción con adultos. Si las dos conductas muestran patrones cruzados coincidentes con el cambio de contingencia, el tratamiento es responsable.`,
    controla: ['Historia', 'Maduración', 'Efectos de inversión refuerzan causalidad'],
    amenazas: ['Dificultad de encontrar conductas verdaderamente incompatibles'],
    ventajas: ['Evidencia causal muy robusta por patrones cruzados', 'No requiere retirada completa del tratamiento'],
    inconvenientes: ['Encontrar/definir conducta incompatible es complejo'],
    patron: 'abab_inv'
  },
  bab: {
    familia: 'intrasujeto',
    nombre: 'Diseño B-A-B (supresión)',
    notacion: 'B: IOOOOOO | A: OOOOO | B: IOOOOO',
    notacionVisual: [['B','B','B','B','B','B','|','A','A','A','A','|','B','B','B','B']],
    teoria: `Simplificación del A-B-A-B con solo tres fases, comenzando con el tratamiento ya implantado. Se utiliza cuando:
• El tratamiento ya estaba en marcha antes de iniciar la evaluación (p. ej., en una institución).
• Por razones prácticas o clínicas, no es posible establecer una LB previa.

La lógica inferencial se basa en comprobar si la retirada temporal del tratamiento produce empeoramiento coincidente y si la reintroducción produce mejoría. Si ambos cambios coinciden con la manipulación, hay evidencia a favor de la eficacia.

Limitación metodológica principal: desconocemos cuál era la manifestación natural de la conducta antes de la intervención.`,
    ejemplo: `Una residencia geriátrica lleva años aplicando un programa de actividades grupales para reducir episodios de agitación. Se evalúa su eficacia: se registra durante 3 semanas (B) manteniendo el programa, se retira durante 2 semanas (A), y se reintroduce durante 3 semanas (B). Si la agitación aumenta en A y vuelve a disminuir en B, el programa está cumpliendo su función.`,
    controla: ['Historia si coincide con cambios de fase', 'Efectos de la manipulación temporal'],
    amenazas: ['No se conoce la LB natural', 'Sesgo de expectativa del personal'],
    ventajas: ['Aplicable cuando ya hay tratamiento instaurado', 'No requiere LB previa al tratamiento'],
    inconvenientes: ['No se conoce cuál era la conducta antes del tratamiento', 'Requiere retirada, con posibles problemas éticos'],
    patron: 'bab'
  },
  // ============ REVERSIÓN COMPLEJA ============
  multinivel: {
    familia: 'intrasujeto',
    nombre: 'Diseño multinivel',
    notacion: 'A - B₁ - A - B₂ - A\nA - B₁ - A - B₁ - B₂ - B₃ - B₄',
    notacionVisual: [['A','B₁','A','B₂','A']],
    teoria: `Diseño de reversión complejo cuya característica principal es que selecciona DOS O MÁS VALORES O NIVELES de una misma variable de tratamiento. Permite conocer cómo diferentes niveles/intensidades del tratamiento afectan diferencialmente a la conducta, analizando la posible relación funcional entre VI y VD.

Existen dos modalidades básicas de ordenación de fases:
• Alternancia con LB: A - B₁ - A - B₂ - A
• Combinación con técnica secuencial escalonada: A - B₁ - A - B₁ - B₂ - B₃ - B₄

El investigador decide AD HOC la secuencia según los objetivos de la investigación.`,
    ejemplo: `Estudio del efecto de diferentes dosis de refuerzo sobre la ejecución de tareas laborales en pacientes hospitalizados. Fase A: LB sin refuerzo. Fase B₁: refuerzo contingente bajo. Fase A: retirada. Fase B₂: refuerzo contingente medio. Fase A: retirada. Fase B₃: refuerzo contingente alto. Se analiza si existe una relación funcional entre la intensidad del refuerzo y la cantidad de horas de ejecución laboral.`,
    controla: ['Historia (alternancia)', 'Cambios generales'],
    amenazas: ['Maduración y error progresivo (causas alternativas de mejora)', 'Efectos acumulativos entre niveles'],
    ventajas: ['Permite estudiar la relación funcional VI-VD', 'Análisis dosis-respuesta'],
    inconvenientes: ['Vulnerable a maduración y error progresivo', 'Complejo de diseñar y analizar'],
    patron: 'multinivel'
  },
  trat_multiple: {
    familia: 'intrasujeto',
    nombre: 'Diseño de tratamiento múltiple',
    notacion: 'A - B - A - C - A (diseño de 5 fases)',
    notacionVisual: [['A','B','A','C','A']],
    teoria: `Permite comparar el efecto AISLADO de DOS O MÁS TRATAMIENTOS DIFERENTES sobre una misma conducta. El modelo básico es el diseño de 5 fases (A-B-A-C-A), aunque se pueden hacer variantes introduciendo distintos niveles de algún tratamiento (p. ej., A-B-A-C₁-A-C₂-A).

A diferencia del diseño interactivo, este diseño SOLO informa del efecto aislado de cada tratamiento, no del efecto de su combinación.

Limitación importante: posible INTERFERENCIA DE TRATAMIENTOS (el orden de aplicación puede tener un efecto propio). Se puede controlar mediante contrabalanceo en diferentes sujetos (unos siguen A-B-A-C-A y otros A-C-A-B-A).`,
    ejemplo: `Evaluación de dos tratamientos para la bebida problemática: A (LB) - B (terapia cognitivo-conductual) - A (retirada) - C (entrevista motivacional) - A (retirada). Permite comparar el efecto aislado de B y C sobre el consumo.`,
    controla: ['Historia entre fases', 'Maduración'],
    amenazas: ['Interferencia de tratamientos (orden)', 'Efectos de arrastre'],
    ventajas: ['Comparación directa entre tratamientos', 'Información sobre cuál es más eficaz'],
    inconvenientes: ['Solo efecto aislado, no combinado', 'Orden puede afectar', 'Requiere contrabalanceo entre sujetos'],
    patron: 'trat_multiple'
  },
  interactivos: {
    familia: 'intrasujeto',
    nombre: 'Diseños interactivos',
    notacion: 'A-B-A-C-BC-B-BC\nA-B-A-C-BC-C-A\nA-B-BC-C-BC-A-BCD\nA-B-C-BCD',
    notacionVisual: [['A','B','A','C','BC','B','BC']],
    teoria: `La estrategia más COMPLEJA del ámbito aplicado. Permite obtener la mayor cantidad de información:
1) Efecto AISLADO de cada tratamiento.
2) Efecto de la ACCIÓN CONJUNTA (interacción) de los tratamientos.

Dos principios básicos a respetar:
1) Si es posible, estudiar primero el efecto aislado de cada tratamiento.
2) El paso de una fase a la siguiente debe contemplar UN SOLO CAMBIO (añadir o quitar un componente).

La ordenación de fases se decide AD HOC según los objetivos. Ejemplos: A-B-A-C-BC-B-BC, A-B-A-C-BC-C-A, A-B-BC-C-BC-A-BCD.`,
    ejemplo: `Paciente con TOC grave. A (LB) - B (exposición con prevención de respuesta) - A (retirada) - C (ISRS) - BC (exposición + ISRS) - B (solo exposición) - BC (exposición + ISRS). Permite comparar el efecto aislado de la exposición, el efecto aislado del fármaco, y el efecto de su combinación.`,
    controla: ['Historia entre fases cortas', 'Maduración'],
    amenazas: ['Diseño muy complejo → dificultad de aislar efectos', 'Efectos de orden y arrastre'],
    ventajas: ['Máxima cantidad de información', 'Permite detectar sinergias entre tratamientos'],
    inconvenientes: ['Muy complejo', 'Riesgo de interferencias múltiples', 'Requiere estabilidad en cada fase'],
    patron: 'interactivos'
  },
  // ============ NO REVERSIÓN ============
  ab: {
    familia: 'intrasujeto',
    nombre: 'Diseño A-B (modelo básico)',
    notacion: 'A: OOOOO | B: IOOOO',
    notacionVisual: [['A','A','A','A','A','|','B','B','B','B']],
    teoria: `Modelo básico de los diseños de replicación intrasujeto. Solo dos fases: LB (A) y tratamiento (B).

Ante una línea conductual estable en LB, cualquier cambio en la fase B proporcionará información sobre la eficacia del tratamiento.

Presenta MUCHOS problemas de validez: es el más susceptible a amenazas como historia, maduración y reactividad experimental. Se recomienda tener múltiples registros y añadir una fase de seguimiento.

INCONVENIENTE CLAVE: si en la LB se observa una tendencia (creciente o decreciente) que se mantiene en la fase B, cualquier inferencia sobre la eficacia del tratamiento queda seriamente comprometida.`,
    ejemplo: `Estudio exploratorio de un tratamiento novedoso para la ansiedad social. Fase A: 7 días de registro de frecuencia de evitación social. Fase B: 14 días de aplicación de exposición en vivo graduada. Se observa si hay cambio de nivel o tendencia entre fases.`,
    controla: ['Muy pocas amenazas', 'Solo sirve como estudio exploratorio'],
    amenazas: ['Historia', 'Maduración', 'Reactividad experimental', 'Regresión', 'Tendencia previa en LB'],
    ventajas: ['Sencillo', 'Ético (termina con tratamiento)'],
    inconvenientes: ['Validez interna baja', 'Si hay tendencia previa, inferencia comprometida'],
    patron: 'ab'
  },
  lbm_conductas: {
    familia: 'intrasujeto',
    nombre: 'Línea Base Múltiple entre conductas',
    notacion: 'C₁: OOOO IOOOO OOOO OOOO\nC₂: OOOO OOOO IOOOO OOOO\nC₃: OOOO OOOO OOOO IOOOO',
    notacionVisual: [
      ['O','O','O','O','I','O','O','O','O','|','O','O','O','O','|','O','O','O','O'],
      ['O','O','O','O','|','O','O','O','O','I','O','O','O','O','|','O','O','O','O'],
      ['O','O','O','O','|','O','O','O','O','|','O','O','O','O','I','O','O','O','O']
    ],
    separador: false,
    teoria: `Serie escalonada de diseños A-B donde las fases A se extienden de forma discontinua. Se registran SIMULTÁNEAMENTE varias conductas de UN MISMO SUJETO (o grupo tratado como organismo único). Todas las conductas son sensibles al mismo tratamiento, pero este se introduce en momentos DIFERENTES sobre cada conducta.

Supuestos clave:
• PRINCIPIO DE INDEPENDENCIA: las conductas deben permanecer estables y sin cambios hasta que el tratamiento se aplique sobre cada una.
• PRINCIPIO DE SENSIBILIDAD: todas las conductas deben ser sensibles al mismo tratamiento.

Si cada conducta solo cambia cuando se le aplica el tratamiento (y no antes), la evidencia de causalidad es muy robusta.

Limitaciones: que las conductas sean verdaderamente independientes entre sí, y que un mismo sujeto presente las conductas estudiadas.`,
    ejemplo: `Niña de 10 años con déficit en autocuidado. Conducta 1: hacer la cama. Conducta 2: recoger la ropa. Conducta 3: poner la mesa. Se registra la línea base de las 3 conductas simultáneamente. Se introduce refuerzo positivo primero sobre "hacer la cama" (semana 3), después sobre "recoger la ropa" (semana 6), y finalmente sobre "poner la mesa" (semana 9). Si cada conducta solo mejora al introducirse el refuerzo, se confirma la eficacia del tratamiento.`,
    controla: ['Historia (excelente control por desfase temporal)', 'Maduración'],
    amenazas: ['Conductas no verdaderamente independientes (generalización)', 'Dependencia implícita entre conductas'],
    ventajas: ['No requiere retirada del tratamiento', 'Evidencia causal fuerte', 'Éticamente muy aceptable'],
    inconvenientes: ['Conductas pueden covariar (generalización)', 'Encontrar 3+ conductas independientes y sensibles es difícil'],
    patron: 'lbm_conductas'
  },
  lbm_sujetos: {
    familia: 'intrasujeto',
    nombre: 'Línea Base Múltiple entre sujetos',
    notacion: 'S₁: OOOO IOOOO OOOO OOOO\nS₂: OOOO OOOO IOOOO OOOO\nS₃: OOOO OOOO OOOO IOOOO',
    notacionVisual: [
      ['O','O','O','O','I','O','O','O','O','|','O','O','O','O','|','O','O','O','O'],
      ['O','O','O','O','|','O','O','O','O','I','O','O','O','O','|','O','O','O','O'],
      ['O','O','O','O','|','O','O','O','O','|','O','O','O','O','I','O','O','O','O']
    ],
    separador: false,
    teoria: `Variante que supera la dificultad del LBM entre conductas: aquí se trabaja con UNA ÚNICA CONDUCTA mostrada por DIFERENTES SUJETOS. El tratamiento se introduce sobre cada sujeto en momentos escalonados en el tiempo.

Ventajas añadidas:
• Evita el problema de encontrar varias conductas independientes en un mismo sujeto.
• Incrementa la posible GENERALIZACIÓN (validez externa) porque el mismo efecto se observa en varios individuos.

Precauciones:
• Implantar el tratamiento solo cuando la LB esté estabilizada.
• Los sujetos deben estar relativamente aislados entre sí para evitar contaminación cruzada (si un sujeto ve la mejora de otro, puede modificar su propia conducta antes de recibir el tratamiento).`,
    ejemplo: `Tres estudiantes de una clase con bajo rendimiento en matemáticas. Se registra el rendimiento diario de los tres durante 2 semanas (LB). Al estudiante 1 se le introduce tutorización adicional en la semana 3; al 2, en la semana 5; al 3, en la semana 7. Si cada estudiante solo mejora al recibir la tutorización, la evidencia es clara. Si cualquiera mejora antes, habría que revisar si hubo contaminación.`,
    controla: ['Historia', 'Maduración', 'Efectos de reactividad experimental'],
    amenazas: ['Contaminación entre sujetos', 'Diferencias individuales relevantes'],
    ventajas: ['Mayor validez externa (varios sujetos)', 'No requiere múltiples conductas independientes'],
    inconvenientes: ['Contaminación entre sujetos si están en el mismo entorno', 'Diferencias individuales pueden confundir'],
    patron: 'lbm_sujetos'
  },
  lbm_situaciones: {
    familia: 'intrasujeto',
    nombre: 'Línea Base Múltiple entre situaciones',
    notacion: 'Sit₁: OOOO IOOOO OOOO OOOO\nSit₂: OOOO OOOO IOOOO OOOO\nSit₃: OOOO OOOO OOOO IOOOO',
    notacionVisual: [
      ['O','O','O','O','I','O','O','O','O','|','O','O','O','O','|','O','O','O','O'],
      ['O','O','O','O','|','O','O','O','O','I','O','O','O','O','|','O','O','O','O'],
      ['O','O','O','O','|','O','O','O','O','|','O','O','O','O','I','O','O','O','O']
    ],
    separador: false,
    teoria: `Se aplica el mismo tratamiento sobre UNA ÚNICA CONDUCTA de UN MISMO SUJETO (o grupo) pero manifestada en DIFERENTES SITUACIONES/CONTEXTOS: familia-colegio-amigos, mañana-tarde-noche, trabajo-ocio, etc.

El tratamiento se introduce en momentos distintos en cada situación. El cambio conductual debe aparecer SOLO en el contexto donde se ha introducido el tratamiento, y no debe generalizarse a los otros hasta que reciban su propia intervención.

Útil cuando una conducta se manifiesta en distintos entornos y quiere evaluarse el efecto del tratamiento en cada uno.

Precaución: evitar la generalización del efecto a contextos donde aún no se ha implantado la intervención, ya que comprometería la inferencia causal.`,
    ejemplo: `Niño con conducta disruptiva. Situación 1: aula. Situación 2: patio. Situación 3: comedor. Se registra la LB en los 3 contextos simultáneamente. Se introduce un programa de autocontrol primero en el aula, después en el patio, y por último en el comedor. Si el cambio solo aparece cuando se aplica el tratamiento en cada contexto, el efecto es causal.`,
    controla: ['Historia', 'Maduración', 'Efectos generales'],
    amenazas: ['Generalización entre contextos (problema)', 'Diferencias situacionales relevantes'],
    ventajas: ['Útil para evaluar especificidad situacional', 'No requiere retirada'],
    inconvenientes: ['Generalización no deseada compromete el diseño', 'Requiere registro en múltiples contextos'],
    patron: 'lbm_situaciones'
  },
  cambio_criterio: {
    familia: 'intrasujeto',
    nombre: 'Diseño de cambio de criterio',
    notacion: 'LB → Criterio 1 → Criterio 2 → Criterio 3 → ...',
    notacionVisual: [['LB','C₁','C₂','C₃','C₄']],
    teoria: `Diseño de no reversión cuyo objetivo es modificar la conducta DE FORMA GRADUAL, programando la intervención a lo largo de una serie sucesiva de etapas.

A partir de la ejecución mostrada en la LB, se define un nuevo criterio y se implanta el tratamiento. El tratamiento NO CAMBIA entre fases, pero el CRITERIO para aplicarlo se hace cada vez más exigente.

Hartman y Hall (1976) y Kratochwill (1978) aportan pautas:
• La LB debe ser más amplia que las fases siguientes.
• Cada fase debe tener amplitud suficiente para reestabilizar la conducta.
• La magnitud del cambio debe ser proporcional a la variabilidad de la conducta.
• Mínimo de cambios de criterio: entre 2 (Hartman y Hall) y 4 (Kratochwill).

Especialmente adecuado para moldeamiento paulatino de la conducta.`,
    ejemplo: `Programa de deshabituación tabáquica. LB: registro del consumo diario (promedio 20 cigarrillos/día). Criterio 1: máximo 15 (premio si se cumple). Criterio 2: máximo 12. Criterio 3: máximo 8. Criterio 4: máximo 4. Criterio 5: 0. Si la conducta se ajusta al nuevo criterio en cada fase, el diseño muestra el control del tratamiento sobre la conducta.`,
    controla: ['Maduración si no hay tendencia previa', 'Efectos generales'],
    amenazas: ['Maduración con tendencia progresiva', 'Variabilidad alta puede confundirse con efecto'],
    ventajas: ['Moldeamiento gradual', 'No requiere retirada del tratamiento', 'Negociación con el sujeto'],
    inconvenientes: ['Comportamiento unidireccional → más vulnerable a amenazas', 'Magnitud del cambio debe superar la variabilidad natural'],
    patron: 'cambio_criterio'
  }
};

// ============================================================
// CONTENIDO TRANSVERSAL
// ============================================================

const INTRO_CONTENT = {
  definicion: {
    titulo: '¿Qué es un diseño cuasiexperimental?',
    contenido: `Los diseños cuasiexperimentales surgen como una SOLUCIÓN DE COMPROMISO dentro del conflicto entre validez interna y validez externa, y entre investigación básica y aplicada. Su origen está en el trabajo de Campbell (1963) y, especialmente, en Campbell y Stanley (1966), "Diseños experimentales y cuasiexperimentales en la investigación social", y en Cook y Campbell (1979).

El prefijo "cuasi" indica que estos diseños mantienen gran semejanza con los experimentales, pero presentan diferencias clave:
• NO hay asignación aleatoria de sujetos a grupos (se trabaja con grupos NATURALES).
• PUEDE haber manipulación intencionada de la VI.
• El objetivo es establecer relaciones causales entre VI y VD.
• Se emplean en escenarios naturales (hospitales, escuelas, empresas).

Son especialmente útiles cuando:
• No es posible la aleatorización por razones éticas, prácticas o legales.
• Se quieren estudiar fenómenos en su entorno real (mejor validez externa).
• Se evalúan programas, políticas o intervenciones institucionales.`
  },
  caracteristicas: {
    titulo: 'Características principales',
    contenido: `• Ausencia de aleatorización en la asignación de sujetos → grupos NO EQUIVALENTES.
• Objetivo: probar relaciones causales entre VI y VD.
• Estructura similar a la experimental, pero con carencia de control completo.
• Imposibilidad de controlar todas las variables contaminadoras.
• Uso de procedimientos adicionales para incrementar el control (varios grupos, varias VDs, medidas repetidas).
• Empleo de escenarios naturales → mayor validez externa.
• Disponibilidad: aplicables donde no lo son los experimentales puros.`
  },
  comparacion: {
    titulo: 'Experimento vs. cuasiexperimento vs. preexperimento',
    contenido: `EXPERIMENTO:
• Asignación aleatoria de sujetos a grupos.
• Manipulación intencionada de la VI.
• Máxima validez interna; validez externa menor.
• Objetivo: establecer relaciones causales.

CUASIEXPERIMENTO:
• No hay asignación aleatoria (grupos naturales).
• Puede haber manipulación intencionada de la VI.
• Validez interna intermedia; alta validez externa.
• Se usan procedimientos adicionales de control.
• Objetivo: establecer relaciones causales en contextos reales.

PREEXPERIMENTO:
• No hay aleatorización ni grupo control adecuado.
• No permite inferencias causales fiables.
• Considerados sin validez científica por Campbell y Stanley.
• Ejemplo: estudio de un solo grupo con pretest y postest sin control.`
  },
  notacion: {
    titulo: 'Notación de Campbell y Stanley (1966)',
    contenido: `Símbolos fundamentales:
• O: observación/registro de la variable dependiente.
• X: aplicación del tratamiento.
• X̄ (o X con línea): retirada del tratamiento.
• I: (en diseños intrasujeto) momento de implantación del tratamiento.
• ---: línea discontinua entre filas → grupos NO EQUIVALENTES (sin aleatorización).
• Ausencia de línea entre filas → los registros son sobre el MISMO grupo (p. ej., distintas VDs).

Subíndices:
• O₁, O₂, O₃... indican orden temporal de los registros.
• O_A, O_B: cuando hay varias VDs o conductas, se diferencian con letras.

Lectura de izquierda a derecha: orden temporal. Lectura vertical: grupos (o VDs/sujetos/situaciones en intrasujeto).`
  }
};

const REPLIC_CONCEPTS = {
  fases: {
    titulo: 'Concepto de fase y tipos',
    contenido: `Una FASE es un periodo de observación y registro de la conducta bajo condiciones idénticas. Dos tipos:

• FASE DE NO TRATAMIENTO / LÍNEA BASE (A): La VD se registra sin que el tratamiento esté presente. Tiene dos funciones: descriptiva (informa del nivel de la conducta) y predictiva (permite estimar cómo evolucionaría sin intervención).

• FASE DE TRATAMIENTO (B, C, D...): La VD se registra mientras el tratamiento está presente. Si hay más de un tratamiento, se etiquetan B, C, D...

Cualquier inferencia sobre la eficacia del tratamiento se basa en comparar los patrones conductuales entre fases.`
  },
  lb: {
    titulo: 'Propiedades de la línea base (LB)',
    contenido: `La línea base debe tener TRES propiedades:

• ESTABILIDAD: ausencia de tendencia sistemática y poca variabilidad. Una LB estable permite predecir cómo sería la conducta sin intervención.

• SENSIBILIDAD: la conducta debe poder variar en respuesta al tratamiento futuro.

• CONTROL INTERNO: la LB debe reflejar únicamente los factores que se controlarán en la intervención, no variables ajenas.

La duración de la LB no se fija a priori: depende de la variabilidad observada. A más variabilidad, más registros necesarios. Gelfand y Hartman (1984) proponen un mínimo de 3 registros + 1 por cada 10% de variabilidad, donde:

Variabilidad = (tasa más alta − tasa más baja) / tasa más baja`
  },
  patrones_intra: {
    titulo: 'Patrones de cambio INTRAfase',
    contenido: `Patrones conceptuales descritos por Hersen y Barlow (1976):

• ESTACIONARIO / ESTABLE: la conducta se mantiene constante.
• DE DETERIORO: la conducta empeora progresivamente.
• DE MEJORA: la conducta mejora progresivamente.
• DE VARIACIÓN CÍCLICA: patrón que oscila de forma regular.
• INCREMENTAL-DECREMENTAL: primero sube, luego baja.
• DECREMENTAL-INCREMENTAL: primero baja, luego sube.

Identificar el patrón intrafase es clave para interpretar correctamente los cambios interfase posteriores.`
  },
  patrones_inter: {
    titulo: 'Patrones de cambio INTERfases',
    contenido: `Al pasar de una fase a otra, hay que evaluar tres dimensiones del cambio:

• TIPO DE CAMBIO:
   - De NIVEL: desplazamiento vertical inmediato en los valores.
   - De TENDENCIA: cambio en la pendiente/dirección de la serie.

• MOMENTO en que se produce:
   - INMEDIATO: el cambio aparece justo al iniciar la nueva fase.
   - RETARDADO: el cambio aparece con cierto desfase tras el cambio de fase.

• DURACIÓN del cambio:
   - CONTINUO: se mantiene durante toda la nueva fase.
   - PASAJERO: aparece y desaparece tras un tiempo.`
  },
  replica: {
    titulo: 'Concepto de réplica',
    contenido: `El término "replicación" tiene dos acepciones clave:

• RÉPLICA INTRASUJETO: aplicación de las mismas condiciones a un sujeto en diferentes periodos de tiempo. Es la base lógica de los diseños A-B-A-B, donde la repetición del efecto al reintroducir el tratamiento refuerza la inferencia causal.

• RÉPLICA ESTADÍSTICA/EXTENSIVA: replicar un experimento con 2+ sujetos sometidos al mismo tratamiento. Incrementa la validez externa.

Glass et al. (1975) diferencian:
• UNIDAD REPETITIVA: un mismo sujeto observado en distintos puntos del tiempo.
• UNIDAD REPLICATIVA: medida abstracta definida conceptualmente (p. ej., rendimiento medio de un grupo a lo largo de 4 años).`
  },
  clasificacion: {
    titulo: 'Criterio de clasificación: reversibilidad',
    contenido: `Los diseños de replicación intrasujeto se clasifican según si la conducta PUEDE volver al nivel basal tras retirar el tratamiento:

• DISEÑOS DE REVERSIÓN: no existe razón (ética, práctica, clínica o de naturaleza del tratamiento) que impida retirar el tratamiento. La conducta puede volver a niveles basales.
   - Simples: A-B-A, A-B-A-B, A-B-A-B con inversión, B-A-B.
   - Complejos: multinivel, tratamiento múltiple, interactivos.

• DISEÑOS DE NO REVERSIÓN: o bien hay razones éticas/clínicas que impiden la retirada, o bien el tratamiento tiene efectos irreversibles sobre la conducta.
   - A-B, Línea Base Múltiple (entre conductas, sujetos o situaciones), cambio de criterio.`
  }
};

const AMENAZAS = [
  {
    nombre: 'Historia',
    descripcion: 'Acontecimientos externos que ocurren durante la investigación y pueden afectar a la VD, confundiéndose con el efecto del tratamiento.',
    ejemplo: 'Durante un estudio sobre ansiedad escolar, estalla una crisis sanitaria que afecta a todos los alumnos simultáneamente.',
    controles: ['Grupo control', 'STI con replicaciones múltiples', 'LBM'],
    diseno_vulnerable: 'STI simple, A-B'
  },
  {
    nombre: 'Maduración',
    descripcion: 'Cambios internos en los sujetos (biológicos, psicológicos, evolutivos) que se producen con el paso del tiempo, independientemente del tratamiento.',
    ejemplo: 'En un estudio sobre vocabulario en niños de 4 años durante 6 meses, el vocabulario aumenta por el desarrollo normal.',
    controles: ['Grupo control', 'Medidas pre-post cortas', 'LBM'],
    diseno_vulnerable: 'A-B, multinivel con sujetos en desarrollo'
  },
  {
    nombre: 'Instrumentación',
    descripcion: 'Cambios en los instrumentos de medida o en los observadores que pueden confundirse con cambios reales en la VD.',
    ejemplo: 'Los observadores se vuelven más estrictos (o más laxos) con el tiempo al evaluar conductas agresivas.',
    controles: ['Calibrar instrumentos', 'Formar observadores', 'Fiabilidad interjueces'],
    diseno_vulnerable: 'Cualquiera con medidas observacionales largas'
  },
  {
    nombre: 'Regresión hacia la media',
    descripcion: 'Cuando se seleccionan sujetos por puntuaciones extremas, en mediciones posteriores tienden a puntuar más cerca de la media por azar estadístico.',
    ejemplo: 'Se seleccionan alumnos con las peores notas para un programa. Sus notas mejoran parcialmente incluso sin intervención.',
    controles: ['Evitar selección por extremos', 'Grupo control con mismo criterio'],
    diseno_vulnerable: 'Pretest-postest si se seleccionó por extremos'
  },
  {
    nombre: 'Selección diferencial',
    descripcion: 'Los grupos presentan diferencias previas al tratamiento que pueden confundirse con el efecto del tratamiento.',
    ejemplo: 'El grupo experimental tiene más motivación inicial que el control, independientemente del tratamiento.',
    controles: ['Aleatorización (experimento)', 'Emparejamiento', 'Múltiples pretests'],
    diseno_vulnerable: 'Todos los cuasiexperimentales'
  },
  {
    nombre: 'Mortalidad experimental',
    descripcion: 'Pérdida diferencial de sujetos entre grupos que puede sesgar los resultados.',
    ejemplo: 'En el grupo experimental abandonan los que no mejoran; en el control, abandonan al azar.',
    controles: ['Registrar causas de abandono', 'Análisis por intención de tratar'],
    diseno_vulnerable: 'Diseños largos, estudios clínicos'
  },
  {
    nombre: 'Interacción selección × historia',
    descripcion: 'Un evento histórico afecta de forma diferencial a los grupos por sus características previas.',
    ejemplo: 'Un programa nacional de becas afecta más al grupo control (con menos recursos) durante el estudio.',
    controles: ['STI con replicaciones cambiadas', 'Grupos muy similares'],
    diseno_vulnerable: 'STI con grupo control no equivalente'
  },
  {
    nombre: 'Interacción selección × maduración',
    descripcion: 'Los grupos maduran a ritmos diferentes por sus características iniciales.',
    ejemplo: 'Alumnos de alto rendimiento mejoran más rápido que los de bajo rendimiento simplemente por paso del tiempo.',
    controles: ['Tratamiento invertido', 'Grupos cuidadosamente emparejados'],
    diseno_vulnerable: 'Pretest-postest con grupos muy distintos'
  }
];

// ============================================================
// QUIZZES
// ============================================================

const QUIZ_BANCO = {
  intro: [
    {
      pregunta: '¿Cuál es la característica DEFINITORIA de los diseños cuasiexperimentales?',
      opciones: [
        'La ausencia de manipulación de la VI',
        'La ausencia de aleatorización en la asignación de sujetos a grupos',
        'La ausencia de grupo control',
        'La ausencia de pretest'
      ],
      correcta: 1,
      explicacion: 'La característica definitoria es la ausencia de aleatorización → se trabaja con grupos naturales no equivalentes. Puede haber manipulación de la VI, grupo control y pretest.'
    },
    {
      pregunta: 'En la notación de Campbell y Stanley, la línea discontinua entre dos filas de registros indica:',
      opciones: [
        'Que los grupos son equivalentes tras aleatorización',
        'Que los registros corresponden al mismo grupo',
        'Que los grupos no son equivalentes (sin aleatorización)',
        'Que el tratamiento se ha retirado entre fases'
      ],
      correcta: 2,
      explicacion: 'La línea discontinua indica grupos NO EQUIVALENTES, es decir, ausencia de aleatorización. Si no hay línea, los registros son sobre el mismo grupo.'
    },
    {
      pregunta: 'Cook y Campbell consideran los cuasiexperimentos como:',
      opciones: [
        'Inferiores a los preexperimentos',
        'Equivalentes a los experimentos cuando hay grupo control',
        'Un punto intermedio entre preexperimentos y experimentos',
        'No científicos en general'
      ],
      correcta: 2,
      explicacion: 'Cook y Campbell (1979) consideran los cuasiexperimentos como un punto intermedio entre los preexperimentos (sin validez científica) y los experimentos auténticos.'
    },
    {
      pregunta: 'La principal ventaja de los diseños cuasiexperimentales sobre los experimentos es:',
      opciones: [
        'Mayor validez interna',
        'Mayor validez externa al realizarse en entornos naturales',
        'Mayor control de todas las variables contaminadoras',
        'Menor coste económico'
      ],
      correcta: 1,
      explicacion: 'Al realizarse en entornos naturales, los diseños cuasiexperimentales ofrecen MAYOR VALIDEZ EXTERNA que los experimentos de laboratorio. En cambio, su validez interna suele ser menor.'
    },
    {
      pregunta: '¿En cuál de las siguientes situaciones NO sería apropiado un diseño cuasiexperimental?',
      opciones: [
        'Evaluación de un programa nuevo en dos aulas ya formadas',
        'Estudio del efecto de un tratamiento sobre 60 ratas con asignación aleatoria a grupos en laboratorio',
        'Evaluación del impacto de una nueva ley en la seguridad vial',
        'Comparación del rendimiento entre dos hospitales que aplican protocolos distintos'
      ],
      correcta: 1,
      explicacion: 'En el caso de las ratas con asignación aleatoria en laboratorio, sería apropiado un DISEÑO EXPERIMENTAL (no cuasi), ya que sí se puede asignar aleatoriamente. Los otros casos trabajan con grupos ya formados.'
    }
  ],
  gcne: [
    {
      pregunta: 'En un diseño de pretest-postest con grupo control no equivalente, el pretest cumple DOS funciones principales. ¿Cuáles?',
      opciones: [
        'Medir la VD y la VI',
        'Determinar la equivalencia inicial de los grupos y controlar variables contaminadoras',
        'Aleatorizar a los sujetos y reducir la mortalidad',
        'Reducir la regresión y medir la maduración'
      ],
      correcta: 1,
      explicacion: 'El pretest permite (1) determinar la equivalencia inicial (aunque los grupos sean naturales, se puede ver cuán similares son) y (2) controlar variables contaminadoras: si no hubiera tratamiento, el grupo control no debería cambiar.'
    },
    {
      pregunta: 'En el diseño con VDs no equivalentes (versión León y Montero con un único grupo), si tras el tratamiento cambia TANTO la VD tratada COMO la VD no tratada, ¿qué podemos concluir?',
      opciones: [
        'El tratamiento es claramente eficaz',
        'El tratamiento es ineficaz',
        'Hay alguna variable contaminadora presente → no podemos atribuir el cambio solo al tratamiento',
        'Los grupos no son equivalentes'
      ],
      correcta: 2,
      explicacion: 'Si la VD no tratada también cambia, significa que alguna variable distinta al tratamiento (un cambio institucional, una deseabilidad social, etc.) está actuando. No se puede atribuir el cambio únicamente al tratamiento.'
    },
    {
      pregunta: 'El diseño con tratamiento invertido (X+ y X-) controla especialmente bien la amenaza de:',
      opciones: [
        'Mortalidad experimental',
        'Interacción selección × maduración',
        'Instrumentación',
        'Regresión hacia la media'
      ],
      correcta: 1,
      explicacion: 'Es muy improbable que la interacción selección × maduración justifique cambios en direcciones OPUESTAS en los dos grupos. Por eso este diseño controla especialmente esta amenaza.'
    },
    {
      pregunta: 'La principal limitación del diseño con tratamiento invertido es:',
      opciones: [
        'Requiere aleatorización',
        'Consideraciones éticas: aplicar un tratamiento "opuesto" no siempre es viable',
        'No permite pretest',
        'No permite medir la VD en distintos momentos'
      ],
      correcta: 1,
      explicacion: 'Aplicar un tratamiento conceptualmente opuesto puede ser éticamente cuestionable o prácticamente imposible (p. ej., si el tratamiento "inverso" perjudicaría a los sujetos).'
    }
  ],
  sti: [
    {
      pregunta: 'En un diseño de Serie Temporal Interrumpida (STI), el análisis principal se centra en:',
      opciones: [
        'La media final del postest',
        'La discontinuidad entre las series pretest y postest',
        'La correlación entre VI y VD',
        'La diferencia de varianzas entre grupos'
      ],
      correcta: 1,
      explicacion: 'El análisis se centra en la DISCONTINUIDAD entre la serie pretest y postest: cambio de nivel, de tendencia, momento (inmediato/retardado) y duración (continuo/pasajero).'
    },
    {
      pregunta: '¿Cuál es la principal amenaza a la validez interna del STI SIMPLE?',
      opciones: [
        'Maduración',
        'Instrumentación',
        'Historia',
        'Regresión estadística'
      ],
      correcta: 2,
      explicacion: 'La HISTORIA es la principal amenaza del STI simple: algún acontecimiento externo puede coincidir con la intervención y confundirse con su efecto. Por eso se añade un grupo control en el STI con GC no equivalente.'
    },
    {
      pregunta: 'El diseño de STI con RETIRADA del tratamiento es especialmente potente porque:',
      opciones: [
        'Utiliza aleatorización',
        'Controla indirectamente la historia: es improbable que actúe en direcciones opuestas en dos momentos',
        'Es el más corto en el tiempo',
        'No requiere línea base'
      ],
      correcta: 1,
      explicacion: 'Al implantar, retirar y observar los cambios asociados en direcciones opuestas, es muy improbable que una variable externa (historia) explique ambos cambios. Esto controla indirectamente la amenaza de historia.'
    },
    {
      pregunta: 'El diseño de STI con REPLICACIONES MÚLTIPLES (introducción/retirada alternadas) tiene una limitación clave:',
      opciones: [
        'No puede usar grupo control',
        'Solo es adecuado cuando los efectos son inmediatos y desaparecen rápidamente',
        'Requiere muestras muy grandes',
        'No permite medir cambios de tendencia'
      ],
      correcta: 1,
      explicacion: 'Si los efectos se mantienen tras retirar el tratamiento, no se puede observar la "reversión" necesaria para confirmar la relación causal. Por eso solo es válido con efectos inmediatos y reversibles.'
    },
    {
      pregunta: 'El diseño de STI con REPLICACIONES CAMBIADAS es especialmente recomendado para:',
      opciones: [
        'Detectar efectos inmediatos',
        'Detectar efectos con un periodo de retraso impredecible',
        'Evitar el uso de grupo control',
        'Reducir la duración de la investigación'
      ],
      correcta: 1,
      explicacion: 'Al aplicar el tratamiento en momentos distintos a grupos distintos, este diseño es ideal para detectar efectos con retraso impredecible y además mejora validez interna y externa.'
    }
  ],
  reversion: [
    {
      pregunta: 'En un diseño A-B-A, la tercera fase (retorno a LB) es crítica porque:',
      opciones: [
        'Permite aumentar la muestra',
        'Permite comprobar si la conducta vuelve al nivel basal tras retirar el tratamiento, confirmando la causalidad',
        'Reduce el coste del estudio',
        'Elimina la necesidad de pretest'
      ],
      correcta: 1,
      explicacion: 'La reversión en la segunda A confirma que el tratamiento era el responsable del cambio: si la conducta vuelve a los niveles basales, la inferencia causal se refuerza.'
    },
    {
      pregunta: '¿Cuál es la principal ventaja del diseño A-B-A-B sobre el A-B-A?',
      opciones: [
        'Termina con el tratamiento, lo cual es éticamente más aceptable y replica el efecto',
        'Es más corto en el tiempo',
        'No requiere observaciones intermedias',
        'Permite aleatorización'
      ],
      correcta: 0,
      explicacion: 'El A-B-A-B termina con el sujeto en fase de tratamiento (ética) Y añade una replicación del efecto al reintroducir el tratamiento, reforzando la inferencia causal.'
    },
    {
      pregunta: 'En el diseño A-B-A-B con técnica de INVERSIÓN (Leitenberg), la característica distintiva es:',
      opciones: [
        'Se usan dos grupos de sujetos',
        'Se registran dos conductas incompatibles del mismo sujeto',
        'Se invierte el orden de las fases',
        'Se aplica un tratamiento opuesto al original'
      ],
      correcta: 1,
      explicacion: 'Se registran DOS CONDUCTAS INCOMPATIBLES del mismo sujeto. En la tercera fase se invierte a qué conducta se aplica el tratamiento, esperando patrones cruzados que confirmen el efecto causal.'
    },
    {
      pregunta: 'El diseño B-A-B se utiliza cuando:',
      opciones: [
        'Se quiere maximizar la LB inicial',
        'El tratamiento ya estaba instaurado y no es posible establecer una LB previa',
        'Se requiere aleatorización',
        'Se trabaja con dos grupos'
      ],
      correcta: 1,
      explicacion: 'El B-A-B sirve para evaluar un tratamiento YA INSTAURADO. Se retira temporalmente (A) y se vuelve a implantar (B). Su limitación: desconocemos la LB natural previa al tratamiento.'
    },
    {
      pregunta: 'El diseño MULTINIVEL se diferencia del diseño de tratamiento múltiple en que:',
      opciones: [
        'El multinivel usa dos o más NIVELES/VALORES de una misma VI; el múltiple usa tratamientos DIFERENTES',
        'El multinivel no tiene LB',
        'El multinivel solo tiene dos fases',
        'El multinivel es un diseño de no reversión'
      ],
      correcta: 0,
      explicacion: 'El multinivel evalúa distintas intensidades o dosis de un mismo tratamiento; el de tratamiento múltiple evalúa tratamientos cualitativamente distintos.'
    },
    {
      pregunta: 'El diseño INTERACTIVO nos permite conocer:',
      opciones: [
        'Solo el efecto aislado de cada tratamiento',
        'Solo el efecto conjunto de los tratamientos',
        'El efecto AISLADO de cada tratamiento Y el efecto de su ACCIÓN CONJUNTA',
        'Únicamente la eficacia del mejor tratamiento'
      ],
      correcta: 2,
      explicacion: 'Es el diseño más complejo del ámbito aplicado precisamente porque permite obtener ambos tipos de información. Su regla clave: un solo cambio entre fases.'
    }
  ],
  no_reversion: [
    {
      pregunta: '¿Cuál es el principal inconveniente del diseño A-B?',
      opciones: [
        'Es muy susceptible a amenazas como historia, maduración y reactividad; si hay tendencia previa en LB, la inferencia queda comprometida',
        'Requiere muchos grupos',
        'Es muy caro',
        'No se puede aplicar en contextos clínicos'
      ],
      correcta: 0,
      explicacion: 'El diseño A-B presenta los mayores problemas de validez interna. Si además hay tendencia en LB que continúa en B, no se puede atribuir el cambio al tratamiento.'
    },
    {
      pregunta: 'El PRINCIPIO DE INDEPENDENCIA en los diseños de LBM establece que:',
      opciones: [
        'Los sujetos deben ser aleatorizados',
        'Las conductas/sujetos/situaciones deben permanecer estables y sin cambios hasta que se les aplique el tratamiento',
        'Los observadores deben ser independientes',
        'Las VDs deben ser independientes de las VIs'
      ],
      correcta: 1,
      explicacion: 'El principio de independencia exige que cada conducta/sujeto/situación NO cambie hasta que reciba su propia intervención. Si cambia antes, la inferencia causal se compromete.'
    },
    {
      pregunta: 'El PRINCIPIO DE SENSIBILIDAD en los diseños de LBM establece que:',
      opciones: [
        'Todas las conductas registradas deben ser sensibles al mismo tratamiento',
        'Los instrumentos deben ser sensibles',
        'Los observadores deben ser sensibles',
        'La LB debe ser muy sensible a cambios pequeños'
      ],
      correcta: 0,
      explicacion: 'Todas las VDs registradas (conductas, sujetos o situaciones) deben ser sensibles al tratamiento, es decir, el tratamiento debe tener capacidad para modificarlas.'
    },
    {
      pregunta: '¿Qué diseño de LBM supera la dificultad de encontrar varias conductas INDEPENDIENTES en un mismo sujeto?',
      opciones: [
        'LBM entre conductas',
        'LBM entre sujetos',
        'LBM entre situaciones',
        'Ninguno'
      ],
      correcta: 1,
      explicacion: 'El LBM entre sujetos trabaja con una única conducta en varios sujetos distintos, evitando el problema de encontrar varias conductas independientes. Además, incrementa la validez externa.'
    },
    {
      pregunta: 'En el diseño de CAMBIO DE CRITERIO:',
      opciones: [
        'El tratamiento cambia entre fases, pero el criterio se mantiene',
        'El tratamiento se mantiene constante, pero el criterio para aplicarlo se hace progresivamente más exigente',
        'Se introducen dos tratamientos alternados',
        'Se retira el tratamiento en la tercera fase'
      ],
      correcta: 1,
      explicacion: 'El tratamiento NO cambia; lo que cambia es el CRITERIO (el nivel exigido) en cada fase. Ideal para moldeamiento gradual.'
    },
    {
      pregunta: 'Hartman y Hall (1976) sugieren, para el diseño de cambio de criterio, un mínimo de:',
      opciones: [
        '1 cambio de criterio',
        '2 cambios de criterio',
        '4 cambios de criterio',
        '10 cambios de criterio'
      ],
      correcta: 1,
      explicacion: 'Hartman y Hall sugieren un mínimo de 2 cambios; Kratochwill (1978) es más exigente y sugiere un mínimo de 4.'
    }
  ]
};

// ============================================================
// IDENTIFICADOR DE DISEÑOS
// ============================================================

const CASOS_IDENTIFICAR = [
  {
    descripcion: 'Se seleccionan dos institutos con características similares. En uno se aplica un nuevo método de enseñanza de matemáticas; en el otro no. Se mide el rendimiento antes y después de la intervención en ambos.',
    opciones: ['Pretest-postest con GCNE', 'STI simple', 'A-B-A-B', 'LBM entre sujetos'],
    correcta: 0,
    explicacion: 'Dos grupos naturales, uno experimental y uno control, con una medida antes y una después. Esto corresponde al diseño clásico de pretest-postest con grupo control no equivalente.'
  },
  {
    descripcion: 'Se registra mensualmente el número de accidentes en una ciudad durante 3 años. En el mes 36 se introduce una ley restrictiva y se continúa registrando durante 2 años más.',
    opciones: ['Pretest-postest con GCNE', 'STI simple', 'A-B-A', 'LBM entre situaciones'],
    correcta: 1,
    explicacion: 'Medidas repetidas en un único grupo antes y después de una intervención puntual. Es el diseño clásico de STI simple.'
  },
  {
    descripcion: 'En un paciente con ansiedad se registra su nivel durante 2 semanas. Después se aplica un tratamiento durante 3 semanas. Después se retira durante 2 semanas. Después se vuelve a aplicar durante 3 semanas más.',
    opciones: ['A-B', 'A-B-A', 'A-B-A-B', 'B-A-B'],
    correcta: 2,
    explicacion: 'Cuatro fases alternadas: LB-Tratamiento-LB-Tratamiento. Es el diseño A-B-A-B, que además termina con tratamiento (más aceptable éticamente que A-B-A).'
  },
  {
    descripcion: 'Un niño tiene tres problemas de conducta: morderse las uñas, llegar tarde al cole y pegar a su hermano. Se registra la LB de las tres. Después se aplica el mismo tratamiento primero a la primera, luego a la segunda, y finalmente a la tercera.',
    opciones: ['A-B-A-B', 'LBM entre conductas', 'LBM entre sujetos', 'Cambio de criterio'],
    correcta: 1,
    explicacion: 'Un mismo sujeto, varias conductas, mismo tratamiento introducido escalonadamente. Es el LBM entre conductas.'
  },
  {
    descripcion: 'Se aplica un programa para reducir el consumo de alcohol: primero se pide reducir a un máximo de 4 bebidas/día, luego a 2, luego a 1, luego a 0. Se mantiene el refuerzo positivo durante todas las fases.',
    opciones: ['Multinivel', 'Cambio de criterio', 'A-B-A-B', 'Interactivo'],
    correcta: 1,
    explicacion: 'El tratamiento (refuerzo positivo) no cambia; lo que cambia es el CRITERIO para recibirlo. Es el diseño de cambio de criterio clásico.'
  },
  {
    descripcion: 'Dos hospitales similares aplican un nuevo protocolo quirúrgico. En el Hospital A se introduce en enero; en el Hospital B, en julio. Se registra la tasa de complicaciones mensualmente durante un año y medio en ambos.',
    opciones: ['STI simple', 'STI con grupo control no equivalente', 'STI con replicaciones cambiadas', 'LBM entre sujetos'],
    correcta: 2,
    explicacion: 'Dos grupos reciben el MISMO tratamiento en momentos temporalmente DESFASADOS. Es el STI con replicaciones cambiadas, excelente para descartar historia.'
  },
  {
    descripcion: 'Una residencia lleva tiempo aplicando un programa musical para reducir la agitación en mayores. Se evalúa: 3 semanas manteniendo el programa, 2 semanas suspendiéndolo, 3 semanas reintroduciéndolo.',
    opciones: ['A-B-A', 'A-B-A-B', 'B-A-B', 'A-B'],
    correcta: 2,
    explicacion: 'El tratamiento ya estaba instaurado, por lo que empieza con B. Luego se retira (A) y se reintroduce (B). Es el diseño de supresión B-A-B.'
  },
  {
    descripcion: 'Un paciente con depresión es evaluado: LB, tratamiento con TCC, retirada, tratamiento farmacológico, retirada, tratamiento combinado (TCC+fármaco), solo TCC, combinado de nuevo.',
    opciones: ['A-B-A-B', 'Multinivel', 'Tratamiento múltiple', 'Interactivo'],
    correcta: 3,
    explicacion: 'Se estudian dos tratamientos por separado Y su combinación (BC). Es un diseño INTERACTIVO, el más complejo del ámbito aplicado.'
  },
  {
    descripcion: 'Se aplica una economía de fichas para aumentar la conducta de estudio de un alumno. En la primera fase se registra la LB. Después se refuerza que estudie 10 min/día. Luego 20 min. Luego 40 min. El refuerzo se mantiene igual en intensidad.',
    opciones: ['Multinivel', 'Cambio de criterio', 'Interactivo', 'A-B-A'],
    correcta: 1,
    explicacion: 'Cuidado: aquí se van haciendo más exigentes los criterios (10, 20, 40 minutos) y el tratamiento se mantiene constante. Es el CAMBIO DE CRITERIO, no el multinivel (en multinivel cambia la INTENSIDAD del tratamiento, no el criterio exigido).'
  },
  {
    descripcion: 'Un niño pega a sus compañeros en el aula, en el patio y en el comedor. Se registra la LB en los tres contextos. Se introduce un programa de autocontrol primero en el aula, luego en el patio, luego en el comedor.',
    opciones: ['LBM entre conductas', 'LBM entre sujetos', 'LBM entre situaciones', 'A-B-A'],
    correcta: 2,
    explicacion: 'Un mismo sujeto, una misma conducta, aplicada escalonadamente en tres SITUACIONES distintas. Es el LBM entre situaciones.'
  }
];

// ============================================================
// FLASHCARDS
// ============================================================

const FLASHCARDS = [
  { concepto: 'Cuasiexperimento', definicion: 'Diseño que mantiene gran semejanza con el experimento pero CARECE DE ALEATORIZACIÓN en la asignación de sujetos a grupos. Puede haber manipulación de VI y grupo control.' },
  { concepto: 'Grupos no equivalentes', definicion: 'Grupos naturales (ya formados) que difieren entre sí en más aspectos que los directamente relacionados con la intervención.' },
  { concepto: 'Validez interna', definicion: 'Grado en que se puede establecer una relación causal entre VI y VD descartando explicaciones alternativas.' },
  { concepto: 'Validez externa', definicion: 'Grado en que los resultados se pueden generalizar a otras situaciones, sujetos y momentos temporales.' },
  { concepto: 'STI (Serie Temporal Interrumpida)', definicion: 'Diseño que registra repetidamente la VD antes y después de una intervención; analiza la discontinuidad entre ambas series.' },
  { concepto: 'Fase', definicion: 'Periodo de observación y registro de la conducta bajo condiciones idénticas. Hay fases de no tratamiento (A) y de tratamiento (B, C, D...).' },
  { concepto: 'Línea base (LB)', definicion: 'Fase de no tratamiento. Tiene funciones descriptiva (informa del nivel) y predictiva (permite estimar la evolución sin intervención). Debe ser estable, sensible y tener control interno.' },
  { concepto: 'Estabilidad de la LB', definicion: 'Ausencia de tendencia sistemática y baja variabilidad. Condición necesaria para inferir el efecto posterior del tratamiento.' },
  { concepto: 'Cambio de NIVEL', definicion: 'Desplazamiento vertical de los valores de la VD entre fases, sin cambio en la pendiente.' },
  { concepto: 'Cambio de TENDENCIA', definicion: 'Cambio en la pendiente o dirección de la serie entre fases.' },
  { concepto: 'Efecto INMEDIATO vs RETARDADO', definicion: 'Inmediato: el cambio aparece justo al cambiar de fase. Retardado: aparece con desfase tras el cambio de fase.' },
  { concepto: 'Efecto CONTINUO vs PASAJERO', definicion: 'Continuo: se mantiene durante toda la fase siguiente. Pasajero: aparece y luego desaparece.' },
  { concepto: 'Réplica intrasujeto', definicion: 'Aplicación repetida de las mismas condiciones a un mismo sujeto en distintos momentos. Base lógica del A-B-A-B.' },
  { concepto: 'Unidad repetitiva', definicion: 'Un mismo sujeto observado en diferentes puntos del tiempo (Glass et al., 1975).' },
  { concepto: 'Unidad replicativa', definicion: 'Medida abstracta definida conceptualmente, no referida a individuos específicos (Glass et al., 1975).' },
  { concepto: 'Principio de independencia (LBM)', definicion: 'Las conductas/sujetos/situaciones deben permanecer estables hasta recibir su intervención específica.' },
  { concepto: 'Principio de sensibilidad (LBM)', definicion: 'Todas las conductas registradas deben ser sensibles al mismo tratamiento.' },
  { concepto: 'Diseño de reversión', definicion: 'Diseño de replicación intrasujeto en el que NO hay impedimento para retirar el tratamiento; la conducta puede volver a niveles basales.' },
  { concepto: 'Diseño de no reversión', definicion: 'Diseño en el que la retirada es imposible (por razones éticas, clínicas o prácticas) o el tratamiento tiene efectos irreversibles.' },
  { concepto: 'Historia (amenaza)', definicion: 'Acontecimientos externos durante la investigación que pueden confundirse con el efecto del tratamiento. Principal amenaza del STI simple.' },
  { concepto: 'Maduración (amenaza)', definicion: 'Cambios internos en los sujetos con el paso del tiempo, independientes del tratamiento.' },
  { concepto: 'Instrumentación (amenaza)', definicion: 'Cambios en los instrumentos u observadores que se confunden con cambios en la VD.' },
  { concepto: 'Regresión hacia la media', definicion: 'Tendencia estadística de puntuaciones extremas a acercarse a la media en mediciones posteriores.' },
  { concepto: 'Interacción selección × historia', definicion: 'Un evento histórico afecta de forma diferencial a los grupos por sus características previas.' },
  { concepto: 'Interferencia de tratamientos', definicion: 'Efecto del ORDEN de aplicación de los tratamientos en el diseño de tratamiento múltiple. Se controla con contrabalanceo.' }
];

// ============================================================
// OBJETIVOS DEL TEMA
// ============================================================

const OBJETIVOS_TEMA = [
  'Conocer las características de la investigación cuasiexperimental.',
  'Diferenciar experimento, cuasiexperimento y preexperimento, incluyendo diferencias en validez interna y externa.',
  'Identificar qué características son específicas de la investigación cuasiexperimental.',
  'Saber qué tipo de diseño utilizar según circunstancias, posibilidades e intereses del investigador.',
  'Conocer y utilizar la notación de Campbell y Stanley (1966) adoptada por Cook y Campbell (1979).',
  'Conocer los diseños cuasiexperimentales con grupo control no equivalente.',
  'Conocer las características que definen los diseños de STI.',
  'Entender el concepto de fase y diferenciar sus tipos.',
  'Saber establecer la duración de una fase en una investigación.',
  'Saber analizar la discontinuidad observada y conocer los patrones de cambio intra e interfase.',
  'Indicar características, ventajas y limitaciones de cada diseño de STI estudiado.',
  'Conocer características y origen de los diseños de replicación intrasujeto, su estructura y diferencias con los intragrupo.',
  'Conocer qué es una fase en los diseños de replicación intrasujeto, los tipos existentes, sus funciones y las características de la LB.',
  'Conocer el criterio de clasificación de los diseños intrasujeto y su significado.',
  'Indicar características, ventajas y limitaciones de cada diseño intrasujeto y proponer investigaciones de ejemplo.'
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function App() {
  const [vista, setVista] = useState('home');
  const [disenoActivo, setDisenoActivo] = useState(null);
  const [modulo, setModulo] = useState(null);
  const [progreso, setProgreso] = useState({
    disenosVistos: [],
    quizzesCompletados: {},
    identificador: { aciertos: 0, total: 0 },
    flashcardsVistas: [],
    objetivos: {}
  });

  // Cargar progreso desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('progreso_cuasi');
      if (stored) {
        setProgreso(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error cargando progreso:', e);
    }
  }, []);

  // Guardar progreso
  const guardarProgreso = (nuevo) => {
    setProgreso(nuevo);
    try {
      localStorage.setItem('progreso_cuasi', JSON.stringify(nuevo));
    } catch (e) {
      console.error('Error guardando progreso:', e);
    }
  };

  const marcarDisenoVisto = (id) => {
    if (!progreso.disenosVistos.includes(id)) {
      guardarProgreso({
        ...progreso,
        disenosVistos: [...progreso.disenosVistos, id]
      });
    }
  };

  const totalDisenos = Object.keys(DISENOS).length;
  const totalQuizzes = Object.keys(QUIZ_BANCO).length;
  const quizzesCompletados = Object.keys(progreso.quizzesCompletados).length;
  const progresoPct = Math.round(
    ((progreso.disenosVistos.length / totalDisenos) * 0.5 +
     (quizzesCompletados / totalQuizzes) * 0.3 +
     (progreso.flashcardsVistas.length / FLASHCARDS.length) * 0.2) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => { setVista('home'); setDisenoActivo(null); setModulo(null); }}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-800 text-sm">Diseños cuasiexperimentales</div>
              <div className="text-xs text-slate-500">Tema 5 · Investigación no experimental</div>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-700">{progresoPct}% completado</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-2">
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${progresoPct}%` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {vista === 'home' && <Home1 setVista={setVista} progreso={progreso} totalDisenos={totalDisenos} totalQuizzes={totalQuizzes} />}
        {vista === 'intro' && <IntroModulo setVista={setVista} />}
        {vista === 'disenos' && !disenoActivo && <ListaDisenos setDisenoActivo={setDisenoActivo} setVista={setVista} progreso={progreso} modulo={modulo} setModulo={setModulo} />}
        {vista === 'disenos' && disenoActivo && <DetalleDiseno id={disenoActivo} setDisenoActivo={setDisenoActivo} marcarVisto={marcarDisenoVisto} />}
        {vista === 'replic_concepts' && <ReplicConceptsVista setVista={setVista} />}
        {vista === 'amenazas' && <AmenazasVista setVista={setVista} />}
        {vista === 'quiz' && <QuizVista setVista={setVista} progreso={progreso} guardarProgreso={guardarProgreso} />}
        {vista === 'identificador' && <IdentificadorVista setVista={setVista} progreso={progreso} guardarProgreso={guardarProgreso} />}
        {vista === 'flashcards' && <FlashcardsVista setVista={setVista} progreso={progreso} guardarProgreso={guardarProgreso} />}
        {vista === 'mapa' && <MapaConceptualVista setVista={setVista} setDisenoActivo={setDisenoActivo} />}
        {vista === 'objetivos' && <ObjetivosVista setVista={setVista} progreso={progreso} guardarProgreso={guardarProgreso} />}
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-6 text-center text-xs text-slate-500">
        Material basado en Campbell y Stanley (1966), Cook y Campbell (1979), León y Montero (2015), Bono y Arnau (2014) · Elaborado para estudio universitario
      </footer>
    </div>
  );
}

// ============================================================
// VISTA HOME
// ============================================================

function Home1({ setVista, progreso, totalDisenos, totalQuizzes }) {
  const tarjetas = [
    { id: 'intro', icon: BookOpen, titulo: 'Introducción', sub: 'Definición, clasificación y notación Campbell-Stanley', color: 'from-blue-500 to-cyan-500', stat: '4 secciones' },
    { id: 'disenos', icon: Target, titulo: 'Catálogo de diseños', sub: 'Los 18 diseños del tema, con teoría y ejemplos', color: 'from-indigo-500 to-purple-500', stat: `${progreso.disenosVistos.length}/${totalDisenos} vistos` },
    { id: 'replic_concepts', icon: TrendingUp, titulo: 'Conceptos de replicación intrasujeto', sub: 'Fase, LB, patrones, réplica, clasificación', color: 'from-emerald-500 to-teal-500', stat: '6 conceptos clave' },
    { id: 'amenazas', icon: AlertCircle, titulo: 'Amenazas a la validez', sub: 'Catálogo de amenazas y cómo controlarlas', color: 'from-amber-500 to-orange-500', stat: `${AMENAZAS.length} amenazas` },
    { id: 'quiz', icon: HelpCircle, titulo: 'Quizzes por módulo', sub: 'Preguntas tipo examen con justificación', color: 'from-rose-500 to-pink-500', stat: `${Object.keys(progreso.quizzesCompletados).length}/${totalQuizzes} módulos` },
    { id: 'identificador', icon: Zap, titulo: 'Identificador de diseños', sub: 'Casos prácticos: ¿qué diseño es este?', color: 'from-violet-500 to-fuchsia-500', stat: `${progreso.identificador.aciertos}/${progreso.identificador.total} correctos` },
    { id: 'flashcards', icon: Lightbulb, titulo: 'Flashcards', sub: 'Repaso rápido de conceptos clave', color: 'from-yellow-500 to-amber-500', stat: `${progreso.flashcardsVistas.length}/${FLASHCARDS.length} revisadas` },
    { id: 'mapa', icon: BarChart3, titulo: 'Mapa conceptual', sub: 'Clasificación completa interactiva', color: 'from-sky-500 to-blue-500', stat: 'Visual' },
    { id: 'objetivos', icon: CheckCircle2, titulo: 'Autoevaluación final', sub: 'Los 15 objetivos del tema', color: 'from-green-500 to-emerald-500', stat: `${Object.values(progreso.objetivos).filter(Boolean).length}/${OBJETIVOS_TEMA.length} dominados` },
  ];

  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-6 md:p-8 text-white mb-6 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Tema 5: Diseños cuasiexperimentales y de replicación intrasujeto</h1>
        <p className="text-indigo-100 text-sm md:text-base mb-4">
          Una app de estudio integral nivel universitario. Combina teoría avanzada, casos aplicados, quizzes tipo examen y herramientas de consolidación.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">📖 18 diseños</span>
          <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">❓ {Object.values(QUIZ_BANCO).flat().length} preguntas</span>
          <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">🎯 {CASOS_IDENTIFICAR.length} casos</span>
          <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">🃏 {FLASHCARDS.length} flashcards</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tarjetas.map(t => (
          <button
            key={t.id}
            onClick={() => setVista(t.id)}
            className="bg-white rounded-xl p-5 text-left hover:shadow-lg transition-all border border-slate-200 hover:border-indigo-300 group"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${t.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
              <t.icon className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-slate-800 mb-1">{t.titulo}</div>
            <div className="text-sm text-slate-600 mb-3">{t.sub}</div>
            <div className="text-xs text-slate-500 font-medium">{t.stat}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// VISTA INTRODUCCIÓN
// ============================================================

function IntroModulo({ setVista }) {
  const [abierto, setAbierto] = useState('definicion');

  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Introducción a los diseños cuasiexperimentales</h1>
      <p className="text-slate-600 mb-6">Bases conceptuales, diferenciación con experimentos y notación de referencia.</p>

      <div className="space-y-3">
        {Object.entries(INTRO_CONTENT).map(([k, v]) => (
          <div key={k} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setAbierto(abierto === k ? null : k)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50"
            >
              <span className="font-semibold text-slate-800 text-left">{v.titulo}</span>
              {abierto === k ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
            </button>
            {abierto === k && (
              <div className="px-4 pb-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed border-t border-slate-100 pt-3">
                {v.contenido}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700">
            <strong>Idea clave:</strong> La aleatorización es la técnica de control más poderosa, pero no siempre es posible. Los diseños cuasiexperimentales son una respuesta metodológica rigurosa a esa imposibilidad, ofreciendo un compromiso entre rigor causal (validez interna) y aplicabilidad real (validez externa).
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LISTA DE DISEÑOS
// ============================================================

function ListaDisenos({ setDisenoActivo, setVista, progreso, modulo, setModulo }) {
  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Catálogo de diseños</h1>
      <p className="text-slate-600 mb-6">Selecciona una familia y después un diseño específico para estudiarlo en detalle.</p>

      {Object.entries(CLASIFICACION).map(([famId, fam]) => (
        <div key={famId} className="mb-6">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
            fam.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {fam.nombre}
          </div>

          {Object.entries(fam.hijos).map(([subId, sub]) => (
            <div key={subId} className="mb-4">
              <div className="text-sm font-semibold text-slate-700 mb-2">{sub.nombre}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sub.disenos.map(id => {
                  const d = DISENOS[id];
                  const visto = progreso.disenosVistos.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => setDisenoActivo(id)}
                      className={`text-left p-3 rounded-lg border transition group ${
                        visto
                          ? 'bg-emerald-50 border-emerald-200 hover:border-emerald-400'
                          : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-800 text-sm truncate">{d.nombre}</div>
                          <div className="text-xs text-slate-500 mt-0.5 truncate">{d.notacion.split('\n')[0]}</div>
                        </div>
                        {visto ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// DETALLE DE DISEÑO
// ============================================================

function DetalleDiseno({ id, setDisenoActivo, marcarVisto }) {
  const d = DISENOS[id];

  useEffect(() => {
    marcarVisto(id);
  }, [id]);

  if (!d) return null;

  return (
    <div>
      <button
        onClick={() => setDisenoActivo(null)}
        className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
      </button>

      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
        d.familia === 'cuasi' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
      }`}>
        {d.familia === 'cuasi' ? 'Diseño cuasiexperimental' : 'Diseño de replicación intrasujeto'}
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-4">{d.nombre}</h1>

      {/* Notación visual */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 mb-5 font-mono text-sm overflow-x-auto">
        <div className="text-xs text-slate-400 mb-2">NOTACIÓN DE CAMPBELL Y STANLEY</div>
        <NotacionVisual diseno={d} />
      </div>

      {/* Gráfico patrón */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
        <div className="text-xs font-semibold text-slate-500 mb-2 uppercase">Patrón típico esperado</div>
        <PatronGrafico tipo={d.patron} />
      </div>

      {/* Teoría */}
      <Seccion titulo="Fundamentación teórica" icon={BookOpen} color="indigo">
        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{d.teoria}</div>
      </Seccion>

      {/* Ejemplo */}
      <Seccion titulo="Ejemplo aplicado" icon={Lightbulb} color="amber">
        <div className="text-sm text-slate-700 leading-relaxed italic">{d.ejemplo}</div>
      </Seccion>

      {/* Grid ventajas / inconvenientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Ventajas
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {d.ventajas.map((v, i) => <li key={i} className="flex gap-2"><span className="text-green-500">✓</span><span>{v}</span></li>)}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="font-semibold text-red-800 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Inconvenientes
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {d.inconvenientes.map((v, i) => <li key={i} className="flex gap-2"><span className="text-red-500">✗</span><span>{v}</span></li>)}
          </ul>
        </div>
      </div>

      {/* Amenazas controladas / vulnerabilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="font-semibold text-blue-800 mb-3 text-sm">🛡️ Amenazas que controla</div>
          <ul className="space-y-1 text-sm text-slate-700">
            {d.controla.map((v, i) => <li key={i}>• {v}</li>)}
          </ul>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <div className="font-semibold text-orange-800 mb-3 text-sm">⚠️ Amenazas a vigilar</div>
          <ul className="space-y-1 text-sm text-slate-700">
            {d.amenazas.map((v, i) => <li key={i}>• {v}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// NOTACIÓN VISUAL
// ============================================================

function NotacionVisual({ diseno }) {
  if (!diseno.notacionVisual) return <div>{diseno.notacion}</div>;

  return (
    <div>
      {diseno.notacionVisual.map((fila, idx) => (
        <div key={idx}>
          <div className="flex gap-2 flex-wrap">
            {fila.map((simbolo, i) => (
              <span
                key={i}
                className={`inline-block min-w-[24px] text-center px-1 ${
                  simbolo === 'X' || simbolo === 'X+' || simbolo === 'I' ? 'text-yellow-400 font-bold' :
                  simbolo === 'X-' || simbolo === 'X̄' ? 'text-pink-400 font-bold' :
                  simbolo === '|' ? 'text-slate-500' :
                  simbolo === ' ' ? 'text-slate-600' :
                  simbolo.startsWith('B') ? 'text-emerald-400' :
                  simbolo.startsWith('A') ? 'text-blue-400' :
                  simbolo.startsWith('C') ? 'text-purple-400' :
                  'text-slate-200'
                }`}
              >
                {simbolo === ' ' ? '—' : simbolo}
              </span>
            ))}
          </div>
          {diseno.separador && idx < diseno.notacionVisual.length - 1 && (
            <div className="text-slate-500 my-1">- - - - - - - - - - - - - - - - - - - - -</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// GRÁFICO DE PATRONES (SVG)
// ============================================================

function PatronGrafico({ tipo }) {
  const svgProps = { width: '100%', height: '140', viewBox: '0 0 400 140', style: { maxHeight: 160 } };

  switch (tipo) {
    case 'pretest_postest':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="40" y1="20" x2="40" y2="120" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="200" y1="10" x2="200" y2="130" stroke="#6366f1" strokeDasharray="4" />
          <text x="200" y="9" textAnchor="middle" fontSize="10" fill="#6366f1">X (tratamiento)</text>
          <line x1="80" y1="80" x2="280" y2="40" stroke="#6366f1" strokeWidth="2.5" />
          <circle cx="80" cy="80" r="4" fill="#6366f1" />
          <circle cx="280" cy="40" r="4" fill="#6366f1" />
          <text x="65" y="98" fontSize="9" fill="#475569">Pre exp.</text>
          <text x="265" y="35" fontSize="9" fill="#475569">Post exp.</text>
          <line x1="80" y1="90" x2="280" y2="88" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3" />
          <circle cx="80" cy="90" r="4" fill="#94a3b8" />
          <circle cx="280" cy="88" r="4" fill="#94a3b8" />
          <text x="65" y="108" fontSize="9" fill="#475569">Pre ctrl.</text>
          <text x="265" y="108" fontSize="9" fill="#475569">Post ctrl.</text>
        </svg>
      );
    case 'trat_invertido':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          <line x1="40" y1="20" x2="40" y2="120" stroke="#cbd5e1" />
          <line x1="200" y1="10" x2="200" y2="130" stroke="#6366f1" strokeDasharray="4" />
          <line x1="80" y1="70" x2="280" y2="30" stroke="#10b981" strokeWidth="2.5" />
          <circle cx="80" cy="70" r="4" fill="#10b981" /><circle cx="280" cy="30" r="4" fill="#10b981" />
          <text x="290" y="30" fontSize="9" fill="#10b981">X+ ↑</text>
          <line x1="80" y1="70" x2="280" y2="110" stroke="#ef4444" strokeWidth="2.5" />
          <circle cx="80" cy="70" r="4" fill="#ef4444" /><circle cx="280" cy="110" r="4" fill="#ef4444" />
          <text x="290" y="115" fontSize="9" fill="#ef4444">X- ↓</text>
        </svg>
      );
    case 'sti_simple':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          <line x1="40" y1="20" x2="40" y2="120" stroke="#cbd5e1" />
          <line x1="200" y1="10" x2="200" y2="130" stroke="#6366f1" strokeDasharray="4" />
          <text x="200" y="9" textAnchor="middle" fontSize="10" fill="#6366f1">X</text>
          <polyline points="60,75 80,82 100,73 120,78 140,72 160,80 180,74" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="220,50 240,45 260,42 280,38 300,35 320,32 340,28" fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>
      );
    case 'sti_gc':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          <line x1="40" y1="20" x2="40" y2="120" stroke="#cbd5e1" />
          <line x1="200" y1="10" x2="200" y2="130" stroke="#6366f1" strokeDasharray="4" />
          <polyline points="60,75 80,82 100,73 120,78 140,72 160,80 180,74" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="220,50 240,45 260,42 280,38 300,35 320,32 340,28" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="60,95 80,100 100,93 120,98 140,92 160,100 180,94 220,98 240,96 260,97 280,95 300,96 320,95 340,94" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3" />
          <text x="345" y="30" fontSize="9" fill="#6366f1">Exp.</text>
          <text x="345" y="98" fontSize="9" fill="#94a3b8">Ctrl.</text>
        </svg>
      );
    case 'sti_vd':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          <line x1="200" y1="10" x2="200" y2="130" stroke="#6366f1" strokeDasharray="4" />
          <polyline points="60,70 80,75 100,68 120,73 140,72 160,70 180,74" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="220,50 240,46 260,42 280,38 300,35 320,32 340,30" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="60,90 80,95 100,88 120,93 140,92 160,90 180,94" fill="none" stroke="#10b981" strokeWidth="2" />
          <polyline points="220,70 240,66 260,62 280,58 300,55 320,52 340,50" fill="none" stroke="#10b981" strokeWidth="2" />
          <text x="345" y="30" fontSize="9" fill="#6366f1">VD₁</text>
          <text x="345" y="50" fontSize="9" fill="#10b981">VD₂</text>
        </svg>
      );
    case 'sti_retirada':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          <line x1="140" y1="10" x2="140" y2="130" stroke="#10b981" strokeDasharray="4" />
          <line x1="260" y1="10" x2="260" y2="130" stroke="#ef4444" strokeDasharray="4" />
          <text x="140" y="9" textAnchor="middle" fontSize="9" fill="#10b981">X</text>
          <text x="260" y="9" textAnchor="middle" fontSize="9" fill="#ef4444">X̄</text>
          <polyline points="50,70 70,75 90,72 110,74 130,73" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="155,50 175,45 195,40 215,38 235,36 250,34" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="275,50 295,60 315,68 335,74 350,76" fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>
      );
    case 'sti_replic_mult':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {[100, 180, 260].map((x, i) => (
            <line key={i} x1={x} y1="10" x2={x} y2="130" stroke={i % 2 === 0 ? '#10b981' : '#ef4444'} strokeDasharray="4" />
          ))}
          <polyline points="50,75 70,72 90,74" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="110,50 130,45 150,42 170,40" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="190,60 210,68 230,72 250,75" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="270,50 290,42 310,38 330,36 350,35" fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>
      );
    case 'sti_replic_camb':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          <line x1="150" y1="10" x2="150" y2="130" stroke="#6366f1" strokeDasharray="4" />
          <line x1="250" y1="10" x2="250" y2="130" stroke="#10b981" strokeDasharray="4" />
          <text x="150" y="9" textAnchor="middle" fontSize="9" fill="#6366f1">X (G1)</text>
          <text x="250" y="9" textAnchor="middle" fontSize="9" fill="#10b981">X (G2)</text>
          <polyline points="50,70 70,72 90,68 110,70 130,72 145,70 165,55 185,45 205,40 225,38 245,36 265,34 285,32 305,30 325,28 345,26" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="50,90 70,92 90,88 110,90 130,92 150,90 170,88 190,90 210,92 230,90 245,92 265,75 285,65 305,55 325,48 345,44" fill="none" stroke="#10b981" strokeWidth="2" />
        </svg>
      );
    case 'aba':
    case 'abab':
      const fases = tipo === 'aba' ? ['A', 'B', 'A'] : ['A', 'B', 'A', 'B'];
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {fases.map((f, i) => {
            const w = 320 / fases.length;
            const x = 40 + i * w;
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={f === 'A' ? '#dbeafe' : '#d1fae5'} opacity="0.5" />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="11" fontWeight="bold" fill={f === 'A' ? '#2563eb' : '#10b981'}>{f}</text>
              </g>
            );
          })}
          {tipo === 'aba' && (
            <>
              <polyline points="50,80 70,82 90,78 110,83 130,80" fill="none" stroke="#1e293b" strokeWidth="2" />
              <polyline points="150,60 170,50 190,42 210,38 230,35 245,32" fill="none" stroke="#1e293b" strokeWidth="2" />
              <polyline points="260,55 280,70 300,78 320,80 340,82" fill="none" stroke="#1e293b" strokeWidth="2" />
            </>
          )}
          {tipo === 'abab' && (
            <>
              <polyline points="50,80 70,82 90,78" fill="none" stroke="#1e293b" strokeWidth="2" />
              <polyline points="120,60 140,50 160,42 175,38" fill="none" stroke="#1e293b" strokeWidth="2" />
              <polyline points="205,55 225,70 245,78 255,80" fill="none" stroke="#1e293b" strokeWidth="2" />
              <polyline points="285,55 305,45 325,38 345,34" fill="none" stroke="#1e293b" strokeWidth="2" />
            </>
          )}
        </svg>
      );
    case 'abab_inv':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {['A', 'B', 'A', 'B'].map((f, i) => {
            const w = 320 / 4;
            const x = 40 + i * w;
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={f === 'A' ? '#dbeafe' : '#d1fae5'} opacity="0.5" />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="11" fontWeight="bold" fill={f === 'A' ? '#2563eb' : '#10b981'}>{f}</text>
              </g>
            );
          })}
          <polyline points="50,70 70,72 90,70" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="120,55 140,45 160,38 175,35" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="205,75 225,80 240,75 255,78" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="285,50 305,40 325,35 345,32" fill="none" stroke="#6366f1" strokeWidth="2" />
          <polyline points="50,95 70,93 90,95" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
          <polyline points="120,80 140,85 160,92 175,95" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
          <polyline points="205,55 225,50 240,52 255,48" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
          <polyline points="285,90 305,95 325,98 345,100" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
          <text x="345" y="32" fontSize="8" fill="#6366f1">C1</text>
          <text x="345" y="100" fontSize="8" fill="#ef4444">C2</text>
        </svg>
      );
    case 'bab':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {['B', 'A', 'B'].map((f, i) => {
            const w = 320 / 3;
            const x = 40 + i * w;
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={f === 'A' ? '#dbeafe' : '#d1fae5'} opacity="0.5" />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="11" fontWeight="bold" fill={f === 'A' ? '#2563eb' : '#10b981'}>{f}</text>
              </g>
            );
          })}
          <polyline points="50,40 70,42 90,38 110,40 130,42 145,40" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="155,50 175,65 195,75 215,82 235,85 250,88" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="260,65 280,50 300,42 320,38 340,36 355,35" fill="none" stroke="#1e293b" strokeWidth="2" />
        </svg>
      );
    case 'multinivel':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {['A', 'B₁', 'A', 'B₂', 'A'].map((f, i) => {
            const w = 320 / 5;
            const x = 40 + i * w;
            const color = f === 'A' ? '#dbeafe' : (f === 'B₁' ? '#d1fae5' : '#a7f3d0');
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={color} opacity="0.5" />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">{f}</text>
              </g>
            );
          })}
          <polyline points="50,80 65,82 80,80" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="105,65 125,58 140,55" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="170,70 190,75 205,78" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="235,55 250,45 265,38" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="295,60 315,70 335,78 350,82" fill="none" stroke="#1e293b" strokeWidth="2" />
        </svg>
      );
    case 'trat_multiple':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {['A', 'B', 'A', 'C', 'A'].map((f, i) => {
            const w = 320 / 5;
            const x = 40 + i * w;
            const color = f === 'A' ? '#dbeafe' : (f === 'B' ? '#d1fae5' : '#fce7f3');
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={color} opacity="0.6" />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">{f}</text>
              </g>
            );
          })}
          <polyline points="50,80 65,82 80,80" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="105,65 125,55 140,48" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="170,60 190,72 205,78" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="235,60 250,48 265,38" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="295,50 315,65 335,78 350,82" fill="none" stroke="#1e293b" strokeWidth="2" />
        </svg>
      );
    case 'interactivos':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {['A', 'B', 'A', 'C', 'BC'].map((f, i) => {
            const w = 320 / 5;
            const x = 40 + i * w;
            const color = f === 'A' ? '#dbeafe' : (f === 'B' ? '#d1fae5' : f === 'C' ? '#fce7f3' : '#fef3c7');
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={color} opacity="0.6" />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">{f}</text>
              </g>
            );
          })}
          <polyline points="50,80 65,82 80,78" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="105,65 125,55 140,48" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="170,60 190,72 205,78" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="235,58 250,45 265,38" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="295,35 315,25 335,20 350,18" fill="none" stroke="#1e293b" strokeWidth="2" />
        </svg>
      );
    case 'ab':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {['A', 'B'].map((f, i) => {
            const w = 320 / 2;
            const x = 40 + i * w;
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={f === 'A' ? '#dbeafe' : '#d1fae5'} opacity="0.5" />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="12" fontWeight="bold" fill={f === 'A' ? '#2563eb' : '#10b981'}>{f}</text>
              </g>
            );
          })}
          <polyline points="55,75 85,78 115,72 145,80 175,74" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="215,60 245,50 275,42 305,35 335,30" fill="none" stroke="#1e293b" strokeWidth="2" />
        </svg>
      );
    case 'lbm_conductas':
    case 'lbm_sujetos':
    case 'lbm_situaciones':
      const label = tipo === 'lbm_conductas' ? 'C' : tipo === 'lbm_sujetos' ? 'S' : 'Sit';
      return (
        <svg {...svgProps}>
          {[0, 1, 2].map((row) => {
            const y = 30 + row * 35;
            const xInterv = 120 + row * 60;
            return (
              <g key={row}>
                <line x1="40" y1={y + 15} x2="360" y2={y + 15} stroke="#cbd5e1" strokeWidth="0.5" />
                <text x="10" y={y + 15} fontSize="9" fill="#475569">{label}{row + 1}</text>
                <line x1={xInterv} y1={y - 10} x2={xInterv} y2={y + 25} stroke="#6366f1" strokeDasharray="3" />
                <polyline
                  points={`50,${y+10} 70,${y+12} 90,${y+10} 110,${y+11} ${xInterv-5},${y+10}`}
                  fill="none" stroke="#6366f1" strokeWidth="2"
                />
                <polyline
                  points={`${xInterv+5},${y} ${xInterv+25},${y-5} ${xInterv+45},${y-8} ${xInterv+65},${y-10} ${xInterv+85},${y-12} 355,${y-15}`}
                  fill="none" stroke="#6366f1" strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>
      );
    case 'cambio_criterio':
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          {['LB', 'C₁', 'C₂', 'C₃', 'C₄'].map((f, i) => {
            const w = 320 / 5;
            const x = 40 + i * w;
            return (
              <g key={i}>
                <rect x={x} y={15} width={w - 1} height={110} fill={i === 0 ? '#dbeafe' : '#d1fae5'} opacity={0.3 + i * 0.1} />
                <text x={x + w / 2} y={28} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">{f}</text>
                {i > 0 && (
                  <line x1={x} y1={45 + i * 12} x2={x + w} y2={45 + i * 12} stroke="#ef4444" strokeDasharray="3" strokeWidth="1" />
                )}
              </g>
            );
          })}
          <polyline points="50,45 65,50 80,45" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="105,55 125,58 140,55" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="170,68 190,70 205,68" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="235,82 250,82 265,80" fill="none" stroke="#1e293b" strokeWidth="2" />
          <polyline points="295,92 315,94 335,92 350,93" fill="none" stroke="#1e293b" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" />
          <polyline points="50,80 150,70 250,40 350,30" fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>
      );
  }
}

// ============================================================
// CONCEPTOS DE REPLICACIÓN INTRASUJETO
// ============================================================

function ReplicConceptsVista({ setVista }) {
  const [abierto, setAbierto] = useState('fases');

  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Conceptos clave en replicación intrasujeto</h1>
      <p className="text-slate-600 mb-6">Fundamentos conceptuales comunes a todos los diseños de replicación intrasujeto.</p>

      <div className="space-y-3">
        {Object.entries(REPLIC_CONCEPTS).map(([k, v]) => (
          <div key={k} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setAbierto(abierto === k ? null : k)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50"
            >
              <span className="font-semibold text-slate-800 text-left">{v.titulo}</span>
              {abierto === k ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
            </button>
            {abierto === k && (
              <div className="px-4 pb-4 text-sm text-slate-700 whitespace-pre-line leading-relaxed border-t border-slate-100 pt-3">
                {v.contenido}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// AMENAZAS A LA VALIDEZ
// ============================================================

function AmenazasVista({ setVista }) {
  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Amenazas a la validez interna</h1>
      <p className="text-slate-600 mb-6">Las amenazas clásicas que todo investigador debe considerar al diseñar su estudio.</p>

      <div className="space-y-3">
        {AMENAZAS.map((a, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800 mb-1">{a.nombre}</div>
                <div className="text-sm text-slate-700">{a.descripcion}</div>
              </div>
            </div>
            <div className="ml-11 space-y-2 text-sm">
              <div className="text-slate-600"><span className="font-semibold text-slate-700">Ejemplo:</span> {a.ejemplo}</div>
              <div className="text-slate-600"><span className="font-semibold text-slate-700">Controles:</span> {a.controles.join(', ')}</div>
              <div className="text-slate-600"><span className="font-semibold text-slate-700">Diseño vulnerable:</span> {a.diseno_vulnerable}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// QUIZ
// ============================================================

function QuizVista({ setVista, progreso, guardarProgreso }) {
  const [moduloActivo, setModuloActivo] = useState(null);

  if (moduloActivo) {
    return <QuizActivo moduloId={moduloActivo} setModuloActivo={setModuloActivo} progreso={progreso} guardarProgreso={guardarProgreso} />;
  }

  const modulos = [
    { id: 'intro', nombre: 'Introducción', icon: BookOpen, color: 'blue', desc: 'Características, diferencias, notación' },
    { id: 'gcne', nombre: 'Grupo control no equivalente', icon: Target, color: 'indigo', desc: 'Pretest-postest, VD no equiv., trat. invertido' },
    { id: 'sti', nombre: 'Serie Temporal Interrumpida', icon: TrendingUp, color: 'purple', desc: 'Simple, GC, VD, retirada, replic. múltiples/cambiadas' },
    { id: 'reversion', nombre: 'Diseños de reversión', icon: RotateCcw, color: 'emerald', desc: 'A-B-A, A-B-A-B, inversión, B-A-B, multinivel...' },
    { id: 'no_reversion', nombre: 'Diseños de no reversión', icon: BarChart3, color: 'teal', desc: 'A-B, LBM (conductas/sujetos/situaciones), cambio de criterio' },
  ];

  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Quizzes por módulo</h1>
      <p className="text-slate-600 mb-6">Preguntas tipo examen con justificación detallada. Cada módulo agrupa varias preguntas.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modulos.map(m => {
          const completado = progreso.quizzesCompletados[m.id];
          return (
            <button
              key={m.id}
              onClick={() => setModuloActivo(m.id)}
              className="bg-white rounded-xl p-5 text-left border border-slate-200 hover:border-indigo-300 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <m.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    {m.nombre}
                    {completado && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{m.desc}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{QUIZ_BANCO[m.id]?.length || 0} preguntas</span>
                {completado && (
                  <span className="text-emerald-600 font-medium">
                    Puntuación: {completado.aciertos}/{completado.total}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuizActivo({ moduloId, setModuloActivo, progreso, guardarProgreso }) {
  const preguntas = QUIZ_BANCO[moduloId] || [];
  const [actual, setActual] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [mostrarSol, setMostrarSol] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const q = preguntas[actual];

  const responder = (i) => {
    if (mostrarSol) return;
    setSeleccion(i);
    setMostrarSol(true);
    if (i === q.correcta) setAciertos(a => a + 1);
  };

  const siguiente = () => {
    if (actual < preguntas.length - 1) {
      setActual(actual + 1);
      setSeleccion(null);
      setMostrarSol(false);
    } else {
      setTerminado(true);
      guardarProgreso({
        ...progreso,
        quizzesCompletados: {
          ...progreso.quizzesCompletados,
          [moduloId]: { aciertos, total: preguntas.length }
        }
      });
    }
  };

  if (terminado) {
    const pct = Math.round((aciertos / preguntas.length) * 100);
    return (
      <div>
        <button onClick={() => setModuloActivo(null)} className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4" /> Volver al listado
        </button>
        <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Quiz completado!</h2>
          <div className="text-4xl font-bold text-indigo-600 mb-1">{aciertos}/{preguntas.length}</div>
          <div className="text-slate-600 mb-6">{pct}% de aciertos</div>
          <div className="text-sm text-slate-700 mb-6">
            {pct === 100 && '¡Perfecto! Dominio total del módulo.'}
            {pct >= 80 && pct < 100 && 'Muy buen dominio. Repasa las que fallaste.'}
            {pct >= 60 && pct < 80 && 'Buen nivel. Revisa la teoría de las preguntas falladas.'}
            {pct < 60 && 'Conviene repasar la teoría del módulo antes de volver a intentarlo.'}
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setActual(0); setSeleccion(null); setMostrarSol(false); setAciertos(0); setTerminado(false); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
              Reintentar
            </button>
            <button onClick={() => setModuloActivo(null)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm font-medium">
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => setModuloActivo(null)} className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600">
        <ArrowLeft className="w-4 h-4" /> Volver al listado
      </button>

      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-slate-600">Pregunta {actual + 1} de {preguntas.length}</span>
        <span className="text-slate-600">Aciertos: {aciertos}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5 mb-6">
        <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${((actual + 1) / preguntas.length) * 100}%` }} />
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200 mb-4">
        <div className="font-semibold text-slate-800 mb-4">{q.pregunta}</div>
        <div className="space-y-2">
          {q.opciones.map((op, i) => {
            const es_correcta = i === q.correcta;
            const es_seleccionada = i === seleccion;
            let cls = 'bg-white border-slate-200 hover:border-indigo-300';
            if (mostrarSol) {
              if (es_correcta) cls = 'bg-green-50 border-green-400';
              else if (es_seleccionada) cls = 'bg-red-50 border-red-400';
              else cls = 'bg-white border-slate-200 opacity-60';
            }
            return (
              <button
                key={i}
                onClick={() => responder(i)}
                disabled={mostrarSol}
                className={`w-full text-left p-3 rounded-lg border text-sm transition ${cls} ${!mostrarSol && 'cursor-pointer'}`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                {op}
                {mostrarSol && es_correcta && <CheckCircle2 className="w-4 h-4 text-green-600 inline-block ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {mostrarSol && (
        <div className={`rounded-xl p-4 border mb-4 ${seleccion === q.correcta ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="text-sm font-semibold mb-1">
            {seleccion === q.correcta ? '✅ ¡Correcto!' : '📝 Justificación:'}
          </div>
          <div className="text-sm text-slate-700">{q.explicacion}</div>
        </div>
      )}

      {mostrarSol && (
        <button onClick={siguiente} className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
          {actual < preguntas.length - 1 ? 'Siguiente pregunta →' : 'Ver resultados'}
        </button>
      )}
    </div>
  );
}

// ============================================================
// IDENTIFICADOR DE DISEÑOS
// ============================================================

function IdentificadorVista({ setVista, progreso, guardarProgreso }) {
  const [indice, setIndice] = useState(0);
  const [sel, setSel] = useState(null);
  const [sol, setSol] = useState(false);
  const [correctos, setCorrectos] = useState(0);
  const [total, setTotal] = useState(0);

  const c = CASOS_IDENTIFICAR[indice];

  const responder = (i) => {
    if (sol) return;
    setSel(i);
    setSol(true);
    const nuevoTotal = total + 1;
    const nuevosCorrectos = correctos + (i === c.correcta ? 1 : 0);
    setTotal(nuevoTotal);
    setCorrectos(nuevosCorrectos);
    guardarProgreso({
      ...progreso,
      identificador: {
        aciertos: progreso.identificador.aciertos + (i === c.correcta ? 1 : 0),
        total: progreso.identificador.total + 1
      }
    });
  };

  const siguiente = () => {
    setIndice((indice + 1) % CASOS_IDENTIFICAR.length);
    setSel(null);
    setSol(false);
  };

  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Identificador de diseños</h1>
      <p className="text-slate-600 mb-6">Lee el caso y elige qué tipo de diseño es. Tu puntuación global se guarda automáticamente.</p>

      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="text-slate-600">Caso {indice + 1} de {CASOS_IDENTIFICAR.length}</span>
        <span className="font-medium text-slate-700">Sesión: {correctos}/{total} · Global: {progreso.identificador.aciertos}/{progreso.identificador.total}</span>
      </div>

      <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 rounded-xl p-5 mb-4">
        <div className="text-xs font-semibold text-violet-700 mb-2 uppercase">Caso práctico</div>
        <div className="text-sm text-slate-800 leading-relaxed">{c.descripcion}</div>
      </div>

      <div className="space-y-2 mb-4">
        {c.opciones.map((op, i) => {
          const es_correcta = i === c.correcta;
          const es_seleccionada = i === sel;
          let cls = 'bg-white border-slate-200 hover:border-violet-300';
          if (sol) {
            if (es_correcta) cls = 'bg-green-50 border-green-400';
            else if (es_seleccionada) cls = 'bg-red-50 border-red-400';
            else cls = 'bg-white border-slate-200 opacity-60';
          }
          return (
            <button
              key={i}
              onClick={() => responder(i)}
              disabled={sol}
              className={`w-full text-left p-3 rounded-lg border text-sm transition ${cls} ${!sol && 'cursor-pointer'}`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
              {op}
              {sol && es_correcta && <CheckCircle2 className="w-4 h-4 text-green-600 inline-block ml-2" />}
            </button>
          );
        })}
      </div>

      {sol && (
        <>
          <div className={`rounded-xl p-4 border mb-4 ${sel === c.correcta ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="text-sm font-semibold mb-1">
              {sel === c.correcta ? '✅ ¡Correcto!' : '📝 Explicación:'}
            </div>
            <div className="text-sm text-slate-700">{c.explicacion}</div>
          </div>
          <button onClick={siguiente} className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 font-medium">
            Siguiente caso →
          </button>
        </>
      )}
    </div>
  );
}

// ============================================================
// FLASHCARDS
// ============================================================

function FlashcardsVista({ setVista, progreso, guardarProgreso }) {
  const [indice, setIndice] = useState(0);
  const [volteada, setVolteada] = useState(false);

  const f = FLASHCARDS[indice];

  const marcarVista = () => {
    if (!progreso.flashcardsVistas.includes(indice)) {
      guardarProgreso({
        ...progreso,
        flashcardsVistas: [...progreso.flashcardsVistas, indice]
      });
    }
  };

  const siguiente = () => {
    setIndice((indice + 1) % FLASHCARDS.length);
    setVolteada(false);
  };

  const anterior = () => {
    setIndice((indice - 1 + FLASHCARDS.length) % FLASHCARDS.length);
    setVolteada(false);
  };

  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Flashcards</h1>
      <p className="text-slate-600 mb-6">Toca la tarjeta para revelar la definición. Repasa los conceptos clave del tema.</p>

      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="text-slate-600">Tarjeta {indice + 1} de {FLASHCARDS.length}</span>
        <span className="text-slate-600">Revisadas: {progreso.flashcardsVistas.length}/{FLASHCARDS.length}</span>
      </div>

      <div
        onClick={() => { setVolteada(!volteada); if (!volteada) marcarVista(); }}
        className={`bg-gradient-to-br ${volteada ? 'from-yellow-100 to-amber-100 border-amber-300' : 'from-yellow-50 to-amber-50 border-amber-200'} border-2 rounded-2xl p-8 min-h-[280px] flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg`}
      >
        {!volteada ? (
          <>
            <div className="text-xs font-semibold text-amber-700 mb-3 uppercase tracking-wider">Concepto</div>
            <div className="text-2xl font-bold text-slate-800 text-center">{f.concepto}</div>
            <div className="text-xs text-slate-500 mt-4">👆 Toca para ver la definición</div>
          </>
        ) : (
          <>
            <div className="text-xs font-semibold text-amber-700 mb-3 uppercase tracking-wider">{f.concepto}</div>
            <div className="text-sm text-slate-700 text-center leading-relaxed">{f.definicion}</div>
            <div className="text-xs text-slate-500 mt-4">👆 Toca para volver</div>
          </>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={anterior} className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm">
          ← Anterior
        </button>
        <button onClick={siguiente} className="flex-1 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium text-sm">
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAPA CONCEPTUAL
// ============================================================

function MapaConceptualVista({ setVista, setDisenoActivo }) {
  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Mapa conceptual del tema</h1>
      <p className="text-slate-600 mb-6">Toca cualquier diseño para ir a su detalle.</p>

      <div className="space-y-6">
        {Object.entries(CLASIFICACION).map(([famId, fam]) => (
          <div key={famId} className={`border-2 rounded-2xl p-5 ${fam.color === 'indigo' ? 'border-indigo-300 bg-indigo-50/30' : 'border-emerald-300 bg-emerald-50/30'}`}>
            <div className={`font-bold text-lg mb-4 ${fam.color === 'indigo' ? 'text-indigo-800' : 'text-emerald-800'}`}>
              {fam.nombre}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(fam.hijos).map(([subId, sub]) => (
                <div key={subId} className="bg-white rounded-xl p-4 border border-slate-200">
                  <div className="font-semibold text-slate-700 mb-3 text-sm">{sub.nombre}</div>
                  <div className="space-y-1.5">
                    {sub.disenos.map(id => (
                      <button
                        key={id}
                        onClick={() => { setVista('disenos'); setDisenoActivo(id); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm bg-slate-50 hover:bg-indigo-100 hover:text-indigo-700 transition"
                      >
                        {DISENOS[id].nombre}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// AUTOEVALUACIÓN OBJETIVOS
// ============================================================

function ObjetivosVista({ setVista, progreso, guardarProgreso }) {
  const toggle = (i) => {
    guardarProgreso({
      ...progreso,
      objetivos: {
        ...progreso.objetivos,
        [i]: !progreso.objetivos[i]
      }
    });
  };

  const dominados = Object.values(progreso.objetivos).filter(Boolean).length;

  return (
    <div>
      <BotonVolver setVista={setVista} />
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Autoevaluación: objetivos del tema</h1>
      <p className="text-slate-600 mb-6">Los 15 objetivos oficiales del tema. Marca los que domines. Si no puedes responder alguno, vuelve al módulo correspondiente.</p>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-emerald-800">{dominados}/{OBJETIVOS_TEMA.length} objetivos dominados</div>
            <div className="text-sm text-emerald-700">{Math.round((dominados / OBJETIVOS_TEMA.length) * 100)}% de dominio del tema</div>
          </div>
          <Award className="w-10 h-10 text-emerald-500" />
        </div>
      </div>

      <div className="space-y-2">
        {OBJETIVOS_TEMA.map((obj, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 p-4 rounded-lg border text-left transition ${
              progreso.objetivos[i]
                ? 'bg-green-50 border-green-300'
                : 'bg-white border-slate-200 hover:border-green-300'
            }`}
          >
            {progreso.objetivos[i] ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
            )}
            <div className="text-sm text-slate-700 flex-1">
              <span className="font-bold text-slate-800 mr-1">{i + 1}.</span>
              {obj}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTES AUXILIARES
// ============================================================

function BotonVolver({ setVista }) {
  return (
    <button
      onClick={() => setVista('home')}
      className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600"
    >
      <Home className="w-4 h-4" /> Inicio
    </button>
  );
}

function Seccion({ titulo, icon: Icon, color, children }) {
  const colores = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  return (
    <div className={`${colores[color]} border rounded-xl p-5 mb-5`}>
      <div className="font-semibold mb-3 flex items-center gap-2">
        <Icon className="w-4 h-4" /> {titulo}
      </div>
      {children}
    </div>
  );
}