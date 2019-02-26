package com.leverx.shaadtdemo.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.leverx.shaadtdemo.service.CloudService;

@Controller
public class HomeController {
	@Autowired
	private CloudService cloudService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String getHome(Model model) throws JSONException {
		String appName = cloudService.getApplicationName();
		// Make request to UAA to retrieve JWT
		JSONObject jsonObj = new JSONObject(System.getenv("VCAP_SERVICES"));
		
		JSONArray jsonArr = jsonObj.getJSONArray("hanatrial");
		JSONObject credentials = jsonArr.getJSONObject(0).getJSONObject("credentials");
		/*
		Map<String, GenericDestination> destMap = new HashMap<>();
		destMap = DestinationAccessor.getGenericDestinationsByName();
		model.addAttribute("destinations", destMap.toString());
		Map<String, JsonElement> vcap = cloudService.getSpaceName();
		JsonElement vc = vcap.get("space_name");
		DecodedJWT token = new AuthTokenFacade().getCurrentToken().get().getJwt();
		//JsonArray hanatrial = cloudService.getSchemaName().get("hanatrial");
		List<String> sch = getValuesForGivenKey(hanatrial.toString(), "schema");

		model.addAttribute("token",token);
		model.addAttribute("VCAP",vc.toString());
		//model.addAttribute("hanatrial", hanatrial); 
		//model.addAttribute("schema", sch);
		model.addAttribute("appName", appName);
		
		*/
		model.addAttribute("VCAP_SERVICES", jsonObj.toString());
		model.addAttribute("SCHEMA", credentials.toString());
		return "index";
		
	}
}
