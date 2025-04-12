import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import '../App.css'

function DocumentUpload({ userId }) {
  const { subcategoryId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

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
    setFile(e.target.files[0]);
  };

  const uploadDocument = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subcategory_id', subcategoryId);
    formData.append('user_id', userId);

    try {
      await axios.post('http://localhost/ProjectFile/backend/documents.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      fetchDocuments();
    } catch (error) {
      console.error('Error uploading document:', error);
    }
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
    // Create a Blob from base64 data
    const byteCharacters = atob(document.file_data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: document.name.split('.').pop() });

    // Create a download link
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
    <div>
      <h2>Documents</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadDocument}>Upload Document</button>
      <ul className='documents'>
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
      </ul>
    </div>
  );
}

export default DocumentUpload;