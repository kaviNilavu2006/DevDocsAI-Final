package com.devdocs.backend.controller;

import com.devdocs.backend.dto.DashboardResponse;
import com.devdocs.backend.dto.RecentDocumentResponse;
import com.devdocs.backend.service.DocumentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DocumentService documentService;

    public DashboardController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public DashboardResponse getDashboard() {

        long documents = documentService.getTotalDocuments();

        // Temporary values (we'll improve these later)
        long summaries = documents;
        long interviews = documents;
        long chats = 0;

        List<RecentDocumentResponse> recentDocuments =
                documentService.getRecentDocuments();

        return new DashboardResponse(
                documents,
                summaries,
                interviews,
                chats,
                recentDocuments
        );
    }

}