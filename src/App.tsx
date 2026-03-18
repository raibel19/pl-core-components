import AutocompleteExamples from './components/autocomplete';
import InputBasic from './components/compositions/input/input-basic';
import InputDefaultValue from './components/compositions/input/input-default-value';
import InputDisabled from './components/compositions/input/input-disabled';
import InputError from './components/compositions/input/input-error';
import InputErrorMessage from './components/compositions/input/input-error-message';
import InputMaxLength from './components/compositions/input/input-max-length';
import InputMaxLengthCounter from './components/compositions/input/input-max-length-counter';
import InputNumeric from './components/compositions/input/input-numeric';
import InputNumericDecimals from './components/compositions/input/input-numeric-decimals';
import InputNumericFormatter from './components/compositions/input/input-numeric-formatter';
import InputLimits from './components/compositions/input/input-numeric-limits';
import {
  InputResetInitialValueControlled,
  InputResetInitialValueDefaultValue,
} from './components/compositions/input/input-reset-initial-value';
import { InputValueController } from './components/compositions/input/input-value-controller';
import InputWithAddons from './components/compositions/input/input-with-addons';
import Card from './components/shared/card';

function App() {
  return (
    <>
      <div className="container py-5">
        <main className="mx-auto flex flex-col gap-y-4 px-4 py-12">
          <div className="space-y-16">
            <section id="inputs" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Input Components</h2>
                <p className="mt-2 text-muted-foreground">Ejemplos de inputs con diferentes configuraciones.</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <Card title="Basico">
                  <InputBasic />
                </Card>
                <Card title="Valor default">
                  <InputDefaultValue />
                </Card>
                <Card title="Deshabilitado">
                  <InputDisabled />
                </Card>
                <Card title="Error">
                  <InputError />
                </Card>
                <Card title="Error con mensaje personalizado">
                  <InputErrorMessage />
                </Card>
                <Card title="Longitud máxima" description="máximo 10 caracteres">
                  <InputMaxLength />
                </Card>
                <Card title="Longitud máxima contador">
                  <InputMaxLengthCounter />
                </Card>
                <Card title="Numérico">
                  <InputNumeric />
                </Card>
                <Card title="Numérico decimales">
                  <InputNumericDecimals />
                </Card>
                <Card title="Numérico limites">
                  <InputLimits />
                </Card>
                <Card title="Numérico formateado">
                  <InputNumericFormatter />
                </Card>
                <Card title="Reiniciar al valor inicial (Default Value)">
                  <InputResetInitialValueDefaultValue />
                </Card>
                <Card title="Reiniciar al valor inicial (Controlado)">
                  <InputResetInitialValueControlled />
                </Card>
                <Card title="Valor controlado">
                  <InputValueController />
                </Card>
                <Card title="Addons">
                  <InputWithAddons />
                </Card>
              </div>
            </section>
          </div>
          {/* <div className="space-y-16">
            <section id="autocomplete" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Autocomplete Components</h2>
                <p className="mt-2 text-muted-foreground">Ejemplos de autocomplete con diferentes configuraciones.</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <Card title="Basico">
                  <InputBasic />
                </Card>
              </div>
            </section>
          </div> */}
        </main>
        {/* <AutocompleteExamples /> */}
        {/* <CardExamples /> */}
      </div>
    </>
  );
}

export default App;
