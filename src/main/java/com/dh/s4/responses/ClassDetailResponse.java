package com.dh.s4.responses;

import com.dh.s4.models.ClassEntity;
import com.dh.s4.models.StudentEntity;

import java.util.List;

public class ClassDetailResponse {
    private String code;
    private String title;
    private String description;
    private List<StudentEntity> students;

    public ClassDetailResponse(String code, String title, String description, List<StudentEntity> students) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.students = students;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<StudentEntity> getStudents() {
        return students;
    }

    public void setStudents(List<StudentEntity> students) {
        this.students = students;
    }
}
