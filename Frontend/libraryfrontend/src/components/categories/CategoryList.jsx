import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get("/categories/");
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await apiClient.delete(`/categories/${id}/`);
        setCategories((prev) =>
          prev.filter((cat) => cat._id !== id && cat.id !== id)
        );
      } catch (err) {
        setError(err.message || "Failed to delete category");
      }
    }
  };

  const handleAddCategory = () => {
    navigate("/categories/new");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box
      sx={{
        mt: 6,
        maxWidth: 900,
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="green"
          textAlign="center"
        >
          Book Categories
        </Typography>

        {/* ✅ Show Add Category button only if librarian or admin */}
        {["admin", "librarian"].includes(user?.role) && (
          <Button
            variant="contained"
            color="success"
            onClick={handleAddCategory}
          >
            ➕ Add Category
          </Button>
        )}
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && categories.length === 0 && (
        <Typography textAlign="center" color="text.secondary" mt={2}>
          No categories found.
        </Typography>
      )}

      {!loading && categories.length > 0 && (
        <Paper sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Description</TableCell>
                {["admin", "librarian"].includes(user?.role) && (
                  <TableCell align="center">Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat, index) => (
                <TableRow key={cat._id || cat.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>{cat.description || "—"}</TableCell>

                  {/* ✅ Only show delete option for admin/librarian */}
                  {["admin", "librarian"].includes(user?.role) && (
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(cat._id || cat.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default CategoryList;
