import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";
import '../App.css';
import axios from 'axios';
function DocumentUpload({ userId }) {
  const { subcategoryId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [files, setFiles] = useState([]); // changed to array

  useEffect(() => {
    fetchDocuments();
  }, [subcategoryId]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `http://localhost/ProjectFile/backend/documents.php?subcategory_id=${subcategoryId}`
      );
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      uploadDocuments(selectedFiles);
    }
  };

  const uploadDocuments = async (selectedFiles) => {
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subcategory_id', subcategoryId);
      formData.append('user_id', userId);

      try {
        await axios.post('http://localhost/ProjectFile/backend/documents.php', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }
    setFiles([]);
    fetchDocuments();
  };

  const deleteDocument = async (id) => {
    try {
      await axios.delete(`http://localhost/ProjectFile/backend/documents.php?id=${id}`);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const downloadDocument = (document) => {
    const byteCharacters = atob(document.file_data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: document.name.split('.').pop() });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = document.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className='document-upload-container  m-15'>
      <div className='flex items-center justify-between '>
        <div >
          <h4>Document</h4>
        </div>

        <div>

          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button className='custom-upload-button flex items-center'
            onClick={() => document.getElementById("fileInput").click()}
          >
            <IoMdAddCircleOutline style={{ marginRight: '5px' }} />
            Upload Documents
          </button>

        </div>

      </div>

      {/* table  */}

      {/* <ul className='documents'>
        {documents.map((document) => (
          <li key={document.id} className="document">
            <span
              onClick={() => downloadDocument(document)}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
            >
              {document.name}
            </span>
            <button onClick={() => deleteDocument(document.id)}>Delete</button>
          </li>
        ))}
      </ul> */}

      <div className="table-scroll-container mt-3">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">File Name</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody >
            {documents.map((document, index) => (
              <tr key={document.id} className="text-center">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td
                  className="px-4 py-2 border  cursor-pointer"
                  onClick={() => downloadDocument(document)}
                >
                  {document.name}
                </td>
                <td className="px-4 py-2 border">{document.created_at || "N/A"}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => deleteDocument(document.id)}
                    className="custom-upload-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
}

export default DocumentUpload;
