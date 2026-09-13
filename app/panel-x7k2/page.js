import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { eliminarCatalogo, cerrarSesion } from './actions'

export default async function PanelAdmin() {
  const supabase = await createClient()
  const { data: catalogos } = await supabase
    .from('catalogos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="container">
      <header className="admin-header">
        <h1>Panel de administración</h1>
        <div className="admin-actions">
          <Link href="/panel-x7k2/nuevo" className="btn btn-primary">
            Añadir catálogo
          </Link>
          <form action={cerrarSesion}>
            <button type="submit" className="btn btn-secondary">
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      {!catalogos || catalogos.length === 0 ? (
        <p className="empty-state">Todavía no has añadido ningún catálogo.</p>
      ) : (
        <div className="catalogo-grid">
          {catalogos.map((catalogo) => (
            <article key={catalogo.id} className="catalogo-card">
              <div className="catalogo-thumb">
                <img src={catalogo.url_miniatura} alt={`Portada de ${catalogo.nombre}`} />
              </div>
              <h2>{catalogo.nombre}</h2>
              <form action={eliminarCatalogo}>
                <input type="hidden" name="id" value={catalogo.id} />
                <input type="hidden" name="ruta_pdf" value={catalogo.ruta_pdf} />
                <input
                  type="hidden"
                  name="ruta_miniatura"
                  value={catalogo.ruta_miniatura}
                />
                <button type="submit" className="btn btn-danger">
                  Eliminar
                </button>
              </form>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
