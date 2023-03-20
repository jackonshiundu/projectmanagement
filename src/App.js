import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Developers from './pages/Developers';
import Header from './component/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createContext, useState } from 'react';
import Singleproductpage from './component/Singleproductpage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incomming) {
            return incomming;
          },
        },
        projects: {
          merge(existing, incomming) {
            return incomming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: 'https://project-management-app-6g1n.onrender.com/graphql',
  cache,
});

export const Togglecontext = createContext();
function App() {
  const [visibility, setVisibillity] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Togglecontext.Provider value={{ setVisibillity, visibility }}>
        <Router>
          <ToastContainer position="bottom-center" limit={1} />

          <div className=" relative overflow-x-hidden min-h-screen flex justify-between flex-col">
            <div className="z-20">
              <Header />
            </div>
            <main className="container m-auto mt-4 mx-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/developers" element={<Developers />} />
                <Route path="/product/:id" element={<Singleproductpage />} />
              </Routes>
            </main>
            <footer className="text-center h-30">Jackoncode &copy; 2022</footer>
          </div>
        </Router>
      </Togglecontext.Provider>
    </ApolloProvider>
  );
}

export default App;
