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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.shaadtdemo.dao.intfce.IJobDao;
import com.leverx.shaadtdemo.domain.Job;

@Repository
public class JobDAO implements IJobDao {
	final String TABLE_NAME = "\"HiMTA::Work.Job\"";
	final String JOB_ID_FIELD = "\"JOB_ID\"";
	final String UPDATE_OWNER_NAME = "\"OWNER_NAME\"";

	private static final Logger logger = LoggerFactory.getLogger(JobDAO.class);

	@Autowired
	private DataSource dataSource;

	public Optional<Job> getById(Long id) {
		Optional<Job> entity = null;
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn
					.prepareStatement("SELECT TOP 1 * FROM " + TABLE_NAME + " WHERE " + JOB_ID_FIELD + " = ?");

			stmnt.setLong(1, id);

			ResultSet rs = stmnt.executeQuery();
			while (rs.next()) {
				Job job = new Job();
				job.setId(rs.getInt("JOB_ID"));
				job.setDescription(rs.getString("DESCRIPTION"));
				job.setDepartment(rs.getString("DEPARTMENT"));
				job.setDepartment(rs.getString("OWNER_NAME"));
				entity = Optional.of(job);
			}
		} catch (SQLException e) {
			logger.error("Failed to get by ID: " + e.getMessage());
		}
		return entity;
	}

	public List<Job> getAll() {
		List<Job> jobList = new ArrayList<>();
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn.prepareStatement("SELECT * FROM " + TABLE_NAME + " ;");

			ResultSet rs = stmnt.executeQuery();

			while (rs.next()) {
				Job job = new Job();
				job.setId(rs.getInt("JOB_ID"));
				job.setDescription(rs.getString("DESCRIPTION"));
				job.setDepartment(rs.getString("DEPARTMENT"));
				job.setDepartment(rs.getString("OWNER_NAME"));
				jobList.add(job);
			}
		} catch (SQLException e) {
			logger.error("Failed to get data from table: " + e.getMessage());
		}
		return jobList;
	}

	public void save(Job entity) throws SQLException {
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn.prepareStatement("INSERT INTO " + TABLE_NAME + " VALUES (?,?,?);");

			stmnt.setString(1, entity.getDescription());
			stmnt.setString(2, entity.getDepartment());
			stmnt.setString(3, entity.getOwnerName());

			stmnt.executeQuery();
		} catch (SQLException e) {
			logger.error("Failed to insert " + e.getMessage());
		}
	}

	public void delete(Long id) {
		// TODO Auto-generated method stub
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn
					.prepareStatement("DELETE FROM " + TABLE_NAME + " WHERE " + JOB_ID_FIELD + " = ?");

			stmnt.setLong(1, id);

			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Failed to delete: " + e.getMessage());
		}
	}

	public void update(Job entity) {
		// TODO Auto-generated method stub
		try {
			Connection conn = dataSource.getConnection();
			PreparedStatement stmnt = conn.prepareStatement(
					"UPDATE " + TABLE_NAME + " SET " + UPDATE_OWNER_NAME + "=? WHERE " + JOB_ID_FIELD + " =?;");

			stmnt.setString(1, entity.getOwnerName());
			stmnt.setLong(2, entity.getId());

			stmnt.executeQuery();
		} catch (SQLException e) {
			logger.error("Failed to update: " + e.getMessage());
		}
	}
	
	@RequestMapping(value = "/schema", method = RequestMethod.GET)
	public String getCurrentSchema(Model model) throws SQLException {
		Connection conn = dataSource.getConnection();
		String currentSchema = "";
		PreparedStatement prepareStatement = conn
				.prepareStatement("SELECT CURRENT_SCHEMA \"current_schema\" FROM DUMMY;");
		ResultSet resultSet = prepareStatement.executeQuery();
		int column = resultSet.findColumn("current_schema");
		while (resultSet.next()) {
			currentSchema += resultSet.getString(column);
		}
		model.addAttribute("schema", currentSchema);
		return "index";
	}

}
