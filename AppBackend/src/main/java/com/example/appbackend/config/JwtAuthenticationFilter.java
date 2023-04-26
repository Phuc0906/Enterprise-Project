package com.example.appbackend.config;

import com.example.appbackend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().contains("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println(request.getContentType());

//        Enumeration<String> headerNames = request.getAttributeNames();
//
//
//        if (headerNames != null) {
//            while (headerNames.hasMoreElements()) {
//                String header = headerNames.nextElement();
//                System.out.println("Attributes: " + request.getHeader(header) + " - " + header);
//            }
//        }


//        BufferedReader reader = request.getReader();
//        StringBuilder sb = new StringBuilder();
//        String line;
//        while ((line = reader.readLine()) != null) {
//            sb.append(line);
//        }
//        String plainTextContent = sb.toString();
//        System.out.println(plainTextContent);

        ContentCachingRequestWrapper wrapper = new ContentCachingRequestWrapper(request);


        final Cookie[] cookies = request.getCookies();
        final String jwt;
        final String phoneNumber;
        if (cookies == null) {
            filterChain.doFilter(request, response);
            return;
        }
        Optional<Cookie> authCookie = Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals("_auth"))
                .findFirst();
        if (!authCookie.isPresent() || authCookie.get().getValue() == null) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authCookie.get().getValue();
        phoneNumber = jwtService.extractPhoneNumber(jwt);

        if (phoneNumber != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails =userDetailsService.loadUserByUsername(phoneNumber);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
