package com.leverx.shaadtdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leverx.shaadtdemo.dao.ODataDAO;
import com.leverx.shaadtdemo.domain.OData;

@Service
public class ODataService {

	@Autowired
	private ODataDAO odataDao;

	public List<OData> getAllSuppliers(String destinationName) {
		return odataDao.getAll(destinationName);
	}
}
