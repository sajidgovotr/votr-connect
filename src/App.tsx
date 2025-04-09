import { Provider } from "react-redux";
import AppContainer from "./components/AppContainer";
import { MessageContainer } from "./context/message-context";
import { BrowserRouter } from "react-router";
import { ScrollToTop } from "./components";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <MessageContainer>
        <BrowserRouter>
          <ScrollToTop />
          <AppContainer />
        </BrowserRouter>
      </MessageContainer>
    </Provider>
  )
}

export default App
