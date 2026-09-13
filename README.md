# Catálogos web

Sitio con dos perfiles:
- **Público** (`/`): ve y descarga catálogos en PDF, sin necesidad de login.
- **Admin** (`/panel-x7k2`, oculto y protegido con login): añade y elimina catálogos.

## 1. Crear el proyecto en Supabase

1. Entra a https://supabase.com y crea una cuenta / proyecto nuevo (gratis).
2. Ve a **SQL Editor > New query**, pega el contenido de `supabase/schema.sql`
   y ejecútalo. Esto crea la tabla `catalogos` y las políticas de seguridad.
3. Ve a **Storage** y crea manualmente 2 buckets, marcando "Public bucket" en ambos:
   - `pdfs`
   - `miniaturas`
4. Ve a **Authentication > Users > Add user** y crea tu usuario admin
   (correo + contraseña). No actives el registro público en ningún lado:
   este será el único usuario que exista.
5. Ve a **Project Settings > API** y copia:
   - `Project URL`
   - `anon public key`

## 2. Configurar el proyecto localmente

```bash
cp .env.example .env.local
```

Pega ahí la URL y la anon key que copiaste en el paso anterior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000 para la vista pública y
http://localhost:3000/panel-x7k2 para el panel admin (te pedirá login).

## 3. Cómo funciona la protección del admin

- La ruta `/panel-x7k2` no aparece enlazada en ningún lado de la vista pública.
- Aun así, `middleware.js` revisa en el servidor si hay una sesión activa de
  Supabase antes de dejar pasar a cualquier ruta dentro de `/panel-x7k2`. Si
  no hay sesión, redirige a `/panel-x7k2/login`. Esto es seguridad real, no
  solo una URL escondida.
- Si quieres cambiar el nombre de la ruta oculta, renombra la carpeta
  `app/panel-x7k2` y actualiza el `matcher` en `middleware.js` con el nuevo
  nombre.

## 4. Subir el proyecto a GitHub y desplegarlo

```bash
git init
git add .
git commit -m "Proyecto inicial"
```

Crea un repositorio en GitHub y sigue las instrucciones para subir el
código (`git remote add origin ...` y `git push`).

## 5. Desplegar en Vercel (gratis)

1. Entra a https://vercel.com, inicia sesión con GitHub.
2. **Add New > Project**, elige tu repositorio.
3. En **Environment Variables**, agrega las mismas dos variables de tu
   `.env.local` (`NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Dale a **Deploy**. En un par de minutos tu sitio queda en línea con una
   URL pública, disponible aunque tu computadora esté apagada.
5. (Opcional) conecta un dominio propio desde **Project Settings > Domains**.

## Estructura del proyecto

```
app/
  page.js                    -> vista pública de catálogos
  panel-x7k2/
    login/page.js            -> login del admin
    page.js                  -> panel con lista + botón eliminar
    nuevo/page.js             -> formulario para añadir catálogo
    actions.js                -> lógica de servidor (subir, guardar, eliminar)
components/
  CatalogoCard.js             -> tarjeta de catálogo (vista pública)
lib/supabase/
  client.js                  -> cliente de Supabase para el navegador
  server.js                  -> cliente de Supabase para el servidor
middleware.js                 -> protege /panel-x7k2 revisando la sesión
supabase/schema.sql            -> SQL para crear la tabla y las políticas
```
