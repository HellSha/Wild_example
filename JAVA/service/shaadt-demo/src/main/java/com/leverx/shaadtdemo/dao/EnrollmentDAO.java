package com.leverx.shaadtdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.shaadtdemo.dao.intfce.IEnrollmentDao;
import com.leverx.shaadtdemo.domain.Enrollment;

@Repository
public class EnrollmentDAO implements IEnrollmentDao {

	final String TABLE_NAME = "\"HiMTA::Work.Enrollment\"";
	final String JOB_ID_FIELD = "\"JOB_ID\"";
	final String ENROLLMENT_ID_FIELD = "\"PERSON_ID\"";
	final String UPDATE_PERSON_NAME = "\"FIRST_NAME\"";

	private static final Logger logger = LoggerFactory.getLogger(JobDAO.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Enrollment> getById(Long id) {
		Optional<Enrollment> entity = null;
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn
					.prepareStatement("SELECT TOP 1 * FROM " + TABLE_NAME + " WHERE " + ENROLLMENT_ID_FIELD + " = ?");

			stmnt.setLong(1, id);

			ResultSet rs = stmnt.executeQuery();
			while (rs.next()) {
				Enrollment enrollment = new Enrollment();
				enrollment.setJobId(rs.getInt("JOB_ID"));
				enrollment.setPersonId(rs.getInt("JOB_ID"));
				enrollment.setFirstname(rs.getString("FIRST_NAME"));
				enrollment.setLastname(rs.getString("LAST_NAME"));
				enrollment.setEmail(rs.getString("EMAIL"));
				enrollment.setLocation(rs.getString("LOCATION"));
				entity = Optional.of(enrollment);
			}
		} catch (SQLException e) {
			logger.error("Failed to get by ID: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Enrollment> getAll() {
		List<Enrollment> enrList = new ArrayList<>();
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn.prepareStatement("SELECT * FROM " + TABLE_NAME + " ;");

			ResultSet rs = stmnt.executeQuery();

			while (rs.next()) {
				Enrollment enrollment = new Enrollment();
				enrollment.setJobId(rs.getInt("JOB_ID"));
				enrollment.setPersonId(rs.getInt("JOB_ID"));
				enrollment.setFirstname(rs.getString("FIRST_NAME"));
				enrollment.setLastname(rs.getString("LAST_NAME"));
				enrollment.setEmail(rs.getString("EMAIL"));
				enrollment.setLocation(rs.getString("LOCATION"));
				enrList.add(enrollment);
			}
		} catch (SQLException e) {
			logger.error("Failed to get data from table: " + e.getMessage());
		}
		return enrList;
	}

	@Override
	public void save(Enrollment entity) throws SQLException {
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn.prepareStatement("INSERT INTO " + TABLE_NAME + " VALUES (?,?,?,?,?);");

			stmnt.setLong(1, entity.getJobId());
			stmnt.setString(2, entity.getFirstname());
			stmnt.setString(3, entity.getLastname());
			stmnt.setString(4, entity.getEmail());
			stmnt.setString(5, entity.getLocation());

			stmnt.executeQuery();
		} catch (SQLException e) {
			logger.error("Failed to insert " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn
					.prepareStatement("DELETE FROM " + TABLE_NAME + " WHERE " + ENROLLMENT_ID_FIELD + " = ?");

			stmnt.setLong(1, id);

			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Failed to delete: " + e.getMessage());
		}
	}

	@Override
	public void update(Enrollment entity) {
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn.prepareStatement(
					"UPDATE " + TABLE_NAME + " SET " + UPDATE_PERSON_NAME + "=? WHERE " + ENROLLMENT_ID_FIELD + " =?;");

			stmnt.setString(1, entity.getFirstname());
			stmnt.setLong(2, entity.getPersonId());

			stmnt.executeQuery();
		} catch (SQLException e) {
			logger.error("Failed to update: " + e.getMessage());
		}
	}

}
