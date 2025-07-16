"use client";

import React, { useState, useCallback } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Card,
  CardContent,
  CardActions,
  Alert,
  Fade,
  LinearProgress,
} from "@mui/material";
import { createWorker } from "tesseract.js";
import { summarizeText } from "../components/summarize"; // Adjust path if needed
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { ButtonProps } from "@mui/material";

// ✅ Styled Components

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : 16,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : 16,
  padding: theme.spacing(1.5),
  textTransform: "none",
  fontWeight: 600,
  transition: "background-color 0.3s, transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

interface DropZoneProps {
  isDragActive: boolean;
}

const DropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragActive",
})<DropZoneProps>(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[400]}`,
  borderRadius:
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : 16,
  padding: theme.spacing(4),
  textAlign: "center",
  background: isDragActive ? theme.palette.primary.light : theme.palette.background.default,
  transition: "border-color 0.3s, background-color 0.3s",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setText("");
      setSummary("");
      setErrorMsg("");
      setSuccessMsg("");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setText("");
        setSummary("");
        setErrorMsg("");
        setSuccessMsg("");
      } else {
        setErrorMsg("❌ Please upload an image file.");
      }
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleOCR = async () => {
    if (!image) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const worker = await createWorker("eng", 1, {
        logger: (m) => console.log(m),
      });

      const {
        data: { text },
      } = await worker.recognize(image);
      setText(text);
      setSuccessMsg("✅ Text extracted successfully!");
      await worker.terminate();
    } catch (err) {
      console.error("OCR error:", err);
      setText("");
      setErrorMsg("❌ Failed to extract text.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const result = await summarizeText(text);
      setSummary(result);
      setSuccessMsg("✅ Text summarized successfully!");
    } catch (err) {
      console.error("Summarization error:", err);
      setErrorMsg("❌ Failed to summarize text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 8,
        px: { xs: 2, sm: 3 },
        py: 4,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      <Fade in timeout={600}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{ color: "#1a237e", mb: 4 }}
        >
          Image-to-Text OCR
        </Typography>
      </Fade>

      <Fade in timeout={800}>
        <StyledCard sx={{ mb: 4 }}>
          <CardContent>
            <DropZone
              isDragActive={isDragActive}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              role="region"
              aria-label="Image upload drop zone"
            >
              <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {isDragActive ? "Drop your image here" : "Drag & Drop or Click to Upload"}
              </Typography>
              <StyledButton variant="outlined" component="label" sx={{ mt: 2 }}>
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                  aria-label="Upload image"
                />
              </StyledButton>
            </DropZone>

            {imagePreview && (
              <Box mt={3} sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Preview:
                </Typography>
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
            )}
          </CardContent>

          <CardActions>
            <StyledButton
              fullWidth
              onClick={handleOCR}
              variant="contained"
              color="primary"
              disabled={!image || loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Extracting..." : "Extract Text from Image"}
            </StyledButton>
          </CardActions>
          {loading && <LinearProgress sx={{ mt: 1 }} />}
        </StyledCard>
      </Fade>

      {text && (
        <Fade in timeout={800}>
          <StyledCard sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Extracted Text
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={6}
                value={text}
                variant="outlined"
                margin="normal"
                InputProps={{ readOnly: true }}
                sx={{ background: "#fff", borderRadius: 2 }}
                aria-label="Extracted text"
              />
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={handleSummarize}
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ mt: 2 }}
              >
                {loading ? "Summarizing..." : "Summarize Text"}
              </StyledButton>
            </CardContent>
            {loading && <LinearProgress sx={{ mt: 1 }} />}
          </StyledCard>
        </Fade>
      )}

      {summary && (
        <Fade in timeout={800}>
          <StyledCard sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Summary
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={4}
                value={summary}
                variant="outlined"
                margin="normal"
                InputProps={{ readOnly: true }}
                sx={{ background: "#fff", borderRadius: 2 }}
                aria-label="Summarized text"
              />
            </CardContent>
          </StyledCard>
        </Fade>
      )}

      {successMsg && (
        <Fade in timeout={800}>
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMsg}
          </Alert>
        </Fade>
      )}
      {errorMsg && (
        <Fade in timeout={800}>
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        </Fade>
      )}
    </Box>
  );
};

export default UploadForm;
