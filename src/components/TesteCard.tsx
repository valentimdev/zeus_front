import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * @type {object} TesteCardProps
 * @property {string} title - The title of the card.
 * @property {string} descricao - The description of the card.
 * @property {string} conteudo - The main content of the card.
 */
type TesteCardProps = {
  title: string;
  descricao: string;
  conteudo: string;
};

/**
 * A reusable card component to display a piece of information with a title and description.
 * @param {TesteCardProps} props - The component props.
 * @returns {JSX.Element} The rendered TesteCard component.
 */
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
