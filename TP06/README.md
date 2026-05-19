# CatsGram 🐱

Copia de Instagram desarrollado en React + TypeScript, que obtiene imágenes de gatos desde [The Cat API](https://thecatapi.com/) y las muestra en formato de red social.

**Diseño de Figma utilizado como referencia:**
https://www.figma.com/community/file/1004033523744290376

---

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

---

## Organización del proyecto

```
src/
├── components/
│   ├── NavBar/         → Barra de navegación superior
│   ├── SideBar/        → Panel lateral con perfil y menú
│   ├── Stories/        → Fila de historias
│   ├── Feed/           → Lista de publicaciones
│   ├── PostDetail/     → Modal de publicación individual
│   └── Profile/        → Vista de perfil del usuario
├── data/
│   └── userData.ts     → Datos del usuario emulado
├── hooks/
│   └── useCats.ts      → Hook personalizado para consumir la API
├── types/
│   └── index.ts        → Interfaces TypeScript
├── App.tsx             → Componente raíz, maneja el estado global
└── main.tsx            → Punto de entrada
```

---

## Componentes

### `Navbar`
Barra superior fija. Muestra el logo de la app, un campo de búsqueda y botones de acción. El logo es clickeable y navega al feed.

**Props:** `activeView`, `onNavigate`

### `Sidebar`
Panel lateral izquierdo. Muestra la foto de perfil del usuario logueado (clickeable para ir al perfil), nombre, stats de seguidores/seguidos y el menú de navegación principal.

**Props:** `user`, `activeView`, `onNavigate`

### `Stories`
Fila horizontal con scroll de historias. Mapea los posts cargados desde la API y renderiza un `StoryCircle` por cada uno.

**Props:** `posts`

### `StoryCircle`
Círculo individual de historia con borde parecido al de instagram, imagen del gato y username debajo.

**Props:** `username`, `imageUrl`

### `Feed`
Contenedor del feed. Recibe el array de posts y los mapea dinámicamente con `PostCard`. No escribe ninguna publicación manualmente.

**Props:** `posts`, `likedIds`, `onToggleLike`, `onSelectPost`

### `PostCard`
Tarjeta individual de publicación. Muestra avatar del usuario, imagen del gato, botones de interacción (like, comentar, compartir, guardar), contador de likes y caption. El like modifica el estado global.

**Props:** `post`, `liked`, `onToggleLike`, `onSelect`

### `PostDetail`
Modal que se abre al seleccionar una publicación. Muestra la imagen ampliada, nombre de usuario, caption, comentarios simulados, botones de interacción y cantidad de likes. Se cierra clickeando fuera del modal o en el botón ✕.

**Props:** `post`, `liked`, `onToggleLike`, `onClose`

### `Profile`
Vista de perfil del usuario logueado. Muestra foto, username, stats (publicaciones, seguidores, seguidos), nombre completo, bio, botón de editar perfil y una grilla 3x3 con todas las publicaciones. Cada imagen de la grilla abre el `PostDetail`.

**Props:** `user`, `posts`, `onSelectPost`

---

## Por qué esta componentización

Cada componente tiene una responsabilidad única y bien definida. `Feed` no sabe cómo se ve una tarjeta, solo sabe mapear. `PostCard` no sabe nada del estado global, solo recibe props y llama callbacks. `PostDetail` no maneja su propio estado de likes para evitar inconsistencias con el feed. Esta separación hace que cada pieza sea reutilizable e independiente.

---

## Comunicación entre componentes mediante props

El estado global vive en `App.tsx` y baja por props:

- `posts` → `Feed` → `PostCard`
- `posts` → `Stories` → `StoryCircle`
- `posts` → `Profile`
- `likedIds` → `Feed` → `PostCard` (para saber si cada post está likeado)
- `onToggleLike` → `Feed` → `PostCard` y también → `PostDetail` (mismo handler, mismo estado)
- `selectedPost` → `PostDetail`
- `onSelectPost` → `Feed` → `PostCard` y → `Profile`
- `activeView` + `onNavigate` → `Navbar` y `Sidebar`
- `user` → `Sidebar` y `Profile`

---

## Hooks utilizados

### `useState`
- `posts` — array de publicaciones cargadas desde la API
- `loading` — estado de carga mientras se espera la respuesta
- `error` — mensaje de error si la petición falla
- `selectedPost` — publicación seleccionada para mostrar en el modal
- `activeView` — vista activa (`'feed'` o `'profile'`)
- `likedIds` — conjunto de IDs de posts likeados por el usuario

### `useEffect`
Usado en `useCats.ts` para ejecutar la petición a la API al montar el componente. El array de dependencias vacío `[]` garantiza que se ejecuta una sola vez al cargar la página.

---

## Consumo de API

Se utiliza **Axios** dentro de un `useEffect` en el hook personalizado `useCats.ts`:

```ts
useEffect(() => {
  axios.get('https://api.thecatapi.com/v1/images/search?limit=12')
    .then(res => { /* mapear y guardar en estado */ })
}, [])
```

Cada imagen devuelta por la API se transforma en un objeto `Post` con username, caption, likes y comentarios simulados. El estado se guarda con `useState`.

---

## Visualización individual de publicaciones

Se resolvió mediante un **modal** (`PostDetail`). Al hacer click en la imagen o en el botón de comentarios de cualquier `PostCard`, se ejecuta `setSelectedPost(post)` en `App.tsx`. Cuando `selectedPost` no es `null`, el modal se renderiza sobre el contenido. Clickear fuera del modal o en ✕ ejecuta `setSelectedPost(null)` y lo cierra.

El estado `selectedPost` se maneja con `useState<Post | null>(null)`.

---

## Perfil de usuario emulado

El perfil está definido en `src/data/userData.ts` con datos fijos:

```ts
export const currentUser: User = {
  username: "Señora M",
  fullName: "Facunda Eusebich",
  bio: "🐱 Amante de los gatos | Y d lor Mortiz",
  avatar: "/leoMattioli.webp",
  posts: 10,
  followers: 999,
  following: 163,
}
```

No hay login ni registro. La app simula que el usuario ya está logueado. El perfil se accede clickeando la foto en el `Sidebar`. Las publicaciones del perfil son las mismas que se cargan desde la API.

---

## Estados para selección de publicaciones y navegación

| Estado | Tipo | Descripción |
|---|---|---|
| `selectedPost` | `Post \| null` | Publicación abierta en el modal. `null` = modal cerrado |
| `activeView` | `'feed' \| 'profile'` | Vista activa en el área principal |
| `likedIds` | `Set<string>` | IDs de posts likeados. Compartido entre feed y modal |

---

## Tecnologías

- React 19 + TypeScript
- Vite
- Axios
- CSS Modules
- The Cat API
