import React from "react";
import { TextField, Button } from "../vibes";
import { useCategoryForm } from "../hooks/useCategoryForm";
import { CategoryFormData } from "../types";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
}

export function CategoryForm({
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useCategoryForm({ onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        type="text"
        placeholder="Category name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        fullWidth
        required
      />

      <TextField
        label="Emoji"
        type="text"
        placeholder="🍔"
        value={formData.emoji}
        onChange={(e) => handleChange("emoji", e.target.value)}
        error={errors.emoji}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        fullWidth
      >
        {isSubmitting ? "Adding..." : "Add Category"}
      </Button>

      {onCancel && (
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      )}
    </form>
  );
}