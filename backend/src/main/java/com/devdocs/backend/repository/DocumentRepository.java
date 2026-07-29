package com.devdocs.backend.repository;

import com.devdocs.backend.dto.RecentDocumentResponse;
import com.devdocs.backend.entity.Document;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    @Query(value = """
        SELECT * FROM documents
        WHERE extracted_text ILIKE CONCAT('%', :keyword, '%')
        """, nativeQuery = true)
    List<Document> searchDocuments(@Param("keyword") String keyword);

    @Query("""
        SELECT new com.devdocs.backend.dto.RecentDocumentResponse(
            d.id,
            d.fileName,
            d.fileType,
            d.fileSize
        )
        FROM Document d
        ORDER BY d.id DESC
        """)
    List<RecentDocumentResponse> getRecentDocuments(Pageable pageable);

}