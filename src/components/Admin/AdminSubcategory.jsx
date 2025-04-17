import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';

function AdminSubcategory() {
    const { categoryId } = useParams();
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/ProjectFile/backend/getSubcategoriesByCategory.php?category_id=${categoryId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSubcategories(data);
                } else {
                    console.error("Error fetching subcategories:", data);
                }
            })
            .catch(error => console.error("Error:", error));
    }, [categoryId]);

    return (
        <div className='dash-bord p-4'>
            <h2 className='text-xl font-bold mb-4'>Subcategories for Category ID: {categoryId}</h2>

            {subcategories.length > 0 ? (
                <table className="table-auto w-full border">
                    <thead>
                        <tr className='bg-gray-200'>
                            {/* <th className='border px-4 py-2'>ID</th> */}
                            <th className='border px-4 py-2'>Folder Name</th>
                            <th className='border px-4 py-2'>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subcategories.map((sub) => (
                            <tr key={sub.id}>
                                {/* <td className='border px-4 py-2'>{sub.id}</td> */}
                                <td className='border px-4 py-2'>
                                    <Link to={`documents/${sub.id}`} className="text-blue-600 underline">
                                        {sub.name}
                                    </Link>
                                </td>
                                <td className='border px-4 py-2'>{sub.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No subcategories found for this category.</p>
            )}
        </div>
    );
}

export default AdminSubcategory;
