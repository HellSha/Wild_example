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

import com.leverx.shaadtdemo.domain.Job;
import com.leverx.shaadtdemo.service.JobService;

@RestController
public class JobController {
	@Autowired
	private JobService jobService;


	@GetMapping(value = "/job")
	public List<Job> getAllJobs() {
		return jobService.getJobAll();
	}

	@GetMapping(value = "/job/{id}")
	public Job getPerson(@PathVariable Long id) {
		return jobService.getJob(id);
	}

	@PostMapping(value = "/job")
	public void createPerson(@RequestBody Job job) throws SQLException {
		jobService.createJob(job);
	}

	@DeleteMapping(value = "/job/{id}")
	public void deleteJob(@PathVariable Long id) {
		jobService.deleteJob(id);
	}

	@PutMapping(value = "/job")
	public void updateJob(@RequestBody Job job) {
		jobService.updateJob(job);
	}
	
	@GetMapping(value = "/innerjoin")
	public void getInnerJoinUser() {
		jobService.getInnerJoinUser();
	}

	

}
