-- Ejecuta esto en Supabase: panel del proyecto > SQL Editor > New query

-- 1) Tabla de catálogos
create table if not exists catalogos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  url_pdf text not null,
  url_miniatura text not null,
  ruta_pdf text not null,
  ruta_miniatura text not null,
  created_at timestamptz not null default now()
);

-- 2) Seguridad a nivel de fila (RLS)
alter table catalogos enable row level security;

-- Cualquiera (sin login) puede leer los catálogos
create policy "Cualquiera puede ver catalogos"
on catalogos for select
using (true);

-- Solo un usuario autenticado (el admin) puede insertar
create policy "Solo autenticados insertan catalogos"
on catalogos for insert
to authenticated
with check (true);

-- Solo un usuario autenticado (el admin) puede eliminar
create policy "Solo autenticados eliminan catalogos"
on catalogos for delete
to authenticated
using (true);

-- 3) Antes de correr lo de abajo, crea manualmente 2 buckets en
--    Storage > New bucket, ambos marcados como "Public bucket":
--      - pdfs
--      - miniaturas

-- 4) Políticas de Storage: lectura pública, escritura solo autenticada
create policy "Lectura publica de pdfs"
on storage.objects for select
using (bucket_id = 'pdfs');

create policy "Solo autenticados suben pdfs"
on storage.objects for insert
to authenticated
with check (bucket_id = 'pdfs');

create policy "Solo autenticados eliminan pdfs"
on storage.objects for delete
to authenticated
using (bucket_id = 'pdfs');

create policy "Lectura publica de miniaturas"
on storage.objects for select
using (bucket_id = 'miniaturas');

create policy "Solo autenticados suben miniaturas"
on storage.objects for insert
to authenticated
with check (bucket_id = 'miniaturas');

create policy "Solo autenticados eliminan miniaturas"
on storage.objects for delete
to authenticated
using (bucket_id = 'miniaturas');
