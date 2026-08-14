import React, { useState } from "react";
import { Button, Modal, TextField } from "../vibes";
import { COLORS } from "../constants/colors";
import { EXPENSE_CATEGORIES } from "../constants/categories";
import { getCategoryEmoji } from "../constants/categoryEmojis";

interface Category {
  id: number;
  name: string;
  emoji: string;
}

const CategoriesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

  const categories = EXPENSE_CATEGORIES.map((name, index) => ({
    id: index + 1,
    name,
    emoji: getCategoryEmoji(name),
  }));

  const handleAddCategory = () => {
    if (!name.trim() || !emoji.trim()) return;

    setCategories((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        emoji: emoji.trim(),
      },
    ]);

    setName("");
    setEmoji("");
    setIsModalOpen(false);
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
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "700px",
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
        {categories.map((category) => (
          <div key={category.id} style={categoryStyle}>
            <span style={emojiStyle}>{category.emoji}</span>
            <span style={nameStyle}>{category.name}</span>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Category"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            fullWidth
            required
          />

          <Button
            variant="primary"
            onClick={handleAddCategory}
            disabled={!name.trim() || !emoji.trim()}
            fullWidth
          >
            Add Category
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesPage;