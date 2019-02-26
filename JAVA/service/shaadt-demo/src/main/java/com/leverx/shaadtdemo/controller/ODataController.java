package com.leverx.shaadtdemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.leverx.shaadtdemo.domain.OData;
import com.leverx.shaadtdemo.service.ODataService;


@RestController
public class ODataController {

	@Autowired
	private ODataService  oDataService;
	
	@GetMapping(value="/odata/{destinationName}")
	public List<OData> getAllSuppliers(@PathVariable String destinationName) {
	  return 	oDataService.getAllSuppliers(destinationName);
	}
}
