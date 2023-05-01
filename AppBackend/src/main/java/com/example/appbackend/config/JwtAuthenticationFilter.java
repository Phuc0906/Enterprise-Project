package com.example.appbackend.config;

import com.example.appbackend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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

        System.out.println(request.getContentType() + " - " + request.getServletPath() + " - " + request.getMethod() + " - " + request.getHeader("Origin") + " - " + request.getContentLength());

        Enumeration<String> headerNames = request.getHeaderNames();


        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                String header = headerNames.nextElement();
                System.out.println("Header: " + request.getHeader(header) + " - " + header);
            }
        }


        final String authHeader = request.getHeader("Authorization");
        System.out.println(authHeader);
        final String jwt;
        final String phoneNumber;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            if ((authHeader == null) && (!request.getMethod().equals("OPTIONS"))) {
                response.sendError(400);
            }
            System.out.println("IN here error");
            filterChain.doFilter(request, response);

            return;
        }


        jwt = authHeader.substring(7);
        try {
            phoneNumber = jwtService.extractPhoneNumber(jwt);
        }catch (Exception ex) {
            response.sendError(403);
            filterChain.doFilter(request, response);
            return;
        }


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
        }else {
            response.sendError(403);
        }
        filterChain.doFilter(request, response);
    }
}
