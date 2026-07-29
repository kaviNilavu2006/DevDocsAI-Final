package com.devdocs.backend.controller;

import com.devdocs.backend.dto.ChatRequest;
import com.devdocs.backend.dto.ChatResponse;
import com.devdocs.backend.service.ChatHistoryService;
import com.devdocs.backend.service.OpenRouterService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final OpenRouterService openRouterService;
    private final ChatHistoryService chatHistoryService;

    public ChatController(OpenRouterService openRouterService,
                          ChatHistoryService chatHistoryService) {

        this.openRouterService = openRouterService;
        this.chatHistoryService = chatHistoryService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        // Ask AI
        String aiReply = openRouterService.chatWithAI(request.getMessage());

        // Save to database
        chatHistoryService.saveChat(
                request.getEmail(),
                request.getMessage(),
                aiReply
        );

        return new ChatResponse(aiReply);
    }
    @GetMapping("/history/{email}")
    public Object getHistory(@PathVariable String email) {

        return chatHistoryService.getHistory(email);

    }
}