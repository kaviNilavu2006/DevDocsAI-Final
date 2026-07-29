package com.devdocs.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "mySuperSecretKeyForDevDocsAIProject2026SpringBootJWTAuthentication123456";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes(StandardCharsets.UTF_8)
            );

    // Generate JWT Token
    public String generateToken(String email) {

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(new Date())

                .setExpiration(new Date(System.currentTimeMillis() + 86400000))

                .signWith(key, SignatureAlgorithm.HS256)

                .compact();

    }

    // Extract Email
    public String extractEmail(String token) {

        return extractClaim(token, Claims::getSubject);

    }

    // Extract Expiration
    public Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);

    }

    // Generic Claim Extractor
    public <T> T extractClaim(String token,
                              Function<Claims, T> resolver) {

        Claims claims = extractAllClaims(token);

        return resolver.apply(claims);

    }

    // Read Claims
    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()

                .setSigningKey(key)

                .build()

                .parseClaimsJws(token)

                .getBody();

    }

    // Expiration Check
    private boolean isExpired(String token) {

        return extractExpiration(token)

                .before(new Date());

    }

    // Token Validation
    public boolean validateToken(String token,
                                 String email) {

        return extractEmail(token).equals(email)

                && !isExpired(token);

    }

}