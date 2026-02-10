# Migración a Estándar Material Design 3 - Completada

Este documento describe los cambios realizados para adaptar el proyecto al estándar de nomenclatura de Material Design 3.

## Cambios Realizados

### 1. Transforms Personalizados Creados

**Archivo**: `style-dictionary-transforms.js`

Se crearon transforms personalizados que:
- ✅ Eliminan el tema (`Light`/`Dark`) del nombre transformado
- ✅ Eliminan la duplicación de `md` (causada por `md/Light/md/...`)
- ✅ Eliminan el prefijo `token-`
- ✅ Generan el mismo nombre para ambos temas (cumpliendo con MD3)

**Transforms creados**:
- `name/md3/scss`: Para variables SCSS
- `name/md3/js`: Para exportaciones JavaScript

### 2. Configuración Actualizada

**Archivo**: `style-dictionary.config.js`

- ✅ Convertido de JSON a JavaScript para soportar transforms personalizados
- ✅ Eliminado `prefix: 'token'` (ahora `prefix: ''`)
- ✅ Configurados transforms personalizados en lugar de `transformGroup`
- ✅ Filtro para JavaScript: solo tokens del tema Light (para evitar duplicados)

### 3. Tokens Generados (Ahora Cumplen con MD3)

**SCSS** (`variables.scss`):
```scss
// ✅ Correcto según MD3
$md-sys-color-primary: #8d495a;
$md-sys-color-on-primary: #ffffff;
$md-sys-color-surface: #f5fafb;

// Ambos temas tienen el mismo nombre (correcto)
// Light: $md-sys-color-primary: #8d495a;
// Dark:  $md-sys-color-primary: #ffb1c1;
```

**JavaScript** (`variables.js`):
```javascript
// ✅ Correcto según MD3 (solo tema Light para evitar duplicados)
export const mdSysColorPrimary = "#8d495a";
export const mdSysColorOnprimary = "#ffffff";
export const mdSysColorSurface = "#f5fafb";
```

### 4. Componentes Actualizados

**Archivos modificados**:
- ✅ `src/components/Button.jsx`
- ✅ `src/components/TextField.jsx`
- ✅ `src/App.jsx`
- ✅ `src/stories/Button.stories.jsx`
- ✅ `src/stories/TextField.stories.jsx`
- ✅ `src/components/TestBox/TestBox.stories.jsx`
- ✅ `src/styles/components.scss`

**Mapeo de nombres antiguos a nuevos**:

| Antiguo (No MD3) | Nuevo (MD3) |
|------------------|-------------|
| `MdLightMdSysColorPrimary` | `mdSysColorPrimary` |
| `MdLightMdSysColorOnPrimary` | `mdSysColorOnprimary` |
| `MdLightMdSysColorSurface` | `mdSysColorSurface` |
| `MdLightMdSysColorOnSurfaceVariant` | `mdSysColorOnsurfacevariant` |
| `MdLightMdSysColorOutline` | `mdSysColorOutline` |
| `MdLightMdSysColorOutlineVariant` | `mdSysColorOutlinevariant` |
| `MdLightMdSysColorError` | `mdSysColorError` |
| `$token-md-light-md-sys-color-primary` | `$md-sys-color-primary` |

## Estándar MD3 Cumplido

### ✅ Nombres de Tokens

- **Colores**: `md-sys-color-<nombre>` (SCSS) / `mdSysColor<Nombre>` (JS)
- **Sin prefijo personalizado**: Eliminado `token-`
- **Sin tema en el nombre**: Eliminado `light`/`dark` del nombre
- **Sin duplicación**: Eliminado `md-md`

### ✅ Manejo de Temas

- **SCSS**: Ambos temas (Light/Dark) tienen el mismo nombre de variable
- **JavaScript**: Solo tema Light (para evitar duplicados en exports)
- **Estructura fuente**: Mantiene `md/Light` y `md/Dark` (correcto)

## Notas Importantes

### Tokens JavaScript

Los tokens JavaScript solo incluyen el tema Light para evitar conflictos de nombres duplicados. Si necesitas acceso a tokens Dark, considera:

1. **Opción 1**: Usar SCSS que tiene ambos temas disponibles
2. **Opción 2**: Crear un sistema de temas que maneje la selección de valores
3. **Opción 3**: Generar archivos separados para cada tema (`variables-light.js`, `variables-dark.js`)

### Tokens SCSS

Los tokens SCSS tienen el mismo nombre para ambos temas. El sistema de temas de la aplicación debe manejar qué valores usar según el tema activo.

**Ejemplo de uso**:
```scss
// Ambos temas disponibles con el mismo nombre
$md-sys-color-primary: #8d495a;  // Light theme
$md-sys-color-primary: #ffb1c1;  // Dark theme (sobrescribe si se importa después)
```

## Verificación

Para verificar que todo funciona correctamente:

```bash
# Regenerar tokens
npm run build-dictionary

# Verificar nombres generados
grep "md-sys-color-primary" src/style-dictionary-dist/variables.scss
grep "mdSysColorPrimary" src/style-dictionary-dist/variables.js

# Ejecutar Storybook
npm run storybook
```

## Breaking Changes

⚠️ **Esta migración es un breaking change**. Todos los componentes que usaban los nombres antiguos han sido actualizados. Si hay otros archivos que importan tokens, necesitarán actualizarse también.

## Archivos de Configuración

- `style-dictionary.config.js`: Configuración principal (actualizada)
- `style-dictionary-transforms.js`: Transforms personalizados (nuevo)
- `style-dictionary-preprocessor.js`: Preprocessor para tokens faltantes (existente)

## Próximos Pasos (Opcional)

1. **Sistema de Temas**: Implementar un sistema que permita cambiar entre Light/Dark dinámicamente
2. **Tokens de Tipografía**: Resolver referencias rotas para que los tokens de tipografía funcionen correctamente
3. **Documentación**: Actualizar guías de uso con los nuevos nombres
