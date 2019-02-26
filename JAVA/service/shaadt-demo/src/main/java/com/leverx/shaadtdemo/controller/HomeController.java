package com.leverx.shaadtdemo.controller;

import java.util.List;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.shaadtdemo.domain.Destination;
import com.leverx.shaadtdemo.service.CloudService;

@Controller
public class HomeController {
	@Autowired
	private CloudService cloudService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String getHome(Model model) throws JSONException {
		String appName = cloudService.getApplicationName();
	
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);
		
		return "index";
		
	}
}
