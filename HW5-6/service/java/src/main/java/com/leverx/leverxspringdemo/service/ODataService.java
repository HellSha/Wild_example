package com.leverx.leverxspringdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.leverxspringdemo.dao.ODataDao;
import com.leverx.leverxspringdemo.domain.OData;

@Service
public class ODataService {
	
	@Autowired
	private ODataDao odataDao;
	
	public List<OData> getAllSuppliers(String destinationName){
		return odataDao.getAll(destinationName);
	}
}
