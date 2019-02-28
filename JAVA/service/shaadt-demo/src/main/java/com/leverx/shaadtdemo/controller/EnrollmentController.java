package com.leverx.shaadtdemo.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.shaadtdemo.domain.Enrollment;
import com.leverx.shaadtdemo.service.EnrollmentService;

@RestController
public class EnrollmentController {
	@Autowired
	private EnrollmentService enrollmentService;

	@GetMapping(value = "/enrollment")
	public List<Enrollment> getAllEnrollments() {
		return enrollmentService.getEnrollmentAll();
	}

	@GetMapping(value = "/enrollment/{id}")
	public Enrollment getEnrollment(@PathVariable Long id) {
		return enrollmentService.getEnrollment(id);
	}

	@PostMapping(value = "/enrollment")
	public void createEnrollment(@RequestBody Enrollment enr) throws SQLException {
		enrollmentService.createEnrollment(enr);
	}

	@DeleteMapping(value = "/enrollment/{id}")
	public void deleteEnrollment(@PathVariable Long id) {
		enrollmentService.deleteEnrollment(id);
	}

	@PutMapping(value = "/enrollment")
	public void updateEnrollment(@RequestBody Enrollment enr) {
		enrollmentService.updateEnrollment(enr);
	}
}
