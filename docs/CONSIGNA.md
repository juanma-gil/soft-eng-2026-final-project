# Consigna — Proyecto final IoT

**Universidad Nacional de Córdoba** · Facultad de Ciencias Exactas, Físicas y Naturales · Ingeniería de Software

Este documento define **obligaciones** y **criterios de aceptación** del trabajo final. Los **requisitos funcionales y no funcionales** los plantea **el equipo** (Jira, `docs/`, entregas de la materia, etc.) con la libertad de forma y granularidad que corresponda, siempre que el resultado sea **compatible** con todo lo exigido aquí: esta consigna actúa como **conjunto de restricciones (constraints)**.

---

## Resumen rápido

| Ámbito | Qué se exige |
|--------|----------------|
| Proceso | **Jira en la web** con **proyecto nuevo** del equipo; PRs obligatorias para trabajo de historias; **mínimo 2 aprobaciones** por PR; cada commit integrado con **clave de historia** (`KEY-NNN`); aporte de código **parejo**; **workflow Git documentado** (se recomienda [Gitflow — Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)); **convención de commits documentada** (se recomienda [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)); **hooks** `pre-commit` y `pre-push` instalables por el equipo; **linter** en repo y ejecutado en **pre-commit** (no hace falta repetir lint en Actions) |
| ESP32 | Recopilación de eventos del entorno (botones, sensores, potenciómetros, teclados, etc.); **≥3 canales o modalidades** distintas en la demo |
| Backend | **Un solo framework** elegido por el equipo; **≥3 algoritmos** distintos sobre datos persistidos o ligados a PostgreSQL; validación y códigos HTTP coherentes |
| Datos | Todo lo que ingresa desde la ESP32 debe **guardarse en histórico** en **PostgreSQL** |
| Integración | **REST** entre ESP32↔backend y frontend↔backend; el **frontend no puede** llamar a la ESP32 **directamente** |
| Contratos | API acordada y **documentada antes** (p. ej. OpenAPI en el repo) |
| Frontend | Consulta **histórica** (tablas u otro formato estructurado) y visualización **en vivo** de sensores y salidas de algoritmos (gráficos, texto o tablas a criterio del equipo) |
| Patrones | **Observer** obligatorio (**≥2** estructuras concretas); **Strategy** obligatorio; **≥1 tercer patrón GoF** a elección del grupo, justificado por escrito |
| Reactividad | No usar **solo** `useState` (u otro estado reactivo local) como mecanismo único para propagar datos de dominio: las actualizaciones relevantes **deben pasar** por las abstracciones Observer definidas |
| Idioma | **Código y comentarios en inglés**; informes y Jira pueden estar en español |
| GitHub Actions | Solo **GitHub Actions**: **`.github/workflows/`**; en **PRs** hacia integración: como mínimo **build + tests unitarios** del **backend** elegido; **frontend:** **build + tests unitarios**; **firmware:** **`pio test`** (tests unitarios PlatformIO). **No** es obligatorio ejecutar el **linter** otra vez en el pipeline (alcanza con **pre-commit**). Jobs requeridos / branch protection documentados |
| Testing | **Backend, frontend y firmware:** solo **tests unitarios**; se **valoran** en backend tests de integración/API. Los comandos de **test** deben coincidir entre **GitHub Actions**, **pre-push** y documentación local |
| Diseño UML (previo al código) | **Antes** de implementar funcionalidad sustantiva: **(1)** diagrama de **componentes** (arquitectura); **(2)** diagrama de **clases** al menos del **backend**; **(3)** **uno o más** diagramas de **secuencia** para flujos relevantes. Fuente + vista exportada en `docs/` |

---

## Detalle obligatorio y criterios de aceptación

### Contexto y requisitos del equipo

El trabajo aplica a la materia en UNC, FCEFyN. Los **RF y RNF** los define el equipo; deben ser **coherentes** con el producto entregado y **respetar** cada obligación de esta consigna. La cátedra no impone un formato único de matriz salvo lo que indique el curso por fuera de este repo.

**Criterios de aceptación:** el sistema y la documentación de ingeniería del equipo permiten comprobar que se cumplen **todas** las secciones obligatorias de esta consigna (constraints).

---

### Idioma del código y de la documentación del equipo

- **Código fuente y comentarios:** en **inglés** (identificadores, comentarios, mensajes de error técnicos en código).
- **Documentación del equipo, Jira, informes:** pueden estar en **español**.

