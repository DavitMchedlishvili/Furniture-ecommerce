import ReturnButton from '../../components/Buttons/ReturnButton/ReturnButton';
import ProductsCard from '../../components/ProductsCard/ProductsCard'
import getProducts from '../../hooks/getProducts';
import { ProductProps } from '@/types/ProductProps';





const ProductsPage = async () => {
  const data: ProductProps[] | null | undefined = await getProducts();
  console.log(data)
  if (!data) {
    return <div>Products not found</div>;
  }

  

  return (
    
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800'>
    
    {data.length === 0 ? (
      <div className="text-center py-8">Sorry, there are no products.</div>
    ) : (
     
      <div className=' flex gap-6 w-full  p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800'>
        
        {data.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>

    )}
  </div>
  );
};

export default ProductsPage;





