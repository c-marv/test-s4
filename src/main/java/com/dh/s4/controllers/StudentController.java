package com.dh.s4.controllers;

import com.dh.s4.Utils;
import com.dh.s4.database.DataBaseMockup;
import com.dh.s4.models.ClassEntity;
import com.dh.s4.models.ClassStudentEntity;
import com.dh.s4.models.StudentEntity;
import com.dh.s4.requests.StudentRequest;
import com.dh.s4.responses.StudentDetailResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RestController
@RequestMapping("/students")
public class StudentController {
    @GetMapping("")
    public ResponseEntity<List<StudentEntity>> list(@RequestParam(value = "query", defaultValue = "") String query) {
        if (query.isEmpty()) {
            return ResponseEntity.ok(DataBaseMockup.getInstance().getStudents());
        }
        List<StudentEntity> studentEntities = DataBaseMockup.getInstance().getStudents().stream()
                .filter(studentEntity ->
                        studentEntity.getFirstName().toLowerCase().startsWith(query) ||
                        studentEntity.getLastName().toLowerCase().startsWith(query))
                .collect(Collectors.toList());
        return ResponseEntity.ok(studentEntities);
    }

    @PostMapping("")
    public ResponseEntity<StudentEntity> create(@RequestBody StudentRequest studentRequest) {
        StudentEntity student = new StudentEntity(Utils.generateUUID(), studentRequest.getLastName(), studentRequest.getFirstName());
        DataBaseMockup.getInstance().getStudents().add(student);
        return ResponseEntity.ok(student);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentDetailResponse> get(@PathVariable String studentId) {
        StudentEntity studentEntity = DataBaseMockup.getInstance().getStudentById(studentId);
        if (studentEntity == null) {
            return ResponseEntity.notFound().build();
        }

        List<ClassEntity> classEntityList = DataBaseMockup.getInstance().getClassesByStudentId(studentEntity.getId());

        return ResponseEntity.ok(new StudentDetailResponse(studentEntity.getId(), studentEntity.getFirstName(), studentEntity.getLastName(), classEntityList));
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<StudentEntity> update(@RequestBody StudentRequest studentRequest, @PathVariable String studentId) {
        StudentEntity studentEntity = DataBaseMockup.getInstance().getStudentById(studentId);
        if (studentEntity == null) {
            return ResponseEntity.notFound().build();
        }
        studentEntity.setFirstName(studentRequest.getFirstName());
        studentEntity.setLastName(studentRequest.getLastName());
        return ResponseEntity.ok(studentEntity);
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<String> delete(@PathVariable String studentId) {
        StudentEntity studentEntity = DataBaseMockup.getInstance().getStudentById(studentId);
        if (studentEntity == null) {
            return ResponseEntity.notFound().build();
        }
        DataBaseMockup.getInstance().getStudents().remove(studentEntity);
        DataBaseMockup.getInstance().getClassesStudents().removeIf(classStudentEntity -> classStudentEntity.getStudentId().equals(studentEntity.getId()));
        return ResponseEntity.ok(studentEntity.getId());
    }

    @PatchMapping("/{studentId}/assign-to-class/{classCode}")
    public ResponseEntity<ClassEntity> assignToClass(@PathVariable String studentId, @PathVariable String classCode) {
        StudentEntity studentEntity = DataBaseMockup.getInstance().getStudentById(studentId);
        if (studentEntity == null) {
            return ResponseEntity.notFound().build();
        }
        ClassEntity classEntity = DataBaseMockup.getInstance().getClassByCode(classCode);
        if (classEntity == null) {
            return ResponseEntity.notFound().build();
        }
        if (DataBaseMockup.getInstance().studentIsAssignedToClass(studentId, classCode)) {
            return ResponseEntity.badRequest().build();
        }
        DataBaseMockup.getInstance().getClassesStudents().add(new ClassStudentEntity(
                studentEntity.getId(),
                classEntity.getCode()
        ));
        return ResponseEntity.ok(classEntity);
    }
}
