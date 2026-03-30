import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyModal({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refLunchButton = useRef(null);

  useEffect(() => {
    refLunchButton.current.click();
  }, []);

  return (
    <>
      <Button ref={refLunchButton} variant="primary" onClick={handleShow}>
        Lancer la modale
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulaire de mise à jour de livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary">Mettre à jour (modal)</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
