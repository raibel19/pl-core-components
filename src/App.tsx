import AutocompleteExamples from './components/autocomplete';
import CardExamples from './components/card/examples';
import InputModules from './components/input/input-modules';

function App() {
  return (
    <div className="container py-5">
      {/* <InputsExamples /> */}
      <InputModules />
      <AutocompleteExamples />
      <CardExamples />
    </div>
  );
}

export default App;
