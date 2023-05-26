import { Client } from "./components/Client";
import { Header } from "./components/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Projects } from "./components/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SingleProject } from "./components/SingleProject";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="h-screen relative">
          <Header />
          <Routes>
            <Route path="/" element={<Client />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<SingleProject />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
