# Guía de Exportación de Tokens (Material Design 3)

Esta guía documenta el proceso manual para extraer los tokens de diseño (colores, tipografías) desde Figma y actualizarlos en el código del proyecto.

## Pre-requisitos
- Acceso de edición al archivo Figma.
- Plugin **Material Theme Builder** instalado en Figma.

## Pasos para Exportar

1. **Abrir el Plugin**
   - En Figma, presiona `Shift + I`, busca **"Material Theme Builder"** y ejecútalo.
   - Asegúrate de estar en la página `🎨 Foundations` o `🧩 Components`.

2. **Verificar el Tema**
   - Confirma que el "Source Color" sea el rosa de marca (`#FF0061`).
   - Verifica que no haya cambios pendientes (si el botón "Update" aparece habilitado, dale clic).

3. **Generar el Archivo**
   - Dentro del plugin, haz clic en el botón **Export** (ícono de descarga o texto "Export").
   - Selecciona el formato **JSON** (Generic / Design Tokens).
   - El plugin descargará un archivo (ej. `material-theme.json`).

4. **Actualizar el Repositorio**
   - Toma el archivo descargado y renómbralo a `test-tokens.json` (estándar definido por el equipo).
   - Reemplaza el archivo existente en la ruta:
     `src/tokens/test-tokens.json`

5. **Verificación**
   - Corre Storybook (`npm run storybook`) y verifica que los componentes reflejen los colores correctos.

---