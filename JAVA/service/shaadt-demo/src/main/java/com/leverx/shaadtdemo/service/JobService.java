package com.leverx.shaadtdemo.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.shaadtdemo.dao.JobDAO;
import com.leverx.shaadtdemo.domain.Job;

@Service
public class JobService {

	@Autowired
	private JobDAO jobDao;


	public List<Job> getJobAll() {
		return jobDao.getAll();
	}

	public Job getJob(Long id) {
		Optional<Job> jobOptional = this.jobDao.getById(id);
		Job job = null;
		if (jobOptional.isPresent()) {
			job = jobOptional.get();
		}
		return job;
	}

	public void createJob(Job job) throws SQLException {
		this.jobDao.save(job);
	}

	public void updateJob(Job job) {
		this.jobDao.update(job);
	}

	public void deleteJob(Long id) {
		this.jobDao.delete(id);
	}
	
	public void getInnerJoinUser() {
		this.jobDao.getInnerJoinUser();
	}
	
}
