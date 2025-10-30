import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Vibe Commerce</h1>
        <p>Discover amazing products at great prices</p>
      </section>
      
      <ProductList />
      
      <section className="cart-preview">
        <Cart />
      </section>
    </div>
  );
};

export default HomePage;
