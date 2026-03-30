import { useEffect, useState } from "react";
import Book from "./Book";
import AddBook from "./AddBook";

function BookManager() {
  // Déclaration de l'état du composant
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch("https://www.restapi.fr/api/books");
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setBookList(data);
        } else {
          console.log("Oops, une erreur");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    getBooks(); // appeler la fonction de récupération des livres
  }, []); // charger la liste une seule fois après le premier rendu du composant

  // Ajout d'un livre à l'état local
  const addBook = (book) => {
    setBookList([...bookList, book]);
  };

  // Suppression d'un livre de l'état local de la liste des livres
  const deleteBook = (_id) => {
    setBookList(bookList.filter((book) => book._id !== _id));
  };

  // Mettre à jour un livre dans l'état local du composant pour la liste des livres
  const updateBook = (book) => {
    setBookList(bookList.map((b) => (b._id === book._id ? book : b)));
  };

  return (
    <>
      <h2>Je suis le composant BookManager</h2>
      <AddBook addBook={addBook} />
      {bookList.length === 0 ? (
        <p>Liste vide</p>
      ) : (
        <ul>
          {bookList.map((b, index) => (
            <Book
              key={b._id || index}
              book={b}
              deleteBook={deleteBook}
            /> /* key avec valeur de secours securisé et optimisé : si pas d'id utiliser l'index de la boucle */
          ))}
        </ul>
      )}
    </>
  );
}

export default BookManager;
