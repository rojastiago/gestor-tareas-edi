# Informe de incidencias · Gestor de tareas

**Estudiante:** Tiago Rojas
**Fecha:** 18/11/2026
**Proyecto / rama Git:** `rojastiago/gestor-tareas-edi` / `main`
**Entorno (Expo SDK, Android, dispositivo):** Expo SDK 57. Probé en Chrome desde una PC con Windows. No usé Android en estas pruebas.

## Resumen ejecutivo

Probé en el tablero qué pasaba al completar una tarea y al simular un error del servicio. También ejecuté `npm test` y revisé las fallas de búsqueda y validación. Registré cuatro incidencias: dos observadas en Chrome y dos detectadas con Jest. Las cuatro están pendientes de corrección.


## Incidencia 1
- **Título de incidencia:** El tilde aparece después de cambiar de pestaña.
- **Pasos para reproducir:** Abrir el tablero, marcar la tarea "Validar login", cambiar a Pendientes y después volver a Todas. Luego actualizar la página.
- **Esperado / observado:** Esperaba que el tilde apareciera al hacer clic, pero no apareció. Cuando cambié de pestaña y volví, recién apareció marcado. Después actualicé la página y el tilde desapareció.
- **Herramienta usada (DevTools / consola / test):** Prueba manual en Chrome.
- **Hipótesis y evidencia:** Puede ser un problema con la actualización de la tarea, porque el cambio se muestra recién al pasar de una pestaña a otra. También observé que, al actualizar la página, la tarea vuelve a su estado inicial.
**Evidencia del log:**
![Log de la incidencia 1](evidencias/incidencia1_log.png)

- **Archivo y función involucrada:** `app/index.tsx`, función `toggleTask`.
- **Causa raíz:** La función modificaba directamente el estado de la tarea y después usaba `setTasks(tasks)` con el mismo arreglo. Por eso React no actualizaba la pantalla inmediatamente.
- **Corrección aplicada:** Cambié la función para utilizar `setTasks` con `map()`, creando un nuevo arreglo y una copia de la tarea modificada.
- **Prueba de regresión:** Volví a marcar una tarea en Chrome y comprobé que el tilde aparece inmediatamente, sin cambiar de pestaña.
- **Estado:** Corregido.



## Incidencia 2
- **Título de incidencia:** La carga sigue visible después del error del servicio.
- **Pasos para reproducir:** Abrir el tablero, presionar «Simular error API» y observar el mensaje que aparece.
- **Esperado / observado:** Esperaba que apareciera el error y terminara la carga. El mensaje de error apareció abajo, pero seguía mostrando «Consultando tareas».
- **Herramienta usada (DevTools / consola / test):** Prueba manual en Chrome.
- **Hipótesis y evidencia:** Es posible que el estado de carga quede activo al fallar la consulta. Vi el mensaje de error y el de carga al mismo tiempo.
- **Archivo y función involucrada:** `app/index.tsx`, como punto de partida. Falta confirmar la función que maneja la consulta.
- **Causa raíz:** Pendiente de confirmar.
- **Corrección aplicada:** Pendiente.
- **Prueba de regresión:** Simular nuevamente el error y comprobar que el mensaje aparezca y la carga termine.
- **Estado:** Pendiente.

## Incidencia 3
- **Título de incidencia:** La búsqueda falla con mayúsculas y espacios externos.
- **Pasos para reproducir:** Ejecutar `npm test` y revisar las pruebas de búsqueda de `__tests__/taskFilters.test.ts`.
- **Esperado / observado:** Las pruebas esperaban encontrar una tarea al buscar `VALIDAR` y al buscar `login` con dos espacios antes y después. En los dos casos se obtuvo una lista vacía.
- **Herramienta usada (DevTools / consola / test):** Jest.
- **Hipótesis y evidencia:** La búsqueda podría estar comparando el texto tal como se escribe. Fallaron las pruebas que usaron mayúsculas y espacios externos.
- **Archivo y función involucrada:** `src/utils/taskFilters.ts`, función `filterTasks`.
- **Causa raíz:** Pendiente de confirmar.
- **Corrección aplicada:** Pendiente.
- **Prueba de regresión:** Volver a ejecutar las dos pruebas y comprobar que cada búsqueda encuentre la tarea esperada.
- **Estado:** Pendiente.

## Incidencia 4
- **Título de incidencia:** La validación acepta un título compuesto solo por espacios.
- **Pasos para reproducir:** Ejecutar `npm test` y revisar la prueba de `__tests__/taskValidation.test.ts` que usa un título de tres espacios.
- **Esperado / observado:** La función debía devolver `false` para rechazar el título. Devolvió `true` y lo tomó como válido.
- **Herramienta usada (DevTools / consola / test):** Jest.
- **Hipótesis y evidencia:** La validación podría estar contando los espacios como contenido. La prueba mostró que tres espacios fueron suficientes para que devolviera `true`.
- **Archivo y función involucrada:** `src/utils/taskValidation.ts`, función `isValidTaskTitle`.
- **Causa raíz:** Pendiente de confirmar.
- **Corrección aplicada:** Pendiente.
- **Prueba de regresión:** Comprobar que la función rechace un título de tres espacios y siga aceptando un título con palabras.
- **Estado:** Pendiente.

## Otras incidencias (opcional)

## Pruebas

En la primera ejecución de `npm test` pasaron 6 pruebas y fallaron 3.

| Prueba | Antes | Después | Evidencia |
|---|---|---|---|
| Búsqueda | Las dos búsquedas devolvieron una lista vacía | Pendiente | Salida inicial de Jest |
| Validación | La función aceptó un título de tres espacios | Pendiente | Salida inicial de Jest |
| Actualización de estado | El tilde apareció al cambiar de pestaña y volver | Pendiente | Observación manual en Chrome |
| Error de servicio | «Consultando tareas» siguió visible después del error | Pendiente | Observación manual en Chrome |

## Conclusión y control de cambios
- **Commit final (hash):** Pendiente.
- **Mensaje del commit:** Pendiente.
- **Qué aprendí y cómo lo aplicaría a mi app final:** Pendiente de completar después de revisar el código y comprobar las correcciones.