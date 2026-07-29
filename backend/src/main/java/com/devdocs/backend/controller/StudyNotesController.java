package com.devdocs.backend.controller;

import com.devdocs.backend.entity.Document;
import com.devdocs.backend.service.DocumentService;
import com.devdocs.backend.service.OpenRouterService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/studynotes")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyNotesController {

    private final DocumentService documentService;
    private final OpenRouterService openRouterService;

    public StudyNotesController(DocumentService documentService,
                                OpenRouterService openRouterService) {

        this.documentService = documentService;
        this.openRouterService = openRouterService;
    }

    @GetMapping("/{id}")
    public String generateStudyNotes(@PathVariable Long id) {

        Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        return openRouterService.generateStudyNotes(document.getExtractedText());

    }

}