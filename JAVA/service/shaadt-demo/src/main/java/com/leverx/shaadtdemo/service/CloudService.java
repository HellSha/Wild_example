package com.leverx.shaadtdemo.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;

@Service
public class CloudService {

	@Autowired
	private CloudPlatform platform;
	@Autowired
	private ScpCfCloudPlatform spacename;
	@Autowired
	private ScpCfCloudPlatform getSchema;

	public String getApplicationName() {
		return platform.getApplicationName();
	}

	public Map<String, JsonElement> getSpaceName() {
		return spacename.getVcapApplication();
	}

	public Map<String, JsonArray> getSchemaName() {
		return getSchema.getVcapServices();
	}

}
