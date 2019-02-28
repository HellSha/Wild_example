package com.leverx.shaadtdemo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.CloudPlatformAccessor;
import com.sap.cloud.sdk.cloudplatform.ScpCfCloudPlatform;
import com.sap.cloud.sdk.cloudplatform.security.AuthTokenFacade;

@Configuration
public class CloudConfig {
	@Bean
	public CloudPlatform cloudPlatform() {
		return CloudPlatformAccessor.getCloudPlatform();
	}

	@Bean
	public ScpCfCloudPlatform scpCloudPlatform() {
		return ScpCfCloudPlatform.getInstanceOrThrow();
	}

	@Bean
	public AuthTokenFacade authtoken() {
		return new AuthTokenFacade();
	}
}
