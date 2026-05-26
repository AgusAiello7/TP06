# CatsGram 🐱

Copia de Instagram desarrollado en React + TypeScript, que obtiene imágenes de gatos desde [The Cat API](https://thecatapi.com/) y las muestra en formato de red social.



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
│   ├── SideBar/        → Barra lateral con perfil y menú
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
Barra superior fija. Muestra el logo de la app, un campo de búsqueda y botones de acción no funcionales. El logo "Catsgram" es clickeable y navega al feed.

**sus Props son:** `activeView`, `onNavigate`

### `Sidebar`
Panel lateral izquierdo. Muestra la foto de perfil del usuario logueado (clickeable para ir al perfil), nombre, stats de seguidores y likes y el menú de navegación principal (Home). El resto de botones son no funcionales.

**sus Props son:** `user`, `activeView`, `onNavigate`

### `Stories`
Fila horizontal con scroll de historias. Mapea los posts cargados desde la API y renderiza un `StoryCircle` por cada uno.

**sus Props son:** `posts`

### `StoryCircle`
Círculo individual de historia con borde parecido al de instagram, imagen del gato y username debajo.

**sus Props son:** `username`, `imageUrl`

### `Feed`
Contenedor del feed. Recibe el array de posts y los mapea dinámicamente con `PostCard`. No escribe ninguna publicación manualmente.

**sus Props son:** `posts`, `likedIds`, `onToggleLike`, `onSelectPost`

### `PostCard`
Tarjeta individual de publicación. Muestra avatar del usuario, imagen del gato, botones de interacción (like, comentar, compartir, guardar), contador de likes y caption. El estado del like se puede modificar.

**sus Props son:** `post`, `liked`, `onToggleLike`, `onSelect`

### `PostDetail`
Es un Modal que se abre al seleccionar una publicación. Muestra la imagen ampliada, nombre de usuario, caption, comentarios, botones de interacción no funcionales (excepto el like) y cantidad de likes. Se cierra clickeando fuera del modal o en el botón ✕.

**sus Props son:** `post`, `liked`, `onToggleLike`, `onClose`

### `Profile`
Vista de perfil del usuario logueado. Muestra foto, username, stats (publicaciones, seguidores, seguidos), nombre completo, biografia, botón de editar perfil (no funcional) y una grilla 3x3 con todas las publicaciones. Cada imagen de la grilla redirige a `PostDetail`.

**sus Props son:** `user`, `posts`, `onSelectPost`

---

## Por qué esta componentización y responsabilidad de cada componente 

Para desarrollar la aplicación se crearon varios componentes con el objetivo de separar las distintas partes de la interfaz y mantener el código más organizado. Los principales componentes fueron Navbar, Sidebar, Feed, PostCard, PostDetail, Stories y Profile. Cada uno cumple una función específica dentro de la aplicación. Por ejemplo, Navbar muestra la barra superior, Sidebar contiene la información del usuario emulado y opciones de navegación, Feed se encarga de recorrer y mostrar todas las publicaciones, mientras que PostCard representa cada publicación individual dentro del feed. Además, PostDetail muestra una publicación seleccionada con información ampliada y Profile representa el perfil del usuario logueado.

La aplicación se dividió de esta manera para evitar tener toda la lógica y el diseño concentrados en un solo archivo. Esto hace que el proyecto sea más fácil de entender, mantener y reutilizar. Por ejemplo, si se quisiera cambiar solamente el diseño de una publicación, alcanza con modificar PostCard sin tocar el resto de la aplicación. También permite reutilizar componentes en distintas partes del proyecto sin repetir código.
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
Lo usamos en `useCats.ts` para ejecutar la petición a la API al iniciar el componente. El array de dependencias vacío **UseEffect`[]`** garantiza que se ejecuta una sola vez al cargar la página.

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

**Diseño de Figma utilizado como referencia:**
https://www.figma.com/community/file/1004033523744290376

## Visualización individual de publicaciones

Se resolvió mediante un **modal** (`PostDetail`). Al hacer click en la imagen o en el botón de comentarios de cualquier `PostCard`, se ejecuta `setSelectedPost(post)` en `App.tsx`. Cuando `selectedPost` no es `null`, el modal se renderiza sobre el contenido. Clickear fuera del modal o en ✕ ejecuta `setSelectedPost(null)` y por eso se cierra.

El estado `selectedPost` se maneja con `useState<Post | null>(null)`.

---

## Perfil de usuario emulado

El perfil está definido en `src/data/userData.ts` con datos fijos:

```ts
export const currentUser: User = {
  username: "Señora M",
  fullName: "Facunda Eusebich",
  bio: "🐱 Amante de los gatos | Y de los Mortiz",
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

## Tecnologías que usamos

- React 19 + TypeScript
- Vite
- Axios
- CSS Modules
- The Cat API
