import { useState } from "react";
import { CategoryFormData } from "../types";

interface UseCategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
}

export function useCategoryForm({ onSubmit }: UseCategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    emoji: "",
  });

  const [errors, setErrors] = useState<Partial<CategoryFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    field: keyof CategoryFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CategoryFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.emoji.trim()) {
      newErrors.emoji = "Emoji is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);

      setFormData({
        name: "",
        emoji: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}