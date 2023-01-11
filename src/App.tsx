import React, { useState, useEffect } from "react";
import "./App.css";
import { Login, Agenda, Person, ViewType, People, File, FileList } from "@microsoft/mgt-react";
import { Providers, ProviderState } from "@microsoft/mgt-element";

const personDetails = {
  displayName: "Dinesh Poudel",
  mail: "dinesh.poudel@xrdig.com",
};

function useIsSignedIn(): [boolean] {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };
    Providers.onProviderUpdated(updateState);
    updateState();
    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);
  return [isSignedIn];
}

function App() {
  const [isSignedIn] = useIsSignedIn();
  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isSignedIn && (
          <div style={{ width: "1000px", display: 'flex' }}>
            <Agenda />
           <FileList fileListQuery="me/drive/root/children" style={{ width: '500px'}} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
