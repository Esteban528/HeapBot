# Contribuir al Proyecto

## Requisitos

Antes de comenzar, es necesario contar con lo siguiente:

* [Bun](https://bun.sh/) v1.2.8
* Git y una cuenta en GitHub

Todas las contribuciones deben realizarse mediante un *fork* del repositorio y una *pull request* por cada funcionalidad o mejora.

---

## Configuración del entorno de desarrollo

1. Clonar el fork del repositorio:

   ```bash
   git clone https://github.com/tu-usuario/HeapBot.git
   cd HeapBot
   ```

2. Crear un archivo `.env` copiando la plantilla proporcionada:

   ```bash
   cp .env-template .env
   ```

   **Importante:** no se debe compartir el archivo `.env` ni ninguna variable sensible contenida en él.

---

## Añadir una nueva funcionalidad

1. Crear una nueva rama para la funcionalidad:

   ```bash
   git checkout -b feature/nombre-de-la-funcionalidad
   ```
2. El código introducido debe ser estrictamente en inglés igual que su documentación, haga uso de buenas prácticas y principios de modularidad y optimización.
3. El mensaje de cada commit debe ser estrictamente en inglés y con el estándar [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0)
4. Implementar los cambios de manera aislada. Se debe procurar modificar únicamente los archivos relacionados con la nueva funcionalidad. Los cambios que afecten otras partes del proyecto podrían ser rechazados.

5. La documentación debe ser incluida cuando sea necesaria; puede omitirse si no aporta valor o no es requerida.

6. Se recomienda evitar:

   * Commits innecesarios o con mensajes poco descriptivos.
   * Commits generales que agrupen múltiples cambios sin relación clara.

7. Antes de enviar una *pull request*, se debe comprobar que la funcionalidad añadida funciona correctamente y no introduce errores.

---

## Pull Request

* Las *pull requests* deben enviarse desde una rama del fork hacia el repositorio original.
* El título y la descripción deben ser claros y reflejar de manera precisa los cambios realizados.
* Solo se aceptarán *pull requests* bien estructuradas, verificadas y que estén enfocadas en una única funcionalidad.

---

