import { ExecutableProgram } from '@carbon/icons-react';

import { IItem } from '../../../../lib/components/compositions/autocomplete/types/types';

export const demoItems: IItem[] = [
  {
    label: 'JavaScript',
    value: 'javascript',
    render: ({ item }) => <span className="font-bold italic">{item.label}</span>,
  },
  {
    label: 'JavaScript 2',
    value: 'javascript2',
    render: ({ children, isSelected }) => (
      <div className="flex w-full items-center justify-between text-purple-500">
        {children}
        {isSelected ? 'SELECCIONADO' : ''}
        <ExecutableProgram />
      </div>
    ),
  },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'PHP', value: 'php' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Dart', value: 'dart' },
  { label: 'Scala', value: 'scala' },
  { label: 'Perl', value: 'perl', disabled: true }, // 🔒 disabled
  { label: 'Objective-C', value: 'objectivec' },
  { label: 'Elixir', value: 'elixir' },
  { label: 'Haskell', value: 'haskell' },
  { label: 'Lua', value: 'lua' },
  { label: 'R', value: 'r' },
  { label: 'MATLAB', value: 'matlab', disabled: true }, // 🔒 disabled
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'SQL', value: 'sql' },
  { label: 'XML', value: 'xml' },
  { label: 'JSON', value: 'json' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Markdown', value: 'markdown' },
];
