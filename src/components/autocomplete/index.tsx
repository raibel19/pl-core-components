import AutocompleteAsyncExample2 from './async-dos';
import AutocompleteAsyncExample1 from './async-uno';
import AutocompleteStaticExample1 from './static-uno';

export default function AutocompleteExamples() {
  return (
    <div className="mt-5 grid grid-cols-1 grid-rows-[1fr_auto] gap-y-5">
      <div className="flex gap-3">
        <div className="w-full space-y-4">
          <p className="text-sm font-semibold text-slate-700">1. Estatico NO controlado, con filtrado personalizado.</p>
          <AutocompleteStaticExample1 />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-full space-y-4">
          <p className="text-sm font-semibold text-slate-700">1. Asyncrono NO controlado con filtrado en la api.</p>
          <AutocompleteAsyncExample1 />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-full space-y-4">
          <p className="text-sm font-semibold text-slate-700">1. Asyncrono controlado con filtrado en la api.</p>
          <AutocompleteAsyncExample2 />
        </div>
      </div>
    </div>
  );
}
