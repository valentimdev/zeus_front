import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type TesteCardProps = {
  title: string;
  descricao: string;
  conteudo: string;
};

export function TesteCard({ title, descricao,conteudo }: TesteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descricao}</CardDescription>
        
      </CardHeader>
      <CardContent>
        <p>{conteudo}</p>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
export default TesteCard;
