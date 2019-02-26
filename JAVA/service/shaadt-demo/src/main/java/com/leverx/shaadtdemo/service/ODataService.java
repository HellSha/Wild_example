package com.leverx.shaadtdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.shaadtdemo.dao.ODataDao;
import com.leverx.shaadtdemo.domain.OData;

@Service
public class ODataService {
	
	@Autowired
	private ODataDao odataDao;

	
	public List<OData> getAllSuppliers(String destinationName){
		return odataDao.getAll(destinationName);
	}
}
