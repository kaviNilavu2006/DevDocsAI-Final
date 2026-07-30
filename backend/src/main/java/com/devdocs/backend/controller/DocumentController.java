package com.devdocs.backend.controller;

import com.devdocs.backend.entity.Document;
import com.devdocs.backend.service.DocumentService;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // Upload PDF
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Selected PDF file is empty!"));
        }

        try {
            File folder = new File(uploadDir).getAbsoluteFile();

            if (!folder.exists()) {
                folder.mkdirs();
            }

            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isBlank()) {
                originalFilename = "uploaded_" + System.currentTimeMillis() + ".pdf";
            }

            File destinationFile = new File(folder, originalFilename).getAbsoluteFile();

            Files.copy(
                file.getInputStream(),
                destinationFile.toPath(),
                StandardCopyOption.REPLACE_EXISTING
            );

            String extractedText = "";

            try (PDDocument pdfDocument = Loader.loadPDF(destinationFile)) {
                PDFTextStripper stripper = new PDFTextStripper();
                extractedText = stripper.getText(pdfDocument);
            } catch (Exception e) {
                System.err.println("Text extraction warning: " + e.getMessage());
                extractedText = "Text extraction unavailable or PDF is scanned/encrypted.";
            }

            Document document = new Document();

            document.setFileName(originalFilename);
            document.setFileType(file.getContentType() != null ? file.getContentType() : "application/pdf");
            document.setFileSize(file.getSize());
            document.setFilePath(destinationFile.getAbsolutePath());
            document.setExtractedText(extractedText);

            documentService.saveDocument(document);

            return ResponseEntity.ok(Map.of("message", "PDF Uploaded Successfully!", "id", document.getId()));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Upload failed: " + e.getMessage()));
        }
    }

    // Get all documents
    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    // Search documents
    @GetMapping("/search")
    public List<Document> searchDocuments(@RequestParam String keyword) {
        return documentService.searchDocuments(keyword);
    }

    // Get document by ID
    @GetMapping("/{id}")
    public Document getDocument(@PathVariable Long id) {

        return documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

    }

    // View PDF
    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewDocument(@PathVariable Long id) {

        Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        File file = new File(document.getFilePath());

        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + document.getFileName() + "\""
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    // Delete document
    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable Long id) {

        documentService.deleteDocument(id);

        return "Document deleted successfully.";

    }

}