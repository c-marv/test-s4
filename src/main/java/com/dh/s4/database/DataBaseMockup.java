package com.dh.s4.database;

import com.dh.s4.Utils;
import com.dh.s4.models.ClassEntity;
import com.dh.s4.models.ClassStudentEntity;
import com.dh.s4.models.StudentEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class DataBaseMockup {
    private static DataBaseMockup instance = null;

    private final List<StudentEntity> students;
    private final List<ClassEntity> classes;
    private final List<ClassStudentEntity> classesStudents;

    public static DataBaseMockup getInstance() {
        if (instance == null) {
            instance = new DataBaseMockup();
        }
        return instance;
    }

    public DataBaseMockup() {
        this.students = new ArrayList<>();
        this.students.add(new StudentEntity(Utils.generateUUID(), "Villanueva", "Carlos"));
        this.students.add(new StudentEntity(Utils.generateUUID(), "Gonzales", "Maria"));
        this.classes = new ArrayList<>();
        this.classes.add(new ClassEntity("ALG-01", "Algebra 1", "Algebra I description"));
        this.classes.add(new ClassEntity("ALG-02", "Algebra 2", "Algebra II description"));
        this.classes.add(new ClassEntity("CAL-01", "Calculus", "Calculus description"));
        this.classesStudents = new ArrayList<>();
        this.classesStudents.add(new ClassStudentEntity(this.students.get(0).getId(), "ALG-01"));
        this.classesStudents.add(new ClassStudentEntity(this.students.get(0).getId(), "CAL-01"));
        this.classesStudents.add(new ClassStudentEntity(this.students.get(1).getId(), "CAL-01"));
    }

    public List<StudentEntity> getStudents() {
        return students;
    }

    public List<ClassEntity> getClasses() {
        return classes;
    }

    public List<ClassStudentEntity> getClassesStudents() {
        return classesStudents;
    }

    public StudentEntity getStudentById(String studentId) {
        return this.students.stream().filter(studentEntity -> studentEntity.getId().equals(studentId)).findAny().orElse(null);
    }

    public ClassEntity getClassByCode(String classCode) {
        return this.classes.stream().filter(classEntity -> classEntity.getCode().equals(classCode)).findAny().orElse(null);
    }

    public boolean studentIsAssignedToClass(String studentId, String classCode) {
        return this.classesStudents.stream().
                filter(classStudentEntity -> classStudentEntity.getStudentId().equals(studentId) && classStudentEntity.getClassCode().equals(classCode))
                .findAny().orElse(null) != null;
    }

    public List<ClassEntity> getClassesByStudentId(String studentId) {
        Set<String> classCodes = DataBaseMockup.getInstance().getClassesStudents().stream()
                .filter(classStudentEntity -> classStudentEntity.getStudentId().equals(studentId))
                .map(ClassStudentEntity::getClassCode)
                .collect(Collectors.toSet());
        return DataBaseMockup.getInstance().getClasses().stream()
                .filter(classEntity -> classCodes.contains(classEntity.getCode()))
                .collect(Collectors.toList());
    }

    public List<StudentEntity> getStudentsByClassCode(String classCode) {
        Set<String> studentIds = DataBaseMockup.getInstance().getClassesStudents().stream()
                .filter(classStudentEntity -> classStudentEntity.getClassCode().equals(classCode))
                .map(ClassStudentEntity::getStudentId)
                .collect(Collectors.toSet());
        return DataBaseMockup.getInstance().getStudents().stream()
                .filter(studentEntity -> studentIds.contains(studentEntity.getId()))
                .collect(Collectors.toList());
    }
}
