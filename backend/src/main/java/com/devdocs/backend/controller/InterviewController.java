package com.devdocs.backend.controller;

import com.devdocs.backend.entity.Document;
import com.devdocs.backend.repository.DocumentRepository;
import com.devdocs.backend.service.OpenRouterService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
@CrossOrigin(origins = "*")
public class InterviewController {

    private final OpenRouterService openRouterService;
    private final DocumentRepository documentRepository;

    public InterviewController(OpenRouterService openRouterService,
                               DocumentRepository documentRepository) {
        this.openRouterService = openRouterService;
        this.documentRepository = documentRepository;
    }

    @PostMapping("/{id}")
    public String generateInterviewQuestions(@PathVariable Long id) {

        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        return openRouterService.generateInterviewQuestions(
                document.getExtractedText()
        );
    }
}