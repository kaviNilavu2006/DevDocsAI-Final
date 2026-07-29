package com.devdocs.backend.service;

import com.devdocs.backend.dto.QuizQuestion;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class OpenRouterService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.api.url}")
    private String apiUrl;

    @Value("${openrouter.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper mapper = new ObjectMapper();

    // ============================
    // Common AI Method
    // ============================

    public String chatWithAI(String prompt) {

        try {

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(apiKey);

            headers.set("HTTP-Referer", "http://localhost:5173");

            headers.set("X-OpenRouter-Title", "DevDocsAI");

            Map<String, Object> requestBody = Map.of(

                    "model", model,

                    "messages", List.of(

                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )

                    ),

                    // Prevent huge responses
                    "max_tokens", 500

            );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(

                            apiUrl,

                            HttpMethod.POST,

                            entity,

                            String.class

                    );

            JsonNode root = mapper.readTree(response.getBody());

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        }

        catch (Exception e) {

            e.printStackTrace();

            return "AI Error : " + e.getMessage();

        }

    }

    // ============================
    // Limit document size
    // ============================

    private String limitText(String text) {

        if (text == null) {

            return "";

        }

        return text.substring(

                0,

                Math.min(text.length(), 4000)

        );

    }

    // ============================
    // Summary
    // ============================

    public String generateSummary(String text) {

        String prompt = """
Generate a concise summary.

Use bullet points.

Document:

""" + limitText(text);

        return chatWithAI(prompt);

    }

    // ============================
    // Study Notes
    // ============================

    public String generateStudyNotes(String text) {

        String prompt = """
Create detailed study notes.

Rules:

- Headings

- Bullet points

- Easy explanation

- Important concepts

Document:

""" + limitText(text);

        return chatWithAI(prompt);

    }

    // ============================
    // Flashcards
    // ============================

    public String generateFlashcards(String text) {

        String prompt = """
Generate flashcards.

Format:

Q: Question

A: Answer

Generate 15 flashcards.

Document:

""" + limitText(text);

        return chatWithAI(prompt);

    }

    // ============================
    // Interview Questions
    // ============================

    public String generateInterviewQuestions(String text) {

        String prompt = """
Generate 15 interview questions with answers.

Format:

Q:

A:

Document:

""" + limitText(text);

        return chatWithAI(prompt);

    }

    // ============================
    // Quiz
    // ============================

    public String generateQuiz(String text) {

        String prompt = """
Generate exactly 10 MCQs.

Return ONLY JSON.

Example:

[
  {
    "question":"What is Java?",
    "optionA":"Language",
    "optionB":"Browser",
    "optionC":"Database",
    "optionD":"OS",
    "answer":"A"
  }
]

Document:

""" + limitText(text);

        return chatWithAI(prompt);

    }

    // ============================
    // Parse Quiz JSON
    // ============================

    public List<QuizQuestion> parseQuiz(String response) {

        try {

            response = response
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            return mapper.readValue(

                    response,

                    new TypeReference<List<QuizQuestion>>() {
                    }

            );

        }

        catch (Exception e) {

            throw new RuntimeException(

                    "Unable to parse AI Quiz JSON",

                    e

            );

        }

    }

}