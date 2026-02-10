# Material Design 3 Naming Compliance

Este documento analiza si los tokens generados siguen el estándar de nomenclatura de Material Design 3.

## Estado Actual

### ⚠️ Parcialmente conforme - Problemas con la transformación de temas

Los tokens fuente **SÍ tienen estructura de temas** (`md/Light` y `md/Dark`), lo cual es correcto. Sin embargo, Style Dictionary está generando nombres diferentes para cada tema en lugar de mantener el mismo nombre.

Los tokens generados actualmente tienen las siguientes diferencias con el estándar:

## Comparación: Actual vs Estándar MD3

### Tokens de Color

**Estándar MD3:**
```css
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-surface
```

**Actual (SCSS):**
```scss
$token-md-light-md-sys-color-primary
$token-md-light-md-sys-color-on-primary
$token-md-light-md-sys-color-surface
```

**Actual (JavaScript):**
```javascript
MdLightMdSysColorPrimary
MdLightMdSysColorOnPrimary
MdLightMdSysColorSurface
```

### Problemas Identificados

1. **Prefijo personalizado `token-`**
   - ❌ Actual: `$token-md-light-md-sys-color-primary`
   - ✅ Estándar: `--md-sys-color-primary`
   - **Causa**: `prefix: 'token'` en la configuración de Style Dictionary

2. **Tema incluido en el nombre**
   - ❌ Actual: `md-light-md-sys-color-primary` (incluye `light`)
   - ✅ Estándar: `md-sys-color-primary` (sin tema)
   - **Causa**: Estructura de tokens fuente `md/Light/md/...` en lugar de `md/...`

3. **Estructura duplicada `md-md`**
   - ❌ Actual: `md-light-md-sys-color-primary` (tiene `md` dos veces)
   - ✅ Estándar: `md-sys-color-primary` (una sola vez)
   - **Causa**: Estructura de tokens fuente `md/Light/md/...` cuando debería ser `md/Light/...`

4. **Tokens separados por tema en los nombres generados**
   - ❌ Actual: Nombres diferentes para Light y Dark (`md-light-md-sys-color-primary` vs `md-dark-md-sys-color-primary`)
   - ✅ Estándar: Mismos nombres de tokens (`md-sys-color-primary`) que cambian según el tema activo
   - **Causa**: Style Dictionary está incluyendo el tema (`Light`/`Dark`) en el nombre transformado
   - **Nota**: La estructura fuente `md/Light` y `md/Dark` es correcta, pero debería generar el mismo nombre para ambos

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

**Actual (CORRECTO para tener temas separados):**
```json
{
  "md/Light": {
    "md": {
      "sys": {
        "color": {
          "primary": { "value": "#8d495a" }
        }
      }
    }
  },
  "md/Dark": {
    "md": {
      "sys": {
        "color": {
          "primary": { "value": "#ffb1c1" }
        }
      }
    }
  }
}
```

**Problema**: Esta estructura es válida, pero Style Dictionary necesita transforms personalizados que:
- Ignoren el tema (`Light`/`Dark`) al generar nombres
- Generen el mismo nombre para ambos temas
- Permitan que el sistema de temas maneje qué valor usar

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

**Actual:**
```javascript
{
  prefix: 'token',  // ❌ No es parte del estándar MD3
  transformGroup: 'scss'
}
```

**Debería ser:**
```javascript
{
  prefix: '',  // ✅ Sin prefijo personalizado
  transformGroup: 'scss'
}
```

### 3. Transformaciones Personalizadas

Para cumplir con MD3, se necesitarían transforms personalizados que:
- Eliminen el prefijo `token-`
- **Eliminen el tema (`Light`/`Dark`) del nombre transformado** (mantenerlo en la estructura fuente está bien)
- Eliminen la duplicación de `md` (causada por `md/Light/md/...`)
- Generen nombres como `md-sys-color-primary` en lugar de `md-light-md-sys-color-primary`
- **Generen el mismo nombre para ambos temas**, dejando que el sistema de temas maneje los valores

**Ejemplo de transform necesario:**
- Input: `md/Light/md/sys/color/primary` → Output: `md-sys-color-primary`
- Input: `md/Dark/md/sys/color/primary` → Output: `md-sys-color-primary` (mismo nombre)

## Impacto de los Cambios

### Componentes Actuales

Los componentes actuales usan nombres como:
```javascript
tokens.MdLightMdSysColorPrimary
```

Si se cambia a estándar MD3, necesitarían actualizarse a:
```javascript
tokens.mdSysColorPrimary  // o similar según el formato JS
```

### Compatibilidad

⚠️ **Cambiar a estándar MD3 sería un breaking change** que requeriría:
1. Actualizar todos los componentes que usan tokens
2. Modificar la estructura de tokens fuente (o crear transforms personalizados)
3. Actualizar la configuración de Style Dictionary
4. Regenerar todos los archivos de tokens

## Recomendación

### Opción 1: Mantener Estructura Actual (Recomendado para ahora)
- ✅ Funciona correctamente
- ✅ Los componentes ya están usando los nombres actuales
- ❌ No sigue el estándar MD3 exacto

### Opción 2: Migrar a Estándar MD3
- ✅ Cumple con el estándar oficial
- ✅ Mejor interoperabilidad con otras herramientas MD3
- ❌ Requiere refactorización completa
- ❌ Breaking change para todos los componentes

## Conclusión

**Los tokens NO siguen completamente el estándar MD3** debido a:
1. Prefijo personalizado `token-` (no es parte del estándar)
2. **Tema incluido en el nombre generado** (`light`/`dark` en el nombre final) - **Este es el problema principal**
3. Estructura duplicada (`md-md` causada por `md/Light/md/...`)
4. **Nombres diferentes para Light y Dark** cuando deberían ser el mismo nombre

**Nota importante**: La estructura fuente con `md/Light` y `md/Dark` es válida y necesaria para tener valores diferentes por tema. El problema está en cómo Style Dictionary transforma estos tokens en nombres finales.

**Para cumplir completamente con MD3**, se requerirían:
1. Transforms personalizados que eliminen el tema del nombre transformado
2. Eliminar el prefijo `token-`
3. Corregir la duplicación de `md`
4. Generar el mismo nombre para ambos temas

Esto requeriría cambios en la configuración de Style Dictionary y posiblemente transforms personalizados, lo cual sería un breaking change para los componentes existentes.
