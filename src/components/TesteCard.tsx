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
    <div className='text-center  '>
    <Card className=''>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descricao}</CardDescription>
        
      </CardHeader>
      <CardContent>
        <p>
          {conteudo ? <span>{conteudo}</span> : <span>Nenhum dado disponível</span>}
        </p>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
    </div>
  );
}
export default TesteCard;
