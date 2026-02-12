const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  document.body.innerHTML =
    "<h1 style='color:red'>APP CRASHED</h1><pre>" +
    error +
    "</pre>";
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
