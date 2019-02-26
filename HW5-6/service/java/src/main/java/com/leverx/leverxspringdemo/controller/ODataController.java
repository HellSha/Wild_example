package com.leverx.leverxspringdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.leverxspringdemo.domain.OData;
import com.leverx.leverxspringdemo.service.ODataService;


@RestController
public class ODataController {

	@Autowired
	private ODataService  oDataService;
	
	@GetMapping(value="/odata/{desinationName}")
	public List<OData> getAllSuppliers(@PathVariable String desinationName) {
	  return 	oDataService.getAllSuppliers(desinationName);
	}
}
