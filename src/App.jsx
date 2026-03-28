import "./assets/styles/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookManager from "./components/BookManager";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Gestion de livre</h1>
        <BookManager />
      </main>
      <Footer />
    </>
  );
}

export default App;
