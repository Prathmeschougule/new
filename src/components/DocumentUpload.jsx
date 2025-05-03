import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";
import '../App.css';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaArrowAltCircleDown } from "react-icons/fa";

function DocumentUpload({ userId }) {
  const { subcategoryId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [files, setFiles] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const downloadDocument = (doc) => {
    try {
      const base64Data = doc.file_data.split(',')[1] || doc.file_data;

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const extension = doc.name.split('.').pop().toLowerCase();
      const mimeTypes = {
        pdf: 'application/pdf',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        txt: 'text/plain',
        csv: 'text/csv',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };
      const mimeType = mimeTypes[extension] || 'application/octet-stream';

      const blob = new Blob([byteArray], { type: mimeType });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a'); // ✅ now this uses the global document
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };



  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const searched = documents.filter((document) =>
      document.name.toLowerCase().includes(query)
    );
    setSearchedFiles(searched);
  };

  return (
    <div className='document-upload-container'>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title */}
        <div>
          <h4 className="text-lg font-semibold">Document</h4>
        </div>

        {/* Search Field */}
        <input
          className="form-control searchbar w-full md:w-1/3 px-3 py-2 border rounded-md focus:outline-none"
          type="search"
          placeholder="Search document..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Upload Button */}
        <div>
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button
            className="custom-upload-button flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 w-full md:w-auto"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <IoMdAddCircleOutline />
            <span>Upload Documents</span>
          </button>
        </div>
      </div>
      {/* Table */}
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
          <tbody>
            {(searchTerm ? searchedFiles : documents).length > 0 ? (
              (searchTerm ? searchedFiles : documents).map((document, index) => (
                <tr key={document.id} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td
                    className="px-4 py-2 border "

                  >
                    {document.name}
                  </td>
                  <td className="px-4 py-2 border">{document.created_at || "N/A"}</td>
                  <td className="px-4 py-2  border ">
                    <button
                      onClick={() => deleteDocument(document.id)}
                      className="custom-upload-button deleteBtn mr-1 "
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => downloadDocument(document)} // ✅ passing full document object
                      className="custom-upload-button DwonloadBtn text-green-700"

                    >
                      <FaArrowAltCircleDown />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border text-center text-gray-500">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentUpload;
