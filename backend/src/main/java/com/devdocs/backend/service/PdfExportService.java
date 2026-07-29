package com.devdocs.backend.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfExportService {

    public byte[] generatePdf(String title, String content) {

        try {

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Document document = new Document();

            PdfWriter.getInstance(document, outputStream);

            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);

            Font bodyFont = new Font(Font.FontFamily.HELVETICA, 12);

            document.add(new Paragraph(title, titleFont));

            document.add(new Paragraph(" "));

            document.add(new Paragraph(content, bodyFont));

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException("Failed to generate PDF", e);

        }

    }

}