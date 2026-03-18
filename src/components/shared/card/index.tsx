import { CardContent, CardDescription, CardHeader, Card as CardShadcn, CardTitle } from '../../ui/card';

interface CardProps {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  props?: {
    name: string;
    description: string;
  }[];
}

export default function Card(_props: CardProps) {
  const { children, description, props, title } = _props;

  return (
    <CardShadcn>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>{children}</div>
        {props && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Propiedades:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {props.map((prop, idx) => (
                <li key={`${prop.name}-${idx}`}>
                  • <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{prop.name}</code>: {prop.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </CardShadcn>
  );
}
