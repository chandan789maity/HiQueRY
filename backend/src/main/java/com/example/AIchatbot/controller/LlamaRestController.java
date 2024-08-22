package com.example.AIchatbot.controller;

import com.example.AIchatbot.response.LlamaResponse;
import com.example.AIchatbot.service.LlamaAiService;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")  // Allow all origins
public class LlamaRestController {

    @Autowired
    private LlamaAiService llamaAiService;

    @GetMapping("api/v1/ai/generate")
    public ResponseEntity<LlamaResponse> generate(
            @RequestParam(value = "promptMessage", defaultValue = "Why is the sky blue?")
            String promptMessage) {
        final LlamaResponse aiResponse = llamaAiService.generateMessage(promptMessage);
        return ResponseEntity.status(HttpStatus.OK).body(aiResponse);
    }

    @GetMapping("api/v1/ai/generate/joke")
public ResponseEntity<LlamaResponse> generateJoke() {
    List<String> topics = Arrays.asList("technology", "animals", "sports", "science", "movies", "food");
    Random random = new Random();
    String randomTopic = topics.get(random.nextInt(topics.size()));

    final LlamaResponse aiResponse = llamaAiService.generateJoke(randomTopic);
    return ResponseEntity.status(HttpStatus.OK).body(aiResponse);
}
}
