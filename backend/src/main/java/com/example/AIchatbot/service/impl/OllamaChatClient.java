package com.example.AIchatbot.service.impl;

import com.example.AIchatbot.service.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component("customOllamaChatClient")
public class OllamaChatClient implements ChatClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String model;

    public OllamaChatClient(RestTemplate restTemplate, @Value("${spring.ai.ollama.base-url}") String baseUrl, @Value("${spring.ai.ollama.model}") String model) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
        this.model = model;
    }

    @Override
    public String generate(String prompt) {
        String url = String.format("%s/generate", baseUrl);
        Map<String, Object> request = new HashMap<>();
        request.put("model", model);
        request.put("prompt", prompt);
        request.put("stream", false);

        try {
            // Print the URL and request payload for debugging
            System.out.println("URL: " + url);
            System.out.println("Request: " + request);

            return restTemplate.postForObject(url, request, String.class);
        } catch (HttpClientErrorException e) {
            // Log the error details
            System.err.println("Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw e;
        }
    }
}
