package com.devdocs.backend.controller;

import com.devdocs.backend.entity.Document;
import com.devdocs.backend.service.DocumentService;
import com.devdocs.backend.service.OpenRouterService;
import com.devdocs.backend.service.PdfExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "*")
public class PdfController {

    private final DocumentService documentService;
    private final OpenRouterService openRouterService;
    private final PdfExportService pdfExportService;

    public PdfController(DocumentService documentService,
                         OpenRouterService openRouterService,
                         PdfExportService pdfExportService) {

        this.documentService = documentService;
        this.openRouterService = openRouterService;
        this.pdfExportService = pdfExportService;
    }

    // ==========================
    // Download AI Summary PDF
    // ==========================

    @GetMapping("/summary/{id}")
    public ResponseEntity<byte[]> downloadSummary(@PathVariable Long id) {

        Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        String summary = openRouterService.generateSummary(
                document.getExtractedText()
        );

        byte[] pdf = pdfExportService.generatePdf(
                "AI Summary - " + document.getFileName(),
                summary
        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=summary.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // ==========================
    // Download Study Notes PDF
    // ==========================

    @GetMapping("/studynotes/{id}")
    public ResponseEntity<byte[]> downloadStudyNotes(@PathVariable Long id) {

        Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        String notes = openRouterService.generateStudyNotes(
                document.getExtractedText()
        );

        byte[] pdf = pdfExportService.generatePdf(
                "Study Notes - " + document.getFileName(),
                notes
        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=study-notes.pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

}