import { useEffect, useState } from "react";

function Book({ book, deleteBook, updateBook }) {
  const [errors, setErrors] = useState([]);

  const handleClickDelete = (book) => {
    setErrors([]);
    console.log("Livre à supprimer: ", book);

    // Faire la requête HTTP de type DELETE de suppression d'un livre à l'aide de son ID
    const deleteBookFromApi = async (_id) => {
      try {
        const response = await fetch(
          `https://www.restapi.fr/api/books/${_id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          deleteBook(book._id);
        } else {
          console.log("Oops, une erreur de suppression de livre");
          setErrors(["Oops, une erreur de suppression de livre"]);
        }
      } catch (error) {
        console.log(`Erreur : ${error.message}`);
        setErrors([error.message]);
      }
    };

    deleteBookFromApi(book._id);
  };

  useEffect(() => {
    console.log("erreurs", errors);
  });

  const handleClickUpdate = (book) => {
    console.log(`Livre à mettre à jour avec ID: ${book._id}`);
    updateBook({ ...book, editable: true });
  };

  return (
    <li className="card mb-2">
      <article className="card-body p-4">
        <h5 className="card-title fs-5">{book.title}</h5>
        <p className="card-text">Auteur: {book.author}</p>
        <p className="card-text">Année de publication: {book.year}</p>
        <div className="d-flex gap-4">
          <button
            onClick={() => handleClickUpdate(book)}
            href="#"
            className="btn btn-secondary text-white"
          >
            Mettre à jour
          </button>
          <button
            onClick={() => handleClickDelete(book)}
            href="#"
            className="btn btn-danger"
          >
            Supprimer
          </button>
        </div>
        <ul className="mt-3">
          {errors.map((e, index) => (
            <li key={index} className="text-danger">
              {e}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

export default Book;
