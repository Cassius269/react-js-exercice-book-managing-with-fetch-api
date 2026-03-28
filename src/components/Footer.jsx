import "../assets/styles/layouts/Footer.module.scss";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="container-fluid text-white bg-dark">
      <p>Droits d'auteur @{date.getFullYear()} Cookchef</p>
    </footer>
  );
}
