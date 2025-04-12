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
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost/ProjectFile/backend/categories.php?user_id=${userId}`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost/ProjectFile/backend/subcategories.php?category_id=${categoryId}`
      );
      setSubcategories((prev) => ({
        ...prev,
        [categoryId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching subcategories:', error);
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
    } catch (error) {
      console.error('Error adding category:', error);
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
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const addSubcategory = async (categoryId) => {
    const name = newSubcategory[categoryId] || '';
    if (!name) return;
    try {
      await axios.post('http://localhost/ProjectFile/backend/subcategories.php', {
        name,
        category_id: categoryId,
      });
      setNewSubcategory((prev) => ({ ...prev, [categoryId]: '' }));
      fetchSubcategories(categoryId);
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const deleteSubcategory = async (categoryId, subcategoryId) => {
    try {
      await axios.delete(`http://localhost/ProjectFile/backend/subcategories.php?id=${subcategoryId}`);
      fetchSubcategories(categoryId);
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const toggleMenu = (menu, categoryId) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
      fetchSubcategories(categoryId);
    }
  };


  return (
    <div className='sidebar-Base'>
      <div className="sidebar-header"> 
       
          <>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
            />
            <button className='add-Category' onClick={addCategory}>Add Category</button>
          </>
       
      </div>
     
        <ul className="sidebar-menu">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <li key={category.id}>
                <div className='Main-category-section'>
                        
                    <div className='main-category-name 'onClick={() => toggleMenu(`cat-${category.id}`, category.id)}>
                        <a
                        
                        href="#"
                        >
                        {category.name} <span>{selectedMenu === `cat-${category.id}` ? '-' : '+'}</span>
                        </a>
                    </div>
                    <div>
                        <button className='main-category-deleteBtn'
                        onClick={() => deleteCategory(category.id)}
                        style={{ marginLeft: '10px', background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px' }}
                        >
                          <MdDelete />                     
                        </button>                       
                        {/* <div >
                          <button> 
                            <BsThreeDotsVertical/>
                        </button>  
                        </div> */}
                        
                    </div>
                   
                    
                </div>
                {selectedMenu === `cat-${category.id}` && (
                  <ul className="submenu" style={{ display: 'block', opacity: 1 }}>
                    <li>
                      <input
                        type="text"
                        value={newSubcategory[category.id] || ''}
                        onChange={(e) =>
                          setNewSubcategory((prev) => ({
                            ...prev,
                            [category.id]: e.target.value,
                          }))
                        }
                        placeholder="New Subcategory"
                      />
                      <button onClick={() => addSubcategory(category.id)}>
                        Add Subcategory
                      </button>
                    </li>
                    {Array.isArray(subcategories[category.id]) &&
                      subcategories[category.id].map((subcategory) => (
                        <li key={subcategory.id}>
                          <Link to={`/subcategory/${subcategory.id}`}>
                            {subcategory.name}
                          </Link>
                          <button
                            onClick={() => deleteSubcategory(category.id, subcategory.id)}
                            style={{
                              marginLeft: '10px',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '5px 10px',
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>

        
            
    </div>


  );
};

export default Sidebar2;