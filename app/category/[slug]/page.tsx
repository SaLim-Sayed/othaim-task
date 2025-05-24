import CategoryProducts from '@/src/pages/Category/CategoryProducts';

export default function page({ params }: { params: { slug: string } }) {
   return (
    <CategoryProducts id={params.slug}/>
  )
}