**Criterios de aceptación:** en revisión del código integrado a la rama principal, no hay comentarios ni nombres de API en español salvo strings visibles al usuario final si aplica.

---

### Pull requests y revisiones

- El trabajo ligado a **historias de usuario** se integra solo mediante **pull requests** a la rama de integración protegida (no push directo).
- Cada PR debe tener **al menos dos aprobaciones** de **personas distintas** del equipo antes del merge.
- La descripción del PR debe incluir la clave de la historia o tarea en **Jira** (p. ej. `PROJ-123`).

**Criterios de aceptación:** la configuración del repositorio (o de la organización) **impide** fusionar sin dos aprobaciones; el historial de PRs muestra la referencia a Jira.

---

### Aporte parejo entre integrantes

El aporte debe ser **equilibrado** a lo largo del cuatrimestre y **auditable** por el historial de Git (autoría o coautoría de commits sustantivos por persona).

**Criterios de aceptación:** en la entrega final se puede ver que **ningún** integrante monopoliza casi todo el código ni está **ausente** de commits relevantes, salvo justificación documentada (licencias, baja, etc.).

---

### Jira: proyecto, historias, tareas y commits

- Uso de **Jira en la web**, con un **proyecto nuevo** creado por el equipo para esta materia (salvo que el cuerpo docente asigne un proyecto compartido).
- **Historias de usuario** descompuestas en **tareas**; seguimiento en Jira.
- Cada commit que llegue a la rama de integración debe incluir en el mensaje la clave **Jira** de la historia (o de la tarea vinculada a esa historia), p. ej. `PROJ-42`.
- En el repositorio debe constar **nombre del proyecto**, **URL de Jira** y **prefijo de claves** (en `README` o `docs/`).

**Criterios de aceptación:** existe el proyecto; backlog con historias y tareas; mensajes de commit en la rama integrada contienen `KEY-NNN`; la documentación del repo identifica el proyecto sin ambigüedad.

---

### Workflow de ramas Git

El equipo debe **definir, documentar y cumplir** un flujo de trabajo con ramas (qué ramas largas existen, qué mergea en qué, cómo encajan los PR). Puede basarse en un modelo publicado; se recomienda **Gitflow** ([tutorial Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)).

**Criterios de aceptación:** existe un archivo en **`docs/`** (nombre a elección, p. ej. `GIT_WORKFLOW.md`) que describe el flujo; las ramas y PRs observables **coinciden** con lo documentado en cualquier hito de revisión.

---

### Convención de mensajes de commit

El equipo debe **elegir y documentar** una **única** convención de mensajes de commit, aplicada de forma consistente en la rama de integración. La documentación debe estar en **`docs/`**, incluir **al menos tres ejemplos** de mensajes, y cada ejemplo debe cumplir **tanto** la convención elegida **como** la regla de clave Jira `KEY-NNN`. Se recomienda **Conventional Commits** ([especificación](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)).

**Criterios de aceptación:** archivo en `docs/` con convención declarada y tres ejemplos válidos; commits recientes de la rama integrada son coherentes con esa convención y llevan clave Jira.

---

### Diseño UML previo al desarrollo

Hay una **etapa de diseño obligatoria** que debe **cerrarse antes** de que el equipo comience a **programar** la solución (lógica de dominio, APIs definitivas, firmware de integración, UI de producto). Objetivo: fijar arquitectura y comportamiento colaborativo **en diagramas UML**, no solo en texto.

**Obligatorios (tres tipos):**

1. **Diagrama de componentes** — vista de **arquitectura**: componentes principales (p. ej. ESP32, backend, PostgreSQL, frontend, colas o servicios externos si aplican), dependencias y canales de comunicación (REST, etc.).
2. **Diagrama de clases** — **al menos para el backend** elegido (paquetes / clases que reflejen dominio, servicios, persistencia, algoritmos). **No** se exige diagrama de clases del frontend ni del firmware (pueden implementarse sin modelo orientado a objetos clásico).
3. **Diagramas de secuencia** — **uno o más** que muestren **interacciones en el tiempo** entre actores/componentes para flujos críticos (p. ej. ingesta desde ESP32 hasta persistencia, consulta histórica con algoritmos, flujo en vivo hacia el frontend).

