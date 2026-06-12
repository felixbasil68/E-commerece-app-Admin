import React, { useEffect, useState } from 'react'
import { FaTrash, FaSearch } from 'react-icons/fa'
import { getProductListAPI, removeProductAPI } from '../services/allAPIs'

function List({ token }) {

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // List product 
  const fetchList = async () => {
    try {

      const response = await getProductListAPI()
      console.log(response.data)

      if (response.data.success) {
        setProducts(response.data.produts)
      }

    } catch (error) {
      console.log(error)
    }
  }
  // remove Product
  const removeProduct = async (id) => {

    try {

      const reqHeader = {
        token
      }

      const response = await removeProductAPI({ id }, reqHeader)

      console.log(response.data)

      if (response.data.success) {
        alert("Product removed successfully")
        fetchList() 
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchList()
  }, [])

  // Filter product on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
          <p className="text-gray-600 mt-2">Manage your products</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white p-6 rounded-xl shadow-sm max-w-xs">
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Product</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Category</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Price</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredProducts.length > 0 ? (

                  filteredProducts.map((product) => (

                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100">

                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />

                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900">
                          ${product.price}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <button onClick={() => removeProduct(product._id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">
                      No products found. Try a different search term.
                    </td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default List