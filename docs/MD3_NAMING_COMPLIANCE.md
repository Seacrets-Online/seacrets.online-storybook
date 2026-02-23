# Material Design 3 Naming Compliance

Este documento analiza si los tokens generados siguen el estándar de nomenclatura de Material Design 3.

## Estado Actual

### ✅ Naming MD3 (colores) + notas

El pipeline actual genera variables CSS con naming canónico para los tokens de color y usa `data-theme` para alternar valores entre Light/Dark manteniendo el mismo nombre de token.

## Comparación: Output actual vs Estándar MD3

### Tokens de Color

**Estándar MD3 (canonical):**
```css
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-surface
```

**Actual (CSS variables):**
```css
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-surface
```

**Actual (TypeScript export)** (ver `src/utils/colors.generated.ts`):
```ts
colorTokens.light.mdSysColorPrimary
colorTokens.light.mdSysColorOnPrimary
colorTokens.light.mdSysColorSurface
```

### Diferencias principales

1. **No se generan `--md-sys-typescale-*` / `--md-sys-shape-*` como CSS**: tipografía/shape viven en TS (`src/utils/typography.ts`, `src/utils/shapes.ts`)
2. **Token sets**: el export validado usa `seacrets.online/Light` y `seacrets.online/Dark` (ver `$metadata.tokenSetOrder`)
3. **Algunos grupos adicionales** (por ejemplo `--md-ext-color-*`, `--md-sys-state-layer-*`) no son parte estricta del set `md.sys.color.*`, pero se exportan por conveniencia

## Estándar Material Design 3

Según la [documentación oficial de MD3](https://m3.material.io/foundations/design-tokens):

### Estructura de Nombres

- **Colores**: `md.sys.color.<nombre>` → `--md-sys-color-<nombre>`
- **Tipografía**: `md.sys.typescale.<scale>.<size>.<property>` → `--md-sys-typescale-<scale>-<size>-<property>`
- **Formas**: `md.sys.shape.<nombre>` → `--md-sys-shape-<nombre>`
- **Elevación**: `md.sys.elevation.<level>` → `--md-sys-elevation-<level>`

### Manejo de Temas (Light/Dark)

**Importante**: En MD3, los tokens tienen el **mismo nombre** para ambos temas. Los valores cambian según el tema activo, pero los nombres de los tokens no incluyen el tema.

- ✅ Correcto: `--md-sys-color-primary` (mismo nombre, valores diferentes según tema)
- ❌ Incorrecto: `--md-light-sys-color-primary` y `--md-dark-sys-color-primary` (nombres diferentes)

### Ejemplos Correctos

```css
/* Colores */
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-surface

/* Tipografía */
--md-sys-typescale-body-large-font
--md-sys-typescale-body-large-size
--md-sys-typescale-body-large-line-height
--md-sys-typescale-body-large-weight

/* Formas */
--md-sys-shape-corner-extra-small

/* Elevación */
--md-sys-elevation-level-1
```

## Cambios Necesarios para Cumplir con MD3

### 1. Estructura de Tokens Fuente

**Actual (en este repo):**
```json
{
  "seacrets": {
    "online/Light": { "...": "..." },
    "online/Dark": { "...": "..." }
  },
  "$metadata": {
    "tokenSetOrder": ["seacrets.online/Light", "seacrets.online/Dark"]
  }
}
```

**Nota**: Esta estructura es válida. El naming del output CSS para colores ya es canónico MD3 (`--md-sys-color-*`).

**Alternativa (si se quiere estructura más estándar):**
```json
{
  "md": {
    "sys": {
      "color": {
        "primary": {
          "$extensions": {
            "mode": {
              "light": { "value": "#8d495a" },
              "dark": { "value": "#ffb1c1" }
            }
          }
        }
      }
    }
  }
}
```

### 2. Configuración de Style Dictionary

**Actual (en este repo):**
```ts
// style-dictionary.config.ts (resumen)
platforms: {
  css: {
    transformGroup: 'tokens-studio',
    transforms: ['name/kebab'],
    files: [{ destination: 'theme.css', format: 'css/variables-theme' }],
  },
}
```

### 3. Transformaciones Personalizadas

El naming canónico se implementa en `style-dictionary-formats.ts` (en `toCssVarName()`), mapeando grupos conocidos del export a prefijos MD3:
- `Schemes/*` → `--md-sys-color-*`
- `Palettes/*` → `--md-ref-palette-*`
- `State Layers/*` → `--md-sys-state-layer-*`

## Impacto de posibles cambios

### Componentes actuales

- Los componentes consumen colores vía MUI theme (`theme.palette.*`) que resuelve a `var(--md-sys-color-*)` y/o directamente con `var(--md-sys-color-*)`.

### Opciones de evolución

- **Opción A (actual)**: mantener `--md-sys-*` como canonical.
- **Opción B (compat, no-breaking)**: agregar alias de marca (por ejemplo `--seacrets-online-*`) apuntando a `--md-sys-*` si algún consumidor legacy lo requiere.

## Conclusión

El output actual sigue el naming canónico MD3 para colores (`--md-sys-color-*`). Si se requiere compatibilidad con prefijos legacy, se pueden agregar alias sin cambiar el canonical.
