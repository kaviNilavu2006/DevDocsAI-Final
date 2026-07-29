package com.devdocs.backend.dto;

public class RecentDocumentResponse {

    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;

    public RecentDocumentResponse() {
    }

    public RecentDocumentResponse(Long id,
                                  String fileName,
                                  String fileType,
                                  Long fileSize) {

        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
}