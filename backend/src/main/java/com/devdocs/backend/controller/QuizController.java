package com.devdocs.backend.controller;

import com.devdocs.backend.dto.QuizQuestion;
import com.devdocs.backend.service.DocumentService;
import com.devdocs.backend.service.OpenRouterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final DocumentService documentService;
    private final OpenRouterService openRouterService;

    public QuizController(DocumentService documentService,
                          OpenRouterService openRouterService) {

        this.documentService = documentService;
        this.openRouterService = openRouterService;
    }

    @GetMapping("/{id}")
    public List<QuizQuestion> generateQuiz(@PathVariable Long id) {

        String text = documentService
                .getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"))
                .getExtractedText();

        String response = openRouterService.generateQuiz(text);

        return openRouterService.parseQuiz(response);
    }
}