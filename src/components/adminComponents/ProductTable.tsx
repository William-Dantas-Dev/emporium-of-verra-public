import React from 'react';

const products = [
  {
    id: 1,
    name: 'Smartphone X Pro',
    status: 'Active',
    price: '$999.00',
    totalSales: 150,
    createdAt: '22/06/2024',
    image: 'link_to_smartphone_image'
  },
  {
    id: 2,
    name: 'Wireless Earbuds Ultra',
    status: 'Active',
    price: '$199.00',
    totalSales: 300,
    createdAt: '22/06/2024',
    image: 'link_to_earbuds_image'
  },
  {
    id: 3,
    name: 'Smart Home Hub',
    status: 'Active',
    price: '$149.00',
    totalSales: 200,
    createdAt: '22/06/2024',
    image: 'link_to_home_hub_image'
  },
  {
    id: 4,
    name: '4K Ultra HD Smart TV',
    status: 'Active',
    price: '$799.00',
    totalSales: 50,
    createdAt: '22/06/2024',
    image: 'link_to_tv_image'
  },
  {
    id: 5,
    name: 'Gaming Laptop Pro',
    status: 'Active',
    price: '$1299.00',
    totalSales: 75,
    createdAt: '22/06/2024',
    image: 'link_to_laptop_image'
  },
];

const ProductTable: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Product</button>
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Total Sales</th>
            <th className="py-2 px-4 border-b">Created at</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4 flex items-center">
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover mr-2" />
                {product.name}
              </td>
              <td className="py-2 px-4">{product.status}</td>
              <td className="py-2 px-4">{product.price}</td>
              <td className="py-2 px-4">{product.totalSales}</td>
              <td className="py-2 px-4">{product.createdAt}</td>
              <td className="py-2 px-4">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
