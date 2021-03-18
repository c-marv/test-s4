package com.dh.s4.responses;

import com.dh.s4.models.ClassEntity;

import java.util.List;

public class StudentDetailResponse {
    private String id;
    private String firstName;
    private String lastName;
    private List<ClassEntity> classes;

    public StudentDetailResponse(String id, String firstName, String lastName, List<ClassEntity> classes) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.classes = classes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<ClassEntity> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassEntity> classes) {
        this.classes = classes;
    }
}
