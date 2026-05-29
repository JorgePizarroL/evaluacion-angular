# PostExplorer — Evaluación Técnica Angular

**Asignatura:** Programación y Plataformas Web  
**Docente:** Ing. Pablo Torres  
**Carrera:** Ingeniería en Computación  
**Universidad Politécnica Salesiana**

---

## ▶ Instalación y ejecución

```bash
git clone <URL_DEL_REPOSITORIO>
cd evaluacion-angular
npm install
ng serve
```

Abre tu navegador en `http://localhost:4200`

---

## 🧱 Arquitectura del proyecto

```
src/app/
├── interfaces/
│   └── post.interface.ts        # Tipado TypeScript de la API
├── services/
│   ├── post.service.ts          # Consumo HTTP (getItems, getItemById)
│   └── item-cache.service.ts    # Caché en localStorage por clave individual
├── components/
│   ├── header/header.ts         # Header sticky (nombre, evaluación, GitHub)
│   ├── footer/footer.ts         # Footer compartido
│   ├── hero/hero.ts             # Hero con signals (title, total, status)
│   └── card/card.ts             # Card reutilizable (image + title clickables)
└── pages/
    ├── home/home.ts             # Página principal: listado + spinner 2s
    └── detail/detail.ts         # Página de detalle: id por ruta, total por queryParam
```

---

## 🔗 API utilizada

**JSONPlaceholder** — `https://jsonplaceholder.typicode.com`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `getItems()` | `GET /posts` | Listado general |
| `getItemById(id)` | `GET /posts/:id` | Registro individual |

La URL base se configura en `src/environments/environment.ts`.

---

## ✅ Requerimientos implementados

| # | Requerimiento | Estado |
|---|--------------|--------|
| 1 | Aplicación Angular organizada por páginas/componentes/servicios/interfaces | ✅ |
| 2 | Consumo de API externa con servicio reutilizable | ✅ |
| 3 | Interfaces TypeScript (`Post`) | ✅ |
| 4 | Señales para total de elementos y estado de carga | ✅ |
| 5 | Navegación dinámica `/details/:id?total=N` | ✅ |
| 6 | Componentes standalone (Angular 21) | ✅ |
| 7 | HeaderComponent con nombre, asignatura, GitHub | ✅ |
| 8 | FooterComponent compartido | ✅ |
| 9 | HeroComponent reutilizable en ambas páginas | ✅ |
| 10 | CardComponent reutilizable (input: item, total) | ✅ |
| 11 | Clic de navegación solo en imagen y título | ✅ |
| 12 | Spinner de carga con retardo simulado 2s | ✅ |
| 13 | `ItemCacheService` con `save()` y `getById()` | ✅ |
| 14 | Caché `item-cache-{id}` en `localStorage` | ✅ |
| 15 | Layout compartido (Header/Footer no se redibujan) | ✅ |
| 16 | Estilos con TailwindCSS (v4) | ✅ |
| 17 | URL base en variable de entorno | ✅ |
| 18 | Diseño responsivo | ✅ |

---

## 📸 Capturas

### Página principal (listado)
> *(agregar captura aquí)*

### Página de detalle
> *(agregar captura aquí)*

### localStorage del navegador
> *(agregar captura aquí)*
