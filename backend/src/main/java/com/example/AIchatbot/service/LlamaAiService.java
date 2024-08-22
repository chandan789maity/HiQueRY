package com.example.AIchatbot.service;
import com.example.AIchatbot.response.LlamaResponse;


public interface LlamaAiService {
    LlamaResponse generateMessage(String prompt);
    LlamaResponse generateJoke(String topic);
}
    

