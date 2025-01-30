import getOrders from "../../hooks/getOrders"


export default async function OrdersPage() {
  const orders = await getOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700">
        <div className="w-full max-w-3xl mt-[90px] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 max-h-[800px] overflow-y-auto scrollbar">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Orders
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
            >
              <img
                src={order.image}
                alt={order.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {order.name}
                </h2>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-gray-800 font-medium">
                  Price: ${order.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
        </div>
     
    </div>
  );
}