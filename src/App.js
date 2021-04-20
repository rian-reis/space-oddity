import "./App.css";
import { Switch, Route, Link } from "react-router-dom";

import { Page } from "./common/components/Page";

import Drawer from "./common/components/Drawer";
import LaunchListPage from "./containers/LaunchListPage";
import RocketListPage from "./containers/RocketListPage";
import LaunchForm from "./containers/LaunchForm";

import useLocalLaunchesCount from "./common/hooks/localLaunchesCountHook";
import { FiltersContextProvider } from "./common/contexts/FiltersContext";

function App({ client }) {
  const count = useLocalLaunchesCount();

  return (
    <div className="App">
      <Page noPadding>
        <Drawer count={count} />
        <Route exact path="/">
          <Page center>{`Bem vindo! Utilize o menu à esquerda`}</Page>
        </Route>
        <Switch>
          <FiltersContextProvider>
            <Route path="/rockets">
              <RocketListPage title="Foguetes" />
            </Route>
            <Route exact path="/launches">
              <LaunchListPage title="Lançamentos" />;
            </Route>
            <Route path="/launches/local">
              <LaunchListPage title="Novos Lançamentos" localOnly={true}>
                <Link to="/launches/new">Criar Novo Lançamento</Link>
              </LaunchListPage>
            </Route>
            <Route path="/launches/new">
              <LaunchForm />
            </Route>
          </FiltersContextProvider>
        </Switch>
      </Page>
    </div>
  );
}

export default App;