**Ubicación y formato:** los artefactos viven bajo **`docs/`** (p. ej. `docs/diagrams/`). Debe haber **fuente editable** (PlantUML `.puml`, Mermaid `.mmd`, Draw.io `.drawio`, o equivalente **versionado**) y, si la herramienta lo permite, una **vista exportada** legible sin abrir el editor (`.png`, `.svg` o PDF) para revisión rápida.

**Criterio de “antes de codear”:** los diagramas deben estar **mergeados** en la rama de trabajo del equipo **antes** del primer PR o conjunto de commits que introduzca implementación sustantiva acordada con el docente (p. ej. hito Jira “Diseño / UML aprobado”, o revisión explícita en clase). El docente puede rechazar avance de desarrollo si falta esta etapa.

**Criterios de aceptación:** en `docs/` existen los tres tipos de diagrama; el de componentes es coherente con la arquitectura real entregada; el de clases cubre el backend y es razonablemente **alineado** con el código final (refinamientos posteriores documentados); los de secuencia cubren al menos un flujo **end-to-end** relevante; la fecha o el hito Jira asociado demuestra orden **diseño → desarrollo**.

---

### Adquisición mínima en ESP32

El firmware en **ESP32** debe leer **varias** fuentes del entorno o de interacción: botones, sensores analógicos o digitales, potenciómetros, teclado matricial, etc. En la demo deben verse **al menos tres** canales o modalidades de entrada **distintas**.

**Criterios de aceptación:** en la demostración se observan tres entradas distintas alimentando el sistema.

---

### Backend: tres algoritmos y PostgreSQL

El backend debe ejecutar **al menos tres algoritmos distintos** sobre datos ingeridos o almacenados (p. ej. media móvil, Kalman, mediana, ventanas temporales, isolation forest, umbrales con histéresis, etc.). Cada algoritmo debe estar acoplado al flujo de datos que **lee o escribe** en **PostgreSQL**.

**Criterios de aceptación:** en repo o API viva se identifican **tres** algoritmos nombrados, con entradas/salidas y vínculo explícito a PostgreSQL documentado.

---

### Integración REST y prohibición de front → ESP32

- ESP32 ↔ backend y frontend ↔ backend solo por **HTTP REST** documentado.
- El **frontend no** puede invocar la ESP32 directamente (ni IP del dispositivo en configuración del front para datos de dominio).

**Criterios de aceptación:** revisión de código y/o red: el navegador solo llama al backend; la ESP32 solo al backend.

---

### Persistencia histórica en PostgreSQL

Todo evento o telemetría que el backend acepte desde la ESP32 debe **persistirse** en PostgreSQL para consulta histórica aunque el dispositivo esté apagado.

**Criterios de aceptación:** con ESP32 desconectado, los datos ya ingresados se pueden consultar vía backend desde herramientas o el frontend.

---

### Frontend: histórico y tiempo real

Debe haber consulta de **histórico** en forma tabular o equivalente estructurado, y visualización **en vivo** de sensores y de **resultados de algoritmos** (el equipo elige tablas, gráficos y/o texto).

**Criterios de aceptación:** se muestra histórico por rango o lista acotada; la vista en vivo **se actualiza** sin recargar toda la página.

---

### Un solo framework de backend

Para la entrega calificada el equipo elige **un único** framework entre los del template (p. ej. solo Flask, solo Spring Boot o solo NestJS). No debe ser obligatorio levantar los demás para la demo.

**Criterios de aceptación:** documentación de ejecución menciona un solo servidor de aplicación; el resto figura como no usado u opcional fuera de la nota.

---

### Contratos de API previos

Antes de que firmware o front dependan de ellos, el equipo publica **contratos versionados** (OpenAPI u otro documento REST equivalente **commiteado**). Los cambios rompientes actualizan el contrato.

**Criterios de aceptación:** el primer consumo de un endpoint en historial Git va **después** de aparecer el contrato con los campos necesarios para esa llamada.

---

### Patrones de diseño: Observer (×2), Strategy y un tercero

- **Observer:** al menos **dos** estructuras concretas (p. ej. dos subjects o familias de observadores independientes) que participen en llevar actualizaciones de **sensores** y de **salidas de algoritmos** hacia la capa de presentación. Identificadores y comentarios en inglés.
- **Strategy:** al menos un caso **no trivial** (backend o frontend), con nombres en inglés.
- **Un tercer patrón GoF** (Factory, Adapter, Command, etc.) a elección del grupo, justificado en **`docs/`** o ADR (cuerpo del texto puede ser español).

