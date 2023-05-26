import { Client } from "./components/Client";
import { Header } from "./components/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Projects } from "./components/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SingleProject } from "./components/SingleProject";

/* ? How to deploy
  ? Build command installs dependencies, and builds the static files. 
  ? Start command starts the server
*/
// ? what I must do is whitelist the mongo ip from anywhere
// TODO: explain this
// TODO: do not hard code the url
const client = new ApolloClient({
  uri: "/graphql",
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
