import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyModal({ children, book, updateBook }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    updateBook({ ...book, editable: false });
  };
  const handleShow = () => setShow(true);

  // Déclarer les réferences
  const refLunchButton = useRef(null);

  // Après le rendu du composant
  useEffect(() => {
    refLunchButton.current.click();
  }, []); // uniquement après le premier rendu du composant

  console.log("click du modal :", book);
  return (
    <>
      <Button
        ref={refLunchButton}
        variant="primary"
        onClick={handleShow}
        hidden
      >
        Lancer la modale
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulaire de mise à jour de livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {typeof children === "function"
            ? children({ book, updateBook, handleClose })
            : children}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button
            onClick={handleClickButtonUpdate}
            variant="primary"
          >
            Mettre à jour (modal)
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default MyModal;
