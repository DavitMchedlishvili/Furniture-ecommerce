import ProductsCard from '../../components/ProductsCard/ProductsCard'
import getProducts from '../../hooks/getProducts';
import { ProductProps } from '@/types/ProductProps';
import { addToCart } from '../../hooks/addToCart';

const ProductsPage = async () => {
  const data: ProductProps[] | null | undefined = await getProducts();
  console.log(data);

  if (!data) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700'>
        Products not found
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700'>
      {data.length === 0 ? (
        <div className="text-center py-8">Sorry, there are no products.</div>
      ) : (
        <div className='w-full p-6 bg-white border border-gray-300  shadow-md dark:bg-gray-100 dark:border-slate-800'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {data.map((product) => (
              <ProductsCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;





