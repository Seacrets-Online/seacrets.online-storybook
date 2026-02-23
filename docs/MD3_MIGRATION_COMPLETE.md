# Migración a Estándar Material Design 3 - Completada

Este documento describe los cambios realizados para adaptar el proyecto al estándar de nomenclatura de Material Design 3.

## Nota (estado actual)

- El output actual de Style Dictionary genera variables CSS con naming canónico MD3: `--md-sys-color-*` (y `--md-ref-palette-*`).
- La configuración vigente está en `style-dictionary.config.ts` y `style-dictionary-formats.ts`.
- Este documento se mantiene como referencia histórica, pero los ejemplos se han ajustado para no contradecir el output real.

## Cambios Realizados

### 1. Transforms Personalizados Creados

**Archivo**: `style-dictionary-formats.ts`

Se registraron formatos personalizados que:
- ✅ Generan nombres canónicos (`--md-sys-color-*`, `--md-ref-palette-*`)
- ✅ Mantienen el mismo nombre en Light/Dark (cambia solo el valor por `data-theme`)

**Formatos**:
- `css/variables-theme`: genera `theme.css` con bloques `:root` y `[data-theme="dark"]`
- `typescript/color-tokens`: genera `src/utils/colors.generated.ts`

### 2. Configuración Actualizada

**Archivo**: `style-dictionary.config.ts`

- ✅ Configuración en TypeScript
- ✅ Usa `@tokens-studio/sd-transforms` + preprocessor de referencias
- ✅ Salida única: theme.css con Light/Dark vía `:root` y `[data-theme="dark"]`

### 3. Tokens Generados (Ahora Cumplen con MD3)

**theme.css** (única salida actual):
```css
:root {
  --md-sys-color-primary: #b80044;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-surface: #fdf8f8;
}

[data-theme="dark"] {
  --md-sys-color-primary: #b80044;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-surface: #0e1415;
}
```

### 4. Componentes Actualizados

Todos los componentes usan Atomic Design (`atoms/`, `molecules/`, `organisms/`, `templates/`). El bridge MUI (`src/theme/mui/createTheme.ts`) consume variables CSS desde `src/style-dictionary-dist/theme.css` (por ejemplo `var(--md-sys-color-*)`).

## Estado actual

### ✅ Nombres de Tokens (CSS)

- **Colores (Schemes)**: `--md-sys-color-<nombre>` (por ejemplo `--md-sys-color-primary`)
- **Sin tema en el nombre**: el mismo nombre existe en light/dark; el valor cambia por `data-theme`

### ✅ Manejo de Temas

- **theme.css**: `:root` para Light, `[data-theme="dark"]` para Dark
- **Token sets validados**: `seacrets.online/Light` y `seacrets.online/Dark`

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

- `style-dictionary.config.ts`: Configuración principal
- `style-dictionary-formats.ts`: Formatos de salida (CSS + TS)

## Próximos Pasos (Opcional)

1. **Sistema de Temas**: Implementar un sistema que permita cambiar entre Light/Dark dinámicamente
2. **Tokens de Tipografía**: Resolver referencias rotas para que los tokens de tipografía funcionen correctamente
3. **Documentación**: Actualizar guías de uso con los nuevos nombres
