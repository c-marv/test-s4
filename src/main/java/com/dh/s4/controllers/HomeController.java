package com.dh.s4.controllers;

import com.dh.s4.Utils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String home(ModelMap model) {
        model.addAttribute("title", "Digital Harbor - S4");
        List<String> cssFiles = Utils.getFileNamesFromPath("static/static/css", ".css");
        List<String> jsFiles = Utils.getFileNamesFromPath("static/static/js", ".js");

        model.addAttribute("cssFiles", cssFiles);
        model.addAttribute("jsFiles", jsFiles);
        return "home";
    }
}
