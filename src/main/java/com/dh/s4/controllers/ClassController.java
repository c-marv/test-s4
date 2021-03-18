package com.dh.s4.controllers;

import com.dh.s4.database.DataBaseMockup;
import com.dh.s4.models.ClassEntity;
import com.dh.s4.models.StudentEntity;
import com.dh.s4.requests.ClassRequest;
import com.dh.s4.responses.ClassDetailResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RestController
@RequestMapping("/classes")
public class ClassController {
    @GetMapping
    public ResponseEntity<List<ClassEntity>> list(@RequestParam(value = "query", defaultValue = "") String query) {
        if (query.isEmpty()) {
            return ResponseEntity.ok(DataBaseMockup.getInstance().getClasses());
        }
        List<ClassEntity> classEntities = DataBaseMockup.getInstance().getClasses().stream()
                .filter(classEntity ->
                        classEntity.getCode().equals(query) ||
                        classEntity.getTitle().startsWith(query) ||
                        classEntity.getDescription().startsWith(query))
                .collect(Collectors.toList());
        return ResponseEntity.ok(classEntities);
    }

    @PostMapping
    public ResponseEntity<ClassEntity> create(@RequestBody ClassRequest classRequest) {
        ClassEntity classEntity = DataBaseMockup.getInstance().getClassByCode(classRequest.getCode());
        if (classEntity != null) {
            return ResponseEntity.badRequest().build();
        }
        classEntity = new ClassEntity(classRequest.getCode(), classRequest.getTitle(), classRequest.getDescription());
        DataBaseMockup.getInstance().getClasses().add(classEntity);
        return ResponseEntity.ok(classEntity);
    }

    @GetMapping("/{classCode}")
    public ResponseEntity<ClassDetailResponse> get(@PathVariable String classCode) {
        ClassEntity classEntity = DataBaseMockup.getInstance().getClassByCode(classCode);
        if (classEntity == null) {
            return ResponseEntity.notFound().build();
        }

        List<StudentEntity> studentEntityList = DataBaseMockup.getInstance().getStudentsByClassCode(classEntity.getCode());

        return ResponseEntity.ok(new ClassDetailResponse(classEntity.getCode(), classEntity.getTitle(), classEntity.getDescription(), studentEntityList));
    }

    @PutMapping("/{classCode}")
    public ResponseEntity<ClassEntity> update(@RequestBody ClassRequest classRequest, @PathVariable String classCode) {
        ClassEntity classEntity = DataBaseMockup.getInstance().getClassByCode(classCode);
        if (classEntity == null) {
            return ResponseEntity.notFound().build();
        }

        classEntity.setTitle(classRequest.getTitle());
        classEntity.setDescription(classRequest.getDescription());

        return ResponseEntity.ok(classEntity);
    }

    @DeleteMapping("/{classCode}")
    public  ResponseEntity<String> delete(@PathVariable String classCode) {
        ClassEntity classEntity = DataBaseMockup.getInstance().getClassByCode(classCode);
        if (classEntity == null) {
            return ResponseEntity.notFound().build();
        }
        DataBaseMockup.getInstance().getClasses().remove(classEntity);
        DataBaseMockup.getInstance().getClassesStudents().removeIf(classStudentEntity -> classStudentEntity.getClassCode().equals(classEntity.getCode()));
        return ResponseEntity.ok(classEntity.getCode());
    }
}
