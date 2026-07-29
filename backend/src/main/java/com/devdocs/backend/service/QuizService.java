package com.devdocs.backend.service;

import com.devdocs.backend.dto.QuizQuestion;
import com.devdocs.backend.entity.Document;
import com.devdocs.backend.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

    private final DocumentRepository repository;
    private final OpenRouterService openRouterService;

    public QuizService(DocumentRepository repository,
                       OpenRouterService openRouterService) {

        this.repository = repository;
        this.openRouterService = openRouterService;

    }

    public List<QuizQuestion> generateQuiz(Long id) {

        Document document = repository.findById(id)
                .orElseThrow();

        String prompt = """
Generate exactly 10 MCQs from the following text.

Return ONLY JSON.

Example:

[
{
"question":"...",
"optionA":"...",
"optionB":"...",
"optionC":"...",
"optionD":"...",
"answer":"A"
}
]

TEXT:

""" + document.getExtractedText();

        String response = openRouterService.chatWithAI(prompt);

        return openRouterService.parseQuiz(response);

    }

}