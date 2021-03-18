package com.dh.s4.models;

public class ClassStudentEntity {
    private String studentId;
    private String classCode;

    public ClassStudentEntity(String studentId, String classCode) {
        this.studentId = studentId;
        this.classCode = classCode;
    }

    public String getStudentId() {
        return studentId;
    }

    public String getClassCode() {
        return classCode;
    }
}
