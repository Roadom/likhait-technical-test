import React, { useState, useEffect } from "react";
import { Button, Modal, } from "../vibes";
import { COLORS } from "../constants/colors";
import { Pagination } from "../vibes/Pagination";
import { Category, CategoryFormData } from "../types";
import { createCategory, fetchCategories } from "../services/api";
import { CategoryForm } from "../components/CategoryForm"

const CategoriesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 8;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const displayedCategories = categories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage,
  ); 

  useEffect(() => {
    const loadCategories = async () => {
        try {
        const data = await fetchCategories();
        setCategories(data);
        } catch (error) {
        console.error("Error fetching categories:", error);
        }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async (data: CategoryFormData) => {
    try {
        const newCategory = await createCategory(data);

        setCategories((prev) => [...prev, newCategory]);
        setIsModalOpen(false);
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
  };

  const pageStyle: React.CSSProperties = {
    padding: "48px 64px",
    minHeight: "100vh",
    background: COLORS.secondary.s01,
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "40px",
    fontWeight: 700,
    color: COLORS.secondary.s10,
    margin: 0,
  };

  const listStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    width: "1fr",
  };

  const categoryStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    background: COLORS.background.main,
    borderRadius: "8px",
    border: `1px solid ${COLORS.border}`,
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: "28px",
  };

  const nameStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 500,
    color: COLORS.text.primary,
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Categories</h1>
        {/* Modal button */}
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Category
        </Button>
      </div>

      <div style={listStyle}>
        {displayedCategories.map((category) => (
          <div key={category.id} style={categoryStyle}>
            <span style={emojiStyle}>{category.emoji}</span>
            <span style={nameStyle}>{category.name}</span>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Category"
      >
        <CategoryForm
            onSubmit={handleAddCategory}
            onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;