import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/slices/bookSlice";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import CategoryIcon from "@mui/icons-material/Category";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const BookForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    ISBN: "",
    status: "available",
  });

  const [categories, setCategories] = useState([]);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/categories/");
        setCategories(response);
      } catch {
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.author ||
      !formData.ISBN ||
      !formData.category
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await dispatch(createBook(formData)).unwrap();
      toast.success("Book added successfully!");
      setFormData({
        title: "",
        author: "",
        category: "",
        ISBN: "",
        status: "available",
      });
    } catch (err) {
      toast.error(err || "Failed to add book");
    }
  };

  //  Restrict access to admins/librarians
  if (!["admin", "librarian"].includes(user?.role)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: "linear-gradient(to bottom right, #eef2ff, #dbeafe)",
        }}
      >
        <Card sx={{ p: 5, borderRadius: 3, boxShadow: 6, textAlign: "center" }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 50, mb: 2 }} />
          <Typography variant="h6" color="error" fontWeight="bold">
            Access Denied
          </Typography>
          <Typography color="text.secondary">
            Only librarians and admins can create new books.
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #eef2ff, #dbeafe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: 3,
          boxShadow: 6,
          p: 4,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="green"
            textAlign="center"
            mb={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <LibraryAddIcon />
            Add a New Book
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  startAdornment: <BookIcon sx={{ color: "green", mr: 1 }} />,
                }}
              />
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  startAdornment: <PersonIcon sx={{ color: "green", mr: 1 }} />,
                }}
              />
              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <CategoryIcon sx={{ color: "green", mr: 1 }} />
                  ),
                }}
              >
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="ISBN"
                name="ISBN"
                value={formData.ISBN}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <NumbersIcon sx={{ color: "green", mr: 1 }} />
                  ),
                }}
              />
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="borrowed">Borrowed</MenuItem>
                <MenuItem value="reserved">Reserved</MenuItem>
              </TextField>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: "green",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#1ad74dff" },
                }}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add Book"
                )}
              </Button>

              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookForm;
