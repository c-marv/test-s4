package com.dh.s4;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Utils {
    public static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static List<String> getFileNamesFromPath(String path, String fileExtension) {
        String projectRoot = System.getProperty("user.dir");
        File folder = new File(projectRoot + path);
        File[] files = folder.listFiles();
        List<String> fileNames = new ArrayList<>();
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
