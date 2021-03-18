package com.dh.s4.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String home(ModelMap model) {
        model.addAttribute("message", "Message");
        return "home";
    }
}
