import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios';
import '../sidebar.css';

const Sidebar2 = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState({});
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeModalCategory, setActiveModalCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`http://localhost/ProjectFile/backend/categories.php?user_id=${userId}`);
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(`http://localhost/ProjectFile/backend/subcategories.php?category_id=${categoryId}`);
      setSubcategories((prev) => ({ ...prev, [categoryId]: res.data }));
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  const addCategory = async () => {
    if (!newCategory) return;
    try {
      await axios.post('http://localhost/ProjectFile/backend/categories.php', {
        name: newCategory,
        user_id: userId,
      });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost/ProjectFile/backend/categories.php?id=${id}`);
      fetchCategories();
      setSubcategories((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  const addSubcategory = async (categoryId) => {
    const name = newSubcategory[categoryId];
    if (!name) return;
    try {
      await axios.post('http://localhost/ProjectFile/backend/subcategories.php', {
        name,
        category_id: categoryId,
      });
      setNewSubcategory((prev) => ({ ...prev, [categoryId]: '' }));
      fetchSubcategories(categoryId);
      setActiveModalCategory(null);
    } catch (err) {
      console.error('Error adding subcategory:', err);
    }
  };

  const deleteSubcategory = async (categoryId, subId) => {
    try {
      await axios.delete(`http://localhost/ProjectFile/backend/subcategories.php?id=${subId}`);
      fetchSubcategories(categoryId);
    } catch (err) {
      console.error('Error deleting subcategory:', err);
    }
  };

  const toggleMenu = (menuId, categoryId) => {
    if (selectedMenu === menuId) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menuId);
      fetchSubcategories(categoryId);
    }
  };

  return (
    <div className='sidebar-Base mt-15'>
      <div className="sidebar-header">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
        />
        <button className='add-Category' onClick={addCategory}>Add Category</button>
      </div>

      <ul className="sidebar-menu">
        {categories.map((category) => (
          <li key={category.id}>
            <div className="Main-category-section">
              <div className="main-category-name" onClick={() => toggleMenu(`cat-${category.id}`, category.id)}>
              <span>{selectedMenu === `cat-${category.id}` ? '-' : '+'}</span> <span>{category.name} </span>
              </div>
              <div>
                <button data-bs-toggle="dropdown" className="text-black pr-1" type="button">
                  <BsThreeDotsVertical />
                </button>
                <ul className="dropdown-menu btn-category">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => setActiveModalCategory(category.id)}
                    >
                      Add Subcategory
                    </button>
                    <a
                      className="dropdown-item cursor-pointer"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Delete Category
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {selectedMenu === `cat-${category.id}` && (
              <ul className="submenu">
                {Array.isArray(subcategories[category.id]) &&
                  subcategories[category.id].map((sub) => (
                    <li key={sub.id}>
                      <Link to={`/subcategory/${sub.id}`}>{sub.name}</Link>
                      <button onClick={() => deleteSubcategory(category.id, sub.id)} className="delete-btn">
                        <MdDelete />
                      </button>
                    </li>
                  ))}
              </ul>
            )}

            {/* Modal */}
            {activeModalCategory === category.id && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Subcategory</h5>
                      <button type="button" className="close" onClick={() => setActiveModalCategory(null)}>
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <input
                        type="text"
                        value={newSubcategory[category.id] || ''}
                        onChange={(e) =>
                          setNewSubcategory((prev) => ({
                            ...prev,
                            [category.id]: e.target.value,
                          }))
                        }
                        className="form-control"
                        placeholder="Enter Subcategory"
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setActiveModalCategory(null)}>Close</button>
                      <button type="button" className="btn btn-primary" onClick={() => addSubcategory(category.id)}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar2;
