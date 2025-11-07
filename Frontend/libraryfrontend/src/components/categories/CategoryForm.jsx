// src/components/categories/CategoryForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  clearError,
  clearSuccess,
} from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Cleanup error/success when unmounting
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  // Navigate back after success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/categories");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    dispatch(addCategory(formData));
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 8,
        mb: 6,
        px: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        {/* Header */}
        <Typography variant="h5" fontWeight="bold" color="primary" mb={1}>
          Library Management System
        </Typography>
        <Typography variant="h6" mb={3}>
          Add New Book Category
        </Typography>

        {/* Error & Success */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {typeof error === "string"
              ? error
              : "Failed to add category. Please try again."}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Category added successfully!
          </Alert>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            placeholder="Enter category description (optional)"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <AddCircleOutlineIcon />
              )
            }
            sx={{
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
              mt: 1,
            }}
          >
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </Box>

        {/* Back Button */}
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/categories")}
          sx={{ mt: 3, borderRadius: 2, textTransform: "none" }}
        >
          Back to Categories
        </Button>
      </Paper>
    </Box>
  );
};

export default CategoryForm;
