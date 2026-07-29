package com.devdocs.backend.dto;

public class ProfileResponse {

    private String fullName;
    private String email;
    private String role;
    private long totalDocuments;

    public ProfileResponse() {
    }

    public ProfileResponse(String fullName,
                           String email,
                           String role,
                           long totalDocuments) {

        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.totalDocuments = totalDocuments;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getTotalDocuments() {
        return totalDocuments;
    }

    public void setTotalDocuments(long totalDocuments) {
        this.totalDocuments = totalDocuments;
    }
}