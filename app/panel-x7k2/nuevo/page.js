import { agregarCatalogo } from '../actions'

export default function NuevoCatalogo() {
  return (
    <main className="container">
      <h1>Añadir catálogo</h1>
      <form action={agregarCatalogo} className="catalogo-form">
        <label>
          Nombre del catálogo
          <input type="text" name="nombre" required />
        </label>
        <label>
          Archivo PDF
          <input type="file" name="pdf" accept="application/pdf" required />
        </label>
        <label>
          Foto de miniatura
          <input type="file" name="miniatura" accept="image/*" required />
        </label>
        <button type="submit" className="btn btn-primary">
          Guardar catálogo
        </button>
      </form>
    </main>
  )
}
