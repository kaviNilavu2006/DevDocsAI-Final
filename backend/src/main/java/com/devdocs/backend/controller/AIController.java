package com.devdocs.backend.controller;

import com.devdocs.backend.entity.Document;
import com.devdocs.backend.repository.DocumentRepository;
import com.devdocs.backend.service.OpenRouterService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final OpenRouterService openRouterService;
    private final DocumentRepository documentRepository;

    public AIController(OpenRouterService openRouterService,
                        DocumentRepository documentRepository) {
        this.openRouterService = openRouterService;
        this.documentRepository = documentRepository;
    }

    // Test API
    @GetMapping("/test")
    public String test() {
        return "AI Controller Working";
    }

    // Test POST API
    @PostMapping("/hello")
    public String hello() {
        return "POST Working";
    }

    // Generate AI Summary
    @PostMapping("/summary/{id}")
    public String generateSummary(@PathVariable Long id) {

        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        String summary = openRouterService.generateSummary(document.getExtractedText());

        document.setSummary(summary);

        documentRepository.save(document);

        return summary;
    }
}