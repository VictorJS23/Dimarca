import { createClient } from '@/lib/supabase/server'
import CatalogoCard from '@/components/CatalogoCard'

export default async function Home() {
  const supabase = await createClient()
  const { data: catalogos } = await supabase
    .from('catalogos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="container">
      <header className="site-header">
        <h1>Catálogos</h1>
        <p>Consulta y descarga nuestros catálogos en PDF.</p>
      </header>

      {!catalogos || catalogos.length === 0 ? (
        <p className="empty-state">Todavía no hay catálogos disponibles.</p>
      ) : (
        <div className="catalogo-grid">
          {catalogos.map((catalogo) => (
            <CatalogoCard key={catalogo.id} catalogo={catalogo} />
          ))}
        </div>
      )}
    </main>
  )
}
