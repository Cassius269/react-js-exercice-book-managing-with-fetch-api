function Book({ book }) {
  return (
    <li className="card mb-2">
      <article className="card-body p-4">
        <h5 className="card-title fs-5">{book.title}</h5>
        <p className="card-text">Auteur: {book.author}</p>
        <p className="card-text">Année de publication: {book.year}</p>
        <div className="d-flex gap-4">
          <button href="#" className="btn btn-secondary text-white">
            Mettre à jour
          </button>
          <button href="#" className="btn btn-danger">
            Supprimer
          </button>
        </div>
      </article>
    </li>
  );
}

export default Book;
