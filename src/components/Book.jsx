function Book({ book }) {
  return (
    <article className="card-body">
      <h5 className="card-title fs-5">{book.title}</h5>
      <p className="card-text">Auteur: {book.name}</p>
      <p className="card-text">Année de publication: {book.publishedYear}</p>
    </article>
  );
}

export default Book;
