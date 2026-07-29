package com.devdocs.backend.service;

import com.devdocs.backend.entity.ChatHistory;
import com.devdocs.backend.repository.ChatHistoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatHistoryService {

    private final ChatHistoryRepository repository;

    public ChatHistoryService(ChatHistoryRepository repository) {
        this.repository = repository;
    }

    // Save chat
    public void saveChat(String email, String question, String answer) {

        ChatHistory chat = new ChatHistory();

        chat.setEmail(email);
        chat.setQuestion(question);
        chat.setAnswer(answer);
        chat.setCreatedAt(LocalDateTime.now());

        repository.save(chat);

    }

    // Get chat history
    public List<ChatHistory> getHistory(String email) {

        return repository.findByEmailOrderByCreatedAtAsc(email);

    }

}