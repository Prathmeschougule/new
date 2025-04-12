import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Subcategory({ userId }) {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState('');

  useEffect(() => {
    fetchSubcategories();
  },[categoryId]);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost/ProjectFile/backend/subcategories.php?category_id=${categoryId}`
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const addSubcategory = async () => {
    if (!newSubcategory) return;
    try {
      await axios.post('http://localhost/ProjectFile/backend/subcategories.php', {
        name: newSubcategory,
        category_id: categoryId,
      });
      setNewSubcategory('');
      fetchSubcategories();
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const deleteSubcategory = async (id) => {
    try {
      await axios.delete(`http://localhost/ProjectFile/backend/subcategories.php?id=${id}`);
      fetchSubcategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  return (
    <div>
      <h2>Subcategories</h2>
      <input
        type="text"
        value={newSubcategory}
        onChange={(e) => setNewSubcategory(e.target.value)}
        placeholder="New Subcategory"
      />
      <button onClick={addSubcategory}>Add Subcategory</button>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id} className="subcategory">
            <Link to={`/subcategory/${subcategory.id}`}>{subcategory.name}</Link>
            <button onClick={() => deleteSubcategory(subcategory.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Subcategory;