**Criterios de aceptación:** el código contiene las tres piezas; el documento de justificación nombra el tercer patrón y los roles de las clases.

---

### Reactividad del frontend y dominio

Si se usa `useState`, hooks o estado reactivo local, **no** puede ser el **único** mecanismo para propagar al UI los datos de dominio (sensores, series procesadas): esas actualizaciones deben pasar por las **abstracciones Observer** exigidas arriba.

**Criterios de aceptación:** revisión de flujo de datos: las vistas relevantes se suscriben o actualizan vía Observer, no solo por estado local aislado.

---

### Calidad no funcional mínima

El sistema debe poder demostrarse **de punta a punta** siguiendo **README** o **ABOUT** del fork. El backend valida cuerpos de ingesta y responde con **códigos HTTP** coherentes ante error (p. ej. 4xx ante payload inválido **sin** persistir basura).

**Criterios de aceptación:** demo en máquina del docente o entorno declarado; prueba manual de payload malformado → 4xx y sin filas corruptas.

---

### GitHub Actions (CI/CD)

La integración continua se implementa **exclusivamente con GitHub Actions** (mejor trazabilidad: mismos PRs, checks en la pestaña *Actions*, y workflows versionados junto al código). No se admiten otros proveedores de CI para la entrega salvo excepción **por escrito** del cuerpo docente.

Los **workflows** viven bajo **`.github/workflows/`** (archivos `.yml` o `.yaml`) y deben dispararse de forma **automática** en **pull requests** hacia la rama de integración del trabajo (o la política equivalente documentada en el workflow Git).

**Contenido mínimo de los workflows:**

1. **Backend (el framework elegido):** instalación de dependencias, **build**, y **`test` / suite unitaria** (fallo del job = check rojo en el PR). El **linter** no debe volver a ejecutarse aquí si ya corre en **pre-commit** (evitar duplicación).
2. **Frontend:** **`npm test` / `pnpm test`** (tests unitarios) y **build** de producción.
3. **Firmware (ESP32):** job que ejecute **`pio test`** para la suite de **tests unitarios** bajo `test/` (PlatformIO). Los tests unitarios no requieren hardware en placa; deben compilar y correr en el runner estándar de GitHub.

**Criterios de aceptación:** existen workflows bajo `.github/workflows/`; en un PR hacia integración los checks muestran **build** y **tests unitarios** para backend, front y firmware según lo anterior; **README** o **ABOUT** indica cómo repetir localmente **build** y **test** (y `pio test` en firmware). El **lint** queda cubierto por **pre-commit**, no por obligación en Actions.

---

### Pruebas automatizadas (testing)

Solo se exigen **tests unitarios** en **backend**, **frontend** y **firmware** (misma barra en los tres). Deben vivir en el repo, ser **relevantes** al código entregado y ejecutarse en **GitHub Actions** y localmente con los mismos comandos documentados.

| Componente | Obligación |
|------------|------------|
| **Backend** | Tests **unitarios** sobre lógica no trivial (p. ej. validación, al menos **uno** de los algoritmos o servicios core). Se **valoran** tests de **integración** (API + PostgreSQL), fuera del mínimo obligatorio. |
| **Frontend** | Tests **unitarios** (o de componentes sin navegador real) con el runner del stack (`npm test`, `vitest`, etc.). |
| **Firmware** | Tests **unitarios** en **`firmware/esp32/test/`** (o ruta que use el `platformio.ini`); se ejecutan con **`pio test`** en la máquina del desarrollador y en el workflow de Actions. |

Los tests y los **workflows** deben estar **alineados** (mismos comandos en CI y en documentación local).

**Criterios de aceptación:** carpetas/archivos de test visibles en los tres componentes; `docs/` o README del componente indica cómo correr **tests** (y `pio test` para firmware) y cómo correr el **linter** (p. ej. vía pre-commit); los workflows de Actions invocan **build + tests unitarios** sin contradicciones con pre-push.

---

### Hooks Git: pre-commit y pre-push

El equipo debe configurar **dos hooks de Git** versionados o instalables desde el repo (no basta con tenerlos solo en una máquina sin documentar):

