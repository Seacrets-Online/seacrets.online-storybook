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
- `name/md3/scss`: Para nombres de variables CSS

### 2. Configuración Actualizada

**Archivo**: `style-dictionary.config.js`

- ✅ Convertido de JSON a JavaScript para soportar transforms personalizados
- ✅ Eliminado `prefix: 'token'` (ahora `prefix: ''`)
- ✅ Configurados transforms personalizados en lugar de `transformGroup`
- ✅ Salida única: theme.css con Light/Dark vía `:root` y `[data-theme="dark"]`

### 3. Tokens Generados (Ahora Cumplen con MD3)

**theme.css** (única salida actual):
```css
:root {
  --md-sys-color-primary: #8d495a;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-surface: #f5fafb;
}

[data-theme="dark"] {
  --md-sys-color-primary: #ffb1c1;
  --md-sys-color-on-primary: #551d2c;
  --md-sys-color-surface: #0e1415;
}
```

### 4. Componentes Actualizados

Todos los componentes usan Atomic Design (`atoms/`, `molecules/`, `organisms/`, `templates/`). El bridge MUI (`createTheme.js`) consume `var(--md-sys-color-*)` desde `theme.css`. Los componentes legacy y outputs `variables.js`/`variables.scss` han sido eliminados.

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

- **theme.css**: `:root` para Light, `[data-theme="dark"]` para Dark
- **Estructura fuente**: Mantiene `md/Light` y `md/Dark` (correcto)

## Notas Importantes

### Tokens CSS

Los tokens se consumen vía CSS variables en `theme.css`. El atributo `data-theme` en el documento alterna entre light y dark. MUI `createTheme` usa `var(--md-sys-color-*)` directamente.

## Verificación

Para verificar que todo funciona correctamente:

```bash
# Regenerar tokens
npm run build-dictionary

# Verificar theme.css
grep "md-sys-color-primary" src/style-dictionary-dist/theme.css

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
