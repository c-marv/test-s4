package com.dh.s4;

import java.util.UUID;

public class Utils {
    public static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
