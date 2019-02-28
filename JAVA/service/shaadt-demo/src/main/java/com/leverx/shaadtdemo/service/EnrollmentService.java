package com.leverx.shaadtdemo.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.shaadtdemo.dao.EnrollmentDAO;
import com.leverx.shaadtdemo.domain.Enrollment;

@Service
public class EnrollmentService {

	@Autowired
	private EnrollmentDAO enrollmentDao;

	public List<Enrollment> getEnrollmentAll() {
		return enrollmentDao.getAll();
	}

	public Enrollment getEnrollment(Long id) {
		Optional<Enrollment> enrollmentOptional = this.enrollmentDao.getById(id);
		Enrollment enrollment = null;
		if (enrollmentOptional.isPresent()) {
			enrollment = enrollmentOptional.get();
		}
		return enrollment;
	}

	public void createEnrollment(Enrollment enr) throws SQLException {
		this.enrollmentDao.save(enr);
	}

	public void updateEnrollment(Enrollment enr) {
		this.enrollmentDao.update(enr);
	}

	public void deleteEnrollment(Long id) {
		this.enrollmentDao.delete(id);
	}
}
