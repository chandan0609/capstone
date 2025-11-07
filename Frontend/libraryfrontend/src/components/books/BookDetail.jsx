import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookDetail } from "../../redux/slices/bookDetailSlice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { book, loading, error } = useSelector((state) => state.bookDetail);

  useEffect(() => {
    dispatch(fetchBookDetail(id));
  }, [dispatch, id]);

  // Loading state
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );

  // Error state
  if (error)
    return (
      <Box textAlign="center" mt={8}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );

  if (!book)
    return (
      <Typography textAlign="center" mt={8} color="textSecondary">
        Book not found.
      </Typography>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right,  #a8e063, #ffffff)",
        py: 6,
      }}
    >
      <Box maxWidth="800px" mx="auto">
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
          {/* Back Button */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            Back
          </Button>

          <CardContent>
            {/* Book Title */}
            <Typography
              variant="h4"
              color="primary"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={1}
              gutterBottom
            >
              <MenuBookIcon />
              {book.title}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Book Info */}
            <Box mt={2} mb={3}>
              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gap={1}
                mb={1}
              >
                <PersonIcon color="action" /> <strong>Author:</strong>{" "}
                {book.author}
              </Typography>

              <Typography
                variant="body1"
                display="flex"
                alignItems="center"
                gap={1}
                mb={1}
              >
                <CategoryIcon color="action" /> <strong>Category:</strong>{" "}
                {book.category_name || book.category}
              </Typography>

              <Typography variant="body1" mb={1}>
                <strong>ISBN:</strong> {book.ISBN || "N/A"}
              </Typography>

              <Typography variant="body1" mb={1}>
                <strong>Status:</strong> {book.status || "N/A"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <InfoIcon color="action" />
              {book.description || "No description available."}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BookDetail;
