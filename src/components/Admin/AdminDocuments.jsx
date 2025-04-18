import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AdminDocuments() {
  const { subcategoryId } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/ProjectFile/backend/getDocumentsBySubcategory.php?subcategory_id=${subcategoryId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDocuments(data);
        } else {
          console.error("Error fetching documents:", data);
        }
      })
      .catch(err => console.error(err));
  }, [subcategoryId]);
   
  return (
    <div className="p-4 dash-bord">
      <h2 className="text-xl font-bold mb-4">Documents for Subcategory ID: {subcategoryId}</h2>
      {documents.length > 0 ? (
        <table className="table-auto w-full border">
          <thead>
            <tr className='bg-gray-200'>
              {/* <th className='border px-4 py-2'>ID</th> */}
              <th className='border px-4 py-2'>Document Name</th>
              <th className='border px-4 py-2'>Created At</th>
              <th className='border px-4 py-2'>Download</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id}>
                {/* <td className='border px-4 py-2'>{doc.id}</td> */}
                <td className='border px-4 py-2'>{doc.name}</td>
                <td className='border px-4 py-2'>{doc.created_at}</td>
                <td className='border px-4 py-2'>
                  <a href={`http://localhost/ProjectFile/backend/download.php?id=${doc.id}`} className="text-blue-600 underline">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No documents found for this subcategory.</p>
      )}
    </div>
  );
}

export default AdminDocuments;
