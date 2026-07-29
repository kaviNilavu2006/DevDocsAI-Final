package com.devdocs.backend.service;

import com.devdocs.backend.dto.RecentDocumentResponse;
import com.devdocs.backend.entity.Document;
import com.devdocs.backend.repository.DocumentRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    // ==========================
    // Save Document
    // ==========================
    public Document saveDocument(Document document) {
        return documentRepository.save(document);
    }

    // ==========================
    // Get All Documents
    // ==========================
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    // ==========================
    // Search Documents
    // ==========================
    public List<Document> searchDocuments(String keyword) {
        return documentRepository.searchDocuments(keyword);
    }

    // ==========================
    // Get Document By ID
    // ==========================
    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    // ==========================
    // Delete Document
    // ==========================
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }

    // ==========================
    // Total Documents
    // ==========================
    public long getTotalDocuments() {
        return documentRepository.count();
    }

    // ==========================
    // Recent Documents
    // ==========================
    public List<RecentDocumentResponse> getRecentDocuments() {
        return documentRepository.getRecentDocuments(PageRequest.of(0, 5));
    }
}