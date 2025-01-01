import React from 'react';

const SalesActivity = ({ salesActivity }) => {
  if (!salesActivity.length) {
    return <p className="text-gray-400">No sales activity found.</p>;
  }

  return (
    <div className="grid gap-6">
      {salesActivity.map((sale) => (
        <div key={sale._id} className="p-4 bg-gray-800 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Sale #{sale._id}</h3>
          <p className="text-gray-400">Date: {new Date(sale.createdAt).toLocaleString()}</p>
          <p className="text-gray-400">Total Amount: ${sale.total}</p>
          <div className="mt-4">
            <h4 className="font-bold text-lg">Products:</h4>
            <ul className="ml-4 list-disc">
              {sale.products.map((product) => (
                <li key={product._id} className="text-gray-300">
                  {product.title} - ${product.price} x {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesActivity;
