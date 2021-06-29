import Routes from "./routes";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes />
      <GlobalStyle />
    </>
  );
};

export default App;
