package com.leverx.leverxspringdemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.UserDao;
import com.leverx.leverxspringdemo.domain.User;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	public List<User> getUserAll() {
		return userDao.getAll();
	}
	
	public User getUser(Long id) {
		Optional<User> UserOptional = this.userDao.getById(id);
		User User = null;
		if (UserOptional.isPresent()) {
			User = UserOptional.get();
		}
		return User;
	}
	
	public void createUser(User User) {
		this.userDao.save(User);
	}
	
	public void updateUser(User User) {
		this.userDao.update(User);
	}
	
	public void deleteUser(Long id) {
		this.userDao.delete(id);
	}
	
}
