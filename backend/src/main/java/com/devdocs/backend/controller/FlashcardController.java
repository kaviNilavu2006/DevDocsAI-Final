package com.devdocs.backend.controller;

import com.devdocs.backend.entity.Document;
import com.devdocs.backend.service.DocumentService;
import com.devdocs.backend.service.OpenRouterService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flashcards")
@CrossOrigin(origins = "http://localhost:5173")
public class FlashcardController {

    private final DocumentService documentService;
    private final OpenRouterService openRouterService;

    public FlashcardController(DocumentService documentService,
                               OpenRouterService openRouterService) {

        this.documentService = documentService;
        this.openRouterService = openRouterService;
    }

    @GetMapping("/{id}")
    public String generateFlashcards(@PathVariable Long id) {

        Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        return openRouterService.generateFlashcards(document.getExtractedText());

    }

}
