export default function CatalogoCard({ catalogo }) {
  return (
    <article className="catalogo-card">
      <div className="catalogo-thumb">
        <img src={catalogo.url_miniatura} alt={`Portada de ${catalogo.nombre}`} />
      </div>
      <h2>{catalogo.nombre}</h2>
      <div className="catalogo-actions">
        <a
          href={catalogo.url_pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          Ver catálogo
        </a>
        <a href={catalogo.url_pdf} download className="btn btn-primary">
          Descargar
        </a>
      </div>
    </article>
  )
}
