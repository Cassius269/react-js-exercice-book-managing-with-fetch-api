import { useState } from "react";

function EditBook({ book, updateBook }) {
  // Déclaration de l'état du composant: état du formulaire et des erreurs de saisie
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    editable: false,
  });

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    year: "",
  });

  // Déclarer la fonction de validation de formulaire
  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Le titre est requis";
    if (!formData.author) newErrors.author = "L'auteur est requis";
    if (!formData.year) newErrors.year = "L'année est requise";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // retourne false si l'objet newErrors contient des propriétés d'erreurs sinon true
  };

  // Déclaration des gestionnaires d'évenement
  const handleSubmit = (e) => {
    e.preventDefault(); // désactiver le chargement de page à la soumission de formulaire

    // Envoyer les données au serveur de l'API
    const updateBookFromAPI = async (bookToUpdate) => {
      const { _id, editable, ...payload } = bookToUpdate;

      try {
        const response = await fetch(
          `https://www.restapi.fr/api/books/${bookToUpdate._id}`,
          {
            method: "PUT", // mise à jour complète de la donnée distante
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          updateBook({
            ...book,
            title: formData.title,
            author: formData.author,
            editable: false,
          });

          // Reset
        } else {
          console.log("Oops, une erreur");
        }
      } catch (error) {
        console.log("Erreur", error);
        setErrors({
          ...errors,
          fetch: error.message,
        });
      }
    };

    // Récupérer les données
    // Valider et traiter les données avant envoi à l'API
    if (validate()) {
      // s'il n'y pas d'erreur, soumettre le formulaires
      updateBookFromAPI({
        ...book,
        title: formData.title,
        author: formData.author,
        year: formData.year,
      });
      alert("Formulaire soumis");
      console.log("Données formulaire", formData);
    } else {
      return;
    }
  };

  const handleChangeTitle = (e) => {
    console.log("Valeur input titre : ", e.target.value);

    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const handleChangeAuthor = (e) => {
    console.log("Valeur input auteur : ", e.target.value);

    setFormData({ ...formData, author: e.target.value });
  };

  const handleChangeYear = (e) => {
    console.log("Valeur input année de sortie : ", e.target.value);

    setFormData({ ...formData, year: e.target.value.trim() });
  };

  return (
    <section className="mb-5 mt-5">
      <h3>Formulaire de mise à jour de livre</h3>
      <form
        onSubmit={handleSubmit}
        className="border p-5 rounded-3"
        action="#"
        method="POST"
      >
        <div className="mb-4">
          <label className="form-label" htmlFor="title">
            Titre
          </label>
          <input
            onChange={handleChangeTitle}
            className="form-control"
            type="text"
            name="title"
            id="title"
            // value={book.title}
          />
          {errors?.title ? <i className="text-danger">{errors.title}</i> : ""}
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="author">
            Auteur
          </label>
          <input
            onChange={handleChangeAuthor}
            className="form-control"
            type="text"
            name="author"
            id="author"
            minLength={3}
            // value={book.author}
          />
          {errors?.author ? <i className="text-danger">{errors.author}</i> : ""}
        </div>
        <div className="mb-4">
          <label className="form-label" htmlFor="year">
            Année de publication
          </label>
          <input
            onChange={handleChangeYear}
            className="form-control"
            type="date"
            name="year"
            id="year"
          />
          {errors?.year ? <i className="text-danger">{errors.year}</i> : ""}
        </div>
        <div className="d-flex gap-5 align-items-end">
          <input
            type="submit"
            className={`btn btn-primary mt-4 `}
            value={"Mettre à jour"}
          />
          {errors?.fetch ? <i className="text-danger ">{errors.fetch}</i> : ""}
        </div>
      </form>
    </section>
  );
}

export default EditBook;
