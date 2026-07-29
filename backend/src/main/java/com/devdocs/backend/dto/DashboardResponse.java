package com.devdocs.backend.dto;

import java.util.List;

public class DashboardResponse {

    private long totalDocuments;
    private long totalSummaries;
    private long totalInterviews;
    private long totalChats;

    private List<RecentDocumentResponse> recentDocuments;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalDocuments,
                             long totalSummaries,
                             long totalInterviews,
                             long totalChats,
                             List<RecentDocumentResponse> recentDocuments) {

        this.totalDocuments = totalDocuments;
        this.totalSummaries = totalSummaries;
        this.totalInterviews = totalInterviews;
        this.totalChats = totalChats;
        this.recentDocuments = recentDocuments;
    }

    public long getTotalDocuments() {
        return totalDocuments;
    }

    public void setTotalDocuments(long totalDocuments) {
        this.totalDocuments = totalDocuments;
    }

    public long getTotalSummaries() {
        return totalSummaries;
    }

    public void setTotalSummaries(long totalSummaries) {
        this.totalSummaries = totalSummaries;
    }

    public long getTotalInterviews() {
        return totalInterviews;
    }

    public void setTotalInterviews(long totalInterviews) {
        this.totalInterviews = totalInterviews;
    }

    public long getTotalChats() {
        return totalChats;
    }

    public void setTotalChats(long totalChats) {
        this.totalChats = totalChats;
    }

    public List<RecentDocumentResponse> getRecentDocuments() {
        return recentDocuments;
    }

    public void setRecentDocuments(List<RecentDocumentResponse> recentDocuments) {
        this.recentDocuments = recentDocuments;
    }
}