1. **pre-commit** (antes de crear el commit): debe ejecutar como mínimo el **linter** sobre el ámbito que corresponda (archivos staged o proyecto afectado). Puede incluir también formateo automático (`prettier`, `black`, etc.) si lo documentan.
2. **pre-push** (antes de `git push` al remoto): debe ejecutar comprobaciones que eviten empujar código roto; como mínimo la **misma suite de tests unitarios** que corre CI para los componentes tocados, o la suite completa si el tiempo de ejecución lo permite. Debe quedar **documentado** el comando exacto (script en `package.json`, `pre-commit` framework, Husky, Lefthook, etc.).

Cada integrante debe poder activar los hooks con los pasos del **README** o **`docs/`** (p. ej. `pre-commit install`, `npm install` + Husky, una sola vez por clone).

**Criterios de aceptación:** en el repo hay configuración clara de hooks; un commit forzando un error de lint **falla** en pre-commit; un push con tests rotos **falla** en pre-push (o el equipo demuestra el mismo cheque en la práctica acordada con el docente); la documentación de instalación está probada en un clone limpio.

---

### Linter (estático)

Debe existir al menos un **linter** configurado y versionado para cada parte activa del monorepo que el equipo entregue:

- **Backend** (el framework elegido): p. ej. Ruff/Flake8, ESLint (Nest), Checkstyle/Spotless (Spring), herramienta equivalente.
- **Frontend:** p. ej. **ESLint** (u otra herramienta del ecosistema) con reglas en archivo commiteado.
- **Firmware:** p. ej. **Cppcheck** vía PlatformIO `check` o reglas de build que fallen ante warnings críticos; comando **documentado** en `docs/` o README del firmware.

El linter debe ejecutarse en **pre-commit** (obligatorio). **No** es obligatorio volver a ejecutarlo en **GitHub Actions**. La configuración **no** debe depender de reglas solo locales ignoradas.

**Criterios de aceptación:** archivos de config del linter en el repo; **pre-commit** invoca el linter (o subconjunto documentado); no se exige job de lint en el pipeline.

---

### Checklist global de entrega

En la evaluación final deben cumplirse, además de lo anterior:

1. Demo en vivo ESP32 → backend → frontend.
2. Jira con historias y tareas; PRs vinculados.
3. Historial de merges con **≥2 aprobaciones** por PR de historia.
4. Contrato de API en repo alineado con endpoints reales.
5. Evidencia en código de **dos** Observers, **una** Strategy y **un** tercer GoF con justificación escrita.
6. **Tres** algoritmos de backend trazables (API o jobs documentados).
7. Código y comentarios en **inglés** en la rama integrada.
8. Documento de **workflow Git** en `docs/`.
9. Documento de **convención de commits** con ejemplos en `docs/`.
10. **GitHub Actions** (`.github/workflows/`) en el repo, en PRs hacia integración, con **build + tests unitarios** (sin exigencia de lint en el pipeline).
11. **Tests unitarios** en backend, frontend y firmware, alineados con los workflows y con **pre-push**.
12. **Hooks** `pre-commit` (linter mínimo) y `pre-push` (tests u otra verificación documentada), instalables según `README` o `docs/`.
13. **Linter** versionado y ejecutado en **pre-commit** para backend, frontend y firmware activos.
14. **Diseño UML previo al código:** diagrama de **componentes**, diagrama de **clases** (al menos backend) y **diagrama(s) de secuencia**, en `docs/` con fuente versionada según la sección *Diseño UML previo al desarrollo*.

---

### Nice to have — Docker Compose en Actions (entorno tipo producción)

Cuando el proyecto esté **suficientemente avanzado o cerrado**, el equipo **puede** agregar un job opcional en GitHub Actions que:

- ejecute **`docker compose build`** para construir las **imágenes** desde los `Dockerfile` / manifiestos del repo,
- levante el stack con **`docker compose up`** (o variante adecuada para CI: perfil mínimo, `depends_on` + healthchecks, variables de entorno de “prod simulada”),

como **smoke** del despliegue integrado (backend, base, frontend en contenedores, según lo que el equipo haya dockerizado), acercándose a un **entorno tipo producción**.

Debe quedar **documentado** en `docs/` o **ABOUT** cómo reproducir el mismo flujo en la máquina local. **No** es requisito de aprobación del curso salvo que el docente lo indique aparte.

---

Para instalación y stack del repositorio base, ver [ABOUT.md](../ABOUT.md).
