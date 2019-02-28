package com.leverx.shaadtdemo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.leverx.shaadtdemo.domain.Destination;
import com.leverx.shaadtdemo.service.CloudService;
import com.leverx.shaadtdemo.service.SecurityService;
import com.sap.cloud.sdk.cloudplatform.security.AuthToken;
import com.sap.cloud.sdk.s4hana.connectivity.exception.AccessDeniedException;

@Controller
public class HomeController {

	private static final String HANATRIAL = "hanatrial";
	private static final String CREDENTIALS = "credentials";
	private static final String SCHEMA = "schema";
	private static final String SPACE_NAME = "space_name";
	private static final String FINAL_NAME = "given_name";
	private static final String FAMILY_NAME = "family_name";

	@Autowired
	private CloudService cloudService;
	@Autowired
	private SecurityService securityService;

	@RequestMapping(value = "/schema", method = RequestMethod.GET)
	public String getHome(Model model) {
		JsonArray hanatrial = cloudService.getSchemaName().get(HANATRIAL);
		JsonElement schema = hanatrial.get(0).getAsJsonObject().get(CREDENTIALS).getAsJsonObject().get(SCHEMA);

		model.addAttribute("schema", schema);
		return "index";
	}

	@RequestMapping(value = "/space", method = RequestMethod.GET)
	public String getSpaceName(Model model) {
		Map<String, JsonElement> vcap = cloudService.getSpaceName();
		JsonElement vc = vcap.get(SPACE_NAME);

		model.addAttribute("VCAP", vc.toString());
		return "space";
	}

	@RequestMapping(value = "/destinations", method = RequestMethod.GET)
	public String getListOfDestinations(Model model) {
		List<Destination> destinations = cloudService.getDestinations();
		model.addAttribute("destinations", destinations);
		return "destination";
	}

	@RequestMapping(value = "/jwt", method = RequestMethod.GET)
	public String getJWT(Model model) {
		Optional<AuthToken> token = cloudService.getCurrToken();
		JsonObject jo = cloudService.getInfo(token);
		JsonElement name = jo.get(FINAL_NAME);
		JsonElement familyname = jo.get(FAMILY_NAME);
		model.addAttribute("token", jo);
		model.addAttribute("name", name);
		model.addAttribute("familyname", familyname);
		return "jwt";
	}

	@RequestMapping(value = "/scope", method = RequestMethod.GET)
	public String checkScope() throws AccessDeniedException {
		securityService.userHasAuthorization("Display");
		return "scope";
	}
}
