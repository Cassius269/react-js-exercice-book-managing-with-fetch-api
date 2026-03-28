import { useEffect, useState } from "react";
import Book from "./Book";

function BookManager() {
  // Déclaration de l'état du composant
  const [books, setBooks] = useState([1, 2, 4]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch("https://www.restapi.fr/api/books");
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setBooks(data);
        } else {
          console.log("Oops, une erreur");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
  }, []); // charger la liste une seule fois après le premier rendu du composant

  return (
    <>
      <h2>Je suis le composant BookManager</h2>
      <ul>
        {books.map((b) => (
          <li className="card mb-2">
            <Book book={b} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default BookManager;
