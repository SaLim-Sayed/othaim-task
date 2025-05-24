import CategoryProducts from '@/src/pages/Category/CategoryProducts';

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  return <CategoryProducts id={params.slug} />;
}
