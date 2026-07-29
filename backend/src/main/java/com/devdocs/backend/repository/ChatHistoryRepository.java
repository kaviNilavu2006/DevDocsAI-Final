package com.devdocs.backend.repository;

import com.devdocs.backend.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findByEmailOrderByCreatedAtAsc(String email);

}