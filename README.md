# @pl-core/components

[![npm version](https://badge.fury.io/js/@pl-core%2Fcomponents.svg)](https://badge.fury.io/js/@pl-core%2Fcomponents)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@pl-core/components)](https://bundlephobia.com/package/@pl-core/components)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Una librería de componentes modulares para React, construida con TypeScript y Tailwind CSS. Diseñada con una arquitectura de componentes compuestos (Compound Components) para ofrecer la máxima flexibilidad y una excelente experiencia de desarrollo.

## 📦 Instalación

Para instalar la librería junto con sus dependencias necesarias, ejecuta el siguiente comando en la raíz de tu proyecto:

```bash
npm install @pl-core/components
```

_(Si usas otros gestores de paquetes como `yarn` o `pnpm`, utiliza su comando de instalación equivalente)._

## ⚙️ Configuración de Tailwind CSS (¡Importante!)

Como esta librería utiliza Tailwind CSS para sus estilos, necesitas indicarle al compilador de tu proyecto que escanee las clases de nuestros componentes.

Abre el archivo `tailwind.config.ts` (o `.js`) de tu proyecto y agrega nuestras rutas exportadas en la propiedad `content`:

```typescript
import type { Config } from 'tailwindcss';
// 1. Importa las rutas de la librería
import { contentPaths } from '@pl-core/components/tailwind';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // 2. Agrega las rutas al escáner
    ...contentPaths,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

> **Nota:** La librería utiliza variables CSS para los colores (ej. `--primary`, `--background`). Asegúrate de tener estas variables definidas en tu archivo CSS global.

## 🧩 Componentes Disponibles

Actualmente, la librería cuenta con los siguientes componentes modulares:

- **Input**: Un campo de texto altamente personalizable que soporta etiquetas, iconos, contadores, mensajes de error y addons.
- **Autocomplete**: Un selector de autocompletado avanzado, virtualizado para un alto rendimiento, que incluye manejo de estado, filtrado y popover.
