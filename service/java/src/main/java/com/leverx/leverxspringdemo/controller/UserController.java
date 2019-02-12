package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.User;
import com.leverx.leverxspringdemo.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService UserService;
	
	@GetMapping(value="/User")
	public List<User> getAllUser() {
		return UserService.getUserAll();
	}
	
	@GetMapping(value="/User/{id}")
	public User getUser(@PathVariable Long id) {
		return UserService.getUser(id);
	}
	
	@PostMapping(value="/User")
	public void createUser(@RequestBody User User) {
		UserService.createUser(User);
	}
	
	@DeleteMapping(value="/User/{id}")
	public void deleteUser(@PathVariable Long id) {
		UserService.deleteUser(id);
	}
	
	@PutMapping(value="/User")
	public void updateUser(@RequestBody User User) {
		UserService.updateUser(User);
	}
	
}
