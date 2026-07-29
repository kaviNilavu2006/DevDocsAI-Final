package com.devdocs.backend.service;

import com.devdocs.backend.model.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatMemoryService {

    // Stores chat history for each user
    private final Map<String, List<ChatMessage>> conversations = new HashMap<>();

    // Get chat history
    public List<ChatMessage> getConversation(String email) {

        return conversations.computeIfAbsent(
                email,
                k -> new ArrayList<>()
        );

    }

    // Add user message
    public void addUserMessage(String email, String message) {

        getConversation(email)
                .add(new ChatMessage("user", message));

    }

    // Add AI response
    public void addAssistantMessage(String email, String message) {

        getConversation(email)
                .add(new ChatMessage("assistant", message));

    }

    // Clear conversation
    public void clearConversation(String email) {

        conversations.remove(email);

    }

}
