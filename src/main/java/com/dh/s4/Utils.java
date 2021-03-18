package com.dh.s4;

import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Utils {
    public static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static List<String> getFileNamesFromPath(String resourcePath, String fileExtension) {
        List<String> fileNames = new ArrayList<>();

        File folder;
        try {
            folder = ResourceUtils.getFile("classpath:" + resourcePath);
        } catch (IOException ex) {
            return fileNames;
        }

        File[] files = folder.listFiles();

        if (files == null) {
            return fileNames;
        }
        for (File file : files) {
            if (file.isFile() && file.getName().endsWith(fileExtension)) {
                fileNames.add(file.getName());
            }
        }
        return fileNames;
    }
}
