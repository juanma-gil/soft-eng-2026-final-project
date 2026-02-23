# 🚀 Proyecto de Firmware ESP32 - Ingeniería de Software y Hardware

En esta sección se encuentra la estructura base para el desarrollo del firmware del Trabajo Final de la asignatura **Ingeniería de Software y Hardware** de la carrera de Ingeniería en Computación en la FCEFyN - UNC. El proyecto está diseñado bajo un enfoque de **autonomía alineada**, donde los equipos tienen libertad técnica dentro de los lineamientos de buenas prácticas de ingeniería establecidos por la cátedra.



## 📂 Estructura del Proyecto

* **`include/`**: Contiene los archivos de cabecera (`.h`). 
* **`src/`**: Directorio para el código fuente (`.cpp`). Se recomienda una división modular (sensores, comunicación, lógica de negocio) alineada con el proceso de diseño e implementación.
* **`test/`**: Aquí se deben implementar las **Pruebas Unitarias**.
* **`.env.example`**: Plantilla para la gestión de configuraciones sensibles (SSID, contraseñas, IPs de backend). **Nota:** Nunca debe subirse el archivo `.env` real al control de versiones.
* **`platformio.ini`**: Manifiesto de configuración que define el hardware, la gestión de dependencias y las herramientas de análisis de calidad.



## ⌨️ Comandos Útiles (PlatformIO CLI)

Para la gestión del ciclo de vida del software, se utilizan los siguientes comandos desde la terminal:

### Gestión de Construcción y Carga
* **Compilar el proyecto:**
    `pio run`
* **Cargar el firmware al ESP32:**
    `pio run -t upload`
* **Monitor Serial:**
    `pio device monitor`

### Calidad y Pruebas 
* **Ejecutar Pruebas Unitarias:**
    `pio test`
* **Análisis Estático de Código:**
    `pio check`
* **Limpiar archivos temporales de construcción:**
    `pio run -t clean`

---
**Cátedra:** Ingeniería de Software y Hardware - FCEFyN - UNC