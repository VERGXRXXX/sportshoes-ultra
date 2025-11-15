# 👟 SportShoes Ultra - Tienda Premium de Calzado Deportivo

Una aplicación web moderna y responsive desarrollada en React + Vite con Tailwind CSS, diseñada para ofrecer una experiencia premium en la navegación de catálogos de calzado deportivo.

## ✨ Características

- **Diseño Moderno**: Interfaz oscura premium con gradientes animados y efectos glassmorphism
- **Totalmente Responsive**: Optimizado para móviles, tablets y desktop
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Búsqueda Inteligente**: Sistema de búsqueda por modelo
- **Navegación Intuitiva**: Breadcrumbs y navegación por categorías, marcas y modelos
- **Modal de Pedidos**: Formulario completo para solicitar productos
- **Efectos Visuales**: Fondo animado con estrellas y partículas flotantes

## 🚀 Mejoras Implementadas

### Visuales
- ✅ Paleta de colores mejorada (negro, gris oscuro, naranja premium)
- ✅ Efectos de hover y transiciones suaves
- ✅ Glassmorphism y blur effects
- ✅ Gradientes dinámicos
- ✅ Badges de descuento y premium
- ✅ Sistema de calificaciones con estrellas
- ✅ Iconos profesionales con React Icons

### Funcionales
- ✅ Código refactorizado y componentizado
- ✅ Gestión de estado centralizada
- ✅ Sistema de navegación mejorado con breadcrumbs
- ✅ Búsqueda optimizada
- ✅ Modal de pedidos con validación
- ✅ Generación dinámica de productos con precios y descuentos
- ✅ Estructura de proyecto profesional

## 📁 Estructura del Proyecto

```
sportshoes-ultra/
├── public/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx    # Fondo animado
│   │   ├── Header.jsx                # Barra de navegación
│   │   ├── Home.jsx                  # Página principal
│   │   ├── Breadcrumb.jsx            # Navegación breadcrumb
│   │   ├── BrandsList.jsx            # Lista de marcas
│   │   ├── ModelsList.jsx            # Lista de modelos
│   │   ├── ProductsList.jsx          # Lista de productos
│   │   └── OrderModal.jsx            # Modal de pedidos
│   ├── data/
│   │   └── catalogData.js            # Datos del catálogo
│   ├── App.jsx                       # Componente principal
│   ├── main.jsx                      # Punto de entrada
│   └── index.css                     # Estilos globales
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Configuración del Entorno de Desarrollo

### Requisitos Previos

- **Node.js**: versión 18 o superior
- **VS Code**: Editor recomendado
- **Git**: Para control de versiones (opcional)

### Paso 1: Instalar Node.js

1. Descarga Node.js desde [https://nodejs.org/](https://nodejs.org/)
2. Instala la versión LTS (Long Term Support)
3. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

### Paso 2: Configurar VS Code

#### Extensiones Recomendadas

Instala las siguientes extensiones desde el marketplace de VS Code:

1. **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
   - Snippets para desarrollo React

2. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
   - Autocompletado para clases de Tailwind

3. **ESLint** (dbaeumer.vscode-eslint)
   - Linting de código JavaScript/React

4. **Prettier - Code formatter** (esbenp.prettier-vscode)
   - Formateo automático de código

5. **Auto Rename Tag** (formulahendry.auto-rename-tag)
   - Renombra automáticamente tags HTML/JSX

6. **Path Intellisense** (christian-kohler.path-intellisense)
   - Autocompletado de rutas de archivos

#### Configuración de VS Code

Crea un archivo `.vscode/settings.json` en la raíz del proyecto:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

### Paso 3: Instalar el Proyecto

1. **Navega a la carpeta del proyecto**:
   ```bash
   cd sportshoes-ultra
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```
   
   Esto instalará todas las dependencias necesarias:
   - React 18
   - Vite (build tool)
   - Tailwind CSS
   - Framer Motion (animaciones)
   - React Icons

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre el navegador**:
   - El proyecto se abrirá automáticamente en `http://localhost:3000`
   - Si no se abre, accede manualmente a esa URL

### Paso 4: Scripts Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Linting
npm run lint
```

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar la paleta de colores:

```javascript
colors: {
  primary: '#ff6b35',  // Color principal (naranja)
  dark: {
    900: '#0a0a0a',    // Negro profundo
    800: '#1a1a1a',    // Gris muy oscuro
    700: '#2a2a2a',    // Gris oscuro
  }
}
```

### Catálogo de Productos

Edita `src/data/catalogData.js` para modificar:
- Categorías
- Marcas
- Modelos
- Descripciones

### Componentes

Todos los componentes están en `src/components/` y son fácilmente modificables:
- Estilos con Tailwind CSS inline
- Lógica separada de la presentación
- Props bien documentadas

## 📱 Responsive Design

El proyecto está optimizado para:
- **Móviles**: < 640px (sm)
- **Tablets**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🚀 Deploy

### Vercel (Recomendado)

1. Instala Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Netlify

1. Build del proyecto:
   ```bash
   npm run build
   ```

2. Deploy la carpeta `dist/`

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Errores de Tailwind
```bash
# Asegúrate de que PostCSS esté configurado
npm install -D tailwindcss postcss autoprefixer
```

### Hot reload no funciona
- Verifica que estés en la carpeta correcta
- Reinicia el servidor con `Ctrl+C` y `npm run dev`

## 📝 Notas Adicionales

- **Vite** es significativamente más rápido que Create React App
- **Tailwind CSS** permite desarrollo rápido sin CSS personalizado
- **Framer Motion** proporciona animaciones de alta calidad
- El proyecto usa **ES Modules** (type: "module" en package.json)

## 📄 Licencia

MIT License - Uso libre para proyectos personales y comerciales

## 👨‍💻 Autor

Desarrollado con ❤️ para SportShoes Ultra

---

**¿Necesitas ayuda?** Revisa la documentación oficial:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
